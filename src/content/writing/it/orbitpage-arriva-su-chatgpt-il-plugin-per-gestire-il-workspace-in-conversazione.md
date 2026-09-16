---
title: "OrbitPage arriva su ChatGPT: il plugin per gestire il workspace in conversazione"
description: "Ho portato OrbitPage direttamente dentro ChatGPT: dal dialogo con l'AI alla gestione controllata del workspace, usando OAuth, MCP e un approccio review-first."
pubDate: 2026-09-16
tags: ["OrbitPage", "ChatGPT", "AI", "MCP", "OpenAI", "SaaS"]
draft: false
---
OrbitPage è nato come alternativa più flessibile alle classiche link-in-bio page, ma nel tempo è diventato qualcosa di molto più ampio: un prodotto SaaS e open source con pagine multi-page, shop, newsletter, analytics, menu digitali, API, strumenti SEO, gestione privacy e funzionalità AI.

Uno degli obiettivi che ho seguito durante questa evoluzione è stato evitare che l'intelligenza artificiale rimanesse una semplice funzione accessoria dentro la dashboard. Volevo che potesse diventare una vera **interfaccia operativa del prodotto**, senza però rinunciare a controllo, autorizzazioni e revisione delle modifiche.

Da questo lavoro nasce il **plugin OrbitPage per ChatGPT**, ora disponibile direttamente in ChatGPT.

**[Apri OrbitPage in ChatGPT](https://chatgpt.com/plugins/plugin_asdk_app_6a72f9db2440819182e2a20ea276ce9b?q=orbitpage)**

## Da ChatGPT al proprio workspace OrbitPage

L'idea è semplice: invece di aprire la dashboard e cercare manualmente ogni impostazione, posso partire da una conversazione.

Dopo aver collegato il proprio account OrbitPage, ChatGPT può interagire con le capacità che ho scelto di esporre dal prodotto. L'obiettivo non è sostituire la dashboard, ma aggiungere un nuovo modo di utilizzare OrbitPage: **conversazionale**.

Questo significa portare nello stesso flusso il ragionamento dell'AI e le operazioni sul workspace, mantenendo però una separazione precisa tra ciò che il modello propone e ciò che viene effettivamente applicato.

È la stessa direzione che avevo già seguito progettando OrbitPage AI e l'integrazione MCP: dashboard, API e interfaccia AI non sono prodotti separati, ma modi differenti di interagire con lo stesso sistema.

## Perché un plugin ChatGPT

Integrare OrbitPage direttamente in ChatGPT cambia soprattutto il punto di ingresso.

Normalmente un'applicazione SaaS richiede di conoscere la sua interfaccia: aprire la dashboard, individuare la sezione corretta, modificare i campi e completare il flusso previsto dal prodotto.

Con un'interfaccia conversazionale il processo può partire invece dall'intento dell'utente.

Posso descrivere ciò che voglio ottenere in linguaggio naturale e lasciare che ChatGPT utilizzi le operazioni messe a disposizione da OrbitPage per trasformare quell'intento in azioni strutturate.

Per me questo è uno degli aspetti più interessanti dell'integrazione tra AI e software tradizionale: il modello non è soltanto un generatore di testo, ma può diventare un livello di interazione sopra API e funzioni reali.

## Non un accesso illimitato al prodotto

Quando si collega un LLM a un'applicazione reale, la parte interessante non è soltanto riuscire a far eseguire delle operazioni. È decidere **quali operazioni rendere disponibili, con quali permessi e con quali limiti**.

OrbitPage utilizza un modello di autorizzazione basato su OAuth e mantiene il collegamento associato al workspace autorizzato. L'integrazione non equivale quindi a consegnare a ChatGPT un accesso generico all'account o all'infrastruttura.

Le capacità disponibili sono quelle che OrbitPage espone intenzionalmente all'integrazione e l'accesso può essere revocato.

Questo principio era importante già nell'MCP di OrbitPage e lo è ancora di più quando l'integrazione viene resa disponibile direttamente agli utenti di ChatGPT.

## Il principio review-first

Fin dall'integrazione dell'AI nella dashboard ho evitato un modello nel quale una richiesta in linguaggio naturale modifica immediatamente una pagina pubblica senza controllo.

Il flusso che ho scelto è **review-first**.

L'AI interpreta la richiesta, prepara l'operazione e il sistema mantiene distinti il suggerimento, la modifica del workspace e la pubblicazione. Dove previsto, l'utente può quindi verificare ciò che sta per cambiare prima che l'azione produca un effetto sul contenuto pubblico.

È un dettaglio di UX, ma anche una scelta di sicurezza.

Un modello linguistico può fraintendere una richiesta, lavorare con un contesto incompleto o produrre un risultato diverso da quello atteso. Inserire un controllo umano nei punti sensibili riduce il rischio di trasformare automaticamente un errore del modello in una modifica reale.

## MCP, OAuth e prodotto AI-native

Il plugin non nasce come integrazione isolata aggiunta alla fine dello sviluppo.

Negli ultimi mesi ho lavorato perché OrbitPage potesse essere utilizzato attraverso più interfacce:

- la **dashboard**, per la gestione visuale;
- la **REST API**, per script, workflow e automazioni;
- **MCP**, per client e agenti AI compatibili;
- **OrbitPage AI**, integrato direttamente nel prodotto;
- ora **ChatGPT**, come ulteriore interfaccia conversazionale verso il workspace.

La parte che considero più significativa non è quindi il singolo plugin, ma l'architettura che permette allo stesso prodotto di essere controllato attraverso interfacce differenti mantenendo identità, permessi e logica applicativa coerenti.

MCP ha avuto un ruolo importante in questa evoluzione perché permette di esporre capacità applicative a sistemi AI attraverso un'interfaccia pensata espressamente per questo tipo di interazione.

OAuth, invece, permette di collegare l'identità dell'utente e delimitare l'accesso senza distribuire credenziali o token statici dentro la conversazione.

## Cosa ho dovuto considerare nello sviluppo

Portare una funzione SaaS dentro un'interfaccia AI richiede di ragionare su aspetti che in una normale UI vengono spesso gestiti implicitamente.

Le operazioni devono avere input e output sufficientemente strutturati perché il modello possa utilizzarli in modo affidabile. Gli errori devono essere comprensibili sia dall'applicazione sia dall'AI. Le autorizzazioni devono essere verificate lato server e non affidate alle istruzioni del modello. Le azioni disponibili devono inoltre essere abbastanza specifiche da risultare utili senza esporre inutilmente capacità interne del prodotto.

Ho quindi lavorato sull'integrazione come su una vera superficie applicativa, non come su una semplice demo AI.

Questo ha richiesto di mettere insieme competenze di **full-stack development, API design, OAuth, cybersecurity, AI engineering, MCP, cloud architecture e product design**.

## Un altro passo nell'evoluzione di OrbitPage

Quando ho iniziato OrbitPage, il prodotto serviva principalmente a creare una pagina pubblica partendo da blocchi e link.

Oggi lo stesso workspace può gestire contenuti, pagine, shop, audience, analytics, privacy, SEO, automazioni e integrazioni AI. Il plugin ChatGPT aggiunge un altro livello: la possibilità di interagire con parte di questo sistema partendo direttamente da una conversazione.

È anche un esperimento concreto su una domanda che trovo sempre più rilevante nello sviluppo software: **quanto dell'interfaccia di un'applicazione continuerà a essere composto da menu e form, e quanto potrà invece partire dall'intento espresso in linguaggio naturale?**

OrbitPage continuerà ad avere una dashboard completa. Non considero la conversazione un sostituto universale delle interfacce tradizionali. Per alcune attività, però, poter descrivere il risultato desiderato e lasciare che l'AI utilizzi strumenti autorizzati può rendere l'interazione molto più diretta.

Ed è esattamente il tipo di integrazione che volevo sperimentare costruendo OrbitPage.

---

**[Prova OrbitPage](https://orbitpage.com/) · [Apri il plugin OrbitPage in ChatGPT](https://chatgpt.com/plugins/plugin_asdk_app_6a72f9db2440819182e2a20ea276ce9b?q=orbitpage) · [Scopri il progetto OrbitPage](https://paoloronco.it/projects/orbitpage/)**
