---
title: "WordPress AI Chatbot: trasformare contenuti in un sistema interrogabile | n8n, Qdrant, MongoDB Vector Store"
description: "Il WordPress AI Chatbot che ho costruito nasce da una domanda molto concreta: posso trasformare un sito in qualcosa che si possa interrogare? Non cercare.…"
pubDate: 2026-02-11
tags: []
draft: false
---
Il **WordPress AI Chatbot** che ho costruito nasce da una domanda molto concreta:  
_posso trasformare un sito in qualcosa che si possa interrogare?_

> _Non cercare. **Interrogare**.  
> La differenza è sottile ma fondamentale._

Quando qualcuno arriva su un sito tecnico e vuole capire cosa hai fatto, deve ricostruire il quadro leggendo articoli, collegando competenze, deducendo esperienza. È un processo manuale. Il chatbot interviene esattamente lì: rende possibile fare domande dirette su ciò che è stato pubblicato e ottenere risposte basate esclusivamente su quei contenuti.

Non è un assistente generico. È un layer semantico sopra WordPress.

* * *

## Indexing; la preparazione dei dati

### I Post; Inexing e preparazione su Qdrant

Il funzionamento si divide in due momenti completamente separati: preparazione dei dati e interrogazione.

La fase di preparazione avviene tramite un workflow dedicato su n8n. Questo workflow non gestisce utenti. Non risponde a nessuno. Si occupa solo di costruire l’indice semantico del sito.

Quando viene eseguito, interroga WordPress tramite REST API, recupera i post pubblicati, estrae titolo, contenuto ed excerpt, elimina il markup HTML e costruisce una versione pulita del testo. Questo testo non viene salvato così com’è: viene suddiviso in blocchi più piccoli, in modo da permettere una ricerca più precisa.

Ogni blocco viene trasformato in un embedding tramite OpenAI. Il risultato è un vettore numerico che rappresenta il significato del testo. Quei vettori vengono poi salvati in un database ottimizzato per ricerca semantica.

Qui entrano in gioco due possibilità. Per configurazioni snelle e dirette può essere utilizzato Qdrant. Per configurazioni più strutturate, soprattutto quando si vogliono gestire più insiemi di dati separati, viene utilizzato MongoDB Atlas con Vector Search.

Ma la parte davvero interessante non è l’indicizzazione dei post. È il fatto che il sistema non si limita ai post.

### Competenze e profilo: indicizzazione strutturata su MongoDB Atlas

Le competenze e le sezioni di profilo non sono contenuti WordPress classici. Non sono articoli. Non sono pagine narrative. Sono dati strutturati.

Per renderli interrogabili, ho previsto un processo diverso.

Le competenze vengono organizzate in file JSON e CSV strutturati per dominio, categoria, livello e descrizione. Questi file vengono importati in MongoDB in collezioni dedicate. A quel punto entra in gioco uno script Node.js incluso nel progetto.

Lo script legge ogni documento, costruisce una rappresentazione testuale unificata (skill, dominio, descrizione, livello), chiama l’API embeddings di OpenAI, genera il vettore e aggiorna il documento con il campo embedding. Successivamente viene creato un indice di tipo vector search su quella collezione.

Il risultato è che le competenze non sono semplicemente elencate in una pagina. Sono interrogabili semanticamente.

Se qualcuno chiede “hai esperienza in cloud security?” il sistema non cerca la parola esatta. Confronta il significato della domanda con il significato dei documenti vettorializzati.

Lo stesso meccanismo vale per il profilo, organizzato in sezioni separate e indicizzato nello stesso modo.

In questo modo il chatbot lavora su tre domini distinti: post, competenze e profilo. Non li mescola. Li tratta come insiemi informativi separati.

* * *

## Il Chatbot; cosa succede quando arriva una domanda

Il secondo workflow su n8n è quello che gestisce le richieste in tempo reale.

La richiesta arriva tramite webhook, protetto da autenticazione header. Prima ancora di interrogare il database, il sistema deve capire che tipo di domanda è stata fatta.

Qui entra in gioco un intent router basato su LLM. Non genera risposte. Classifica. Decide se la domanda riguarda:

-   ricerca tra i post
-   interrogazione delle competenze
-   interrogazione del profilo
-   semplice small talk

Questa fase è cruciale. Permette di interrogare solo la base dati corretta.

Se la domanda riguarda un progetto, viene eseguita una ricerca vettoriale nella collezione dei post. Se riguarda una tecnologia o un livello di esperienza, viene interrogata la collezione delle skill. Se riguarda il percorso o il ruolo, viene consultata la parte profilo.

La query vettoriale restituisce un insieme di documenti ordinati per similarità. Quei documenti vengono filtrati e trasformati in un contesto controllato. Solo a quel punto il modello generativo entra in gioco, ma con regole molto chiare: sintetizzare ciò che è stato recuperato, non inventare.

* * *

## Logging e controllo

Ogni interazione può essere registrata su Google Cloud Storage. L’IP dell’utente viene prima hashato con SHA3-256, in modo da evitare la memorizzazione di dati identificativi diretti. I log vengono salvati in formato JSON organizzati per data, rendendo possibile analisi successive mantenendo attenzione agli aspetti di privacy.

Questo aspetto non è accessorio. Significa trattare il chatbot come componente backend reale, non come semplice widget.

* * *

## Integrazione con WordPress

Per collegare tutto al sito è stato sviluppato un plugin WordPress dedicato.

Il plugin non contiene logica AI. Non fa calcoli. Funziona come ponte sicuro tra frontend e backend n8n. Espone uno shortcode che permette di incorporare il chatbot nel sito, gestisce le chiamate REST e protegge il webhook tramite autenticazione server-side.

In questo modo nessuna chiave API viene mai esposta nel browser.

* * *

## Il progetto

Questo progetto non è un semplice file JSON da importare o un plugin da installare e dimenticare.  
È una struttura completa, pensata per essere compresa e replicata.

Chi decide di implementare questo **WordPress AI Chatbot** riceve l’intera architettura: i workflow n8n già configurati per la fase di indexing e per la gestione del chatbot, le guide dettagliate per l’importazione e l’impostazione delle credenziali, la documentazione per scegliere e configurare il vector store (Qdrant per un setup più diretto, MongoDB Atlas per un’architettura più avanzata), insieme agli script Node.js necessari per importare, normalizzare e vettorializzare competenze e sezioni di profilo partendo da file JSON o CSV.

Sono inclusi anche esempi concreti di struttura dati, la spiegazione su come costruire gli indici vettoriali, come organizzare le collezioni MongoDB, come separare i domini informativi (post, skill, profilo) e come collegare tutto al workflow di interrogazione.  
Il plugin WordPress fornito permette poi di integrare il chatbot nel sito in modo sicuro, fungendo da ponte tra frontend e backend senza esporre chiavi sensibili.

L’obiettivo non è fornire un “prodotto chiuso”, ma una base tecnica completa e documentata che permetta di ricostruire l’intero sistema passo dopo passo, capendone ogni componente.

Il progetto è disponibile su:

-   **Gumroad**  
    [https://paoloronco.gumroad.com/l/wordpress-aichatbot](https://paoloronco.gumroad.com/l/wordpress-aichatbot)
-   **n8n Creators** (coming soon | in review)  
    [https://creators.n8n.io/](https://creators.n8n.io/)
-   **Shop.paoloronco.it  
    **[https://shop.paoloronco.it/24-wordpress-ai-chatbot-with-n8n.html](https://shop.paoloronco.it/24-wordpress-ai-chatbot-with-n8n.html)
-   **GitHub**: (documentazione)  
    [https://github.com/paoloronco/n8n-templates](https://github.com/paoloronco/n8n-templates/tree/main/paid-templates/4%20-%20WordPress%20AI%20Chatbot)

Chi lo utilizza non sta acquistando un semplice chatbot, ma un’architettura replicabile per trasformare un sito WordPress in un sistema realmente interrogabile.

* * *

## Il senso del progetto

Il WordPress AI Chatbot non serve a rendere un sito più spettacolare.

Serve a rendere interrogabile un dominio informativo: progetti, competenze, percorso.

È una differenza sostanziale.

Non aggiunge decorazione.  
Aggiunge struttura semantica.

E questa è la parte che conta davvero.
