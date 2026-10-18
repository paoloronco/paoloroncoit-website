---
title: "OrbitPage"
summary: "SaaS e piattaforma open source per creare, pubblicare e gestire una presenza digitale completa da un unico workspace, ora integrata anche con ChatGPT."
category: "tool"
stack: ["TypeScript", "React", "Next.js", "Node.js", "Docker", "REST API", "OAuth", "MCP", "OpenAI", "ChatGPT", "Stripe", "GitHub Actions", "Cloud & Edge Services"]
problem: "Per presentare online identità, link, contenuti, contatti e servizi si finisce spesso per utilizzare diversi strumenti oppure costruire e mantenere un intero sito web."
solution: "OrbitPage concentra queste esigenze in un unico prodotto e permette di gestirle dalla dashboard, via API o attraverso interfacce AI conversazionali."
outcome: "Il prodotto è disponibile sia come servizio SaaS gestito, pronto all'uso, sia attraverso un core open source self-hosted."
featured: true
order: 3
draft: false
links:
  - label: "Prova OrbitPage"
    href: "https://orbitpage.com/"
  - label: "Apri OrbitPage in ChatGPT"
    href: "https://chatgpt.com/plugins/plugin_asdk_app_6a72f9db2440819182e2a20ea276ce9b?q=orbitpage"
  - label: "Esplora la documentazione"
    href: "https://orbitpage.com/it-IT/docs"
  - label: "Visualizza il progetto open source su GitHub"
    href: "https://github.com/paoloronco/OrbitPage"
---

OrbitPage nasce come alternativa più flessibile ai tradizionali strumenti link-in-bio e si è evoluto in una piattaforma completa per creator, professionisti, aziende e attività locali.

Da una singola dashboard è possibile costruire pagine pubbliche, organizzare contenuti e servizi, creare menu e pagine secondarie, vendere prodotti digitali, raccogliere iscritti, analizzare il traffico e integrare automazioni e strumenti AI. Oggi OrbitPage può essere utilizzato anche direttamente da **ChatGPT**, attraverso il plugin ufficiale che collega l'interfaccia conversazionale alle capacità controllate del workspace.

Il prodotto è disponibile sia come **servizio SaaS gestito**, pronto all'uso, sia attraverso un **core open source self-hosted**.

**Ruolo:** ideazione, product design, sviluppo full-stack, cloud architecture, security, AI engineering, DevOps e gestione del prodotto.

---

## Da una link page a una presenza digitale completa

Il problema da cui è nato OrbitPage era semplice: per presentare online identità, link, contenuti, contatti e servizi si finisce spesso per utilizzare diversi strumenti oppure costruire e mantenere un intero sito web.

OrbitPage concentra queste esigenze in un unico prodotto. Il workspace può partire da un profilo essenziale e trasformarsi progressivamente in una presenza digitale più articolata, mantenendo un'esperienza di gestione unica.

Il risultato può essere una link-in-bio page, un portfolio compatto, una digital business card, la pagina di un prodotto, un microsito professionale o la presenza digitale di un ristorante, bar o attività locale.

## Contenuti, pagine e menu

Il cuore di OrbitPage è un editor visuale basato su blocchi riordinabili. Link, testi, immagini, video, contatti, social, mappe, eventi, call to action, embed e altri componenti possono essere combinati liberamente senza intervenire sul codice.

La piattaforma non è limitata a una singola pagina: i workspace compatibili possono creare **pagine secondarie con URL e contenuti indipendenti**, costruendo una struttura multi-page nello stesso prodotto. I contenuti possono essere nascosti, riordinati o programmati per essere pubblicati durante uno specifico intervallo temporale.

OrbitPage include inoltre un sistema dedicato ai **menu digitali**. Ristoranti, bar e altre attività possono organizzare sezioni, categorie, prodotti, varianti, prezzi, immagini e disponibilità dalla dashboard e condividere il risultato tramite URL o QR code.

## Design e personalizzazione

Ogni pagina può partire da temi predefiniti oppure essere adattata alla propria identità. Il sistema di personalizzazione permette di intervenire su tipografia, colori, superfici, card, bordi, spaziatura, radius, ombre, immagini e background multimediali.

Profilo, logo o immagine personale, favicon, social, footer e altri elementi contribuiscono alla costruzione dell'identità della pagina. Una preview responsive permette di verificare il risultato durante la configurazione prima della pubblicazione.

## Shop, newsletter e audience

OrbitPage integra un modulo **Shop** che permette di collegare Stripe, creare un catalogo e vendere prodotti digitali o servizi direttamente dalla propria presenza OrbitPage. Catalogo, checkout e gestione dell'acquisto fanno parte dello stesso ecosistema utilizzato per contenuti e pubblicazione.

I workspace compatibili possono inoltre raccogliere iscritti e gestire campagne **newsletter** dalla dashboard, includendo consenso, subscriber list, configurazione email, programmazione e metriche di consegna e interazione.

OrbitPage può quindi accompagnare il percorso **visitatore → subscriber → cliente** senza richiedere una piattaforma separata per ogni fase.

## AI Assistant

L'intelligenza artificiale è integrata direttamente nel processo di gestione della pagina.

**OrbitPage AI** può comprendere il contenuto e la configurazione del workspace e proporre modifiche a profilo, contenuti e design attraverso istruzioni in linguaggio naturale.

L'AI non modifica direttamente la pagina pubblica: le operazioni vengono trasformate in proposte strutturate che l'utente può controllare prima di applicarle. Ho progettato questo flusso secondo un approccio **review-first**, mantenendo separati suggerimento AI, modifica del workspace e pubblicazione.

Questo consente di utilizzare un LLM come interfaccia operativa senza delegargli automaticamente il controllo del contenuto pubblico.

## OrbitPage per ChatGPT

Nel settembre 2026 ho portato questa stessa logica direttamente dentro **ChatGPT**, pubblicando il plugin OrbitPage.

Il plugin aggiunge una nuova superficie di utilizzo del prodotto: oltre alla dashboard visuale, alla REST API e all'integrazione MCP, un utente può partire da una conversazione con ChatGPT e interagire con le capacità OrbitPage esposte al proprio workspace.

L'obiettivo non è sostituire la dashboard con una chat. È permettere di partire dall'**intento**: descrivere in linguaggio naturale il risultato desiderato e utilizzare l'AI come livello di interazione sopra funzioni applicative reali.

Il collegamento mantiene il modello di sicurezza progettato per le integrazioni AI di OrbitPage: autenticazione e autorizzazione, workspace delimitato, capacità controllate e separazione tra proposta, modifica e pubblicazione. Le verifiche sensibili rimangono lato server e non vengono affidate alle sole istruzioni del modello.

**[Apri OrbitPage in ChatGPT](https://chatgpt.com/plugins/plugin_asdk_app_6a72f9db2440819182e2a20ea276ce9b?q=orbitpage)**

Ho raccontato più nel dettaglio le scelte di prodotto e di engineering dietro questa integrazione nell'articolo **[OrbitPage arriva su ChatGPT: il plugin per gestire il workspace in conversazione](/writing/orbitpage-arriva-su-chatgpt-il-plugin-per-gestire-il-workspace-in-conversazione/)**.

## OpenAI e Model Context Protocol

La base dell'interazione AI esterna di OrbitPage è anche disponibile attraverso **MCP (Model Context Protocol)**.

Un client OpenAI compatibile può collegarsi a uno specifico workspace tramite autorizzazione OAuth e utilizzare un insieme controllato di operazioni: leggere il contesto della pagina, preparare modifiche, revisionarle, applicarle e gestire il ciclo di pubblicazione secondo le capacità autorizzate.

Permessi e workspace vengono delimitati durante l'autorizzazione e l'accesso può essere revocato. MCP non espone l'intera piattaforma: rende disponibili intenzionalmente soltanto le capacità necessarie all'interazione conversazionale.

Il plugin ChatGPT rappresenta quindi l'evoluzione naturale di questo lavoro: non una demo separata, ma un ulteriore punto di accesso allo stesso modello applicativo.

## API e automazione

OrbitPage dispone inoltre di una **Automation REST API** pensata per workflow, integrazioni e applicazioni esterne.

Token personali con scope specifici permettono di automatizzare operazioni senza condividere una sessione della dashboard. L'API può essere utilizzata da script, backend, pipeline CI/CD e piattaforme di automazione come n8n per lavorare programmaticamente con le funzionalità supportate del workspace.

Dashboard, REST API, MCP e ChatGPT rappresentano quindi interfacce differenti dello stesso prodotto: **visuale, programmatica e conversazionale**.

## SEO e AI discovery

OrbitPage include strumenti dedicati a **SEO, indicizzazione e discovery**, tra cui metadata, canonical URL, Open Graph, Twitter Card, dati strutturati e sitemap.

La dashboard permette inoltre di controllare file e direttive pubbliche come `robots.txt`, `llms.txt`, `humans.txt`, `ai.txt` e `security.txt`, con l'obiettivo di rendere la presenza pubblicata comprensibile non soltanto ai visitatori, ma anche ai motori di ricerca, crawler e nuovi sistemi di discovery basati su AI.

Sono supportati sia gli indirizzi OrbitPage gestiti sia, nei piani compatibili, domini personalizzati.

## Analytics, privacy e CMP

OrbitPage include analytics nativi per visite, visitatori, click, CTR, sorgenti di traffico, dispositivi, provenienza geografica e campagne. Per esigenze più avanzate è disponibile anche l'integrazione con Google Analytics 4.

Analytics, embed e strumenti di terze parti introducono anche esigenze di privacy. Per questo OrbitPage integra gestione delle policy, consenso, comportamento degli strumenti di tracking e supporto a soluzioni CMP esterne.

L'analytics è pensato come parte del ciclo del prodotto: **pubblicare → misurare → capire → migliorare**.

## Team, workspace, piani e billing

I workspace possono includere collaboratori con ruoli e permessi differenti, consentendo a più persone di lavorare sullo stesso progetto senza condividere credenziali. La piattaforma gestisce inoltre account, workspace, versioni della pagina, backup e ripristino.

La versione SaaS utilizza un modello freemium con piani progressivi. Billing, sottoscrizioni, limiti e capacità del workspace vengono gestiti direttamente dalla piattaforma; prezzi e limiti aggiornati rimangono sul sito ufficiale OrbitPage per evitare di duplicare informazioni commerciali soggette a variazioni.

## SaaS e open source

Uno degli aspetti più importanti del progetto è la presenza di due modalità di utilizzo.

**OrbitPage SaaS** offre account, hosting, storage, aggiornamenti e pubblicazione come servizio completamente gestito.

**OrbitPage Open Source** rende disponibile con licenza MIT un'edizione self-hosted installabile sulla propria infrastruttura tramite Docker. L'edizione open source mantiene il concetto centrale del prodotto — editor visuale, pagine pubbliche, personalizzazione, menu, analytics, privacy, SEO e gestione — mentre alcuni servizi della piattaforma managed rimangono specifici del SaaS.

Questo mi ha permesso di lavorare contemporaneamente sulle esigenze di un prodotto cloud multi-user e su quelle di un software realmente distribuibile e gestibile dall'utente.

## Engineering

OrbitPage non è solamente un'interfaccia frontend. Il progetto comprende una **web application full-stack**, servizi backend, autenticazione e autorizzazione, gestione dati e media, pubblicazione, API, integrazioni AI, pagamenti, analytics, sistemi di consenso e una pipeline di distribuzione del software.

L'architettura SaaS separa l'ambiente di gestione dalle pagine pubbliche e applica controlli di accesso e isolamento tra workspace. Per l'edizione open source ho lavorato anche sul ciclo di distribuzione: containerizzazione, installazione automatizzata, persistenza dei dati, aggiornamenti, backup, health check, deployment e rollback.

### Tecnologie principali

**TypeScript · React · Next.js · Node.js · Docker · REST API · OAuth · MCP · OpenAI · ChatGPT · Stripe · GitHub Actions · Cloud & Edge Services**

In questa pagina mantengo volutamente l'architettura a un livello generale: alcuni componenti infrastrutturali, servizi gestiti e dettagli di implementazione del SaaS non fanno parte della documentazione pubblica del progetto.

## Cosa mi ha richiesto costruire OrbitPage

OrbitPage è uno dei progetti in cui ho applicato il maggior numero di competenze differenti all'interno dello stesso prodotto.

**Product engineering** — dall'idea iniziale alla definizione delle funzionalità, UX della dashboard, modello SaaS, piani e progressiva evoluzione del prodotto.

**Full-stack development** — frontend, backend, API, gestione dello stato, autenticazione, dati, media e integrazione tra le componenti applicative.

**Cloud architecture** — progettazione di una piattaforma gestita con separazione tra control plane e contenuto pubblico, storage, distribuzione e servizi cloud.

**Cyber Security** — authentication e authorization, ruoli, isolamento dei workspace, OAuth, token con scope, protezione dei secret, validation, rate limiting e progettazione sicura delle integrazioni esterne.

**AI engineering** — integrazione di LLM in un prodotto reale, structured output, context management, validation, tool integration e workflow human-in-the-loop prima dell'applicazione delle modifiche.

**API & automation** — REST API, personal access token, MCP, plugin ChatGPT e integrazione con workflow esterni e strumenti di automazione.

**DevOps** — containerizzazione, CI/CD, release management, immagini multi-architecture, deployment, aggiornamenti, health check, backup e rollback.

**Privacy & analytics** — gestione del consenso, integrazione CMP, analytics proprietari e integrazione con servizi esterni.

**SaaS & payments** — subscription lifecycle, billing, entitlement e limiti dei piani, integrazione dei pagamenti e funzionalità commerce.

---

OrbitPage continua a evolversi come prodotto SaaS, progetto open source e piattaforma integrabile con strumenti AI.

**[Prova OrbitPage](https://orbitpage.com/) · [Apri OrbitPage in ChatGPT](https://chatgpt.com/plugins/plugin_asdk_app_6a72f9db2440819182e2a20ea276ce9b?q=orbitpage) · [Esplora la documentazione](https://orbitpage.com/it-IT/docs) · [GitHub](https://github.com/paoloronco/OrbitPage)**
