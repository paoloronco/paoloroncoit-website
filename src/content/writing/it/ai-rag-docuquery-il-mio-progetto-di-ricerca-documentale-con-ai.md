---
title: "AI-RAG-docuquery: il mio progetto di ricerca documentale con AI"
description: "AI-RAG-docuquery è un’applicazione che combina intelligenza artificiale e ricerca semantica per aiutare a consultare in modo rapido e naturale i propri…"
pubDate: 2025-08-27
tags: []
draft: false
---
**AI-RAG-docuquery** è un’applicazione che combina **intelligenza artificiale e ricerca semantica** per aiutare a consultare in modo rapido e naturale i propri documenti locali.  
Si basa sul paradigma del **Retrieval-Augmented Generation (RAG)**: un approccio che unisce la ricerca di testi rilevanti (retrieval) con la generazione di risposte in linguaggio naturale (generation).

**GitHub repo:** [github.com/paoloronco/AI-RAG-docuquery-app](http://github.com/paoloronco/AI-RAG-docuquery-app)

In pratica, l’utente:

1.  **Indicizza** i propri file (PDF, Word, Excel, PowerPoint, testi semplici, Markdown, CSV).
2.  **Pone domande in linguaggio naturale** tramite un’interfaccia semplice (GUI PyQt6).
3.  Riceve **risposte concise e citate**, con collegamenti diretti alle fonti originali.

Questo significa trasformare una cartella di documenti in una sorta di **assistente personale**, capace di rispondere a domande e guidare nella consultazione delle fonti senza doverle aprire e cercare manualmente.

## Perché è utile

Molti professionisti e studenti si trovano a gestire grandi quantità di documenti: manuali tecnici, dispense, archivi PDF. Cercare informazioni in questi file è spesso lento e frustrante.  
Con AI-RAG-docuquery:

-   Si risparmia tempo grazie a **ricerche semantiche** più intelligenti delle classiche ricerche testuali.
-   Le risposte sono sempre **collegate a fonti verificabili**, quindi non ci si deve fidare ciecamente del modello.
-   È possibile usare sia **modelli locali HuggingFace** (anche offline) sia **servizi compatibili con OpenAI**, rendendo il sistema flessibile alle esigenze dell’utente.
-   Funziona anche in modalità **“No LLM”**, cioè senza modelli linguistici, per chi vuole solo i passaggi più simili trovati nei documenti.

## Caratteristiche principali

-   **Motore di ricerca vettoriale FAISS** per l’indicizzazione dei documenti.
-   **Supporto multi-formato** (PDF, DOCX, PPTX, XLSX, TXT, CSV, MD).
-   **Interfaccia grafica PyQt6**, intuitiva e cross-platform.
-   **Configurazione OpenAI semplificata**: popup dedicato con gestione API key e scelta del modello.
-   **Compatibilità con HuggingFace locale**, che sfrutta CPU o GPU automaticamente.
-   **Build in formato eseguibile (.exe)** tramite PyInstaller, così l’app può essere distribuita senza che l’utente debba installare Python.

* * *

## Competenze acquisite grazie al progetto

La realizzazione di questo progetto mi ha permesso di lavorare su diversi fronti tecnici, consolidando e ampliando le mie competenze:

1.  **NLP e AI applicata**
    -   Comprensione del paradigma RAG e del suo utilizzo pratico.
    -   Uso di **Sentence-Transformers** per embeddings e modelli HuggingFace.
    -   Integrazione con API di modelli esterni (OpenAI/compatibili).
2.  **Information Retrieval**
    -   Gestione di indici vettoriali con **FAISS**.
    -   Tecniche di retrieval ibrido (dense + sparse).
    -   Creazione di pipeline per l’estrazione di contenuti da formati eterogenei.
3.  **Sviluppo software con Python**
    -   Organizzazione modulare del codice (indexer, retrieve, loaders, llm\_clients).
    -   Gestione delle dipendenze e virtual environment.
    -   Distribuzione tramite **PyInstaller** con ottimizzazioni per librerie pesanti come torch e faiss.
4.  **GUI development**
    -   Creazione di interfacce grafiche con **PyQt6**.
    -   Integrazione di funzionalità avanzate come link cliccabili che aprono i file locali.
    -   Persistenza delle configurazioni utente tramite file JSON.
5.  **Software engineering & DevOps**
    -   Versionamento con Git e distribuzione su GitHub.
    -   Gestione di pacchetti, troubleshooting cross-platform e ottimizzazione per Windows.
    -   Documentazione completa con README e roadmap.

* * *

## Conclusione

**AI-RAG-docuquery** è un progetto che unisce ricerca accademica e concretezza: un’app utile per semplificare la consultazione dei documenti personali, ma anche un esercizio avanzato di ingegneria del software e integrazione AI.

Mi ha permesso di crescere come sviluppatore, passando da concetti teorici di NLP a un’applicazione funzionante e distribuibile, pronta per essere usata da chiunque.
