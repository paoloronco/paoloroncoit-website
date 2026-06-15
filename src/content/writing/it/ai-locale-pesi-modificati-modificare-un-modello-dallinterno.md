---
title: "AI locale, pesi modificati: modificare un modello dall'interno"
description: "Un esperimento personale per capire cosa succede davvero dentro un modello linguistico. Di cosa si tratta Ho sempre usato l'AI come strumento. Questo progetto…"
pubDate: 2026-03-13
tags: []
draft: false
---
> Un esperimento personale per capire cosa succede davvero dentro un modello linguistico.

* * *

## Di cosa si tratta

Ho sempre usato l'AI come strumento. Questo progetto nasce dalla curiosità di capire come funziona dall'interno — non da un'applicazione, non da un'API, ma il modello grezzo, i suoi pesi, la sua geometria interna.

**Heretic** è uno strumento open source che permette di modificare il comportamento di un modello linguistico (LLM) attraverso una tecnica chiamata **abliterazione**: invece di riaddestrare il modello da zero, si interviene sulle sue attivazioni interne per spostare il modo in cui risponde a certi tipi di input.

Il risultato è un modello modificato, salvato e pubblicato su Hugging Face.

* * *

## Cosa ho fatto, passo per passo

### 1\. Ambiente locale su Windows con GPU

Ho configurato un ambiente Python con virtual environment, installato PyTorch con supporto CUDA per sfruttare la GPU NVIDIA. Niente cloud, niente servizi a pagamento: tutto gira sulla mia macchina.

```
Python 3.13 · PyTorch 2.10 + CUDA 12.8 · Windows 11
```

### 2\. Capire cosa fa Heretic sotto il cofano

Prima di lanciare qualsiasi comando, ho studiato il processo. Heretic:

1.  carica il modello e i suoi pesi (in formato Transformers / HuggingFace)
2.  usa due dataset di prompt: uno "innocuo" (`mlabonne/harmless_alpaca`) e uno "problematico" (`mlabonne/harmful_behaviors`)
3.  analizza le **attivazioni interne** del transformer su entrambi i set
4.  calcola una **direzione nello spazio latente** che separa i due comportamenti
5.  ottimizza i parametri attraverso **200 trial** con Optuna (ottimizzazione bayesiana)
6.  applica la correzione tramite **LoRA** — un'aggiunta leggera ai pesi del modello

In pratica: il modello non viene riscritto, viene orientato.

### 3\. Il modello scelto: TinyLlama 1.1B

Ho scelto `TinyLlama/TinyLlama-1.1B-Chat-v1.0` come punto di partenza — piccolo abbastanza da girare comodamente in locale (~5-15 minuti su GPU), ma abbastanza capace da essere interessante da osservare.

Ho anche avviato sessioni su modelli più grandi (Mistral 7B, Phi-3) per confronto.

### 4\. Pubblicazione su Hugging Face

Il modello risultante è stato salvato in formato Transformers e caricato pubblicamente su Hugging Face:

**[paoloronco/TinyLlama-1.1B-Chat-v1.0-heretic](https://huggingface.co/paoloronco/TinyLlama-1.1B-Chat-v1.0-heretic)**

Incluso un Colab notebook per chi vuole testarlo senza installare nulla.

* * *

## Cosa ho imparato

### Sul funzionamento dei modelli linguistici

Questo progetto mi ha dato un'intuizione concreta su concetti che prima restevano astratti:

-   I modelli non "decidono" di rifiutare qualcosa in modo simbolico — lo fanno perché certi pattern di attivazione si ripetono statisticamente. Quella tendenza si può misurare.
-   Lo **spazio latente** non è una metafora: è una struttura matematica reale, con direzioni identificabili che corrispondono a comportamenti osservabili.
-   **LoRA** (Low-Rank Adaptation) permette di modificare un modello grande intervenendo su una frazione minima dei parametri — è efficiente e reversibile rispetto al fine-tuning completo.

### Sul lavoro con strumenti tecnici

-   Ho imparato a leggere documentazione tecnica e a tradurla in passi operativi concreti
-   Ho gestito un ambiente Python su Windows con dipendenze complesse (CUDA, PyTorch, Transformers)
-   Ho lavorato con repository HuggingFace: struttura dei file, model card, tokenizer, configurazioni
-   Ho capito la differenza tra formati di distribuzione: **Transformers**, **GGUF** (per LM Studio), **safetensors**

### Sul metodo

Il progetto ha richiesto ricerca, lettura di paper e documentazione, capacità di diagnosticare errori (GPU non rilevata, dipendenze incompatibili, dimensione batch) e adattare il processo di conseguenza. Nessun tutorial pronto — solo documentazione e tentativi.

* * *

## Cosa NON è questo progetto

Sono onesto: **non sono un AI engineer né un programmatore**. Ho usato strumenti esistenti, assistenza AI per orientarmi nella documentazione tecnica, e la mia capacità di capire cosa stavo facendo prima di farlo.

Questo non è un progetto di sviluppo — è un progetto di **esplorazione e apprendimento**. Il valore per me è nella comprensione acquisita, non nel codice scritto.

* * *

## Struttura del repository

```
Heretic/
├── Models/                         # Repo GitHub dei modelli pubblicati
│   ├── TinyLlama-1.1B-Chat-v1.0-heretic/
│   │   ├── Notebooks/              # Colab notebook per test rapido
│   │   ├── config.json             # Configurazione modello
│   │   ├── generation_config.json
│   │   ├── chat_template.jinja     # Template conversazionale
│   │   └── tokenizer_config.json
│   └── README.md
├── checkpoints/                    # Sessioni di ottimizzazione salvate
│   ├── TinyLlama--TinyLlama-1--1B-Chat-v1--0.jsonl
│   ├── mistralai--Mistral-7B-Instruct-v0--2.jsonl
│   ├── ollama--phi3.jsonl
│   └── openai--gpt-4o.jsonl
├── .venv/                          # Ambiente Python locale
└── info.md                         # Guida operativa completa
```

* * *

## Stack tecnico

| Strumento | Ruolo |
| --- | --- |
| Python 3.13 + venv | Ambiente isolato |
| PyTorch 2.10 + CUDA 12.8 | Calcolo su GPU NVIDIA |
| Transformers (HuggingFace) | Caricamento e gestione modelli |
| PEFT / LoRA | Applicazione delle modifiche |
| Optuna | Ottimizzazione bayesiana dei parametri |
| Datasets (HuggingFace) | Dataset di prompt good/bad |
| Safetensors | Formato di salvataggio modello |
| Accelerate | Gestione dispositivi (GPU/CPU) |
| HuggingFace Hub | Pubblicazione e distribuzione |

* * *

## Link

-   Modello pubblicato: [paoloronco/TinyLlama-1.1B-Chat-v1.0-heretic](https://huggingface.co/paoloronco/TinyLlama-1.1B-Chat-v1.0-heretic)
-   Heretic (tool originale): [github.com/p-e-w/heretic](https://github.com/p-e-w/heretic)
-   Profilo HuggingFace: [huggingface.co/paoloronco](https://huggingface.co/paoloronco)
