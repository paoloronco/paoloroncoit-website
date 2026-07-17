---
title: "OrbitPage"
summary: "Alternativa a Linktree ad alta personalizzazione, disponibile come progetto open source MIT e come servizio SaaS gestito."
category: "tool"
stack: ["TypeScript", "Next.js", "Firebase", "Cloudflare", "Docker"]
problem: "Gli strumenti link-in-bio commerciali non offrivano il livello di personalizzazione, controllo e portabilità che cercavo."
solution: "Ho costruito un page builder open source e self-hosted, trasformandolo poi anche in un SaaS con account, workspace isolati, hosting, pubblicazione e domini personalizzati."
outcome: "Un prodotto OSS + SaaS che consente a creator, professionisti, aziende e locali di pubblicare una pagina ricca e riconoscibile senza dover gestire un CMS completo."
featured: true
order: 3
draft: false
links:
  - label: "Sito e SaaS"
    href: "https://orbitpage.com/"
  - label: "Dashboard"
    href: "https://orbitpage.com/dashboard"
  - label: "Codice open source"
    href: "https://github.com/paoloronco/OrbitPage"
---

## Da esigenza personale a prodotto SaaS

OrbitPage nasce perché le soluzioni commerciali esistenti non mi permettevano di personalizzare davvero una pagina link-in-bio. Il progetto è cresciuto da alternativa open source e self-hosted a un prodotto con due modalità complementari: il core, rilasciato con licenza MIT, può essere ispezionato, modificato e ospitato in autonomia; il servizio gestito aggiunge tutta l'infrastruttura necessaria per iniziare subito.

Non è soltanto una raccolta di pulsanti. OrbitPage tratta il profilo pubblico come un piccolo sito one-page, capace di combinare identità, contenuti, contatti, media e call to action in un layout responsive e altamente personalizzabile.

## I tre domini del servizio

- **[orbitpage.com](https://orbitpage.com/)** è il sito vetrina e commerciale, con informazioni sul prodotto, confronto dei piani, registrazione, login e accesso gratuito.
- **[orbitpage.com/dashboard](https://orbitpage.com/dashboard)** è l'area di gestione in cui ogni utente modifica e pubblica la propria pagina.
- **orbitpage.net/slug_url** ospita i profili pubblici. I piani che lo prevedono possono collegare anche un dominio personale.

Nel SaaS l'autenticazione e i workspace degli utenti sono gestiti in modo isolato. Le pagine pubblicate vengono trasformate in HTML e asset statici e distribuite tramite Cloudflare, separando il lavoro dinamico dell'editor dalla navigazione veloce dei visitatori.

## Funzioni principali

### Profilo

È possibile impostare il nome personale, dell'azienda o del locale, aggiungere una descrizione e collegare i propri canali — tra cui LinkedIn, Instagram, GitHub, email e WhatsApp. OrbitPage genera il QR code della pagina e permette di personalizzare la card profilo, inclusi immagine, colori, tema, bordi, forma e gerarchia visiva.

### Blocchi di contenuto

La pagina può combinare e riordinare blocchi **link, CTA, heading, separator, maps, contact, social row, callout, list, event, embed, text, image e video**. I contenuti possono essere nascosti oppure programmati per apparire e scomparire in date specifiche, in base al piano scelto.

### Temi e personalizzazione

Temi e stili delle card già pronti permettono di partire rapidamente. Per il fine tuning si possono controllare nel dettaglio colori, profilo, card e sfondo, inclusi gradienti, immagini, GIF e video, mantenendo la stessa resa tra anteprima desktop, mobile e pagina pubblicata.

### Dati, analytics e pubblicazione

- Backup e ripristino della configurazione.
- Analytics integrate per visualizzare i click, con report avanzati e collegamento a Google Analytics 4 nei piani compatibili.
- Gestione delle policy legali, tra cui privacy policy e cookie policy.
- Modifica dei file esposti ai crawler, come `robots.txt` e `llms.txt`.
- Generazione della sitemap e controlli SEO su titolo, descrizione e indicizzazione.

## Piani del servizio gestito

Il core open source resta gratuito da ospitare in autonomia. I piani seguenti riguardano il SaaS e coprono account, storage, pubblicazione, delivery e funzioni della piattaforma.

| Piano | Prezzo | URL e capacità | Funzioni principali |
| --- | --- | --- | --- |
| **Free** | €0 | `orbitpage.net/nome`, 8 blocchi, 10 MB di storage, file fino a 2 MB | Temi essenziali, click di base, badge OrbitPage incluso; niente video upload, SEO o scheduling |
| **Starter** | €4,50/mese | `orbitpage.net/nome`, 40 blocchi, 50 MB di storage, file fino a 2 MB | Temi premium, analytics standard, SEO di base, badge rimosso; niente video upload o scheduling |
| **Pro** | €7,50/mese | Dominio personale, 150 blocchi, 250 MB di storage, file fino a 4 MB | Temi e SEO avanzati, analytics avanzate + GA4, scheduling, video fino a 50 MB, badge rimosso, 5 collaboratori |
| **Agencies** | In arrivo | Dominio, blocchi, storage e limiti personalizzati | Temi, SEO e analytics avanzati + GA4, scheduling e collaboratori personalizzati |

## Piano per ristoranti, bar e locali

Per i locali è disponibile un'offerta dedicata che include **blocchi senza limite, storage generoso, video upload, hosting, SEO presente e ottimizzata**, oltre alla nostra assistenza diretta per personalizzare e migliorare la pagina. Il piano mantiene l'URL OrbitPage e il badge del prodotto: non comprende il dominio personalizzato né la rimozione del branding, così la pagina pubblica contribuisce anche a far conoscere il servizio.

Questa formula è pensata per riunire in una singola destinazione menu, mappa, contatti, eventi, social, immagini, video e call to action, accessibile anche tramite QR code.
