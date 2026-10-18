---
title: "AI RAG DocuQuery"
summary: "Applicazione desktop per indicizzare documenti locali e interrogarli in linguaggio naturale con ricerca vettoriale e risposte corredate da fonti."
category: "ai"
stack: ["Python", "PyQt6", "FAISS", "Sentence Transformers"]
problem: "Ritrovare informazioni in raccolte eterogenee di documenti locali richiede ricerche manuali lente e frammentate."
solution: "L'app estrae e indicizza i contenuti con embedding E5 o MiniLM e FAISS, quindi recupera i passaggi pertinenti da una GUI PyQt6 e può inviarli a diversi backend LLM."
outcome: "Un assistente documentale locale che mostra passaggi, file e pagine di origine e può funzionare anche in modalità di sole citazioni, senza LLM."
featured: true
order: 2
draft: false
links:
  - label: "Repository GitHub"
    href: "https://github.com/paoloronco/AI-RAG-docuquery-app"
---

## Ricerca documentale controllabile

DocuQuery supporta PDF, DOCX, PPTX, XLSX, TXT, CSV e Markdown. Gli indici restano separati e gestibili dalla stessa interfaccia, mentre ogni risultato mantiene il riferimento al documento sorgente.

## Backend flessibili

La generazione delle risposte può usare OpenAI, Anthropic Claude o modelli Hugging Face locali. In alternativa, la ricerca restituisce direttamente i passaggi rilevanti con le relative citazioni.
