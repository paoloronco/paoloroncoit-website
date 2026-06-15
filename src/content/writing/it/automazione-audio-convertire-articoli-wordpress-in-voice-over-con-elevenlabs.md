---
title: "Automazione Audio: Convertire Articoli WordPress in Voice Over con ElevenLabs"
description: "Nel mio ultimo progetto di automazione, ho sviluppato un workflow avanzato che trasforma automaticamente gli articoli del mio sito WordPress in file audio,…"
pubDate: 2025-03-01
tags: []
draft: false
---
Nel mio ultimo progetto di automazione, ho sviluppato un workflow avanzato che trasforma automaticamente gli articoli del mio sito WordPress in file audio, rendendoli disponibili su Google Drive e catalogandoli su Airtable. Questo processo sfrutta diverse API e tecnologie cloud per garantire un'integrazione fluida e completamente automatizzata.

* * *

### **Il Processo Automatizzato**

L'obiettivo principale del progetto è convertire gli articoli di WordPress in tracce audio attraverso ElevenLabs, una piattaforma avanzata di sintesi vocale. I file audio generati vengono poi caricati su Google Drive utilizzando le API di Google Cloud Platform (GCP) e autenticazione OAuth, per poi essere registrati su Airtable per un'organizzazione strutturata.

#### **1\. Recupero degli Articoli da WordPress**

Grazie alle API di WordPress, il sistema monitora automaticamente i nuovi articoli pubblicati e li estrae per la successiva conversione.

#### **2\. Creazione del Voice Over con ElevenLabs**

ElevenLabs è una piattaforma avanzata di sintesi vocale che trasforma il testo in audio di alta qualità. Questo processo è simile alla produzione di un podcast, consentendo una fruizione più accessibile e dinamica dei contenuti.

#### **3\. Caricamento su Google Drive con Google Cloud Platform**

L'integrazione con Google Drive è stata gestita tramite le API di Google Cloud Platform (GCP), utilizzando OAuth per l'autenticazione sicura. Per motivi di sicurezza, non è possibile autenticarsi direttamente con Google Drive, quindi è stato necessario configurare un progetto su Google Cloud Console per gestire le credenziali OAuth.

#### **4\. Generazione del Link di Condivisione e Registrazione su Airtable**

Dopo il caricamento, il sistema genera automaticamente un link di condivisione per il file audio e lo registra su Airtable, creando una base dati strutturata per la gestione e consultazione dei contenuti.

* * *

### **Competenze Acquisite e Tecnologie Utilizzate**

Questo progetto ha rappresentato un'importante esperienza nell'automazione e nell'integrazione di API, consolidando competenze in:

-   **API REST** per la gestione dei dati tra WordPress, ElevenLabs, Google Drive e Airtable.
-   **Google Cloud Platform (GCP)** per la gestione delle credenziali OAuth e l'integrazione con Google Drive.
-   **OAuth 2.0** per un'autenticazione sicura nell'ecosistema di Google.
-   **Automazione dei flussi di lavoro** per la creazione di un processo completamente automatizzato ed efficiente.

* * *

### **Ascolta gli Articoli Convertiti in MP3**

Gli articoli già convertiti in formato audio sono disponibili per l'ascolto al seguente link:  
[Portfolio Articoli Audio](https://portfolio.paoloronco.it/portfolio-articoli-audio/)  
L'ascolto è integrato con il plugin **AudioIgniter**, che garantisce un'esperienza fluida e intuitiva.

* * *

Questo progetto dimostra l'efficacia dell'automazione e delle integrazioni cloud nel migliorare l'accessibilità e la fruizione dei contenuti, trasformando il semplice testo scritto in un'esperienza audio dinamica e coinvolgente.
