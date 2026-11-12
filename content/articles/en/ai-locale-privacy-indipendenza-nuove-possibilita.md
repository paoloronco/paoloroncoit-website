---
title: "Local AI: Privacy, Independence, and New Possibilities"
description: "My experiments with Ollama, llama.cpp, and PolyStrata: Qwen and Nemotron models, privacy, MoE architectures, and inference with an 8 GB RTX 3070."
pubDate: 2026-11-07
tags: ["ai", "local-ai", "privacy", "ollama", "cybersecurity"]
draft: false
---

*From Qwen and Nemotron models to MoE architectures: what I'm learning by experimenting with local AI.*

Artificial intelligence is now an integral part of my work and many personal projects. I use cloud models daily for programming, deepening technical topics, developing automations, and tackling complex problems. So-called *frontier models* have reached impressive capabilities and continue to improve at a hard-to-predict pace.

However, in recent months, I have become increasingly interested in an alternative: **executing AI models directly on my hardware**, without necessarily relying on external infrastructure.

It is not just an economic issue. Of course, today many of the most advanced AI services are accessible via subscriptions or pay-as-you-go APIs. Personally, I wonder how sustainable this model will be in the long term and if, with the growing demand for computational capacity, we will also witness a price increase. It is a possibility, not a certainty: competition and improvements in efficiency could produce the opposite effect.

But there is another aspect that, working in the field of cybersecurity, I consider particularly important: **control over your own data**.

When using a cloud model, our prompts, documents, and, in the case of coding tools, potentially entire portions of our repositories are transmitted to third-party managed infrastructure. Each provider has its own terms regarding data retention, usage for training, logging, and security. Some offer solid contractual guarantees and controls, especially in the enterprise sector, but there remains a fundamental difference: we do not have direct control over the infrastructure that executes the processing.

With a local model, instead, we can keep the entire process on our computer or within our infrastructure, deciding how to handle data, which components to use, and which connections to allow.

It is precisely this combination of **privacy, technological autonomy, curiosity, and experimentation** that has driven me to delve deeper into the world of local AI.

## My hardware: a powerful desktop, but not an AI workstation

Let's start with a clarification: the computer I use is certainly not an inexpensive PC or a low-end office device.

My configuration includes:

| Component | Hardware |
|---|---|
| CPU | Intel Core i9-13900K, 13th generation |
| RAM | 32 GB DDR |
| GPU | NVIDIA GeForce RTX 3070 |
| VRAM | 8 GB GDDR6 |
| Operating system | Windows 11 |

This is a high-end desktop designed primarily for intensive use, gaming, development, and multitasking.

However, it is not a workstation dedicated to artificial intelligence.

The main limitation, in this context, is video memory: **8 GB of VRAM are relatively few for running large language models**.

An RTX 3070 offers good computational capacity and supports CUDA, but executing a model with 14, 30, or 35 billion parameters is very different from running a video game or compiling a software project.

It is not enough to consider the GPU power alone. One must evaluate the amount of memory required for model weights, quantization, context size, and memory used during inference.

And it is here that experimentation becomes interesting.

I do not intend, at least for now, to purchase a GPU with 24 or 32 GB of VRAM solely to run AI models. I want to first understand how much I can get from the hardware I already own, using it as efficiently as possible.

## First experiments: Ollama and llama.cpp

One of the first tools I started using was **Ollama**.

Its main advantage is simplicity: it allows downloading, managing, and running local models without having to manually configure every component of the inference environment.

I started experimenting with different model families, especially **Qwen** and **NVIDIA Nemotron**, evaluating their performance, response quality, and integration possibilities with other tools.

The goal was not simply to get a working chat, but to understand how useful these models could actually be in daily activities.

Subsequently I delved deeper into **llama.cpp**, a project that offers greater control over model execution, quantization, and load distribution between CPU and GPU.

Among the configurations I tried is **Qwen2.5-Coder-14B-Instruct**, in GGUF format with Q4_K_M quantization.

Using `llama-server` on Windows, with a context of 8192 tokens and part of the layers loaded on the GPU, I managed to achieve interesting performance for code generation and development activities.

Of course, this does not mean having the same capabilities as a frontier model. A local model of these dimensions can behave well on circumscribed modifications, technical explanations, or relatively simple coding tasks, but it may encounter difficulties with very large repositories, complex reasoning, and articulated agent tasks.

The difference between a model that generates code and an agent capable of correctly modifying a software project is far from negligible.

## PolyStrata: overcoming the 8 GB VRAM limits

The most interesting part of my recent experimentation concerns **PolyStrata**.

I discovered this project by exploring discussions on Reddit, technical guides, and YouTube videos. The local AI community has proven to be an extremely useful resource: often it is precisely the experiments shared by other users that bring up solutions I would have had difficulty finding alone.

PolyStrata intrigued me because it addresses one of the main problems of local inference: the amount of available video memory.

Instead of requiring all model weights to reside in VRAM, it allows leveraging a combination of **video memory, system RAM, and CPU**, with particularly interesting strategies for some Mixture of Experts architectures.

This does not mean magically transforming 8 GB of VRAM into 32 GB, nor achieving the performance of a professional GPU.

It means being able to run configurations that would normally be very difficult to manage with video memory alone.

Currently I am experimenting mainly with two models:

- **Tiel Coder 35B**, oriented primarily towards coding and software development activities.
- **Qwen 35B**, which I am evaluating for more general uses and its reasoning and generation capabilities.

Both are still in the testing phase.

The first impressions are encouraging. Tiel Coder has proven promising mainly on medium-sized repositories, while Qwen is delivering results that, at least in the tests conducted so far, I consider very interesting.

I do not yet have sufficient data to formulate a definitive comparison with cloud models or other local configurations.

There are also obvious trade-offs. Initial loading can take several minutes, the computer may become temporarily unresponsive, and generation speed depends heavily on the model and memory management.

But seeing a model of this size run on an RTX 3070 with 8 GB of VRAM is already, from a technical point of view, a result worth exploring.

## Mixture of Experts: why this architecture interests me so much

One of the evolutions I follow with particular interest is that of **Mixture of Experts (MoE)** models.

In traditional models, defined as *dense*, a large portion of parameters is used to process every token.

In MoE models, instead, the network is organized in groups of parameters called *expert*. A routing mechanism selects which experts to activate during processing.

This allows for models with a high total number of parameters but with a much lower number of actually active parameters per token.

For example, a model can have around 35 billion total parameters and use only a fraction of them during a specific operation.

It is important to distinguish two concepts: **total parameters and active parameters are not the same thing**.

Even if few experts are activated at a time, all necessary weights must still be accessible. When they do not enter VRAM, the system must manage them through other memory levels, with possible performance penalties.

However, combining MoE architectures, quantization, and caching techniques, very interesting possibilities are emerging even for consumer hardware.

I often wonder what will be possible to do in two or three years.

Will we have smaller models but capable as the much larger ones of today? Runtimes capable of exploiting CPU, GPU, and RAM even better? Local agents reliable enough to autonomously perform development and automation tasks?

I do not believe it is possible to answer with certainty, but it is one of the aspects that makes this sector so stimulating.

## Privacy, data retention, and control: the real value of local AI

One of the main reasons I consider it important to delve into local AI is the possibility of **maintaining direct control over processed information**.

Think of a concrete case: using an AI agent to work on a private repository.

With many cloud tools, part of the source code, project structure, and other context information must be transmitted to the provider that executes the model.

This does not necessarily mean that the provider uses those data for training their own models or stores them indefinitely. There are services with limited retention policies, enterprise controls, and specific contractual commitments.

However, there remains a dependency on external infrastructure.

With a local model, instead, I can configure an environment where code, prompts, and results remain within my computer.

I can verify which processes are running, monitor network connections, limit Internet access, and control any log files or persistent data.

Furthermore, many local models are distributed as **open weights**, allowing to download and run model weights directly.

However, one must make a distinction: *open weights* does not necessarily mean *open source*. Having access to weights does not imply having the training code, the datasets used, or all details regarding model construction.

Similarly, using a local model does not automatically guarantee privacy and security.

An interface might include telemetry, a plugin might communicate with external services, and an agent might use cloud APIs without this being immediately evident.

For this reason I consider it fundamental to verify not only the model, but the entire pipeline: runtime, interface, connected tools, permissions, and network connections.

**The real difference is that, with a correctly configured local infrastructure, I can verify and control many of these aspects directly.**

Of course other responsibilities remain: protecting the operating system, managing permissions correctly, avoiding unnecessary endpoint exposure, and keeping dependencies updated.

From a cybersecurity perspective, local AI does not eliminate risks. It allows adopting a different security model, in which an important part of control remains in the hands of the infrastructure manager.

## Not just chatbots: coding, agents, and automations

Another aspect I consider particularly interesting is the integration of local models with tools already present in my development environment and homelab.

I am not interested in using a model exclusively to ask questions via a web interface.

I want to understand how useful it can be within real workflows.

### Coding and software development

I am experimenting with the use of local models through API-compatible endpoints used by various tools, with particular interest towards **OpenCode**.

I have conducted some tests where an agent had to modify existing HTML files directly, identifying specific elements and replacing them according to precise instructions.

These are apparently simple activities, but they represent a good starting point to evaluate interpretation capabilities, tool usage, and modification reliability.

Output verification remains fundamental.

An agent that claims to have correctly modified a file does not necessarily produce the desired result. One must check the code, verify differences, and ensure no unwanted modifications were introduced.

### Automations with n8n

Another possible area of use is **n8n**, which I already use for several personal automations and software projects.

Some activities could be managed by local models without necessarily resorting to cloud services: information classification, structured data extraction, text transformations, preliminary analysis, and intermediate steps of more complex workflows.

Of course, not all activities require a language model and not all local models are sufficiently reliable to be inserted into an automation without controls.

My goal is to understand where local inference can offer a concrete advantage, maintaining a balance between quality, processing time, resource consumption, and operational complexity.

## The limitations I am encountering

Despite the progress, using local AI models still involves several trade-offs.

The first concerns **available memory**. The 8 GB of RTX 3070 impose choosing model, quantization, and context size carefully. The 32 GB of RAM helps, but cannot offer the same performance as video memory.

The second concerns **inference speed**. Some models turn out sufficiently responsive for interactive use, while others require longer wait times, especially when part of the weights must be managed by the CPU.

The third is **response quality**. Local models are improving rapidly, but in more complex activities I continue to find it advantageous to use frontier models.

Finally there is configuration complexity. NVIDIA drivers, CUDA, GGUF formats, quantization, memory management, and compatibility with agent tools are all aspects that require attention.

Personally, however, I also consider this part of the experience value.

Experimenting with these tools allows me to better understand how inference works, hardware requirements, and differences between various architectures.

## How to start experimenting

For those who want to get close to local AI, my advice is to start with a relatively simple configuration.

Ollama represents a good entry point: it allows installing a model quickly and verifying how it behaves on your own hardware.

Subsequently one can delve into tools like llama.cpp, experimenting with different quantizations and layer distribution between CPU and GPU.

To evaluate results, I find it useful to use concrete activities rather than limiting oneself to generic questions.

For example, one can ask multiple models to analyze the same script, correct an error, modify an HTML page, or generate a JSON structure following a precise schema.

It is important to consider not only the correctness of the response, but also the time required, memory consumption, and overall reliability.

Only after acquiring familiarity with these aspects does it make sense to move on to more experimental configurations, such as those based on large MoE models and tools like PolyStrata.

## What future for local AI?

I do not think that local AI will completely replace cloud services, at least in the near future.

Frontier models will probably continue to offer important advantages, especially in activities requiring advanced reasoning capabilities, very extensive contexts, and high performance.

At the same time, I believe that local inference will become increasingly accessible and interesting.

New architectures, more efficient quantizations, and better optimized runtimes could allow running increasingly capable models even on consumer hardware.

What today requires an experimental configuration could become, in a few years, a relatively common feature.

For my part, I will continue to explore both possibilities.

I will use cloud models when they represent the most effective solution, but I will also continue to invest time in local AI, especially for applications where privacy, data control, and technological independence represent concrete advantages.

The thing that interests me most is seeing how much can be achieved from hardware that, while powerful, was not specifically designed for this type of use.

**Being able to experiment with models with tens of billions of parameters using an 8 GB RTX 3070 is something I would have considered unrealistic only a short time ago.**

Today it is possible, despite significant trade-offs.

And we are probably still in the early stages of this evolution.

I will continue to share the results of my experiments, including configurations that work, those that do not work, and the limitations I encounter. Because, beyond benchmarks and numbers, I think the best way to understand these technologies is to try them directly, compare with the community, and understand where they can truly be useful.
