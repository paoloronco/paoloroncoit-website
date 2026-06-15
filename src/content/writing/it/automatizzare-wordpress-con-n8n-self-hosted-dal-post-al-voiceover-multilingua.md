---
title: "Automatizzare WordPress con n8n Self-Hosted: dal Post al VoiceOver Multilingua"
description: "Dopo una prima esperienza su Make.com, ho deciso di portare il mio sistema di automazione in self-hosting con n8n . Questo mi permette di avere maggiore…"
pubDate: 2025-08-22
tags: []
draft: false
---
Dopo una prima esperienza su Make.com, ho deciso di portare il mio sistema di automazione in **self-hosting con n8n**.  
Questo mi permette di avere maggiore controllo, flessibilità e soprattutto di scalare senza dipendere da piattaforme esterne.

Il risultato è un workflow che trasforma i contenuti pubblicati su WordPress in **file audio (italiano e inglese)** e li aggiunge automaticamente a pagine dedicate sul sito.

* * *

## ? Obiettivo del Workflow

L’idea era semplice: ogni nuovo post su WordPress doveva essere:

1.  **Archiviato** in modo ordinato,
2.  **Convertito in audio (Italiano ed EN\[inglese\])**,
3.  **Pubblicato automaticamente** in una sezione del sito.

Tutto senza passaggi manuali.

* * *

## ? Come funziona

### 1\. Raccolta e tracciamento

Ogni giorno, a un orario prefissato, n8n legge un foglio Google Sheets che funge da “lista di lavoro”.  
Qui tengo traccia dei post con i loro campi principali (titolo, contenuto, data, ID, link).  
Se un post non è ancora stato processato, il flusso lo seleziona per l’elaborazione.

* * *

### 2\. Pulizia e preparazione del testo

Prima di generare l’audio, il testo viene normalizzato:

-   rimozione di caratteri speciali, simboli o pezzi di codice che potrebbero disturbare la sintesi vocale,
-   traduzione automatica in inglese, per avere due versioni parallele,
-   ulteriore pulizia per assicurarsi che il risultato sia leggibile e fluido.

* * *

### 3\. Generazione dei file audio

Una volta pronto il testo, viene inviato a un servizio TTS (Text-to-Speech) su Google Cloud.  
Il workflow produce due file `.wav`:

-   uno in **italiano**,
-   uno in **inglese**.

In questo modo ogni articolo ha la sua versione “ascoltabile” in entrambe le lingue.

* * *

### 4\. Aggiornamento su WordPress

Terminata la generazione, n8n aggiorna automaticamente due pagine del sito:

-   una che raccoglie i voiceover in italiano,
-   una per quelli in inglese.

Viene aggiunto un blocco con titolo, data, link all’articolo originale e un player audio pronto per l’ascolto.

* * *

### 5\. Chiusura del ciclo

Infine, il workflow aggiorna Google Sheets segnando il post come “done”.  
Così evito di processare due volte lo stesso contenuto e ho sempre sotto controllo lo stato delle lavorazioni.

* * *

## ✅ Risultati e utilità

Con questo sistema:

-   ogni articolo pubblicato su WordPress diventa automaticamente una risorsa multiformato (testo + audio),
-   posso offrire un’esperienza più accessibile e moderna ai lettori,
-   ho un tracciamento chiaro e verificabile del processo.

* * *

## WorkFlow in dettaglio:

![](/posts/automatizzare-wordpress-con-n8n-self-hosted-dal-post-al-voiceover-multilingua/image-1024x563.png)

![](/posts/automatizzare-wordpress-con-n8n-self-hosted-dal-post-al-voiceover-multilingua/image-1-1024x571.png)

* * *

## ? Competenze messe in campo

-   **Automazione dei processi** con n8n (trigger, condizioni, aggiornamenti su API esterne),
-   **Integrazione cloud** con Google Sheets e Google Cloud TTS,
-   **Gestione multilingua** (traduzione + sintesi),
-   **Ottimizzazione del flusso** per garantire che ogni step sia sicuro e ripetibile.

* * *

## ? Conclusione

Questo workflow rappresenta un’evoluzione rispetto alla mia precedente implementazione su Make.com.  
Grazie a n8n in self-hosting ho ottenuto più controllo, sicurezza e possibilità di estendere in futuro il progetto, ad esempio con:

-   nuove lingue,
-   trascrizioni inverse dai file audio,
-   report automatici sugli utilizzi.
