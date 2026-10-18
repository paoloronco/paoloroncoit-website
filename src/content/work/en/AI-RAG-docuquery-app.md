---
title: "AI RAG DocuQuery"
summary: "A desktop app for indexing local documents and querying them in natural language through vector search and source-backed answers."
category: "ai"
stack: ["Python", "PyQt6", "FAISS", "Sentence Transformers"]
problem: "Finding information across mixed collections of local documents often requires slow, fragmented manual searches."
solution: "The app extracts and indexes content with E5 or MiniLM embeddings and FAISS, retrieves relevant passages from a PyQt6 interface, and can send them to several LLM backends."
outcome: "A local document assistant that exposes passages, files, and source pages and can also work in a citations-only mode without an LLM."
featured: true
order: 2
draft: false
links:
  - label: "GitHub repository"
    href: "https://github.com/paoloronco/AI-RAG-docuquery-app"
---

## Traceable document search

DocuQuery supports PDF, DOCX, PPTX, XLSX, TXT, CSV, and Markdown. Indexes remain separate and manageable from the same interface, while each result retains a reference to its source document.

## Flexible backends

Answer generation can use OpenAI, Anthropic Claude, or local Hugging Face models. Alternatively, retrieval can return the relevant passages and citations directly.
