---
title: "OrbitPage"
summary: "Website builder visuale disponibile come SaaS e open source self-hosted: siti multi-pagina, contenuti, design, SEO, analytics, AI e automazioni in un unico workspace."
category: "tool"
stack: ["TypeScript", "React", "Next.js", "Node.js", "Firebase", "Cloudflare Workers", "R2", "Docker", "SQLite", "REST API", "OAuth", "MCP", "OpenAI", "Stripe", "GitHub Actions"]
problem: "Creare e gestire una presenza web completa richiede spesso CMS, hosting, strumenti di marketing e integrazioni separati, con complessità tecnica e operativa."
solution: "OrbitPage unisce editor visuale, pagine, pubblicazione, contenuti, analytics, integrazioni e AI in un workspace, utilizzabile come SaaS o in self-hosting."
outcome: "Una piattaforma website builder con un'edizione open source MIT e un servizio SaaS gestito, costruita attorno a un editor e renderer condivisi."
featured: true
order: 2
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

**OrbitPage è un website builder visuale** per creare, personalizzare e pubblicare siti web, landing page, portfolio, pagine per professionisti e attività locali. Nato da un'idea di link-in-bio, si è evoluto in un prodotto multi-pagina che integra contenuti, pubblicazione, strumenti di crescita, automazioni e AI senza richiedere di intervenire sul codice.

Il progetto comprende un **servizio SaaS gestito** e un'**edizione open source self-hosted con licenza MIT**, basati su componenti condivisi di editing e rendering, ma con infrastrutture e capacità specifiche.

**Il mio ruolo:** ideazione, product design, sviluppo full-stack, architettura cloud, cybersecurity, AI engineering, DevOps e gestione del prodotto.

## Un editor, molti tipi di siti

L'editor a blocchi permette di combinare testi, immagini, video, link, contatti, social, mappe, eventi, embed e call to action. Si possono creare **pagine multiple**, organizzare la navigazione, programmare la visibilità dei contenuti e personalizzare temi, colori, tipografia, layout e componenti con anteprima responsive.

OrbitPage supporta anche **menu digitali** con categorie, prodotti, varianti, prezzi e disponibilità, condivisibili via URL o QR code. Lo **Shop** aggiunge cataloghi di prodotti digitali e servizi, ordini e pagamenti tramite Stripe nelle edizioni compatibili.

## Pubblicazione, audience e crescita

La piattaforma integra SEO tecnico e metadati social, canonical URL, dati strutturati, sitemap e file di discovery come `robots.txt` e `llms.txt`. Comprende inoltre QR code, domini personalizzati nelle modalità supportate, analytics per visite e interazioni, integrazione opzionale con GA4 e strumenti di privacy e consenso/CMP.

Le funzionalità newsletter permettono di gestire iscritti, campagne e report dalla stessa dashboard. L'obiettivo è seguire l'intero ciclo **creare → pubblicare → misurare → migliorare**, evitando di moltiplicare i servizi necessari.

## AI, ChatGPT e automazioni

L'**AI Assistant** interpreta richieste in linguaggio naturale e prepara modifiche strutturate a profilo, contenuti e tema. Ho adottato un modello **review-first**: le proposte vengono validate e richiedono conferma prima di essere applicate, mantenendo distinta la pubblicazione.

Per il SaaS ho sviluppato anche una **Automation REST API** con token e permessi circoscritti, un'integrazione **MCP con OAuth** e un'app per **ChatGPT**. Un nodo community per **n8n** consente di integrare OrbitPage in workflow esterni. Dashboard, API e interfacce conversazionali sono modi differenti di operare sul prodotto, sempre nel rispetto delle autorizzazioni del workspace.

## Due edizioni, un nucleo condiviso

**OrbitPage Open Source** è un'applicazione self-hosted con frontend React/TypeScript, backend Node.js/Express, database SQLite e file locali. Si distribuisce con Docker, installer Linux o Proxmox e include gestione di utenti e ruoli, autenticazione a due fattori, backup, aggiornamenti e health check. L'utente mantiene il controllo dell'infrastruttura e dei dati.

**OrbitPage SaaS** aggiunge account e workspace gestiti, piani e billing, servizi cloud, integrazioni e pubblicazione amministrata. L'architettura separa il **control plane Next.js su Vercel**, con Firebase Authentication e Firestore, dal **public delivery su Cloudflare Workers e R2**: le pagine pubblicate sono servite come snapshot, senza interrogare Firestore o Vercel a ogni visita. Questo disaccoppiamento è una scelta centrale per prestazioni, scalabilità e isolamento dei componenti.

## Security e product engineering

La sicurezza attraversa l'intero progetto: autenticazione e MFA, ruoli e autorizzazioni per workspace, OAuth e token con scope, protezione dei secret, validazione lato server, rate limiting, controlli di pubblicazione e audit. Le integrazioni AI non ricevono privilegi impliciti e le operazioni sensibili rimangono soggette ai controlli applicativi.

OrbitPage mi ha permesso di affrontare l'intero ciclo di vita di un prodotto: **UX e sviluppo full-stack, cloud architecture, API e AI, CI/CD, containerizzazione, release, monitoraggio, backup e recovery, privacy, pagamenti e gestione SaaS**. Le due edizioni condividono il nucleo applicativo, mantenendo confini chiari tra codice pubblico, servizi managed e operatività interna.

---

**[Prova OrbitPage](https://orbitpage.com/) · [Documentazione](https://orbitpage.com/it-IT/docs) · [GitHub OSS](https://github.com/paoloronco/OrbitPage) · [OrbitPage in ChatGPT](https://chatgpt.com/plugins/plugin_asdk_app_6a72f9db2440819182e2a20ea276ce9b?q=orbitpage)**
