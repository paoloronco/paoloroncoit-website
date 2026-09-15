---
title: "OrbitPage"
summary: "SaaS e piattaforma open source per creare, pubblicare e gestire una presenza digitale completa da un unico workspace."
category: "tool"
stack: ["TypeScript", "React", "Next.js", "Node.js", "Docker", "REST API", "OAuth", "MCP", "OpenAI", "Stripe", "GitHub Actions", "Cloud & Edge Services"]
problem: "Per presentare online identità, link, contenuti, contatti e servizi si finisce spesso per utilizzare diversi strumenti oppure costruire e mantenere un intero sito web."
solution: "OrbitPage concentra queste esigenze in un unico prodotto."
outcome: "Il prodotto è disponibile sia come servizio SaaS gestito, pronto all'uso, sia attraverso un core open source self-hosted."
featured: true
order: 3
draft: false
links:
  - label: "Prova OrbitPage"
    href: "https://orbitpage.com/"
  - label: "Esplora la documentazione"
    href: "https://orbitpage.com/it-IT/docs"
  - label: "Visualizza il progetto open source su GitHub"
    href: "https://github.com/paoloronco/OrbitPage"
---

OrbitPage nasce come alternativa più flessibile ai tradizionali strumenti link-in-bio e si è evoluto in una piattaforma completa per creator, professionisti, aziende e attività locali.

Da una singola dashboard è possibile costruire pagine pubbliche, organizzare contenuti e servizi, creare menu e pagine secondarie, vendere prodotti digitali, raccogliere iscritti, analizzare il traffico e integrare automazioni e strumenti AI.

Il prodotto è disponibile sia come **servizio SaaS gestito**, pronto all'uso, sia attraverso un **core open source self-hosted**.

**Ruolo:** ideazione, product design, sviluppo full-stack, cloud architecture, security, DevOps e gestione del prodotto.

---

## Da una link page a una presenza digitale completa

Il problema da cui è nato OrbitPage era semplice: per presentare online identità, link, contenuti, contatti e servizi si finisce spesso per utilizzare diversi strumenti oppure costruire e mantenere un intero sito web.

OrbitPage concentra queste esigenze in un unico prodotto.

Il workspace permette di partire da un profilo essenziale e trasformarlo progressivamente in una presenza digitale più articolata, mantenendo un'esperienza di gestione unica.

Il risultato può essere una link-in-bio page, un portfolio compatto, una digital business card, la pagina di un prodotto, un microsito professionale o la presenza digitale di un ristorante, bar o attività locale.

## Contenuti e pagine

Il cuore di OrbitPage è un editor visuale basato su blocchi riordinabili.

Link, testi, immagini, video, contatti, social, mappe, eventi, call to action, embed e altri componenti possono essere combinati liberamente e gestiti senza intervenire sul codice.

La piattaforma non è limitata a una singola pagina: i workspace compatibili possono creare **pagine secondarie con URL e contenuti indipendenti**, costruendo una piccola struttura multi-page all'interno dello stesso prodotto.

I contenuti possono inoltre essere nascosti, riordinati o programmati per essere pubblicati solamente durante uno specifico intervallo temporale.

### Menu per attività e locali

OrbitPage include anche un sistema dedicato alla creazione di menu digitali.

Ristoranti, bar e altre attività possono organizzare sezioni, categorie, prodotti, varianti, prezzi, immagini e disponibilità direttamente dalla dashboard, mantenendo menu e presenza pubblica nello stesso workspace.

Il risultato può essere condiviso tramite URL o QR code senza dover gestire un'applicazione separata.

## Design e personalizzazione

Ogni pagina può partire da temi predefiniti oppure essere adattata alla propria identità.

Il sistema di personalizzazione permette di intervenire su tipografia, colori, superfici, card, bordi, spaziatura, radius, ombre, immagini e background multimediali.

Profilo, logo o immagine personale, favicon, social, footer e altri elementi contribuiscono alla costruzione dell'identità della pagina.

Una preview responsive permette di verificare il risultato durante la configurazione prima della pubblicazione.

## Shop e pagamenti

OrbitPage integra un modulo **Shop** che permette di trasformare una pagina anche in un punto di vendita.

Il venditore può collegare Stripe, creare un catalogo e vendere prodotti digitali o servizi direttamente dalla propria presenza OrbitPage.

Catalogo, checkout e gestione dell'acquisto fanno quindi parte dello stesso ecosistema utilizzato per contenuti, audience e pubblicazione.

L'obiettivo non è costruire un e-commerce generalista, ma permettere a creator e professionisti di monetizzare prodotti e servizi senza dover integrare una piattaforma separata.

## Newsletter e audience

I workspace compatibili possono raccogliere iscritti e gestire campagne newsletter direttamente dalla dashboard.

Il sistema comprende gestione del consenso, subscriber list, configurazione del proprio servizio email, creazione e programmazione delle campagne e metriche di consegna e interazione.

OrbitPage può quindi accompagnare l'intero percorso **visitatore → subscriber → cliente**, mantenendo contenuti, audience e strumenti di crescita nello stesso workspace.

## AI Assistant

L'intelligenza artificiale è integrata direttamente nel processo di gestione della pagina.

**OrbitPage AI** può comprendere il contenuto e la configurazione del workspace e proporre modifiche a profilo, contenuti e design attraverso istruzioni in linguaggio naturale.

L'AI non modifica direttamente la pagina pubblica: le operazioni vengono trasformate in proposte strutturate che l'utente può controllare prima di applicarle.

Ho progettato questo flusso secondo un approccio **review-first**, mantenendo separati suggerimento AI, modifica del workspace e pubblicazione.

Questo consente di utilizzare un LLM come interfaccia operativa senza delegargli automaticamente il controllo del contenuto pubblico.

## OpenAI e Model Context Protocol

Lo stesso modello di interazione è disponibile anche esternamente attraverso un'integrazione **MCP (Model Context Protocol)**.

Un client OpenAI compatibile può collegarsi a uno specifico workspace OrbitPage tramite autorizzazione OAuth e utilizzare un insieme controllato di operazioni.

In questo modo è possibile, per esempio, interrogare la configurazione della propria pagina, preparare modifiche, revisionarle e gestire il ciclo di pubblicazione attraverso un'interfaccia conversazionale.

Permessi e workspace vengono delimitati durante l'autorizzazione e l'accesso può essere revocato.

MCP non sostituisce la dashboard: espone intenzionalmente solamente una parte controllata delle capacità della piattaforma.

## API e automazione

OrbitPage dispone inoltre di una **Automation REST API** pensata per workflow, integrazioni e applicazioni esterne.

Token personali con scope specifici permettono di automatizzare operazioni senza condividere una sessione della dashboard.

L'API può essere utilizzata da script, backend, pipeline CI/CD e piattaforme di automazione come n8n per lavorare programmaticamente con diverse funzioni del workspace, dalla gestione e pubblicazione dei contenuti fino alle funzionalità SaaS supportate.

Dashboard, API e MCP rappresentano quindi tre interfacce differenti dello stesso prodotto: visuale, programmatica e conversazionale.

## SEO e AI discovery

La pubblicazione non termina con la generazione della pagina.

OrbitPage include strumenti dedicati a **SEO, indicizzazione e discovery**, tra cui configurazione dei metadata, canonical URL, Open Graph, Twitter Card, dati strutturati e sitemap.

La dashboard permette inoltre di controllare file e direttive pubbliche come:

- `robots.txt`
- `llms.txt`
- `humans.txt`
- `ai.txt`
- `security.txt`

L'obiettivo è rendere la presenza pubblicata comprensibile non soltanto ai visitatori, ma anche ai motori di ricerca, crawler e nuovi sistemi di discovery basati su AI.

Sono supportati sia gli indirizzi OrbitPage gestiti sia, nei piani compatibili, domini personalizzati.

## Analytics

OrbitPage include un sistema di analytics nativo per comprendere come viene utilizzata una pagina.

Visite, visitatori, click, CTR, sorgenti di traffico, dispositivi, provenienza geografica e campagne permettono di valutare le performance senza dover necessariamente installare una piattaforma esterna.

Per esigenze più avanzate è disponibile anche l'integrazione con Google Analytics 4.

L'analytics è stato pensato come parte del ciclo del prodotto: **pubblicare → misurare → capire → migliorare**.

## Privacy, consenso e CMP

Analytics, embed e strumenti di terze parti introducono inevitabilmente anche esigenze di privacy.

Per questo OrbitPage integra gestione delle policy, consenso, comportamento degli strumenti di tracking e supporto a soluzioni CMP esterne.

La configurazione privacy viene gestita dallo stesso workspace utilizzato per pubblicare la pagina, evitando che diventi un elemento aggiunto solamente a valle.

## Team e workspace

OrbitPage non è progettato esclusivamente per utenti individuali.

I workspace possono includere collaboratori con ruoli e permessi differenti, consentendo a più persone di lavorare sullo stesso progetto senza condividere credenziali.

La piattaforma gestisce inoltre account, workspace, versioni della pagina, backup e ripristino, offrendo strumenti operativi che diventano necessari quando una pagina passa da semplice esperimento a presenza utilizzata realmente.

## Piani e billing

La versione SaaS utilizza un modello freemium con **Free, Starter e Pro**, affiancato da una futura offerta dedicata alle agenzie.

I diversi livelli aumentano progressivamente capacità come numero di contenuti e pagine, storage, personalizzazione, analytics, AI, newsletter, Shop, collaboratori e utilizzo di domini personalizzati.

Billing, sottoscrizioni, limiti e capacità del workspace vengono gestiti direttamente dalla piattaforma.

I prezzi e i limiti vengono aggiornati nel sito ufficiale OrbitPage, evitando di duplicare informazioni commerciali soggette a variazioni all'interno di questa pagina progetto.

## SaaS e open source

Uno degli aspetti che considero più importanti del progetto è la presenza di due modalità di utilizzo.

**OrbitPage SaaS** offre account, hosting, storage, aggiornamenti e pubblicazione come servizio completamente gestito.

**OrbitPage Open Source** rende invece disponibile con licenza MIT un'edizione self-hosted che può essere installata sulla propria infrastruttura tramite Docker.

L'edizione open source mantiene il concetto centrale del prodotto — editor visuale, pagine pubbliche, personalizzazione, menu, analytics, privacy, SEO e gestione — mentre alcuni servizi legati alla piattaforma managed rimangono specifici del SaaS.

Questo mi ha permesso di lavorare contemporaneamente sulle esigenze di un prodotto cloud multi-user e su quelle di un software realmente distribuibile e gestibile dall'utente.

## Engineering

OrbitPage non è solamente un'interfaccia frontend.

Il progetto comprende una **web application full-stack**, servizi backend, autenticazione e autorizzazione, gestione dati e media, pubblicazione, API, integrazioni AI, pagamenti, analytics, sistemi di consenso e una pipeline di distribuzione del software.

L'architettura SaaS è stata progettata separando l'ambiente di gestione dalle pagine pubbliche e applicando controlli di accesso e isolamento tra i diversi workspace.

Per l'edizione open source ho lavorato anche sul ciclo completo di distribuzione: containerizzazione, installazione automatizzata, persistenza dei dati, aggiornamenti, backup, health check e procedure di deployment e rollback.

### Tecnologie principali

**TypeScript · React · Next.js · Node.js · Docker · REST API · OAuth · MCP · OpenAI · Stripe · GitHub Actions · Cloud & Edge Services**

In questa pagina mantengo volutamente l'architettura a un livello generale: alcuni componenti infrastrutturali, servizi gestiti e dettagli di implementazione del SaaS non fanno parte della documentazione pubblica del progetto.

## Cosa mi ha richiesto costruire OrbitPage

OrbitPage è uno dei progetti in cui ho applicato il maggior numero di competenze differenti all'interno dello stesso prodotto.

**Product engineering**

Dall'idea iniziale alla definizione delle funzionalità, UX della dashboard, modello SaaS, piani e progressiva evoluzione del prodotto.

**Full-stack development**

Frontend, backend, API, gestione dello stato, autenticazione, dati, media e integrazione tra le diverse componenti applicative.

**Cloud architecture**

Progettazione di una piattaforma gestita con separazione tra control plane e contenuto pubblico, storage, distribuzione e servizi cloud.

**Cyber Security**

Authentication e authorization, gestione dei ruoli, isolamento dei workspace, OAuth, token con scope, protezione dei secret, validation, rate limiting e progettazione sicura delle integrazioni esterne.

**AI engineering**

Integrazione di LLM all'interno di un prodotto reale, structured output, context management, validation e workflow human-in-the-loop prima dell'applicazione delle modifiche.

**API & automation**

REST API, personal access token, MCP e integrazione con workflow esterni e strumenti di automazione.

**DevOps**

Containerizzazione, CI/CD, release management, immagini multi-architecture, deployment, aggiornamenti, health check, backup e rollback.

**Privacy & analytics**

Gestione del consenso, integrazione CMP, analytics proprietari e integrazione con servizi esterni.

**SaaS & payments**

Subscription lifecycle, billing, entitlement e limiti dei piani, integrazione dei pagamenti e funzionalità commerce.

---

OrbitPage continua a evolversi come prodotto SaaS e progetto open source.

**[Prova OrbitPage](https://orbitpage.com/) · [Esplora la documentazione](https://orbitpage.com/it-IT/docs) · [Visualizza il progetto open source su GitHub](https://github.com/paoloronco/OrbitPage)**
