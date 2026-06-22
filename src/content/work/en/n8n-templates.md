---
title: "n8n Templates"
summary: "A collection of import-ready n8n workflows for automation, notifications, document handling, and integrations between services."
category: "automation"
stack: ["n8n", "JSON", "JavaScript", "HTML"]
problem: "Building every automation from scratch slows experimentation and makes proven configurations harder to reuse."
solution: "The repository organizes exportable workflows, setup guides, assets, and examples into independent, modular use cases."
outcome: "A browsable catalog of n8n templates that can be imported, studied, and adapted to different integrations."
featured: true
order: 1
draft: false
links:
  - label: "GitHub repository"
    href: "https://github.com/paoloronco/n8n-templates"
  - label: "Online catalog"
    href: "https://paoloronco.github.io/n8n-templates/"
---

## Reusable automations

The project collects workflows for tasks such as invoice archiving, news aggregation, certificate creation and validation, and notification systems. Each template keeps its JSON file, instructions, and setup material together.

## Approach

The folder structure makes every automation self-contained: a workflow can be imported into n8n and then connected to the credentials and services available in its target environment.
