---
title: "AI Photo Renamer"
summary: "Utility locale che analizza immagini con un modello vision tramite Ollama e assegna nomi descrittivi, raggruppando automaticamente quelli simili."
category: "ai"
stack: ["Python", "Ollama", "LLaVA", "Gradio"]
problem: "Cartelle fotografiche con nomi generici o numerici sono difficili da esplorare e organizzare senza rinominare ogni file a mano."
solution: "Il tool invia le immagini a un modello vision locale, trasforma la descrizione in un nome file e usa similarità fuzzy e numerazione per gestire gruppi e collisioni."
outcome: "Una procedura privata e riprendibile per ottenere nomi leggibili, con interfaccia web, modalità dry-run e nessuna API cloud richiesta."
featured: false
order: 8
draft: false
links:
  - label: "Repository GitHub"
    href: "https://github.com/paoloronco/ai-photo-renamer"
---

## Visione artificiale in locale

Le immagini vengono codificate e inviate all'istanza Ollama della macchina. Il modello predefinito è LLaVA, ma è possibile usare altri modelli vision compatibili con Ollama.

## Esecuzione controllata

Il dry-run consente di esaminare i nomi prima di applicarli. Lo stato viene salvato in JSON, così un'elaborazione interrotta può ripartire senza analizzare nuovamente le immagini completate.
