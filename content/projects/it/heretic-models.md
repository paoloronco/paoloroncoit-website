---
title: "Heretic Models"
summary: "Raccolta di modelli linguistici modificati con la tecnica di abliteration, accompagnati da configurazioni, notebook e pesi pubblicati su Hugging Face."
category: "ai"
stack: ["Python", "Heretic", "Hugging Face", "Jupyter"]
problem: "Studiare come cambiano i comportamenti di rifiuto di un LLM richiede esperimenti riproducibili e un confronto con il modello originale."
solution: "La repository documenta varianti abliterated di TinyLlama e Mistral, includendo configurazioni, template di chat, notebook e misure di divergenza KL."
outcome: "Artefatti sperimentali consultabili e caricabili con la libreria Transformers per analizzare gli effetti della modifica mantenendo tracciata la distanza dall'originale."
featured: false
order: 6
draft: false
links:
  - label: "Repository GitHub"
    href: "https://github.com/paoloronco/heretic-models"
  - label: "Modelli su Hugging Face"
    href: "https://huggingface.co/paoloronco"
---

## Esperimenti sui pesi

Il catalogo raccoglie modelli prodotti con Heretic e i file necessari a descriverne architettura e modalità di conversazione. La divergenza KL viene riportata come indicatore della deviazione dal modello di partenza.

## Uso responsabile

I modelli sono presentati come materiale sperimentale: la rimozione di alcuni comportamenti di rifiuto non sostituisce valutazioni di sicurezza e adeguatezza per uno specifico utilizzo.
