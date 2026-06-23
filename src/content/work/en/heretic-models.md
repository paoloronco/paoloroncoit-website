---
title: "Heretic Models"
summary: "A collection of language models modified through abliteration, with configurations, notebooks, and weights published on Hugging Face."
category: "ai"
stack: ["Python", "Heretic", "Hugging Face", "Jupyter"]
problem: "Studying how an LLM's refusal behavior changes requires reproducible experiments and comparison with the original model."
solution: "The repository documents abliterated TinyLlama and Mistral variants, including configurations, chat templates, notebooks, and KL-divergence measurements."
outcome: "Experimental artifacts that can be inspected and loaded with Transformers to analyze the modification while tracking deviation from the source model."
featured: false
order: 6
draft: false
links:
  - label: "GitHub repository"
    href: "https://github.com/paoloronco/heretic-models"
  - label: "Models on Hugging Face"
    href: "https://huggingface.co/paoloronco"
---

## Weight-level experiments

The catalog collects models produced with Heretic and the files needed to describe their architecture and conversation format. KL divergence is reported as an indicator of distance from the source model.

## Responsible use

These models are experimental material: removing some refusal behavior does not replace a safety and suitability assessment for a specific use case.
