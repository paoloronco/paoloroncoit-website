---
title: "OrbitPage"
summary: "Page builder visuale per creare, personalizzare e pubblicare pagine professionali, siti one-page, menu, portfolio ed esperienze collegate a QR code. Disponibile come SaaS gestito e open source self-hosted."
category: "tool"
stack: ["TypeScript", "React", "Next.js", "Firebase", "Cloudflare", "Docker"]
problem: "I link-in-bio sono troppo limitati, mentre un sito tradizionale richiede tempo, competenze e manutenzione sproporzionati per molte esigenze reali."
solution: "Un editor visuale a blocchi che unisce contenuti, design, pagine, menu, pubblicazione, analytics, SEO e automazioni in un solo prodotto."
outcome: "Un prodotto attivamente mantenuto in due edizioni: SaaS pronto all'uso e core open source MIT per chi vuole installarlo sulla propria infrastruttura."
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

## Un page builder, non una lista di link

Ho creato **OrbitPage** per coprire lo spazio tra un link-in-bio e un sito tradizionale: abbastanza semplice da pubblicare in pochi minuti, abbastanza completo da diventare la presenza online di un professionista, un'attività o un locale.

Il link-in-bio è solo il caso d'uso più immediato. Con OrbitPage si possono costruire **portfolio, digital business card, pagine prodotto, micrositi aziendali, menu per locali, pagine evento e landing page**, mantenendo lo stesso sistema visuale e la stessa qualità su smartphone e desktop.

Non si parte dal codice e non si rimane chiusi in un template. Si compone la pagina, si vede subito il risultato reale e si pubblica.

## Cosa si può costruire

### Contenuti che vanno oltre i pulsanti

L'editor offre blocchi per link e call to action, ma anche testo, heading, immagini, video nativi, social, contatti, mappe, eventi, callout, separatori ed embed con consenso. Ogni blocco può essere riordinato, nascosto, programmato, personalizzato e collegato a icone o media di copertina.

La home può affiancare **pagine dedicate con slug, titolo, descrizione e contenuti indipendenti**. Per ristoranti, bar e attività hospitality c'è un vero editor di menu: sezioni, sottosezioni, prodotti, varianti, immagini, prezzi e disponibilità. Non serve adattare una lista di link a qualcosa per cui non è stata progettata.

### Design con controllo reale

I temi pronti consentono di partire rapidamente; l'editor permette poi di intervenire su colori, tipografia, spaziature, superfici, bordi, raggi, ombre, blur, sfondi e singole card. Immagini, gradienti, GIF e video possono diventare parte dell'identità visiva della pagina.

L'anteprima usa lo stesso renderer della pagina pubblica: quello che si modifica è ciò che vedrà il visitatore, nelle viste mobile, laptop e desktop.

### Pubblicazione, SEO e QR sono parte del prodotto

OrbitPage genera metadati canonici, Open Graph e Twitter Card, dati Schema.org, sitemap e direttive di indicizzazione. Dalla dashboard si gestiscono anche `robots.txt`, `llms.txt`, `humans.txt`, `ai.txt`, `security.txt` ed endpoint testuali personalizzati.

I QR code sono esportabili in PNG e SVG, con preset per schermo e stampa. I **QR smart** mantengono lo stesso codice ma possono cambiare destinazione in base all'ora locale: per esempio, un ristorante può aprire automaticamente il menu pranzo o cena.

Analytics integrati, contatori di click e CTA, Google Analytics 4, consent mode e CMP esterne completano il percorso dalla pubblicazione alla misurazione.

### AI e automazioni, con controllo esplicito

OrbitPage AI può preparare modifiche a profilo, contenuti e tema partendo dalla pagina aperta. Non scrive direttamente: produce un piano preciso, lo mostra nell'editor e applica solo le operazioni confermate dall'utente, dopo aver ricontrollato permessi e versione della pagina.

Nel servizio gestito ho aggiunto anche un'**API di automazione**, token con permessi granulari, integrazione MCP tramite OAuth e un nodo community per n8n. Contenuti, media, pubblicazione, analytics, domini, backup e altre operazioni possono così entrare in workflow reali senza rinunciare ai controlli di sicurezza.

## SaaS gestito e open source self-hosted

OrbitPage è un unico prodotto distribuito in due modi, pensati per esigenze diverse.

| | **OrbitPage SaaS** | **OrbitPage Open Source** |
| --- | --- | --- |
| Ideale per | Chi vuole creare e pubblicare subito | Chi vuole pieno controllo su codice e dati |
| Infrastruttura | Account, hosting, storage, aggiornamenti e distribuzione gestiti | Un container con applicazione, SQLite e storage locale |
| Pubblicazione | URL OrbitPage, CDN e dominio personale nei piani compatibili | Dominio e reverse proxy gestiti sulla propria infrastruttura |
| Operatività | Piani Free, Starter e Pro, team, API e funzioni hosted | Licenza MIT, Docker, Compose, installer Linux e Proxmox |

La versione open source non è un export dimostrativo del SaaS: è un'edizione utilizzabile e documentata, con editor React e TypeScript, backend Express, database SQLite, upload locali, migrazioni e backup portabili. Si installa sul proprio server o homelab senza dipendere da un database esterno.

Il SaaS aggiunge ciò che richiede un servizio cloud: registrazione e billing, isolamento dei workspace, storage gestito, quote, domini personalizzati, automazioni e operazioni multi-tenant. Le pagine pubblicate vengono distribuite come HTML e asset statici tramite Cloudflare, separando il traffico dei visitatori dal control plane dinamico.

I backup con media possono passare tra OSS e SaaS: la libertà di self-hosting non è soltanto dichiarata, è prevista nel formato dei dati.

## Un prodotto che continuo a sviluppare

OrbitPage non è un'app generata con l'AI e lasciata su GitHub. È un prodotto che **progetto, sviluppo, distribuisco e mantengo attivamente**, sia nella versione pubblica sia nel servizio commerciale.

Il repository open source riceve release versionate, correzioni e patch di sicurezza. La pipeline verifica lint, build, test unitari ed end-to-end con Playwright; le immagini Docker multi-arch per AMD64 e ARM64 vengono pubblicate su Docker Hub e GitHub Container Registry. Documentazione operativa, health check, backup e ripristino, aggiornamenti e rollback fanno parte del progetto quanto l'interfaccia.

Sul fronte applicativo ho integrato utenti multipli con permessi limitati, autenticazione a due fattori TOTP, gestione del consenso, validazione degli upload, cifratura dei segreti e migrazioni additive. Sono scelte nate dall'esperienza in **cloud, security, DevSecOps e automazione** e dal lavoro necessario per tenere online un servizio usato da persone reali.

OrbitPage è la sintesi di queste competenze: non una demo tecnica presentata come prodotto, ma un prodotto completo che ha anche scelto di avere un'edizione open source.
