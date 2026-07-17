---
title: "OrbitPage"
summary: "Piattaforma per creare e pubblicare una pagina personale o professionale, personalizzabile in ogni dettaglio e pronta da condividere con link o QR code."
category: "tool"
stack: ["TypeScript", "Next.js", "Firebase", "Cloudflare", "Docker"]
problem: "Presentare online link, contenuti, contatti e servizi spesso richiede strumenti separati oppure un sito completo, anche quando basterebbe una sola pagina ben costruita."
solution: "OrbitPage riunisce profilo, contenuti, media e call to action in un editor visuale a blocchi, con temi pronti e controlli di personalizzazione avanzati."
outcome: "Un prodotto utilizzabile subito come SaaS oppure installabile in autonomia grazie al core open source, adatto a persone, aziende e locali."
featured: true
order: 3
draft: false
links:
  - label: "Apri OrbitPage"
    href: "https://orbitpage.com/"
  - label: "Dashboard"
    href: "https://orbitpage.com/dashboard"
  - label: "Codice open source"
    href: "https://github.com/paoloronco/OrbitPage"
---

## Una pagina, tutto ciò che serve

OrbitPage permette di costruire una pagina pubblica completa senza dover creare e mantenere un sito tradizionale. In un unico spazio si possono presentare identità, attività, link, contenuti, contatti, eventi e media, con un risultato ottimizzato per desktop e mobile.

Può diventare il punto di accesso principale per un creator o un professionista, una pagina compatta per un prodotto o un'azienda, oppure la destinazione digitale di un ristorante, bar o locale. Ogni pagina è raggiungibile tramite URL e QR code.

## Dalla configurazione alla pubblicazione

### Profilo

Nome personale, azienda o locale, descrizione, immagine e collegamenti social come LinkedIn, Instagram, GitHub, email e WhatsApp. La card profilo può essere adattata intervenendo su colori, bordi, forma dell'immagine e gerarchia degli elementi.

### Contenuti

L'editor usa blocchi riordinabili: **link, CTA, heading, separator, maps, contact, social row, callout, list, event, embed, text, image e video**. I contenuti possono essere nascosti o programmati per comparire solo nel periodo desiderato.

### Aspetto

Temi e stili delle card pronti all'uso offrono una base immediata. Chi vuole un'identità più precisa può controllare colori, card e sfondo nel dettaglio, usando anche gradienti, immagini, GIF e video. L'anteprima mostra lo stesso risultato che verrà pubblicato, sia su desktop sia su mobile.

### Gestione e visibilità

OrbitPage include analytics dei click e, nei piani compatibili, report avanzati e Google Analytics 4. Dalla dashboard si gestiscono anche backup e ripristino, privacy policy, cookie policy, sitemap, impostazioni SEO e file come `robots.txt` e `llms.txt`.

## SaaS o self-hosted

OrbitPage può essere usato in due modi, mantenendo lo stesso prodotto alla base:

- **SaaS gestito:** account, hosting, storage, pubblicazione e distribuzione sono già inclusi. Basta registrarsi e creare la pagina.
- **Open source:** il core è pubblicato con licenza MIT e può essere installato, modificato e ospitato sulla propria infrastruttura.

In questo modo chi cerca semplicità può usare il servizio gestito, mentre chi vuole controllo sul codice e sul deployment può scegliere la versione self-hosted.

## Piani SaaS

| Piano | Prezzo | Cosa include |
| --- | --- | --- |
| **Free** | €0 | URL `orbitpage.net`, 8 blocchi, 10 MB di storage, temi essenziali e analytics dei click. Badge OrbitPage incluso. |
| **Starter** | €4,50/mese | 40 blocchi, 50 MB di storage, temi premium, analytics standard, SEO di base e rimozione del badge. |
| **Pro** | €7,50/mese | Dominio personale, 150 blocchi, 250 MB di storage, video upload, temi e SEO avanzati, scheduling, GA4 e 5 collaboratori. |
| **Agencies** | In arrivo | Limiti, storage, dominio e collaboratori configurabili in base alle esigenze. |

## Per ristoranti, bar e locali

L'offerta dedicata ai locali include **blocchi senza limite, storage generoso, video upload, hosting e SEO ottimizzata**, insieme al nostro supporto per impostare, personalizzare e migliorare la pagina.

È pensata per raccogliere menu, mappa, contatti, eventi, social, immagini, video e call to action in una destinazione unica da collegare anche a un QR code. Il piano mantiene l'URL e il badge OrbitPage; non comprende il dominio personalizzato né la rimozione del branding.

## Sotto il cofano

Il servizio separa le diverse fasi del prodotto su domini dedicati:

- **[orbitpage.com](https://orbitpage.com/)** presenta il prodotto e gestisce registrazione e accesso.
- **[orbitpage.com/dashboard](https://orbitpage.com/dashboard)** ospita l'editor e la gestione della pagina.
- **orbitpage.net/slug_url** distribuisce i profili pubblici; il piano Pro può collegare un dominio personale.

Nel SaaS, autenticazione e workspace sono isolati per ogni account. Le pagine pubblicate vengono generate come HTML e asset statici e distribuite tramite Cloudflare, mantenendo l'editor dinamico separato dalla navigazione dei visitatori. Il progetto combina TypeScript, Next.js, Firebase e Cloudflare; la versione open source può essere distribuita anche tramite Docker.
