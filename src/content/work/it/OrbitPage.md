---
title: "OrbitPage"
summary: "OrbitPage è un page builder visuale per creare e pubblicare pagine personali, portfolio, siti per attività, menu, Shop e pagine collegate a QR code. È disponibile come servizio SaaS e come progetto open source self-hosted."
category: "tool"
stack: ["SaaS", "Open Source", "Cloud", "Docker", "REST API"]
problem: "Per pubblicare una presenza online curata, spesso bisogna scegliere tra strumenti troppo limitati e un sito tradizionale più impegnativo da realizzare e gestire."
solution: "Una dashboard visuale per costruire la pagina, organizzarne i contenuti, personalizzarne il design e gestire pubblicazione, pubblico e collaboratori."
outcome: "Un prodotto che sviluppo e mantengo in due edizioni: il servizio gestito OrbitPage e la versione open source installabile sulla propria infrastruttura."
featured: true
order: 3
draft: false
links:
  - label: "Scopri OrbitPage"
    href: "https://orbitpage.com/it-IT/product"
  - label: "Guarda le demo"
    href: "https://orbitpage.com/it-IT/demos"
  - label: "Codice open source"
    href: "https://github.com/paoloronco/OrbitPage"
---

## Creare e gestire una OrbitPage

OrbitPage è il page builder visuale che sviluppo e mantengo per creare una presenza online completa da una sola dashboard. Può essere usato per una pagina personale, un portfolio, il sito essenziale di un'attività, il menu di un locale, una pagina evento oppure uno Shop per prodotti digitali e servizi.

L'editor mostra subito la pagina mentre viene costruita. Si può partire da un tema, definire il profilo, aggiungere i contenuti necessari e adattare ogni sezione alla propria identità. La stessa dashboard raccoglie anche gli strumenti che servono dopo la creazione: pubblicazione, domini, SEO, analytics, privacy, newsletter, collaboratori e fatturazione.

OrbitPage è pensato per chi vuole occuparsi dei contenuti e del risultato, senza dover sviluppare un sito da zero ogni volta.

## La dashboard

Ho organizzato la dashboard in aree di lavoro separate, in modo che ogni attività abbia il proprio spazio e rimanga semplice da ritrovare anche quando la pagina cresce.

### Profilo, contenuti e design

Il profilo può rappresentare una persona, un'azienda o uno studio. Comprende nome, descrizione, immagine o logo, ruolo, contatti, social, favicon e informazioni mostrate dal browser e dai motori di ricerca.

I contenuti vengono aggiunti tramite blocchi visuali. Sono disponibili link, pulsanti, testo, titoli, immagini, video, social, contatti, mappe, eventi, callout, separatori, embed, moduli, prenotazioni e collegamenti interni. Ogni blocco può essere riordinato, configurato, nascosto o programmato; può avere un'icona, un'immagine di copertina, una call to action e impostazioni di layout proprie.

La personalizzazione parte da temi pronti, ma non si ferma al cambio di colore. Si possono regolare tipografia, spaziature, sfondo, card, bordi, angoli, ombre, trasparenze e molti altri dettagli. L'anteprima responsive usa lo stesso aspetto della pagina pubblicata e permette di controllare il risultato su smartphone, laptop e desktop.

L'interfaccia della dashboard è disponibile in 14 lingue e include anche il supporto RTL per l'arabo.

### Pagine e navigazione

Una OrbitPage può avere una home e più pagine dedicate. Ogni pagina secondaria dispone di un proprio indirizzo, titolo, descrizione e insieme di blocchi; i collegamenti interni permettono di costruire una navigazione coerente senza uscire dal progetto.

Questa struttura rende possibile separare, per esempio, portfolio, servizi, contatti ed eventi, oppure creare pagine specifiche per una campagna mantenendo lo stesso design della pagina principale.

### Menu e Shop

Il menu per ristoranti, bar e locali è gestito come contenuto strutturato. Si possono creare sezioni e sottosezioni, aggiungere prodotti con descrizioni, immagini, prezzi e varianti, indicarne la disponibilità e pubblicare un indirizzo dedicato al menu.

Con OrbitPage Shop si possono vendere file digitali e servizi prenotabili direttamente dalla pagina. Il venditore collega il proprio account Stripe, prepara il catalogo e definisce cosa riceverà il cliente; OrbitPage segue checkout, ordine e consegna protetta del contenuto acquistato. Lo Shop rimane integrato con il profilo e con gli altri contenuti, invece di richiedere un sito separato.

### Pubblicazione, domini e SEO

La pagina può essere pubblicata su un indirizzo OrbitPage oppure, nei piani compatibili, su un dominio personale. L'area Publish riunisce lo stato della pubblicazione, i QR code, la sitemap e i file dedicati alla visibilità online.

Per la SEO sono disponibili URL canonico, titolo e descrizione, anteprime Open Graph e Twitter Card, dati Schema.org e controllo dell'indicizzazione. OrbitPage genera `sitemap.xml` e permette di gestire `robots.txt`, `llms.txt`, `humans.txt`, `ai.txt`, `security.txt` e altri endpoint testuali.

I QR code possono essere scaricati in PNG o SVG, sia per lo schermo sia per la stampa. I QR smart mantengono lo stesso codice e cambiano destinazione in base all'orario impostato: un locale, per esempio, può mostrare automaticamente il menu del pranzo o quello della cena.

### Analytics, privacy e newsletter

Gli analytics mostrano visite, visitatori, click, CTR, sorgenti di traffico, dispositivi, paesi e campagne. È possibile affiancare Google Analytics 4 quando serve un'analisi esterna più ampia.

La gestione della privacy comprende policy, preferenze di consenso, Google Consent Mode e integrazione con CMP esterne. Gli embed che richiedono consenso rispettano le scelte del visitatore prima di caricare contenuti di terze parti.

La sezione Newsletter gestisce iscritti, consenso, campagne, programmazione e report di consegna usando il servizio email scelto dal proprietario del workspace. In questo modo la raccolta dei contatti e l'invio degli aggiornamenti rimangono collegati alla stessa pagina.

### Assistente AI, OpenAI MCP e API

L'assistente AI interno lavora sul profilo, sui contenuti e sul tema della pagina aperta. L'utente descrive il risultato che vuole ottenere; OrbitPage prepara le modifiche e le mostra in anteprima. Solo dopo la conferma vengono applicate alla pagina. La modifica manuale rimane sempre disponibile.

La stessa logica può essere usata da un client OpenAI compatibile attraverso l'integrazione MCP con OAuth. Il collegamento è associato a uno specifico workspace e alle sole autorizzazioni concesse; da lì si possono consultare i dati, preparare modifiche e, quando permesso, applicare, pubblicare o ripristinare una versione.

Per automazioni più ampie, il SaaS espone una REST API versionata con token personali e permessi granulari. Può essere collegata a script, backend, CI o n8n per lavorare su pagine, media, pubblicazione, domini, analytics, AI, Shop, newsletter e billing senza condividere una sessione della dashboard.

### Team, piani e fatturazione

Un workspace può essere gestito da più persone. Il proprietario invita i collaboratori, assegna ruoli e permessi e decide chi può modificare, pubblicare o amministrare le diverse aree. Chi collabora a più progetti può passare da un workspace all'altro con il proprio account, senza condividere credenziali.

OrbitPage SaaS offre i piani Free, Starter e Pro, con limiti e funzioni adatti a utilizzi diversi. Dall'account si gestiscono piano, rinnovo, fatture e stato dell'abbonamento; la [pagina prezzi](https://orbitpage.com/it-IT/pricing) mostra le differenze per blocchi, storage, domini, AI, Shop e collaborazione.

La dashboard include inoltre backup completi o selettivi, cronologia delle versioni pubblicate, ripristino e strumenti per individuare i media non più utilizzati.

## SaaS e open source

Ho sviluppato OrbitPage in due edizioni.

**OrbitPage SaaS** è il servizio pronto all'uso. Comprende registrazione, workspace, hosting, storage, aggiornamenti, pubblicazione, domini personali, piani e billing. È la scelta per chi vuole creare la pagina e occuparsi del progetto, lasciando a OrbitPage la gestione del servizio.

**OrbitPage Open Source** è l'edizione self-hosted con licenza MIT. Può essere installata con Docker su un server, una VM o un homelab e consente di mantenere sotto il proprio controllo applicazione e dati. Il repository pubblico contiene il prodotto utilizzabile, la documentazione di installazione e le procedure per aggiornamento, backup e ripristino.

Le due edizioni condividono l'esperienza principale di creazione e gestione della pagina; il SaaS aggiunge account, fatturazione, infrastruttura gestita e le funzioni pensate per il servizio hosted. I backup portabili permettono inoltre di trasferire contenuti e media tra installazioni compatibili.

## Sviluppo e manutenzione

OrbitPage è un prodotto in sviluppo continuo. Ne seguo la progettazione, l'interfaccia, la sicurezza, la documentazione, le release e l'operatività del servizio SaaS. La versione open source viene aggiornata attraverso release pubbliche, mentre la piattaforma gestita evolve insieme alle funzioni riservate agli account hosted.

La manutenzione comprende test, aggiornamenti di sicurezza, controllo degli accessi, autenticazione a due fattori, backup, ripristino e gestione degli errori. Il lavoro sul prodotto continua anche dopo la pubblicazione di una funzione: documentazione, compatibilità e affidabilità fanno parte della stessa attività.

OrbitPage raccoglie in un progetto reale le mie competenze di sviluppo, cloud, sicurezza, automazione e gestione di un servizio SaaS in produzione.
