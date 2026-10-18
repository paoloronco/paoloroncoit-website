---
title: "Knowledge MCP"
summary: "Ricerca documentale self-hosted via MCP, con embedding locali, Qdrant, indicizzazione incrementale e dashboard web distribuiti tramite Docker."
category: "ai"
stack: ["Python", "MCP", "Qdrant", "Docker", "Sentence Transformers", "CUDA"]
problem: "Collegare un assistente AI ai propri documenti richiede un indice aggiornabile e risultati che permettano di risalire ai file di origine."
solution: "Il progetto indicizza le cartelle selezionate, combina ricerca semantica e lessicale ed espone tramite MCP i passaggi pertinenti con i riferimenti alle fonti."
outcome: "Una base documentale consultabile da client compatibili con MCP, con gestione web, aggiornamenti incrementali e backup degli indici."
featured: true
order: 4
draft: false
links:
  - label: "Repository GitHub"
    href: "https://github.com/paoloronco/knowledge-mcp"
  - label: "Architettura"
    href: "https://github.com/paoloronco/knowledge-mcp/blob/main/docs/architecture.md"
  - label: "Integrazione con client AI"
    href: "https://github.com/paoloronco/knowledge-mcp/tree/main/AI"
---

## Dai documenti al contesto per l'assistente

Knowledge MCP rende ricercabili PDF, documenti Word, presentazioni PowerPoint, Markdown, testo e HTML. L'indicizzazione estrae il testo, lo divide in passaggi e ne salva gli embedding in Qdrant.

La ricerca combina similarità semantica e corrispondenze lessicali, fonde i risultati e restituisce i passaggi con percorso del file e riferimenti a pagina o slide, quando disponibili. Il protocollo MCP permette al client AI di consultarli durante una conversazione.

## Un indice che segue i documenti

Il sistema confronta gli hash dei file per elaborare quelli modificati e rimuovere dall'indice quelli eliminati. La dashboard permette di scegliere cartelle e modelli, pianificare gli aggiornamenti e seguire l'avanzamento dell'indicizzazione.

## Distribuzione e modelli locali

L'immagine Docker include dashboard, servizio di indicizzazione, server MCP e Qdrant. Sono disponibili embedding E5 multilingue e BGE-M3, con esecuzione su CPU o GPU NVIDIA, oltre a funzioni di backup e ripristino.

Indicizzazione, embedding e ricerca avvengono sul server che ospita il progetto; i passaggi recuperati vengono poi forniti al client AI scelto. La documentazione include esempi di integrazione con ChatGPT, Claude e Google ADK.
