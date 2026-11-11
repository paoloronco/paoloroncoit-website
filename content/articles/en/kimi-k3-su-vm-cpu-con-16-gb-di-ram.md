---
title: "I ran the 2.78-trillion-parameter Kimi K3 on a 16 GB CPU VM"
description: "From a 1.56 TB checkpoint to the first token: an experiment, benchmark, and tutorial for running Kimi K3 CPU-only on Google Cloud with kimi-k3-in-c."
pubDate: 2026-09-01
tags:
  - AI
  - LLM
  - Google Cloud
  - Cloud
  - Infrastructure as Code
  - Homelab
draft: false
---

When I read that a **2.78-trillion-parameter model** could run on a single CPU with only a few gigabytes of RAM, my first reaction was a mix of curiosity and skepticism.

I did not think the project was fake. I was interested in a different question: **what does “running” a model of this size actually mean?** Does it mean being able to chat with it as if it were running in Ollama? Does it mean that 1.56 TB of weights somehow fits into 8 or 16 GB of memory? More importantly, which resource pays the price for this apparent impossibility?

The quickest way to understand it was not to keep reading benchmarks. It was to try it myself.

I created a VM on Google Cloud, downloaded the complete Kimi K3 checkpoint, compiled the C99 [`kimi-k3-in-c`](https://github.com/FareedKhan-dev/kimi-k3-in-c) engine, and waited for the first token. Much longer than I expected.

The experiment worked, and that is precisely what made it instructive: **Kimi K3 generated the correct token on a VM with 4 vCPUs and 16 GB of RAM, but the first token took about 15 minutes and the second took more than 9 minutes.**

This project gave me a much more concrete understanding of the difference between feasibility, performance, and usability.

## The project that sparked my curiosity

`kimi-k3-in-c` is a portable inference engine written in C99. It requires no PyTorch, BLAS, or GPU, and it can run the released Kimi K3 checkpoint with very small memory budgets.

Kimi K3 is a Mixture-of-Experts model. In simplified terms, it does not activate every expert for every token. The engine takes advantage of this property: it keeps only what fits within the configured memory budget in RAM and reads the remaining data from storage when needed.

This is the most interesting part of the claim that it “runs in a few gigabytes of RAM”: **the weights do not shrink or disappear. They are moved through time instead of all being resident in RAM at once.**

The memory requirement falls, but the work moves to storage and CPU.

## Before I reached the final VM

My first attempt was on Vast.ai, using an AMD EPYC host with about 251 GB of RAM and local NVMe measured at roughly 8.5 GB/s. The machine looked ideal, but the container had only about 1.5 TB of usable storage—less than the checkpoint and packed trunk required. The physical host capacity did not matter if it was not allocated to my workload.

On Google Cloud I encountered the opposite problem. The new project's SSD quota was too small for a 2 TB disk, while `pd-standard` capacity was available. I got the space I needed, but had to accept much slower storage.

The first Spot VM also proved to be a false economy: it was preempted during trunk packing, a non-resumable step. The checkpoint survived on Persistent Disk, but I had to restart the packing operation and move the environment from `us-central1-c` to `us-central1-a` through snapshots to find Standard capacity.

These attempts made it clear that the test was not only about the model. Actual storage allocation, quotas, persistence, and failure modes were all part of the experiment.

## Test environment

For the successful test I deliberately used a modest configuration:

| Component | Configuration |
|---|---|
| Cloud | Google Cloud Compute Engine |
| VM | `e2-standard-4` |
| Resources | 4 vCPUs, 16 GB RAM |
| Test operating system | Debian 12 |
| Test boot disk | 250 GB `pd-balanced` |
| Data disk | 2 TB `pd-standard` |
| Checkpoint | About 1.56 TB, 96 shards |
| Engine | `kimi-k3-in-c` |
| Trunk memory budget | 5 GB |
| Expert cache | 1 GB |

The boot disk and data disk were separate. This allowed me to stop or replace the VM without immediately downloading more than one and a half terabytes of data again.

The Terraform configuration published with the project is not a byte-for-byte snapshot of the original VM. It uses Ubuntu 24.04 and a 50 GB boot disk, which is sufficient because the model and trunk live on the data disk. The results in this article come from the Debian environment shown in the table.

## How I prepared Kimi K3

### 1. Creating the infrastructure

I created a Debian VM and attached a 2 TB data disk mounted at:

```text
/mnt/k3data
```

In the package published with this project, I converted the configuration to Terraform. After selecting a GCP project, the essential workflow is:

```bash
gcloud auth application-default login
gcloud config set project YOUR_GCP_PROJECT_ID

cp terraform/terraform.tfvars.example terraform/terraform.tfvars
terraform -chdir=terraform init
terraform -chdir=terraform validate
terraform -chdir=terraform plan
terraform -chdir=terraform apply
```

The bootstrap continues after the VM is created. Before starting the download, I waited for `Bootstrap complete` in the startup-script log.

For security, the template does not automatically expose SSH to the Internet. I prefer access through IAP or an existing controlled policy rather than a `0.0.0.0/0` rule on port 22.

### 2. Compiling the engine

In the original lab, or for a manual replica without the Terraform bootstrap:

```bash
git clone https://github.com/FareedKhan-dev/kimi-k3-in-c.git
cd kimi-k3-in-c
git checkout ff11dce858a2eb8a781224facdffd33a1fa48d25 # v1.0.0
make -j"$(nproc)"
make test

python3 -m venv ~/.venvs/hf
~/.venvs/hf/bin/pip install huggingface_hub==1.29.0
export PATH="$HOME/.venvs/hf/bin:$PATH"
```

The engine is lightweight. Compiling the code is not the difficult part. The data is.

### 3. Downloading the checkpoint

The checkpoint is public. The Hugging Face CLI works without credentials; a token remains optional for possible rate limits. On the 16 GB VM, I disabled Xet high-performance mode and limited the download to four workers:

```bash
export HF_XET_HIGH_PERFORMANCE=0
export HF_XET_FIXED_DOWNLOAD_CONCURRENCY=4

hf download moonshotai/Kimi-K3 \
  --revision a590ce090cb049c93a33dfe8c208ec652aa20503 \
  --local-dir /mnt/k3data/k3model \
  --max-workers 4

hf cache verify moonshotai/Kimi-K3 \
  --revision a590ce090cb049c93a33dfe8c208ec652aa20503 \
  --local-dir /mnt/k3data/k3model \
  --fail-on-missing-files
```

The complete download is about **1.56 TB across 96 shards**. The final verification compares the files with the Hugging Face snapshot metadata and rereads the entire checkpoint. This matters because an incomplete download may not fail loudly and can produce incorrect tokens.

My first download attempts also ran out of memory because concurrency was too high. Reducing the number of workers made the process stable on a 16 GB VM. It sounds like a secondary detail, but at this scale even the downloader becomes part of the system architecture.

### 4. Packing the trunk

The next step prepares the trunk in a form suitable for streaming:

```bash
./scripts/pack-trunk.sh \
  /mnt/k3data/k3model \
  /mnt/k3data/k3trunk
```

In my run, the packed trunk was about **108.81 GB**. This step makes the memory budget adjustable: some parts can remain in memory while the rest are read from disk.

## The inference command

I used the verification prompt provided by the project:

```bash
./bin/k3 /mnt/k3data/k3model \
  --trunk /mnt/k3data/k3trunk \
  --trunk-gb 5 \
  --cache-gb 1 \
  --tok /mnt/k3data/k3model \
  --prompt "The capital of France is" \
  --gen 8 \
  --incremental
```

It is important to understand that this version is not a chat interface. Its output is a **text continuation**. The prompt does not ask the model to answer a question; it gives the model the beginning of a sentence to complete.

## Then the screen stopped moving

The engine had loaded the configuration, tokenizer, and tensors correctly. It printed:

```text
STEP   TOKEN      SECONDS      CACHE HIT  READ GB    TOK/S
--------------------------------------------------------------------
```

Then, apparently, nothing happened.

This was the most interesting moment of the experiment. Was the process stuck, or was it really computing the first token?

From a second SSH session, I checked:

```bash
ps -C k3 -o pid,%cpu,%mem,rss,etime,stat,cmd
```

The process was using CPU, its resident memory was increasing, and its state was `Dl+`. On Linux, `D` means uninterruptible sleep, usually related to I/O. This was not evidence of a deadlock. It was evidence of a process spending a long time waiting for storage.

For a more direct view, I used:

```bash
iostat -xz 2
pidstat -d -p "$(pgrep -n k3)" 2
```

The process was working. It was simply operating on a very different timescale from a chat application.

## Finally, the first token

After about 15 minutes, the first row appeared:

```text
0      17374      902.53       90.1       99.70      0.001
```

Token `17374` decoded to:

```text
 Paris
```

It was correct.

A 2.78-trillion-parameter model was genuinely completing the sentence on a CPU VM with 16 GB of RAM. This was not a reduced model or a mock: it was the complete checkpoint, with **497,220 tensors** indexed across all 96 shards.

The second token provided the most useful measurement:

```text
1      20829      547.60       100.0      25.83      0.002
```

More than nine minutes to generate the period after `Paris`.

## What those numbers really mean

### The first token costs more than the following ones

Step 0 has to process the prompt and pay the cold-start cost. In my run it read 99.70 GB of expert data. The second step fell to 25.83 GB and from 902.53 to 547.60 seconds.

That reduction matters, but it is nowhere near enough to make the environment interactive.

### A 100% cache hit can be misleading

If I looked only at `CACHE HIT 100.0`, I might conclude that the second token barely needed the disk. The same row, however, reports `READ GB 25.83`.

The counter can consider a request a “hit” when it is served from the arena after the data has just been prefetched from disk. The useful metric is therefore the amount of I/O actually avoided between steps, not the isolated percentage.

### RAM was not the main bottleneck

The memory plan was:

```text
trunk streamed       5.00 GB
embedding + lm_head  4.70 GB
expert cache         1.00 GB
recurrent state      626.25 MB
KV cache             33.12 MB
expected total       11.37 GB
```

The engine stayed within the expected order of magnitude. The real limitation was the cost of continuously moving huge amounts of data from storage and processing it on the CPU.

This was the main lesson: **reducing resident memory does not remove the model's cost; it transforms it.**

## Why I did not build a Web UI

My first instinct was to add a small web interface and turn the CLI into something resembling Ollama or Open WebUI.

After the benchmark, that would have been work at the wrong layer. A UI cannot fix nine minutes per token. The system first needs much faster local storage, many more CPU cores, and enough RAM to keep a larger part of the trunk resident.

The upstream project also does not yet apply Kimi's chat template. Even with an API and a UI, its current behavior would remain text completion rather than a complete conversational assistant.

## Reproducing the experiment more safely

I collected the Terraform configuration, scripts, and documentation into a reproducible package. Its most important choices are:

1. **Separate data disk:** the 1.56 TB download is not tied to the VM lifecycle.
2. **SSH through IAP:** no automatic public exposure of port 22.
3. **Optional credentials kept in memory:** when I use `HF_TOKEN`, it is not written to metadata or Terraform state.
4. **Two-token benchmark:** enough to validate the pipeline and measure decode without wasting another hour.
5. **GCP labels:** useful for separating project costs in billing reports.
6. **Explicit destruction:** stopping the VM does not stop disk charges.

To run the test:

```bash
sudo GEN_TOKENS=2 TRUNK_GB=5 CACHE_GB=1 \
  /opt/k3-project/scripts/run-benchmark.sh
```

The expected first token IDs are:

```text
17374, 20829
```

If they differ, the result should not immediately be blamed on model randomness. Decoding is greedy and the verification output should be deterministic. The download, byte count, packing step, and build need to be checked.

The package also pins the engine to release `v1.0.0`, the `huggingface_hub` CLI to version `1.29.0`, and the checkpoint to the snapshot used in the test. This prevents a future upstream change from silently altering the experiment.

## Costs and the false sense of being “off”

Google Cloud Billing is not real time. During the experiment, the report initially showed almost zero cost even though the VM, disks, and snapshots had already been used.

In addition:

- stopping the VM stops compute charges;
- the boot and data disks remain billable;
- snapshots and storage classes can have minimum or retrieval charges;
- a budget alert is not a hard cap and shares some of the latency of billing data.

The template protects the data disk with `prevent_destroy = true` in `terraform/main.tf`. Terraform therefore refuses to create a destruction plan while that protection remains active. For a complete teardown, the value must be deliberately changed to `false` before running:

```bash
terraform -chdir=terraform plan -destroy
terraform -chdir=terraform destroy
```

Before confirming, I need to make sure that there is no data I want to preserve.

## What this project taught me

The most important result was not seeing the word “Paris.” It was following the path that made that token possible.

The experiment taught me that an AI system's specifications can be true and still be easy to misunderstand. “It runs in 8 GB of RAM” describes a remarkable property of the engine, but it does not describe the user experience, storage throughput, first-token latency, or total operating cost.

It also reminded me why I like practical projects. A table can tell me that I/O matters, but waiting fifteen minutes in front of an empty row, checking that the process is still alive, and finally seeing the correct token appear makes the concept impossible to forget.

More broadly, I came away with a rule that applies far beyond Kimi K3: **when an apparently impossible constraint is overcome, the cost does not disappear. It changes form and moves to another part of the architecture.** In this case, it moved from RAM capacity to the continuous movement of data.

## Conclusions

The experiment succeeded:

- the complete checkpoint loaded;
- all 96 shards were indexed;
- the tokenizer, trunk, and recurrent state initialized;
- the first and second tokens were correct;
- CPU-only inference worked with 16 GB of RAM.

The operational result was equally clear:

- about 15 minutes for the first token;
- about 9 minutes for the second;
- no practical interactivity;
- storage and compute were the bottlenecks;
- a Web UI would have been premature.

If I return to the project, the next sensible step will be a controlled test on high-throughput NVMe with more RAM, using at least three runs and measuring cold start, prefill, and sustained decode separately.

I still do not know whether Kimi K3 will become something I talk to in my homelab. I do know that the experiment has already achieved its purpose: it turned a surprising claim into a concrete understanding of the architecture that makes it possible.

## References

- [kimi-k3-in-c — official repository](https://github.com/FareedKhan-dev/kimi-k3-in-c)
- [Official quickstart](https://github.com/FareedKhan-dev/kimi-k3-in-c/blob/main/docs/QUICKSTART.md)
- [Performance and memory ladder](https://github.com/FareedKhan-dev/kimi-k3-in-c/blob/main/docs/PERFORMANCE.md)
- [Project roadmap](https://github.com/FareedKhan-dev/kimi-k3-in-c/blob/main/docs/ROADMAP.md)
- [Google Cloud Compute Engine pricing](https://cloud.google.com/compute/all-pricing)
- [Google Cloud disk performance](https://cloud.google.com/compute/docs/disks/performance)

> Note: prices, quotas, performance, and features change over time. Always check current documentation and licenses before reproducing the project.
