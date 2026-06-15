---
title: "SubDomain TakeOver: Vulnerabilità dei sottodomini"
description: "un sottodominio non più utilizzato o non correttamente configurato da parte del proprietario del dominio principale. Questo scenario può essere sfruttato da…"
pubDate: 2023-12-08
tags: ["security","web"]
draft: false
---
un sottodominio non più utilizzato o non correttamente configurato da parte del proprietario del dominio principale. Questo scenario può essere sfruttato da terzi per eseguire attacchi mirati, quali phishing o distribuzione di malware.

## Cos'è un sottodominio:
Un sottodominio è un'entità che fa parte di un dominio principale e ne estende l'indirizzo web principale. Si tratta di una suddivisione logica del dominio di primo livello che consente di organizzare e strutturare ulteriormente il sito web principale.  
Ad esempio, nel caso di [https://prportfolio.paoloronco.it](https://prportfolio.paoloronco.it/), "prportfolio" è il sottodominio, mentre "paoloronco.it" rappresenta il dominio principale. Questo tipo di organizzazione consente di creare sezioni specifiche o di allocare risorse dedicate all'interno del sito principale, come ad esempio un blog, un negozio online o altre sezioni tematiche, mantenendo comunque un legame diretto con il dominio principale.

## Strumenti di Ricerca di Sottodomini:
Esistono diversi strumenti su Linux che consentono di individuare i sottodomini associati a un dominio principale. Tra questi, lo strumento più utilizzato è "Sublist3r" che esegue una scansione approfondita per identificare tutti i sottodomini collegati a un determinato dominio.

## Rischio di Takeover dei Sottodomini:
Una volta individuati i sottodomini, è necessario verificare se alcuni di essi sono vulnerabili al Subdomain Takeover. A questo scopo, viene utilizzato un tool apposito chiamato "TakeOver". Questo strumento analizza i sottodomini individuati, cercando eventuali configurazioni erronee o inattive che potrebbero essere sfruttate da un attaccante per prendere il controllo.

## Prevenzione del Subdomain Takeover:
Per prevenire il rischio di Subdomain Takeover, è fondamentale adottare alcune pratiche di sicurezza:

1.  **Monitoraggio e Manutenzione Costante:** È essenziale effettuare regolarmente una revisione dei sottodomini associati al proprio dominio e rimuovere quelli non più utilizzati o non correttamente configurati.
2.  **Riutilizzo dei Sottodomini:** Evitare di utilizzare sottodomini una volta collegati a servizi esterni o hosting di terze parti, poiché la perdita del controllo su questi può essere sfruttata da attaccanti.
3.  **Configurazione Corretta dei Record DNS:** Verificare e assicurarsi che i record DNS dei sottodomini non utilizzati siano correttamente configurati o reindirizzati per evitare situazioni di vulnerabilità.
4.  **Utilizzo di Strumenti di Sicurezza:** L'utilizzo di tool automatizzati di sicurezza, come "SubOver" o "SubScraper", può aiutare nella scansione e individuazione di eventuali sottodomini vulnerabili.

In conclusione, la sicurezza dei sottodomini è cruciale per proteggere un dominio principale da potenziali attacchi di Subdomain Takeover. Il monitoraggio costante e l'adozione di pratiche di sicurezza proattive sono fondamentali per mitigare questo rischio e garantire la protezione dell'infrastruttura online.
