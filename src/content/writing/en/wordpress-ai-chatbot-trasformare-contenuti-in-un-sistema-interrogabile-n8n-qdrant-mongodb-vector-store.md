---
title: "WordPress AI Chatbot: transforming content into an interrogable system | n8n, Qdrant, MongoDB Vector Store"
description: "The WordPress AI Chatbot I built arises from a very concrete question: can I transform a site into something that can be interrogated? Don't search. …"
pubDate: 2026-02-11
tags: []
draft: false
---
The **WordPress AI Chatbot** I built arises from a very concrete question:
_can I transform a site into something that can be interrogated?_

> _Don't search. _**_Interrogate._**  
> The difference is subtle but fundamental.

When someone arrives at a technical site and wants to understand what you've done, they have to piece together the picture by reading articles, connecting skills, deducing experience. It's a manual process. The chatbot intervenes exactly there: it makes it possible to ask direct questions about what has been published and get answers based exclusively on that content.

It's not a generic assistant. It's a semantic layer over WordPress.

* * *

## Indexing; the data preparation

### Posts; Indexing and preparation on Qdrant

The functioning is divided into two completely separate moments: data preparation and interrogation.

The preparation phase occurs through a dedicated workflow on n8n. This workflow does not handle users. It does not respond to anyone. It only builds the semantic index of the site.

When it runs, it queries WordPress via REST API, retrieves published posts, extracts title, content, and excerpt, removes HTML markup, and constructs a clean version of the text. This text is not saved as-is: it's divided into smaller blocks to allow for more precise searching.

Each block is transformed into an embedding through OpenAI. The result is a numerical vector that represents the meaning of the text. These vectors are then stored in a database optimized for semantic search.

Here come two possibilities. For lean and direct configurations, Qdrant can be used. For more structured configurations, especially when managing multiple separate data sets, MongoDB Atlas with Vector Search is utilized.

But the really interesting part isn't indexing the posts. It's that the system doesn't limit itself to just the posts.

### Skills and profile: structured indexing on MongoDB Atlas

Skills and sections of the profile are not classic WordPress content. They're not articles. They're not narrative pages. They're structured data.

To make them interrogable, a different process was planned.

Skills are organized in JSON and CSV files structured by domain, category, level, and description. These files are imported into MongoDB collections dedicated to each. At that point, an included Node.js script comes into play.

The script reads each document, constructs a unified textual representation (skill, domain, description, level), calls the OpenAI embeddings API, generates the vector, and updates the document with the embedding field. Then, a vector search index is created on that collection.

The result is that skills are not simply listed on a page. They're semantically interrogable.

If someone asks "Do you have experience in cloud security?" the system doesn't look for the exact word. It compares the meaning of the question with the meaning of the vectorized documents.

The same mechanism applies to the profile, organized into separate sections and indexed in the same way.

In this way, the chatbot works on three distinct domains: posts, skills, and profile. It doesn't mix them. It treats them as separate information sets.

* * *

## The Chatbot; what happens when a question arrives

The second n8n workflow manages real-time requests.

The request comes via webhook, protected by an authentication header. Before querying the database, the system must understand what kind of question was asked.

Here enters into play an intent router based on LLM. It doesn't generate responses. It classifies. It decides if the question concerns:

-   searching among posts
-   interrogating skills
-   interrogating the profile
-   simple small talk

This phase is crucial. It allows querying only the correct database.

If the question relates to a project, a vector search query is executed on the post collection. If it relates to a technology or experience level, the skill collection is queried. If it relates to the path or role, the profile part is consulted.

The vector search query returns a set of documents ordered by similarity. These documents are filtered and transformed into a controlled context. Only then does the generative model come into play, but with very clear rules: synthesize what has been retrieved, don't invent.

* * *

## Logging and control

Each interaction can be logged on Google Cloud Storage. The user's IP is first hashed with SHA3-256 to avoid storing direct identifying data. Logs are saved in JSON format organized by date, allowing for subsequent analysis while maintaining attention to privacy aspects.

This aspect is not accessory. It means treating the chatbot as a real backend component, not just a simple widget.

* * *

## Integration with WordPress

To connect everything to the site, a dedicated WordPress plugin was developed.

The plugin doesn't contain AI logic. It doesn't perform calculations. It works as a secure bridge between frontend and n8n backend. It exposes a shortcode that allows embedding the chatbot in the site, handles REST calls, and protects the webhook via server-side authentication.

In this way, no API keys are ever exposed to the browser.

* * *

## The project

This project is not just a simple JSON file to import or a plugin to install and forget.  
It's a complete structure designed to be understood and replicated.

Who decides to implement this **WordPress AI Chatbot** receives the entire architecture: n8n workflows already configured for indexing and chatbot management, detailed guides for importing and setting up credentials, documentation for choosing and configuring the vector store (Qdrant for a more direct setup, MongoDB Atlas for an advanced architecture), along with the necessary Node.js scripts to import, normalize, and vectorize skills and profile sections starting from JSON or CSV files.

Concrete data structure examples are also included, explanations on how to build vector indexes, how to organize MongoDB collections, how to separate information domains (posts, skills, profile), and how to connect everything to the interrogation workflow.  
The provided WordPress plugin then allows integrating the chatbot into the site securely, acting as a bridge between frontend and backend without exposing sensitive keys.

The goal is not to provide a "closed product," but a fully documented technical base that allows rebuilding the entire system step by step, understanding each component.

The project is available at:

-   **Gumroad**  
    [https://paoloronco.gumroad.com/l/wordpress-aichatbot](https://paoloronco.gumroad.com/l/wordpress-aichatbot)
-   **n8n Creators** (coming soon | in review)  
    [https://creators.n8n.io/](https://creators.n8n.io/)
-   **Shop.paoloronco.it**  
    [https://shop.paoloronco.it/24-wordpress-ai-chatbot-with-n8n.html](https://shop.paoloronco.it/24-wordpress-ai-chatbot-with-n8n.html)
-   **GitHub**: (documentation)  
    [https://github.com/paoloronco/n8n-templates/tree/main/paid-templates/4%20-%20WordPress%20AI%20Chatbot](https://github.com/paoloronco/n8n-templates/tree/main/paid-templates/4%20-%20WordPress%20AI%20Chatbot)

Who uses it is not just buying a simple chatbot, but a replicable architecture to transform a WordPress site into an actually interrogable system.

* * *

## The project's meaning

The WordPress AI Chatbot doesn't serve to make a site more spectacular.  
It serves to make an information domain interrogable: projects, skills, path.

This is a substantial difference.

It doesn't add decoration.  
It adds semantic structure.

And this is what really matters.

