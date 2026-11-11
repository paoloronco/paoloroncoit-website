---
title: "GPU renting and modified models: abliterating Mistral 7B in the cloud"
description: "The second chapter of the Heretic project: same technique, larger model, GPU rental for €2 — and some unexpected lessons on how it really works…"
pubDate: 2026-05-27
tags: []
draft: false
---
The second chapter of the Heretic project: same technique, larger model, GPU rental for €2 — and some unexpected lessons on how it really works.

* * *

## The starting point

In the first experiment, I abliterated **TinyLlama 1.1B** on my local GPU — an RTX 3070 with 8GB of VRAM. It worked well: 200 optimization trials in 15 minutes, results published on Hugging Face.

The next natural step was to scale up: trying a larger model. I chose **Mistral 7B Instruct v0.3**, one of the most widely used open-source models globally — seven times bigger than TinyLlama, but especially trained with a much more aggressive alignment process.

The immediate problem: Mistral 7B in full precision requires ~14GB of VRAM. My GPU had only 8GB. Locally, it would have required quantization to 4-bit (a compression of the weights that degrades quality) and about 2.5 hours of processing. Solution: renting a cloud GPU.

* * *

## Vast.ai: an RTX 4090 for ~€1.50

I used **[Vast.ai](https://vast.ai)** — a marketplace where private users and data centers make underutilized GPUs available at much lower prices than traditional clouds like AWS or Google Cloud.

I rented an instance with a **RTX 4090 with 48GB of VRAM** for about $1.13/hour. For an operation that took around 30 minutes of effective optimization, the total cost was **less than €2**.

The comparison to my local machine is significant:

|  | RTX 3070 (local) | RTX 4090 (Vast.ai) |
| --- | --- | --- |
| VRAM | 8 GB | 48 GB |
| Quantization required | Yes (4-bit) | No — full model in bfloat16 |
| Time for 200 trials | ~2.5 hours (estimate) | **19 minutes and 21 seconds** |
| Cost | ~€0 | ~€1.50 |
| Quality of resulting model | Reduced (dequantization) | Maximum |

On the cloud instance, Mistral 7B ran in **native bfloat16** — the same precision it was trained with — without any compromises. The download of the model (14.5GB) took 1 minute and 34 seconds at 153 MB/s. Everything very different from a personal workstation.

* * *

## How it works (technical summary)

For those who haven't read the first article: **Heretic** is an open-source tool that modifies the behavior of an LLM without retraining it. The process in brief:

1.  **Load the model** from Hugging Face servers
2.  **Run forward passes** on two datasets: innocuous prompts (`mlabonne/harmless_alpaca`) and problematic prompts (`mlabonne/harmful_behaviors`)
3.  **Analyze internal activations** of the transformer on both sets to identify the "direction of rejection" in latent space — i.e., the patterns learned during training
4.  **Apply modifications** to the weights using PEFT / LoRA

The resulting model is then published and distributed via Hugging Face Hub.

* * *

## What I learned (this time)

### On cloud computing for ML

Cloud GPUs make economic sense for one-off, computationally intensive tasks. Renting 30 minutes of RTX 4090 to modify or train a 7B+ model costs less than the electricity you would use to run the same operation on your local GPU over hours — and the result is superior because it uses full precision without quantization.

Vast.ai in particular is interesting because the market is competitive: prices vary significantly between nodes, and with some attention, verified instances can be found for under $0.40/hour.

### On the model alignment process

The experiment made concrete something I understood only abstractly before: aligning an LLM is not a separable layer — it's distributed throughout all the training weights. Removing explicit rejection is relatively easy. Removing deep behavioral patterns requires more invasive interventions.

Models with light RLHF (like certain community fine-tunes or base models without instruction tuning) respond much better to ablation. Models with heavy RLHF (Meta Llama, professional instruct models) give up explicit rejection but retain the "character" of their training.

### On choosing the starting model

Not all models are equivalent as candidates for ablation. The most important criterion is not size — it's **how aggressive the alignment process was**. A 7B with light RLHF will yield clearer results than a 7B with heavy RLHF.

* * *

## Technical stack (updated)

| Tool | Role |
| --- | --- |
| Heretic v1.3.0 | Ablation tool |
| PyTorch 2.11 + CUDA 13.0 | GPU computation (cloud) |
| Transformers 5.9.0 | Model loading |
| bitsandbytes 0.49.2 | Quantization (local use) |
| Optuna 4.8.0 | Bayesian optimization |
| PEFT / LoRA | Applying weight modifications |
| Safetensors | Model saving format |
| HuggingFace Hub | Publishing and distribution |
| **Vast.ai** | **Cloud GPU rental (RTX 4090, 48GB VRAM)** |
| Gradio | Local chat interface for testing |

* * *

## What this project is not (still)

As in the first article: I am not an AI engineer. I used existing tools, documentation, and the ability to understand what I was doing before doing it — including technical issues that arise when moving beyond tutorials into real-world environments.

The most useful error from this session was probably the proxy issue: it forced me to understand how HTTP request routing works in a cloud environment, how Hugging Face handles different upload protocols, and how network problems are diagnosed when the error you see does not match the actual problem.

* * *

## Links

-   Published model: [paoloronco/Mistral-7B-Instruct-v0.3-heretic](https://huggingface.co/paoloronco/Mistral-7B-Instruct-v0.3-heretic)
-   Previous model: [paoloronco/TinyLlama-1.1B-Chat-v1.0-heretic](https://huggingface.co/paoloronco/TinyLlama-1.1B-Chat-v1.0-heretic)
-   Model repository on GitHub: [github.com/paoloronco/heretic-models](https://github.com/paoloronco/heretic-models)
-   Heretic (original tool): [github.com/p-e-w/heretic](https://github.com/p-e-w/heretic)
-   Vast.ai (cloud GPU rental): [vast.ai](https://vast.ai)
-   HuggingFace profile: [huggingface.co/paoloronco](https://huggingface.co/paoloronco)

