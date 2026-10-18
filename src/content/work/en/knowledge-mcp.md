---
title: "Knowledge MCP"
summary: "Self-hosted document search over MCP, with local embeddings, Qdrant, incremental indexing, and a web dashboard packaged with Docker."
category: "ai"
stack: ["Python", "MCP", "Qdrant", "Docker", "Sentence Transformers", "CUDA"]
problem: "Connecting an AI assistant to personal documents requires an index that can stay current and results that can be traced back to their source files."
solution: "The project indexes selected folders, combines semantic and lexical search, and exposes relevant passages with source references through MCP."
outcome: "A document knowledge base available to MCP-compatible clients, with web management, incremental updates, and index backups."
featured: true
order: 4
draft: false
links:
  - label: "GitHub repository"
    href: "https://github.com/paoloronco/knowledge-mcp"
  - label: "Architecture"
    href: "https://github.com/paoloronco/knowledge-mcp/blob/main/docs/architecture.md"
  - label: "AI client integration"
    href: "https://github.com/paoloronco/knowledge-mcp/tree/main/AI"
---

## From documents to assistant context

Knowledge MCP makes PDFs, Word documents, PowerPoint presentations, Markdown, plain text, and HTML searchable. Ingestion extracts text, splits it into passages, and stores their embeddings in Qdrant.

Search combines semantic similarity with lexical matches, merges the results, and returns passages with file paths and page or slide references when available. MCP lets an AI client retrieve that context during a conversation.

## Keeping the index current

The system compares file hashes to process changed documents and remove deleted ones from the index. The dashboard provides folder and model selection, scheduled updates, and visibility into indexing progress.

## Deployment and local models

The Docker image bundles the dashboard, indexing service, MCP server, and Qdrant. Multilingual E5 and BGE-M3 embeddings can run on CPU or NVIDIA GPU, with backup and restore features for saved data.

Indexing, embeddings, and search run on the server hosting the project; retrieved passages are then supplied to the chosen AI client. The documentation includes integration examples for ChatGPT, Claude, and Google ADK.
