---
title: "AI Photo Renamer"
summary: "A local utility that analyzes images with a vision model through Ollama and assigns descriptive names while grouping similar results."
category: "ai"
stack: ["Python", "Ollama", "LLaVA", "Gradio"]
problem: "Photo folders filled with generic or numeric filenames are difficult to browse and organize without renaming every file by hand."
solution: "The tool sends images to a local vision model, turns each description into a filename, and uses fuzzy similarity and numbering to handle groups and collisions."
outcome: "A private, resumable workflow for producing readable names, with a web interface, dry-run mode, and no cloud API requirement."
featured: false
order: 8
draft: false
links:
  - label: "GitHub repository"
    href: "https://github.com/paoloronco/ai-photo-renamer"
---

## Local computer vision

Images are encoded and sent to the machine's Ollama instance. LLaVA is the default model, while other Ollama-compatible vision models can also be selected.

## Controlled execution

Dry-run mode makes it possible to review names before applying them. Progress is stored in JSON so interrupted processing can resume without analyzing completed images again.
