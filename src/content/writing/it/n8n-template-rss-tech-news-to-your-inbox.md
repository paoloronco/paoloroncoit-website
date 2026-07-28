---
title: "[n8n-template] Notizie tech via RSS nella tua casella di posta"
description: "Il workflow Tech & AI Daily Briefing è un sistema editoriale completamente automatizzato, basato sull’aggregazione di contenuti e sull’IA, progettato per raccogliere, arricchire e distribuire le notizie più…"
pubDate: 2025-12-03
tags: ["n8n"]
draft: false
---
Il **workflow Tech & AI Daily Briefing** è un sistema editoriale completamente automatizzato, basato sull’aggregazione di contenuti e sull’IA, progettato per raccogliere, arricchire e distribuire ogni giorno le notizie più importanti su tecnologia, intelligenza artificiale, cybersicurezza e industria digitale.

Realizzato con **n8n**, trasforma decine di feed RSS eterogenei in una newsletter chiara e curata, redatta in modo intelligente da un LLM e inviata via email senza alcun intervento manuale.

Di seguito trovi una panoramica completa del funzionamento del sistema, con istruzioni dettagliate per configurare i moduli e le credenziali e con le opzioni di personalizzazione.

GitHub: [https://github.com/paoloronco/n8n-templates/tree/main/free-templates/4-RSS\_News\_Tech](https://github.com/paoloronco/n8n-templates/tree/main/free-templates/4-RSS_News_Tech)

Video YouTube: [https://youtu.be/Gck8nmvx1UA](https://youtu.be/Gck8nmvx1UA)

![](/posts/n8n-template-rss-tech-news-to-your-inbox/workflow-1024x515.png)

* * *

## **1\. Automazione programmata – Esecuzione quotidiana automatica**

Il workflow inizia con un nodo **Schedule Trigger**, che viene eseguito a un intervallo prestabilito (in genere ogni giorno a un’ora fissa).  
In questo modo, la newsletter viene sempre generata automaticamente senza intervento umano.

### 🔧 Configurazione

-   In n8n, scegli il nodo **Schedule Trigger**
-   Seleziona “Every day” oppure imposta un’esecuzione simile a cron
-   Se necessario, definisci fusi orari diversi per un utilizzo globale

Una volta configurato, questo trigger diventa il punto di partenza dell’intera pipeline.

* * *

## **2\. Acquisizione RSS da più fonti (oltre 25 feed)**

Il workflow acquisisce contenuti da oltre due dozzine di fonti autorevoli del settore. Ogni feed viene gestito da un singolo nodo **RSS Feed Read**, per garantire stabilità e facilitare la risoluzione dei problemi.

I feed sono suddivisi per categoria:

### 🔐 _Cybersicurezza_

Tra le fonti figurano:  
The Hacker News, KrebsOnSecurity, DarkReading, SANS, feed CVE, Google Cloud Threat Intelligence, Cisco Talos, ESET e altre ancora.

### 🤖 _Intelligenza artificiale_

Google Research, MIT AI news, OpenAI News e Artificial Intelligence News.

### 💻 _Industria tecnologica e business digitale_

Il Sole 24 Ore (sezioni Tech e Cybersecurity), Cybersecurity360.

### ⚙️ _Ecosistema Nvidia_

Nvidia Newsroom, Nvidia Developer Blog e Nvidia Blog.

### 🔧 Configurazione

Ogni nodo RSS ha un solo campo da configurare:

-   **Feed URL** → Incolla un qualsiasi link RSS
-   Le opzioni aggiuntive (ad esempio limite o filtro per data) possono essere impostate nel pannello “Options”.

Questa struttura modulare consente di **aggiungere, rimuovere o aggiornare i feed senza modificare la logica del workflow**.

* * *

## **3\. Unione dei flussi per argomento**

Poiché ogni feed è separato, il workflow utilizza diversi nodi **Merge** per riunirli in categorie logiche:

-   Merge\_Cyber1 / Cyber2 / Cyber3 → tutte le fonti di cybersicurezza
-   Merge\_AI → feed su IA e ricerca
-   Merge\_Nvidia → notizie dai canali Nvidia
-   Merge\_All → tutte le categorie riunite in un unico flusso globale

### 🔧 Configurazione

Ogni nodo Merge è configurato in modalità “Append”, affinché tutti gli elementi vengano trasmessi in sequenza.  
Puoi regolare il numero di ingressi in base alla quantità di feed che vuoi aggregare.

* * *

## **4\. Filtro di attualità – Solo le notizie delle ultime 24 ore**

Per evitare ridondanze e un eccesso di contenuti RSS, il nodo **Filter** applica una condizione rigorosa:

> _Includi solo gli articoli il cui valore `isoDate` è successivo a “ora meno 24 ore”_

In questo modo il briefing rimane un **autentico riepilogo quotidiano**, anziché diventare un archivio indiscriminato.

### 🔧 Configurazione

Il nodo Filter utilizza una condizione DateTime:

```
leftValue: {{$json.isoDate}}
operator: after
rightValue: {{ DateTime.now().minus({ hours: 24 }).toISO() }}
```

Puoi modificare l’intervallo temporale (ad esempio 48 o 72 ore) se desideri conservare le notizie più a lungo.

* * *

## **5\. Ordinamento automatico per data di pubblicazione**

Il nodo **Sort – Articles by Date** dispone gli elementi in ordine cronologico decrescente.  
In questo modo, gli eventi più recenti e urgenti hanno la precedenza.

### 🔧 Configurazione

-   Campo di ordinamento: `isoDate`
-   Ordine: decrescente

* * *

## **6\. Normalizzazione di tutti gli articoli (nodo Code JavaScript)**

In questa fase, decine di elementi RSS provenienti da fonti diverse vengono riuniti in un unico oggetto strutturato.  
Il nodo Code crea un elemento con un array `articles` contenente:

-   `title`
-   `content` o `contentSnippet`
-   `link`
-   `isoDate`

### 🔧 Opzioni di personalizzazione

Puoi modificare il codice per:

-   includere gli autori
-   includere le immagini dei feed RSS
-   filtrare per parole chiave
-   estrarre tag o categorie

* * *

## **7\. Motore editoriale IA – Basato su Google Gemini**

Questo è il cuore del workflow.

Il **nodo Gemini** riceve l’intero array `articles` e applica un prompt editoriale lungo e molto preciso.  
Il modello opera come il direttore di una grande testata tecnologica.

### Operazioni eseguite:

✔ Filtro per rilevanza (massimo 8–10 notizie principali)  
✔ Classificazione per argomento  
✔ Eliminazione dei duplicati tra le fonti  
✔ Sintesi giornalistica  
✔ Formattazione HTML secondo regole rigorose  
✔ Creazione automatica dell’oggetto dell’email

### Risultato

Gemini restituisce un **oggetto JSON rigorosamente strutturato**:

```
{
  "subject": "Tech & AI Briefing – Day Month Year",
  "html": "<h2>AI & Machine Learning</h2>…"
}
```

### 🔧 Configurazione

Per utilizzare Gemini:

1.  Crea un **progetto Google Cloud**
2.  Abilita la _Gemini API_
3.  Genera una chiave API o una credenziale OAuth
4.  Inserisci le credenziali in n8n alla voce **Google PaLM / Gemini**

Se il progetto viene utilizzato in produzione, imposta le quote di utilizzo e i controlli di fatturazione.

* * *

## **8\. Composizione HTML – Generazione della newsletter finale**

Il nodo **Build Final Newsletter HTML** analizza, convalida e trasforma l’output dell’LLM in un modello di email professionale e responsive.

Gestisce:

-   la rimozione degli involucri ` ```json `
-   l’analisi rigorosa del JSON
-   la convalida dei campi obbligatori
-   l’inserimento dinamico dei contenuti generati dall’IA
-   la generazione di un piè di pagina con data e ora

### 🔧 Opzioni di personalizzazione

Puoi modificare il modello HTML per cambiare:

-   identità visiva / logo
-   caratteri tipografici
-   palette di colori
-   struttura del layout
-   informazioni nel piè di pagina

Il modello è pulito, responsive e ottimizzato per i dispositivi mobili.

* * *

## **9\. Invio dell’email – Nodo Gmail**

L’ultimo passaggio invia la newsletter curata alla tua casella di posta tramite il **nodo Gmail**.

### 🔧 Configurazione delle credenziali Gmail (tramite Google Cloud Platform)

Per utilizzare Gmail in n8n:

1.  Crea un **progetto Google Cloud**
2.  Abilita la **Gmail API**
3.  Vai su _APIs & Services → OAuth Consent Screen_
4.  Configura OAuth per gli utenti "External" o per il dominio interno
5.  Crea le **credenziali client OAuth 2.0**
6.  Carica le credenziali in n8n alla voce:  
    → _Credentials → Gmail OAuth2_
7.  Concedi l’accesso e autorizza il tuo account Google

Una volta configurato, il nodo può inviare automaticamente le email ogni giorno.

### Campi personalizzabili

-   Nome del mittente (ad esempio "Tech Briefing" o il tuo marchio)
-   Email del destinatario (una o più)
-   Corpo HTML (proveniente dal nodo precedente)
-   Oggetto dinamico generato da Gemini

* * *

## **Personalizzazione e scalabilità**

Questo workflow è completamente personalizzabile:

### 🔧 Aggiungere o rimuovere feed RSS

È sufficiente duplicare un nodo RSS esistente e aggiornare l’URL del feed.

### 🔧 Sostituire Gmail con:

-   SMTP
-   Notion
-   Slack
-   Telegram
-   Webhooks
-   Dashboard interne

### 🔧 Cambiare il tono editoriale

Modifica il prompt nel nodo Gemini per cambiare lo stile di scrittura, il numero di elementi, le categorie o il livello di approfondimento.

### 🔧 Risultato multilingue

L’IA può generare il briefing in inglese, italiano o spagnolo, oppure rilevare automaticamente la lingua del lettore.

### 🔧 Scalabilità orizzontale senza limiti

I moduli RSS e i nodi Merge possono essere ampliati senza compromettere la pipeline.

* * *

## **Conclusione**

Il **workflow Tech & AI Daily Briefing** è un sistema completo di automazione, dall’inizio alla fine, che distribuisce una newsletter accuratamente curata, di qualità editoriale e basata sull’IA.

Riunisce enormi quantità di dati in un **briefing quotidiano chiaro, professionale e puntuale**, facendo risparmiare ore di ricerca manuale e offrendo una soluzione potente e scalabile per:

-   monitoraggio del settore
-   intelligence aziendale
-   newsletter automatizzate
-   team di analisti
-   creatori di contenuti
-   potenziamento delle redazioni

Ogni fase, dall’acquisizione dei feed alla sintesi tramite IA fino all’invio via email, avviene automaticamente: questo è uno dei workflow di notizie tecnologiche più avanzati ed efficienti realizzati con n8n.
