---
title: "AI Instagram Reels: Automazione avanzata con Make.com, OpenAI e Google Cloud"
description: "? GitHub : paoloronco/makecom-openai-gcp-instagramreel ? Pubblicazione su ReadyTensor : Automated Instagram Reels with AI Introduzione: più di un progetto…"
pubDate: 2025-03-24
tags: []
draft: false
---
> ? **GitHub**: [paoloronco/makecom-openai-gcp-instagramreel](https://github.com/paoloronco/makecom-openai-gcp-instagramreel)  
> ? **Pubblicazione su ReadyTensor**: [Automated Instagram Reels with AI](https://app.readytensor.ai/publications/automated-instagram-reels-with-ai-text-to-video-using-makecom-openai-google-cloud-Cv2rZImtcu5H)

## **Introduzione: più di un progetto social**

Il progetto “AI Instagram Reels” nasce con l’obiettivo di automatizzare la creazione di contenuti per i social, ma in realtà si è rivelato molto di più: un esercizio avanzato di orchestrazione tra AI generativa, cloud computing e automazioni no-code.  
Durante lo sviluppo, ho acquisito competenze trasversali su:

-   **Automazioni complesse con Make.com**
-   **Utilizzo delle API OpenAI (ChatGPT, TTS, DALL·E)**
-   **Gestione di file e bucket su Google Cloud Platform**
-   **Deploy di container su Google Cloud Run**
-   **Integrazione di più strumenti in un unico workflow fluido**

Più che un progetto “per Instagram”, è stata una palestra per costruire un'infrastruttura scalabile e intelligente, in grado di generare e pubblicare automaticamente contenuti multimediali, partendo da un prompt testuale.

![](/posts/ai-instagram-reels-automazione-avanzata-con-make-com-openai-e-google-cloud/image-1024x290.png)

* * *

## **Infrastruttura tecnica: AI, Cloud, automazione e gestione file**

### **AI Generativa: contenuto originale al centro del progetto**

Il cuore creativo del progetto è l’intelligenza artificiale di OpenAI. Utilizzando GPT-4o, ho impostato un prompt specifico per generare script brevi ma coinvolgenti, ottimizzati per la narrazione in un Reel. Il testo viene poi trasformato in voce grazie al modello TTS-1, restituendo un file audio `.mp3` chiaro e naturale. A completare la parte visuale, DALL·E 3 genera un'immagine verticale in stile flat, pensata come copertina visiva del contenuto.

### **Google Cloud Run: microservizio video su misura**

Uno degli aspetti più interessanti e avanzati di questo progetto è stato senza dubbio lo sviluppo del backend su Google Cloud Platform, in particolare l’uso di **Cloud Run combinato con Docker**.  
Ho realizzato un **microservizio custom**, containerizzato tramite Docker, capace di unire dinamicamente il file `.png` (immagine copertina) con il file `.mp3` (voice-over) e restituire un video `.mp4`. Per farlo, ho:

-   scritto uno script Python (`main.py`) per la fusione dei file
-   configurato un ambiente Docker per l’esecuzione
-   creato un repository Docker su **Artifact Registry**
-   effettuato il deploy del servizio su Cloud Run, rendendolo accessibile pubblicamente via HTTP POST

L’infrastruttura è altamente scalabile e serverless: Cloud Run esegue il servizio solo quando viene chiamato, riducendo i costi e garantendo prestazioni costanti.

Per collegare Make.com a questo endpoint ho anche creato una Service Account con i permessi adeguati, configurato **OAuth** e definito le **policy necessarie** per permettere la **comunicazione sicura** tra i due ambienti.

### **Recupero e gestione dei file: tutto passa dal Cloud**

Una volta generato il video `.mp4`, viene salvato su **Google Cloud Storage**, che funge da deposito centrale per tutti i file temporanei e finali. Per ottenere il link pubblico al file più recente, ho integrato una chiamata API direttamente dalla pipeline Make.com, che interroga il bucket e restituisce i file ordinati per data di creazione. In questo modo, riesco a individuare l’output giusto senza ambiguità.  
Questa funzione è fondamentale per mantenere l’automazione fluida, specialmente quando il sistema viene eseguito più volte al giorno.

## Google Drive: archivio di backup e tracciabilità

Google Drive non è usato come ambiente attivo di lavoro, ma come **spazio di backup**, utile per avere sempre a disposizione una copia dei contenuti generati. Nella pipeline Make.com, ho inserito due step specifici che caricano immagine e audio grezzi su una cartella Drive condivisa.  
Per realizzare questa integrazione, non è bastato un semplice collegamento: ho dovuto passare dalla **Google Cloud Console**, creare un progetto, abilitare le API necessarie, configurare un sistema di autenticazione OAuth e creare una **Service Account dedicata** per consentire a Make.com di accedere a Google Drive in modo sicuro e controllato.  
Questa fase è stata molto formativa, perché mi ha permesso di comprendere come funziona il ciclo completo delle credenziali tra ambienti terzi e Google Workspace.

* * *

## Conclusione

"AI Instagram Reels" non è stato un semplice progetto creativo, ma una vera e propria architettura distribuita, costruita attraverso l'integrazione profonda di strumenti avanzati come OpenAI, Make.com e Google Cloud Platform.

Lontano dall’essere un progetto no-code, questo lavoro ha richiesto **competenze tecniche reali**: dalla scrittura di codice Python per la generazione video, alla gestione di container Docker, fino alla configurazione di service account, permessi OAuth e deploy su Cloud Run.

Il risultato è un sistema completamente automatizzato, ma altamente **controllabile, scalabile e personalizzabile**, capace di produrre contenuti video partendo da zero, e di farlo con precisione, rapidità e coerenza.

Più che un flusso per creare Reels, si tratta di una **macchina di produzione multimediale intelligente**, pronta per essere riutilizzata, estesa o adattata ad altri contesti — educational, branding, social media automation, o content marketing.

Questo progetto ha consolidato la mia capacità di gestire ambienti cloud complessi, connettere API esterne, progettare pipeline robuste e scrivere codice che dialoga con infrastrutture distribuite. Un’esperienza che porterò con me in ogni nuovo progetto.
