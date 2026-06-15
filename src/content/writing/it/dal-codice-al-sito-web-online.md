---
title: "Dal Codice al Sito Web Online"
description: "Lo sviluppo di un sito web tramite codice richiede competenze nella programmazione web, conoscenze approfondite di linguaggi come HTML, CSS, JavaScript e…"
pubDate: 2023-12-02
tags: ["kali-linux","proxmox","web"]
draft: false
---
Lo sviluppo di un sito web tramite codice richiede competenze nella programmazione web, conoscenze approfondite di linguaggi come HTML, CSS, JavaScript e altri, insieme a familiarità nell'uso di server, FTP e altri strumenti. Questa guida dettagliata illustrerà il processo completo per portare online un sito web sviluppato manualmente, dalla scelta del dominio all'hosting e alla messa online dei file.

## 1\. Acquisto del Dominio:
Il primo passo è l'acquisto di un dominio presso un registrar di domini come GoDaddy, Namecheap o altri. Il dominio è l'indirizzo web del tuo sito (es. [www.tuosito.com](http://www.tuosito.com/)).

## 2\. Scelta dell'Hosting:
L'hosting è lo spazio sul web dove verranno ospitati i file del tuo sito. Puoi optare per hosting condiviso (Linux o Windows) o il self-hosting utilizzando servizi come AWS, DigitalOcean o un server personale.

-   **Hosting condiviso Linux vs Windows vs Self-Hosting con CloudFlare:**
    -   L'hosting condiviso Linux è popolare per la sua affidabilità, sicurezza e supporto per linguaggi di programmazione come PHP e MySQL. È ideale per la maggior parte dei siti web.  
        Con provider come Aruba, Register, OVHcloud, Siteground, GoDaddy, si aggirano intorno ai 30€/anno.
    -   L'hosting Windows è specifico per siti che richiedono ASP.NET o altre tecnologie specifiche di Microsoft.  
        Solitamente leggermente più costoso, siamo intorno ai 30-40€/anno.
    -   Il self-hosting con CloudFlare offre maggiore controllo e flessibilità, permettendoti di gestire il server da casa o da un provider cloud.  
        nizialmente 0€/anno. Tuttavia, considerando il mantenimento di un server personale, è necessario considerare il costo dell'acquisto del server, l'energia e la manutenzione. CloudFlare offre un piano base gratuito per siti piccoli, ma per siti più avanzati potrebbe comportare dei costi aggiuntivi.

## 3\. Connettività FTP e Caricamento dei File:
Una volta acquistato l'hosting, è necessario utilizzare un client FTP come FileZilla per connettersi al server e caricare i file del sito web. Questo processo richiede l'indirizzo IP del server, nome utente e password forniti dall'hosting.

## 4\. Configurazione DNS e CloudFlare:
I DNS (Domain Name System) sono un sistema che traduce gli indirizzi web in indirizzi IP, consentendo ai browser di trovare i siti web. Spesso, con hosting Windows/Linux presso provider come Aruba, Register, OVHcloud, siteground, GoDaddy, i DNS sono preconfigurati e non richiedono modifiche, a meno che non si desideri utilizzare servizi avanzati come quelli offerti da CloudFlare.

## 5\. GitHub e Template Predefiniti:
Piattaforme come GitHub offrono template e progetti pronti all'uso. Gli sviluppatori possono scaricare un progetto esistente, personalizzarlo e caricarlo sul proprio server.

## Caso di Studio: Hosting e Messa Online dei Siti di Paolo Ronco:

-   Il sito [https://prportfolio.paoloronco.it](https://prportfolio.paoloronco.it/) è in hosting su un container Ubuntu in un server personale di Paolo, messo online tramite CloudFlare.
-   Il sito [https://paoloronco.it](https://paoloronco.it/) è ospitato tramite Aruba, e sviluppato manualmente da Paolo.

In conclusione, portare online un sito sviluppato tramite codice richiede una serie di passaggi tecnici, ma seguendo questa guida è possibile rendere il proprio sito web accessibile e visibile a livello mondiale. La scelta dell'hosting, la configurazione del dominio e l'uso di strumenti come FTP e CloudFlare sono cruciali per il successo del progetto.
