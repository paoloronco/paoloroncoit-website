---
title: "OrbitPage arriva su ChatGPT: gestisci il tuo sito attraverso una conversazione"
description: "L'app OrbitPage per ChatGPT collega l'AI al tuo workspace: consulta il contesto, prepara modifiche e interagisci con il sito tramite MCP e OAuth, con autorizzazioni e revisione."
pubDate: 2026-09-16
tags: ["OrbitPage", "ChatGPT", "AI", "MCP", "OpenAI", "SaaS"]
draft: false
---

**OrbitPage è ora disponibile direttamente in ChatGPT.** Ho sviluppato un'integrazione che permette di collegare il proprio workspace alla conversazione e utilizzare l'AI per interagire con alcune funzionalità reali della piattaforma, senza dover passare ogni volta dalla dashboard.

OrbitPage è un website builder visuale per siti multi-pagina, portfolio, landing page e altre presenze digitali. Con l'app ChatGPT, a questa esperienza si aggiunge un nuovo modo di lavorare: **descrivere ciò che vuoi ottenere in linguaggio naturale**.

**[Apri OrbitPage in ChatGPT](https://chatgpt.com/plugins/plugin_asdk_app_6a72f9db2440819182e2a20ea276ce9b?q=orbitpage)**

## Cosa puoi fare con OrbitPage in ChatGPT

Dopo aver collegato il tuo account e autorizzato un workspace, puoi utilizzare le operazioni che OrbitPage mette a disposizione dell'integrazione. Per esempio, puoi chiedere a ChatGPT di **esaminare la configurazione della pagina, preparare aggiornamenti ai contenuti o al design e aiutarti a revisionare le modifiche** prima di applicarle, nei flussi supportati.

Non si tratta di una chat che si limita a suggerire testi da copiare manualmente: ChatGPT può richiamare strumenti applicativi collegati al workspace. Le funzioni effettivamente disponibili dipendono dalle capacità esposte, dai permessi e dal contesto autorizzato.

La dashboard rimane disponibile per le attività visuali e le configurazioni più dettagliate. Il plugin aggiunge un'interfaccia complementare, particolarmente utile quando è più naturale spiegare un obiettivo che cercare una specifica impostazione.

## Come funziona il collegamento

L'integrazione utilizza **MCP (Model Context Protocol)** per mettere a disposizione di ChatGPT un insieme definito di strumenti OrbitPage. Il collegamento dell'account avviene tramite **OAuth**, con autorizzazione riferita a un workspace specifico.

ChatGPT non ottiene accesso indiscriminato all'account: può utilizzare soltanto le operazioni esposte e consentite. I controlli di autenticazione, autorizzazione e validazione rimangono lato server, e l'accesso può essere revocato.

## L'AI propone, tu mantieni il controllo

Una scelta centrale nello sviluppo di OrbitPage AI e delle integrazioni conversazionali è il principio **review-first**. Nei flussi di modifica previsti, l'AI prepara una proposta strutturata, che viene verificata prima dell'applicazione. **Modificare un workspace e pubblicare il risultato sono passaggi distinti.**

Questo approccio permette di sfruttare la rapidità dell'AI senza trasformare automaticamente un'interpretazione errata in una modifica visibile ai visitatori.

## Perché ho sviluppato questa integrazione

Volevo che ChatGPT fosse più di un assistente esterno capace di parlare *di* OrbitPage: doveva poter diventare un'interfaccia per lavorare *con* OrbitPage.

L'app nasce dal lavoro su API, MCP, OAuth e strumenti AI già presenti nella piattaforma. Dashboard, Automation REST API, assistente integrato e ChatGPT offrono modalità diverse per raggiungere lo stesso obiettivo, con regole e autorizzazioni coerenti.

È un passo concreto verso un software in cui **l'interazione può partire dall'intento dell'utente**, non soltanto da menu, pulsanti e form.

---

Vuoi provarlo? **[Collega OrbitPage a ChatGPT](https://chatgpt.com/plugins/plugin_asdk_app_6a72f9db2440819182e2a20ea276ce9b?q=orbitpage)** oppure **[scopri OrbitPage](https://orbitpage.com/)**. Per una panoramica completa delle funzionalità, consulta la **[scheda progetto](/projects/orbitpage/)**.
