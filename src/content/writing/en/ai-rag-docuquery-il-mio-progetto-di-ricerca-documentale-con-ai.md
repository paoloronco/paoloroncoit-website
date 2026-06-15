---
title: "AI-RAG-docuquery: my AI-based document research project"
description: "AI-RAG-docuquery is an application that combines artificial intelligence and semantic search to help quickly and naturally consult your own…"
pubDate: 2025-08-27
tags: []
draft: false
---
**AI-RAG-docuquery** is an application that combines **artificial intelligence and semantic search** to help quickly and naturally consult your own local documents.  
It is based on the **Retrieval-Augmented Generation (RAG)** paradigm: an approach that combines the retrieval of relevant texts with natural language generation.

**GitHub repo:** [github.com/paoloronco/AI-RAG-docuquery-app](http://github.com/paoloronco/AI-RAG-docuquery-app)

In practice, the user:

1.  **Indexes** their files (PDF, Word, Excel, PowerPoint, simple text, Markdown, CSV).
2.  **Asks natural language questions** through a simple GUI interface (PyQt6).
3.  Receives **concise and cited answers**, with direct links to the original sources.

This means transforming a folder of documents into some sort of **personal assistant**, capable of answering questions and guiding document consultation without having to open and manually search them.

## Why it's useful

Many professionals and students find themselves managing large amounts of documents: technical manuals, lecture notes, PDF archives. Searching for information in these files is often slow and frustrating.  
With AI-RAG-docuquery:

-   Time is saved thanks to **smarter semantic searches** than traditional text-based searches.
-   Answers are always **linked to verifiable sources**, so one doesn't have to blindly trust the model.
-   It can use both **local HuggingFace models** (offline) and **OpenAI-compatible services**, making the system flexible to user needs.
-   It works in a **"No LLM" mode**, i.e., without language models, for those who just want the most similar passages found in the documents.

## Main features

-   **FAISS vector search engine** for document indexing.
-   **Multi-format support** (PDF, DOCX, PPTX, XLSX, TXT, CSV, MD).
-   **Intuitive PyQt6 graphical user interface**, cross-platform.
-   **Simplified OpenAI configuration**: dedicated popup with API key management and model selection.
-   **Compatibility with local HuggingFace**, which automatically utilizes CPU or GPU.
-   **Executable build** (.exe) via PyInstaller, so the app can be distributed without requiring Python installation.

* * *

## Skills acquired through the project

The realization of this project allowed me to work on various technical fronts, consolidating and expanding my skills:

1.  **NLP and applied AI**
    -   Understanding the RAG paradigm and its practical use.
    -   Using **Sentence-Transformers** for embeddings and HuggingFace models.
    -   Integration with external model APIs (OpenAI/compatible).
2.  **Information Retrieval**
    -   Managing vector indexes with **FAISS**.
    -   Hybrid retrieval techniques (dense + sparse).
    -   Creating pipelines for content extraction from heterogeneous formats.
3.  **Python software development**
    -   Modular code organization (indexer, retrieve, loaders, llm\_clients).
    -   Dependency management and virtual environments.
    -   Distribution via **PyInstaller** with optimizations for heavy libraries like torch and faiss.
4.  **GUI development**
    -   Creating graphical interfaces with **PyQt6**.
    -   Integrating advanced features such as clickable links that open local files.
    -   Persisting user configurations through JSON files.
5.  **Software engineering & DevOps**
    -   Version control with Git and distribution on GitHub.
    -   Package management, cross-platform troubleshooting, and Windows optimization.
    -   Full documentation with README and roadmap.

* * *

## Conclusion

**AI-RAG-docuquery** is a project that combines academic research with practicality: an app to simplify the consultation of personal documents, but also an advanced exercise in software engineering and AI integration.

It allowed me to grow as a developer, moving from theoretical NLP concepts to a functioning and distributable application ready for anyone to use.
---

