---
title: "Lynx – Un Link Manager Open-Source e Self-Hosted"
description: "In un’epoca in cui la nostra identità digitale si distribuisce su decine di piattaforme, avere un punto di raccolta unico per i propri touchpoint diventa…"
pubDate: 2025-09-12
tags: []
draft: false
---
In un’epoca in cui la nostra identità digitale si distribuisce su decine di piattaforme, avere un punto di raccolta unico per i propri touchpoint diventa fondamentale.  
**Lynx** nasce con questa idea: un **link manager open-source, self-hosted**, che permette di creare una pagina personale dove raccogliere link, profilo e contenuti, con un design completamente personalizzabile e un sistema di autenticazione sicuro.

? **Demo pubblica (reset ogni 15 minuti):** [https://lynx-demo.up.railway.app/](https://lynx-demo.up.railway.app/)  
Credenziali: `admin / demo123`  
? **Produzione:** [https://lynx.paoloronco.it/](https://lynx.paoloronco.it/)  
? **Repository GitHub:** [paoloronco/Lynx](https://github.com/paoloronco/Lynx) – [paoloronco/Lynx-Demo](https://github.com/paoloronco/Lynx-Demo)

## ? Cosa fa Lynx

Lynx si propone come alternativa self-hosted a Linktree e servizi simili, con il vantaggio di essere **totalmente indipendente** e **personalizzabile**:

![](/posts/lynx-un-link-manager-open-source-e-self-hosted/Lynx-Ad1.png)

-   **Profilo e tema su misura** → colori, font, layout e stili definibili con un semplice JSON o tramite pannello admin.
-   **Gestione sicura dei link** → autenticazione basata su bcryptjs e JWT, protezione delle sessioni con cookie HttpOnly.
-   **Admin panel integrato** → gestione di link, bio e temi senza toccare codice.
-   **Database leggero** → SQLite, senza dipendenze da servizi esterni.
-   **Deploy flessibile** → compatibile con Railway, Render, Docker, Google Cloud Run, Digital Ocean, e molte altre piattaforme.

Il risultato è una **landing page personale responsive**, rapida da configurare e sicura da mantenere, ideale per creator, professionisti e brand.

* * *

## ? Competenze Tecniche Acquisite

Lo sviluppo e il deployment di Lynx hanno permesso di toccare con mano diverse aree del mondo **full-stack** e **DevOps**:

### ? Sviluppo Frontend & Backend

-   **Stack moderno**: React, Vite e Tailwind CSS per il frontend; Node.js, Express.js e SQLite lato server.
-   **Autenticazione e sicurezza**: password hashing (bcryptjs), JWT con scadenza, query parametriche su SQLite.
-   **Architettura self-contained**: nessuna dipendenza da database esterni o provider terzi.

### ? Deploy e CI/CD

-   **Railway & Render**: usati per la demo rapida e i test, con reset automatico del database ogni 15 minuti.
-   **Google Cloud Run**: scelta per la produzione, grazie a scalabilità automatica e costi ridotti.
    -   Configurazione di **Workload Identity Federation** per permettere a GitHub Actions di deployare senza chiavi statiche.
    -   **Artifact Registry** per buildare e salvare le immagini Docker.
    -   Mapping del dominio personalizzato `lynx.paoloronco.it` con Cloudflare e Google Domains.
-   **GitHub Actions**: pipeline CI/CD che builda l’app con Dockerfile e la rilascia automaticamente su Cloud Run ad ogni push su `main`.

### ? Best Practices DevOps

-   **Hardening della demo**: limitazioni su reset password e reset dati, rate-limiting e protezioni anti-bot.
-   **Automatizzazione totale del flusso**: dal commit al deploy live, senza interventi manuali.
-   **Pulizia del codice**: refactoring per eliminare dipendenze non più usate (Supabase, Firebase).

* * *

## ? Un Prodotto Open-Source, per Tutti

Lynx è rilasciato sotto **MIT License** e pensato per essere usato e modificato liberamente.  
Chiunque può forkarlo, adattarlo al proprio brand e deployarlo sul servizio preferito.

Oltre alla sua utilità pratica, Lynx rappresenta anche un **progetto di showcase**: un esempio di come sia possibile costruire un prodotto completo, sicuro e scalabile, unendo competenze di sviluppo e DevOps moderne.

* * *

## ? Link Utili

-   ? **Produzione** → [https://lynx.paoloronco.it/](https://lynx.paoloronco.it/)
-   ? **Demo (reset ogni 15 minuti)** → [https://lynx-demo.up.railway.app/](https://lynx-demo.up.railway.app/)
-   ? **Repository GitHub** → [Lynx](https://github.com/paoloronco/Lynx) | [Lynx-Demo](https://github.com/paoloronco/Lynx-Demo)
-   ? **Demo interattiva** → [Storylane](https://app.storylane.io/share/tjpm3tey6ven)

* * *

✍️ **In sintesi:** Lynx non è solo un link manager, ma un progetto che dimostra competenze reali nello sviluppo **full-stack** e nel **deployment cloud-native**.  
Un portfolio project che unisce design, sicurezza e automazione DevOps.
