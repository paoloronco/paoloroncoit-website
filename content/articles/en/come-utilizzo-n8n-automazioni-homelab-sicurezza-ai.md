---
title: "How I Use n8n to Automate My Homelab, Security, and Everyday Tasks"
description: "A look at my n8n workflows for invoices, Splunk alerts, tech newsletters, RAG chatbots and cloud automation, including architecture and lessons learned."
pubDate: 2026-11-07
tags: ["n8n", "automation", "homelab", "cybersecurity", "AI", "Docker", "Splunk"]
draft: false
---

Some tasks take only a few minutes on their own: downloading an invoice, renaming it, saving it in the right folder, checking recent security alerts, or sorting through technology news. The problem is that these small tasks keep coming back, often across services that do not talk to each other.

That is why I started using **n8n**. Not to automate everything for the sake of it, but to remove repetitive steps and connect tools I already rely on: Gmail, Google Sheets, Splunk, my websites, Qdrant, cloud services, and servers in my homelab.

Over time, n8n has gone from an experiment to a stable part of my infrastructure. Here is how I use it, the workflows I have built, and the trade-offs I have encountered. Some of these projects are available on [GitHub](https://github.com/paoloronco/n8n-templates), with importable files and instructions for adapting them to your own environment.

## Why n8n, and why self-host it?

n8n lets you connect triggers, external services, conditions, and data transformations into workflows. Its visual editor is useful, but what I appreciate most is the ability to write custom logic when built-in nodes are not enough. A workflow can receive a webhook, call an API, process JSON with JavaScript, write to a database, and send a notification without requiring a separate application for each step.

I chose to host n8n in my homelab rather than rely entirely on a managed service. My instance runs in **Docker on a dedicated Proxmox virtual machine**. The same environment also hosts **Qdrant**, the vector database I use for RAG projects, along with supporting services for webhooks, notifications, and integrations.

Self-hosting gives me control over the environment, data, and connections to my local network. It does not make everything easier: updates, uptime, backups, credentials, and monitoring become my responsibility. That is a trade-off I am happy to make, partly because my homelab is where I explore technologies relevant to my work in cloud, security, and automation.

Remote access runs through Cloudflare, with Zero Trust controls protecting administrative interfaces. Webhooks require a more nuanced approach: endpoints intended for external integrations need different access rules from the management UI. Locking everything down indiscriminately can break integrations, while exposing everything without restrictions is clearly not an option.

## Invoices: from an email inbox to an organized archive

One of my most practical automations handles invoices from services I pay for. Previously, I had to open emails, download PDF attachments, decide where to store them, and manually update a tracking spreadsheet. None of this is difficult, but it is easy to miss a document or enter the wrong amount.

My **Invoices Archive Unified** workflow searches Gmail for messages from configured providers, selects relevant PDFs, extracts their text, and identifies details such as invoice number, date, service, and amount. It then assigns a consistent filename, archives the PDF to my storage over SFTP, and updates a record in Google Sheets. It currently handles providers including Google Cloud, Hetzner, Dimensione, and Octopus Energy.

One important detail: **the current version does not use an LLM to parse invoices**. For documents with sufficiently predictable formats, provider-specific parsing rules and deterministic checks can be cheaper and easier to verify. I had to fix Hetzner amount handling, for example, to avoid recording the net amount instead of the total including VAT. When values do not reconcile, I would rather stop processing than save a plausible-looking but incorrect record.

Duplicate handling still deserves attention: updating a row in Sheets is not the same as maintaining a fully transactional record of SFTP uploads. These are the details you discover when a workflow stops being a demo and becomes something you depend on.

[Workflow and documentation on GitHub](https://github.com/paoloronco/n8n-templates/tree/main/workflows/invoice-archiving/V2).

## Splunk and n8n: turning alerts into useful context

Automation also plays an important role in my homelab's cybersecurity setup. I use **Splunk** to collect and analyze events, but an alert by itself often does not provide enough context to decide how interesting it is. n8n acts as an orchestration layer.

I built a workflow that receives security alerts through a webhook, extracts available indicators, and can enrich IP addresses using **AbuseIPDB**. The resulting context is used to build clearer notifications through channels such as email and Telegram. The goal is not to replace a SIEM or outsource security decisions to a third-party service. It is to reduce the time needed to understand an event.

Deduplication matters in this setup. A system that sends the same alert dozens of times does not help anyone respond faster; it creates noise. I have therefore worked on repeated-event handling and on separating collection, enrichment, and notification into distinct stages.

This is also a practical way for me to explore ideas associated with **SOAR**: integrating different security tools and automating repetitive analysis steps while retaining human judgment where it matters.

## A technology newsletter that selects, rather than just summarizes

I follow many sources covering cybersecurity, AI, and technology. Reading everything is unrealistic, but receiving a long, unfiltered list of links every day would not solve the problem either.

With **Tech & AI News**, I built a workflow that collects articles from RSS feeds, validates dates and URLs, assigns relevance scores, groups similar stories, and considers what has already been sent. Only then does an AI model select and summarize the most relevant items. The result is an HTML newsletter delivered by email.

The latest version has several fallback paths: **OpenAI** for the primary processing step, **Gemini** when the first response fails or does not pass validation, and a deterministic digest built from RSS metadata if both models are unavailable. I also check that article identifiers returned by the model actually match collected articles.

I do not treat AI-generated summaries as fact-checking; the original sources remain essential. Headline clustering is heuristic, too, and can make mistakes. The biggest improvement over the first version was not adding more AI. It was making the process around the AI more reliable.

[Browse the templates](https://github.com/paoloronco/n8n-templates).

## A RAG chatbot for my websites

Another important experiment was building a chatbot that answers questions using my website's own content instead of relying solely on a model's general knowledge.

The project uses **Retrieval-Augmented Generation (RAG)**. Website content is indexed, user questions trigger a search in **Qdrant**, **Cohere** reranks the retrieved results, and **OpenAI** generates an answer using the selected context. n8n coordinates the stages, from request handling to service integrations.

The interesting challenge is not simply integrating a chatbot into a website. It is deciding which documents to retrieve, how to handle irrelevant results, and how to avoid presenting information as certain when the website does not support it. The quality of the indexed content matters as well: a vector database cannot repair incomplete documentation.

The project evolved from an earlier template, which I have since adapted to my current websites built and deployed through GitHub and Vercel. The RAG approach remains useful without the former backend: what matters is the quality of the indexed content and retrieval. A reference version is available in my [n8n-templates repository](https://github.com/paoloronco/n8n-templates).

## Automating the publication of workflows themselves

When I started sharing workflows, I realized that developing them was only half the job. A genuinely reusable template needs a clear README, setup instructions, requirements, images, and descriptions suited to distribution platforms.

That led to my **n8n Template Publishing Assistant**. Starting from an exported workflow JSON, it prepares publishing materials such as README files, Gumroad content, images, and organized Notion documentation, then delivers the package by email. It does not eliminate manual review: generated documentation still needs checking, especially when it describes credentials, prerequisites, or custom nodes.

I particularly like this project because it automates work created by other automations. It also reminded me that documentation is not an optional extra. A workflow can work perfectly for its author and still be almost impossible for someone else to reuse.

## More integrations: cloud, Home Assistant, and personal projects

n8n is not limited to these examples. I also use it to connect cloud services, manage notifications, interact with Home Assistant, and coordinate operations through APIs and SSH. I have experimented with **Google Cloud**, processes related to **OrbitPage**, and workflows that convert articles into audio using **Google Cloud Text-to-Speech**.

These automations are not all equally mature or frequently used. Some support everyday tasks; others are prototypes, community templates, or evolving projects. I prefer to make that distinction rather than describe every experiment as a production system.

## What building real workflows has taught me

The first lesson is that **automating a mistake means repeating it faster**. A broken parser, an overly broad filter, or a poorly designed notification becomes a recurring problem when a workflow runs unattended.

The second is that AI is not always the answer. Deterministic rules are a better fit for my invoice workflow. Language models add genuine value to the newsletter and chatbot, provided they are surrounded by validation, reference data, and fallback paths.

The third lesson is operational: separate credentials, protected webhooks, logs, backups, failure handling, and tests with real data matter as much as workflow logic. A reliable automation must remain understandable when something goes wrong.

Finally, maintenance needs to be part of the design. Workflows grow, APIs change, providers modify their formats, and a detail that seems insignificant today can break an entire process tomorrow.

## Where to start if you want to replicate something

My suggestion is to choose a repetitive task with a result you can verify. For example, download an attachment, archive it, and record what happened. Start with a few nodes, test failure cases, and only then add conditions, notifications, and more advanced integrations.

If you want to explore my examples, the templates and documentation are available in **[paoloronco/n8n-templates](https://github.com/paoloronco/n8n-templates)**. Before importing any workflow, review the required services, API costs, credentials, local paths, and trigger behavior. An importable JSON file is not automatically ready for your environment.

## Conclusion

n8n has become one of the most versatile components of my homelab because it lets tools that would otherwise remain isolated work together. It saves me repetitive manual work, but more importantly, it gives me a practical environment for developing skills in API integration, software development, cloud, cybersecurity, and infrastructure operations.

For me, the value is not in how many nodes a workflow contains. It is in whether it solves a real problem, handles unexpected situations, and remains understandable and maintainable over time. That is the standard I try to apply as I continue building and sharing automations.
