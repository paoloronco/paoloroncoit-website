---
title: "[n8n-template] Certification Creator &amp; Checker with PDFgenerationAPI Templates"
description: "From a simple MVP to a reusable, production-ready workflow It was a real pleasure to connect with Michal Liska , Chief Operating Officer at PDF Generator API…"
pubDate: 2025-12-17
tags: ["n8n"]
draft: false
---
## From a simple MVP to a reusable, production-ready workflow

It was a real pleasure to connect with **Michal Liska**, Chief Operating Officer at **PDF Generator API by Actual Reports**, and to see this project featured as a real-world example inside the n8n ecosystem.

What started as a simple MVP to automate certificate generation evolved into a reusable, template-based workflow that is now shared with the community. This article documents that evolution, explains how the system works, and shows how you can reuse it in your own environment.

👉 The full story from the PDF Generator API team is available here:  
[https://pdfgeneratorapi.com/blog/how-the-n8n-community-sparked-our-new-partnership-program](https://pdfgeneratorapi.com/blog/how-the-n8n-community-sparked-our-new-partnership-program)

* * *

## PDF Template–based Workflow

This template provides a **complete and reusable solution to automatically create, distribute, and verify digital certificates using n8n**, with **PDF Generator API templates** for PDF generation.

The workflow is designed to cover the **entire lifecycle of a certificate**, from the initial request to public verification, in a clean and maintainable way.

It is an **MVP**, but already **fully functional, tested, and production-ready**, and can be reused with minimal configuration in different environments.

![](/posts/n8n-template-certification-creator-checker-with-pdfgenerationapi-templates/Workflow-image-1024x394.png)

[Example-certificate](https://raw.githubusercontent.com/paoloronco/n8n-templates/main/free-templates/3a-Certification-Creation%26Validation%20With%20PDF%20Templates/Assets/Example-Certificate.pdf)

Visit my Github n8n templates: [https://github.com/paoloronco/n8n-templates](https://github.com/paoloronco/n8n-templates)

See the workflow on n8n Creators hub: coming soon

* * *

## What problem this template solves

In many real-world scenarios, certificates are still:

-   generated manually
-   created with fragile scripts
-   hard to verify
-   visually inconsistent
-   difficult to maintain over time

This template solves those problems by providing:

-   automated certificate creation
-   a unique and verifiable Certification ID
-   consistent PDF output using templates
-   a public verification endpoint
-   a clear separation between automation logic and visual design

* * *

## 🚀 What makes this version different

**YouTube** Video: [https://youtu.be/eqSWoPndVUg](https://youtu.be/eqSWoPndVUg)[](https://github.com/paoloronco/n8n-templates/tree/main/free-templates/3a-Certification-Creation%26Validation%20With%20PDF%20Templates#-what-makes-this-version-different)

This workflow is the **evolution of the original HTML-based version**.

### Why templates instead of HTML?[](https://github.com/paoloronco/n8n-templates/tree/main/free-templates/3a-Certification-Creation%26Validation%20With%20PDF%20Templates#why-templates-instead-of-html)

-   No HTML inside the workflow
-   Clean separation between logic and layout
-   Visual template editor
-   Easier maintenance and customization
-   Better collaboration between developers and designers

The PDF layout is managed **entirely through PDF Generator API templates**.

![](/posts/n8n-template-certification-creator-checker-with-pdfgenerationapi-templates/image-1024x526.png)

## 🔍 High-level overview[](https://github.com/paoloronco/n8n-templates/tree/main/free-templates/3a-Certification-Creation%26Validation%20With%20PDF%20Templates#-high-level-overview)

The system exposes **two main endpoints**:

### 1️⃣ Certificate creation[](https://github.com/paoloronco/n8n-templates/tree/main/free-templates/3a-Certification-Creation%26Validation%20With%20PDF%20Templates#1%EF%B8%8F%E2%83%A3-certificate-creation)

```
POST /certifications2
```

Handles:

-   candidate input
-   unique ID generation
-   data persistence
-   PDF generation (template-based)
-   email delivery

* * *

### 2️⃣ Certificate verification[](https://github.com/paoloronco/n8n-templates/tree/main/free-templates/3a-Certification-Creation%26Validation%20With%20PDF%20Templates#2%EF%B8%8F%E2%83%A3-certificate-verification)

```
GET /certificationscheck
```

Allows anyone to verify:

-   if a certificate exists
-   who it belongs to

* * *

## 🔥 What this workflow does[](https://github.com/paoloronco/n8n-templates/tree/main/free-templates/3a-Certification-Creation%26Validation%20With%20PDF%20Templates#-what-this-workflow-does)

### 🎓 1. Certificate creation[](https://github.com/paoloronco/n8n-templates/tree/main/free-templates/3a-Certification-Creation%26Validation%20With%20PDF%20Templates#-1-certificate-creation)

-   Triggered via **POST webhook** (`/certifications2`)
-   Accepts candidate data:
    -   name
    -   surname
    -   course
    -   email
-   Generates a **unique Certification ID**
-   Prevents collisions via ID existence checks

* * *

### 🗂 2. Data storage[](https://github.com/paoloronco/n8n-templates/tree/main/free-templates/3a-Certification-Creation%26Validation%20With%20PDF%20Templates#-2-data-storage)

Each certificate is stored in an **n8n Data Table**, creating a persistent registry.

Stored fields:

-   Name
-   Surname
-   CertificationID

This registry is used both for validation and auditing.

* * *

### 🧾 3. PDF generation (Template-based)[](https://github.com/paoloronco/n8n-templates/tree/main/free-templates/3a-Certification-Creation%26Validation%20With%20PDF%20Templates#-3-pdf-generation-template-based)

The workflow uses **PDF Generator API – Generate a PDF document** node.

Instead of HTML, it sends a **JSON payload** that maps directly to template placeholders.

Example:

```
{
  "DueDate": "{{$now.toISODate()}}",
  "Candidate": "{{$('Webhook_Creation').item.json.headers.name}} {{$('Webhook_Creation').item.json.headers.surname}}",
  "CourseName": "{{ $('Webhook_Creation').item.json.headers.course }}",
  "ID": "{{ $('Generate_Certification_ID').item.json.id }}"
}
```

⚠️ The JSON must be valid and keys must match the template placeholders exactly.

* * *

### ✉️ 4. Email delivery

[](https://github.com/paoloronco/n8n-templates/tree/main/free-templates/3a-Certification-Creation%26Validation%20With%20PDF%20Templates#%EF%B8%8F-4-email-delivery)

-   Uses **Gmail OAuth2**
-   Sends the generated PDF as attachment
-   Fully customizable subject and body

* * *

### 🔍 5. Certificate verification[](https://github.com/paoloronco/n8n-templates/tree/main/free-templates/3a-Certification-Creation%26Validation%20With%20PDF%20Templates#-5-certificate-verification)

The verification endpoint:

```
GET /certificationscheck?id=CERTIFICATION-ID
```

Returns:

```
If valid:
{
  "ok": true,
  "name": "John",
  "surname": "Doe"
}

If not valid

{
  "ok": false
}
```

This makes certificates **publicly verifiable and tamper-resistant**.

* * *

## 🧠 PDF Generator API Template[](https://github.com/paoloronco/n8n-templates/tree/main/free-templates/3a-Certification-Creation%26Validation%20With%20PDF%20Templates#-pdf-generator-api-template)

### What is included[](https://github.com/paoloronco/n8n-templates/tree/main/free-templates/3a-Certification-Creation%26Validation%20With%20PDF%20Templates#what-is-included)

The repository includes:

-   a ready-to-use **PDF Generator API template**
-   placeholders such as:
    -   `{Candidate}`
    -   `{CourseName}`
    -   `{DueDate}`
    -   `{ID}`

You can freely customize:

-   layout
-   fonts
-   colors
-   logos
-   signatures
-   date formatting
-   QR codes

No workflow changes are required when updating the template.

* * *

## 🤖 AI-powered template editing (Gemini)[](https://github.com/paoloronco/n8n-templates/tree/main/free-templates/3a-Certification-Creation%26Validation%20With%20PDF%20Templates#-ai-powered-template-editing-gemini)

PDF Generator API provides an **AI Gem powered by Gemini** to help users create and refine templates.

👉 AI Gem link: [https://gemini.google.com/gem/1RrpDHQocP7E7C7Bpsc7yhDT-AkuKNuT\_?usp=sharing](https://gemini.google.com/gem/1RrpDHQocP7E7C7Bpsc7yhDT-AkuKNuT_?usp=sharing)

You can:

-   describe the layout in natural language
-   generate or modify templates
-   iterate faster without manual positioning

* * *

## 🛠 Requirements[](https://github.com/paoloronco/n8n-templates/tree/main/free-templates/3a-Certification-Creation%26Validation%20With%20PDF%20Templates#-requirements)

Before importing the workflow, you need:

1.  **n8n instance** (Cloud or self-hosted)
2.  **n8n Data Table** with fields:
    -   `Name` (string)
    -   `Surname` (string)
    -   `CertificationID` (string)
3.  **PDF Generator API account**
4.  **Gmail OAuth2 credentials**
5.  Ability to call HTTP webhooks

* * *

* * *

## 🚀 Installation[](https://github.com/paoloronco/n8n-templates/tree/main/free-templates/3a-Certification-Creation%26Validation%20With%20PDF%20Templates#-installation)

### 1\. Import the workflow[](https://github.com/paoloronco/n8n-templates/tree/main/free-templates/3a-Certification-Creation%26Validation%20With%20PDF%20Templates#1-import-the-workflow)

-   Go to **n8n → Workflows → Import**
-   Paste `workflow.json`

* * *

### 2\. Configure Data Table

[](https://github.com/paoloronco/n8n-templates/tree/main/free-templates/3a-Certification-Creation%26Validation%20With%20PDF%20Templates#2-configure-data-table)

Update these nodes:

-   `Insert_Certification`
-   `Find_Certification_By_ID`
-   `Find_Certification_By_ID1`

* * *

### 3\. Configure credentials[](https://github.com/paoloronco/n8n-templates/tree/main/free-templates/3a-Certification-Creation%26Validation%20With%20PDF%20Templates#3-configure-credentials)

-   PDF Generator API node → set credentials
-   Gmail node → set OAuth2 credentials

* * *

### 4\. Activate the workflow[](https://github.com/paoloronco/n8n-templates/tree/main/free-templates/3a-Certification-Creation%26Validation%20With%20PDF%20Templates#4-activate-the-workflow)

Click **Activate** and you’re ready to go.

* * *

* * *

## 🧪 Status: MVP (but production-ready)[](https://github.com/paoloronco/n8n-templates/tree/main/free-templates/3a-Certification-Creation%26Validation%20With%20PDF%20Templates#-status-mvp-but-production-ready)

This project started as an MVP, but it is:

-   fully functional
-   tested
-   modular
-   easy to extend

You can use it **for free**, adapt it to your needs, and deploy it in production with minimal changes.

* * *

## 🌍 Why this matters[](https://github.com/paoloronco/n8n-templates/tree/main/free-templates/3a-Certification-Creation%26Validation%20With%20PDF%20Templates#-why-this-matters)

This repository demonstrates how:

-   low-code automation
-   clean API design
-   reusable templates
-   community-driven sharing

can produce **real-world, production-grade solutions**, not just demos.

* * *

## 📎 Links[](https://github.com/paoloronco/n8n-templates/tree/main/free-templates/3a-Certification-Creation%26Validation%20With%20PDF%20Templates#-links)

-   \[n8n workflow on Creators Hub\](coming soon)
-   [YouTube Video](https://youtu.be/eqSWoPndVUg)
-   [Project article and documentation](https://paoloronco.it/writing/n8n-template-certification-creator-checker/)
-   [PDF Generator API](https://pdfgeneratorapi.com/)
-   [Template AI Gem](https://github.com/paoloronco/n8n-templates/blob/main/free-templates/3a-Certification-Creation%26Validation%20With%20PDF%20Templates)
