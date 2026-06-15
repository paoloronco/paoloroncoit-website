---
title: "Automatizzare WordPress con Make.com: dal Post al VoiceOver in Cloud"
description: "? GitHub : paoloronco/makecom-wordpress-ttsvoiceover-notiondb ? Pubblicazione su ReadyTensor : GCP TTS on WordPress | WordPress to Voice Nel mondo della…"
pubDate: 2025-04-09
tags: []
draft: false
---
? **GitHub**: [paoloronco/makecom-wordpress-ttsvoiceover-notiondb](https://github.com/paoloronco/makecom-wordpress-ttsvoiceover-notiondb)  
? **Pubblicazione su ReadyTensor**: [GCP TTS on WordPress | WordPress to Voice](https://app.readytensor.ai/publications/gcp-tts-on-wordpress-wordpress-to-voice-J5nH5EoHs9Lx)

Nel mondo della tecnologia e della cybersecurity, **automatizzare** non è solo una questione di efficienza, ma anche di **precisione e sicurezza**.  
Come **CyberSecurity Analyst** con una forte passione per la **tech automation**, ho sviluppato un workflow avanzato su **Make.com** che mi consente di gestire in modo intelligente l’intero ciclo di vita dei contenuti pubblicati su **WordPress**, trasformandoli in **risorse multiformato** e archiviate in modo ordinato su più piattaforme.

In questo articolo ti mostro **come funziona il mio workflow**, cosa lo rende efficace e come potrebbe essere adattato ad altri contesti, sempre in chiave **scalabile e sicura**.

![](/posts/automatizzare-wordpress-con-make-com-dal-post-al-voiceover-in-cloud/image-1024x493.png)

## ? Obiettivo del Workflow

Automatizzare la gestione dei post su WordPress in due direzioni:

-   **Archiviazione strutturata e notifica** (tramite Notion ed Email),
-   **Generazione automatica di voiceover audio** e aggiornamento dinamico del post sul sito.

## ? Panoramica del Processo

### Step 1 – Watch Post da WordPress

Il flusso si attiva ogni volta che viene pubblicato (o aggiornato) un nuovo post su WordPress, grazie al modulo “Watch Post via API”.

### Step 2 – Router

Il router divide il flusso in **due rami indipendenti**, che eseguono operazioni parallele su quello stesso contenuto.

## **Ramo 1 – Archiviazione nel Database Notion**

1.  Il contenuto del post viene **aggiunto a una tabella Notion**, utile per il tracciamento, la consultazione futura e la gestione dei contenuti in formato knowledge base.
2.  Al termine, viene inviata una **notifica via email** che conferma l’inserimento corretto del post.

✅ **Utile per:** backup strutturato, cronologia contenuti, documentazione interna.

## **Ramo 2 – Generazione del VoiceOver Audio**

### 1\. **Parsing e Ottimizzazione del Testo**

-   Il contenuto del post viene convertito da HTML a testo pulito.
-   Il testo viene poi **ottimizzato e riformattato** usando un modello di **OpenAI GPT**, per migliorarne la leggibilità e prepararlo alla sintesi vocale.

### 2\. **Upload su Google Cloud Storage**

Il testo viene caricato in formato `.txt` su un bucket privato su GCP.

### 3\. **Controllo con Custom JS**

Uno script in **JavaScript personalizzato** controlla la **dimensione del file generato**:

-   Se è **inferiore a 5000 byte**, il testo è breve → si usa una sintesi TTS standard.
-   Se è **maggiore**, si attiva un percorso alternativo per file lunghi.

Il codice JS restituisce un valore booleano che viene gestito da un secondo router.

### 4\. Router: Scelta tra TTS Breve e TTS Lungo

#### Se il testo è < 5000 byte:

1.  Il file viene inviato al modulo **Google Cloud Text-to-Speech** per generare l’audio `.wav`.
2.  L’audio viene caricato su **Google Drive**.
3.  Viene scaricato tramite un modulo HTTP e poi **ri-uploadato su un bucket GCP pubblico**.
4.  Si recupera il contenuto aggiornato del post su WordPress.
5.  Il nuovo audio viene **integrato all’interno del post** con un **blocco HTML personalizzato** (vedi esempio sotto).
6.  Email finale di conferma.

#### Se il testo è > 5000 byte:

1.  Si applica un **Text Parser avanzato** che elimina caratteri speciali e pulisce ulteriormente il contenuto.
2.  Un modulo HTTP attiva una **Cloud Run Function su GCP** che genera un **voiceover lungo**.
3.  Anche in questo caso, si recupera il contenuto del post, lo si aggiorna con il nuovo audio e si manda una notifica email finale.

## Integrazione Audio su WordPress

L’audio viene aggiunto automaticamente nel post con questo snippet HTML:

htmlCopiaModifica`<hr>   <h3>? VoiceOver: {{1.title}}</h3>   <h5>Data: {{66.date}}</h5>   <h5>Link articolo: {{1.link}} </h5>   <p>PostID:{{1.id}}</p>   <audio controls>     <source src="https://storage.googleapis.com/wp-voiceovers/{{1.id}}.wav" type="audio/mpeg">   </audio>   `

Questo permette agli utenti di **ascoltare il contenuto direttamente nella pagina**, rendendo il blog **accessibile, fruibile e moderno**.

## Sicurezza & Best Practice

Essendo un flusso articolato, ho posto **massima attenzione alla sicurezza**:

-   Utilizzo di API key, OAuth e accessi tokenizzati,
-   Bucket Cloud Storage con **permessi strettamente controllati**,
-   Logging via JS per controlli interni e fallback,
-   Modularità e tracciabilità completa di ogni step.

Ogni step è **verificabile**, idempotente e può essere isolato in fase di debug.

## ✅Conclusioni

Questo workflow è il risultato di mesi di ottimizzazione e test reali.  
Mi consente di **pubblicare un contenuto su WordPress** e, senza alcun intervento manuale:

-   **archiviarlo**,
-   **migliorarlo**,
-   **trasformarlo in audio**,
-   **e renderlo disponibile pubblicamente.**

È una soluzione che unisce **automazione intelligente** e **attenzione alla cybersecurity**, pensata per chi lavora con contenuti e vuole risparmiare tempo senza rinunciare al controllo.

Se vuoi implementare qualcosa di simile, oppure discutere di automazioni per il tuo stack, **scrivimi!**
