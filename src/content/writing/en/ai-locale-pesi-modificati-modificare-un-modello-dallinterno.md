---
title: "Local AI, Weight Modification: Modifying a Model from Within"
description: "A personal experiment to understand what really happens inside a language model. What's about This project stems from my curiosity to see how it works internally — not through an application or API, but the raw model, its weights, and internal architecture."
pubDate: 2026-03-13
tags: []
draft: false
---
> A personal experiment to understand what really happens inside a language model.

* * *

## What It's About

I've always used AI as a tool. This project arises from my curiosity to see how it works internally — not through an application or API, but the raw model, its weights, and internal architecture.

**Heretic** is an open-source tool that allows you to modify the behavior of a language model (LLM) using a technique called **abliteration**: instead of retraining the entire model from scratch, it intervenes on its internal activations to change how it responds to certain types of inputs.

The result is a modified model saved and published on Hugging Face.

* * *

## What I Did, Step by Step

### 1\. Local Environment on Windows with GPU

I set up a Python environment with a virtual environment, installed PyTorch with CUDA support to leverage my NVIDIA GPU. No cloud, no paid services: everything runs on my machine.

```
Python 3.13 · PyTorch 2.10 + CUDA 12.8 · Windows 11
```

### 2\. Understanding What Heretic Does Under the Hood

Before running any command, I studied the process. Heretic:

1.  loads the model and its weights (in Transformers/HuggingFace format)
2.  uses two prompt datasets: one "innocuous" (`mlabonne/harmless_alpaca`) and one "problematic" (`mlabonne/harmful_behaviors`)
3.  analyzes the **internal activations** of the transformer on both sets
4.  calculates a **latent space direction** that separates the two behaviors
5.  optimizes parameters through **200 trials** with Optuna (Bayesian optimization)
6.  applies the correction via **LoRA** — a lightweight addition to the model's weights

In practice: the model is not rewritten, it is oriented.

### 3\. The Model Chosen: TinyLlama 1.1B

I chose `TinyLlama/TinyLlama-1.1B-Chat-v1.0` as a starting point — small enough to run comfortably locally (~5-15 minutes on GPU), but capable enough to be interesting to observe.

I also ran sessions on larger models (Mistral 7B, Phi-3) for comparison.

### 4\. Publishing on Hugging Face

The resulting model was saved in the Transformers format and published publicly on Hugging Face:

**[paoloronco/TinyLlama-1.1B-Chat-v1.0-heretic](https://huggingface.co/paoloronco/TinyLlama-1.1B-Chat-v1.0-heretic)**

Included is a Colab notebook for testing without installation.

* * *

## What I Learned

### On the Functioning of Language Models

This project gave me concrete insights into concepts that were previously abstract:

-   Models do not "decide" to reject something symbolically — they do it because certain activation patterns repeat statistically. That tendency can be measured.
-   The **latent space** is not a metaphor: it's a real mathematical structure, with identifiable directions corresponding to observable behaviors.
-   **LoRA** (Low-Rank Adaptation) allows you to modify a large model by intervening on only a small fraction of its parameters — it's efficient and reversible compared to full fine-tuning.

### On Working with Technical Tools

-   I learned how to read technical documentation and translate it into concrete, actionable steps
-   I managed a Python environment on Windows with complex dependencies (CUDA, PyTorch, Transformers)
-   I worked with Hugging Face repositories: file structure, model card, tokenizer, configurations
-   I understood the difference between distribution formats: **Transformers**, **GGUF** (for LM Studio), **safetensors**

### On the Method

The project required research, reading papers and documentation, diagnosing errors (GPU not detected, incompatible dependencies, batch size), and adapting the process accordingly. No ready-made tutorial — just documentation and trial-and-error.

* * *

## What This Project Is Not

Honest: **I am not an AI engineer or a programmer**. I used existing tools, AI assistance to navigate technical documentation, and my ability to understand what I was doing before doing it.

This is not a development project — it's a project of **exploration and learning**. The value for me lies in the knowledge acquired, not the code written.

* * *

## Repository Structure

```
Heretic/
├── Models/                         # GitHub repo for published models
│   ├── TinyLlama-1.1B-Chat-v1.0-heretic/
│   │   ├── Notebooks/              # Quick test Colab notebook
│   │   ├── config.json             # Model configuration
│   │   ├── generation_config.json
│   │   ├── chat_template.jinja     # Chat template
│   │   └── tokenizer_config.json
│   └── README.md
├── checkpoints/                    # Saved optimization sessions
│   ├── TinyLlama--TinyLlama-1--1B-Chat-v1--0.jsonl
│   ├── mistralai--Mistral-7B-Instruct-v0--2.jsonl
│   ├── ollama--phi3.jsonl
│   └── openai--gpt-4o.jsonl
├── .venv/                          # Local Python environment
└── info.md                         # Full operational guide
```

* * *

## Technical Stack

| Tool | Role |
| --- | --- |
| Python 3.13 + venv | Isolated environment |
| PyTorch 2.10 + CUDA 12.8 | GPU NVIDIA computation |
| Transformers (HuggingFace) | Model loading and management |
| PEFT / LoRA | Applying the modifications |
| Optuna | Bayesian parameter optimization |
| Datasets (HuggingFace) | Good/bad prompt datasets |
| Safetensors | Model saving format |
| Accelerate | Device management (GPU/CPU) |
| HuggingFace Hub | Publishing and distribution |

* * *

## Links

-   Published model: [paoloronco/TinyLlama-1.1B-Chat-v1.0-heretic](https://huggingface.co/paoloronco/TinyLlama-1.1B-Chat-v1.0-heretic)
-   Heretic (original tool): [github.com/p-e-w/heretic](https://github.com/p-e-w/heretic)
-   Hugging Face profile: [huggingface.co/paoloronco](https://huggingface.co/paoloronco)

