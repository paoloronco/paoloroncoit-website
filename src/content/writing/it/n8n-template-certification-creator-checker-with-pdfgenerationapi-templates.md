---
title: "[template n8n] Creazione e verifica di certificati con i template di PDF Generator API"
description: "Da un semplice MVP a un workflow riutilizzabile e pronto per la produzione. È stato un vero piacere entrare in contatto con Michal Liska, direttore operativo di PDF Generator API…"
pubDate: 2025-12-17
tags: ["n8n"]
draft: false
---
## Da un semplice MVP a un workflow riutilizzabile e pronto per la produzione

È stato un vero piacere entrare in contatto con **Michal Liska**, direttore operativo di **PDF Generator API by Actual Reports**, e vedere questo progetto presentato come esempio concreto all'interno dell'ecosistema n8n.

Quello che era nato come un semplice MVP per automatizzare la generazione dei certificati si è evoluto in un workflow riutilizzabile, basato su template e ora condiviso con la community. Questo articolo ne racconta l'evoluzione, spiega come funziona il sistema e mostra come riutilizzarlo nel proprio ambiente.

👉 La storia completa raccontata dal team di PDF Generator API è disponibile qui:\
[https://pdfgeneratorapi.com/blog/how-the-n8n-community-sparked-our-new-partnership-program](https://pdfgeneratorapi.com/blog/how-the-n8n-community-sparked-our-new-partnership-program)

* * *

## Workflow basato sui template PDF

Questo template offre una **soluzione completa e riutilizzabile per creare, distribuire e verificare automaticamente certificati digitali con n8n**, utilizzando i **template di PDF Generator API** per generare i PDF.

Il workflow è progettato per coprire **l'intero ciclo di vita di un certificato**, dalla richiesta iniziale alla verifica pubblica, in modo ordinato e facile da mantenere.

È un **MVP**, ma è già **pienamente funzionante, testato e pronto per la produzione** e può essere riutilizzato in ambienti diversi con una configurazione minima.

![](/posts/n8n-template-certification-creator-checker-with-pdfgenerationapi-templates/Workflow-image-1024x394.png)

[Certificato di esempio](https://raw.githubusercontent.com/paoloronco/n8n-templates/main/free-templates/3a-Certification-Creation%26Validation%20With%20PDF%20Templates/Assets/Example-Certificate.pdf)

Visita i miei template n8n su GitHub: [https://github.com/paoloronco/n8n-templates](https://github.com/paoloronco/n8n-templates)

Guarda il workflow sull'hub n8n Creators: prossimamente

* * *

## Quale problema risolve questo template

In molti contesti reali, i certificati vengono ancora:

-   generati manualmente
-   creati con script fragili
-   verificati con difficoltà
-   prodotti con un aspetto visivo incoerente
-   gestiti con difficoltà nel tempo

Questo template risolve tali problemi offrendo:

-   la creazione automatizzata dei certificati
-   un ID di certificazione univoco e verificabile
-   PDF dall'aspetto uniforme grazie all'uso dei template
-   un endpoint pubblico per la verifica
-   una netta separazione tra logica di automazione e progettazione grafica

* * *

## 🚀 Cosa rende diversa questa versione

Video su **YouTube**: [https://youtu.be/eqSWoPndVUg](https://youtu.be/eqSWoPndVUg)[](https://github.com/paoloronco/n8n-templates/tree/main/free-templates/3a-Certification-Creation%26Validation%20With%20PDF%20Templates#-what-makes-this-version-different)

Questo workflow è **l'evoluzione della versione originale basata su HTML**.

### Perché usare i template anziché l'HTML?[](https://github.com/paoloronco/n8n-templates/tree/main/free-templates/3a-Certification-Creation%26Validation%20With%20PDF%20Templates#why-templates-instead-of-html)

-   Nessun codice HTML all'interno del workflow
-   Netta separazione tra logica e layout
-   Editor visuale dei template
-   Manutenzione e personalizzazione più semplici
-   Migliore collaborazione tra sviluppatori e designer

Il layout del PDF viene gestito **interamente tramite i template di PDF Generator API**.

![](/posts/n8n-template-certification-creator-checker-with-pdfgenerationapi-templates/image-1024x526.png)

## 🔍 Panoramica generale[](https://github.com/paoloronco/n8n-templates/tree/main/free-templates/3a-Certification-Creation%26Validation%20With%20PDF%20Templates#-high-level-overview)

Il sistema espone **due endpoint principali**:

### 1️⃣ Creazione del certificato[](https://github.com/paoloronco/n8n-templates/tree/main/free-templates/3a-Certification-Creation%26Validation%20With%20PDF%20Templates#1%EF%B8%8F%E2%83%A3-certificate-creation)

```
POST /certifications2
```

Gestisce:

-   l'inserimento dei dati del candidato
-   la generazione di un ID univoco
-   la persistenza dei dati
-   la generazione del PDF basata su template
-   l'invio tramite email

* * *

### 2️⃣ Verifica del certificato[](https://github.com/paoloronco/n8n-templates/tree/main/free-templates/3a-Certification-Creation%26Validation%20With%20PDF%20Templates#2%EF%B8%8F%E2%83%A3-certificate-verification)

```
GET /certificationscheck
```

Consente a chiunque di verificare:

-   se un certificato esiste
-   a chi appartiene

* * *

## 🔥 Cosa fa questo workflow[](https://github.com/paoloronco/n8n-templates/tree/main/free-templates/3a-Certification-Creation%26Validation%20With%20PDF%20Templates#-what-this-workflow-does)

### 🎓 1. Creazione del certificato[](https://github.com/paoloronco/n8n-templates/tree/main/free-templates/3a-Certification-Creation%26Validation%20With%20PDF%20Templates#-1-certificate-creation)

-   Viene attivato tramite un **webhook POST** (`/certifications2`)
-   Accetta i dati del candidato:
    -   nome
    -   cognome
    -   corso
    -   email
-   Genera un **ID di certificazione univoco**
-   Evita le collisioni verificando che l'ID non esista già

* * *

### 🗂 2. Archiviazione dei dati[](https://github.com/paoloronco/n8n-templates/tree/main/free-templates/3a-Certification-Creation%26Validation%20With%20PDF%20Templates#-2-data-storage)

Ogni certificato viene archiviato in una **Data Table di n8n**, creando così un registro persistente.

Campi archiviati:

-   Name
-   Surname
-   CertificationID

Questo registro viene utilizzato sia per la convalida sia per le attività di audit.

* * *

### 🧾 3. Generazione del PDF (basata su template)[](https://github.com/paoloronco/n8n-templates/tree/main/free-templates/3a-Certification-Creation%26Validation%20With%20PDF%20Templates#-3-pdf-generation-template-based)

Il workflow utilizza il nodo **PDF Generator API – Generate a PDF document**.

Al posto dell'HTML, invia un **payload JSON** che viene associato direttamente ai segnaposto del template.

Esempio:

```
{
  "DueDate": "{{$now.toISODate()}}",
  "Candidate": "{{$('Webhook_Creation').item.json.headers.name}} {{$('Webhook_Creation').item.json.headers.surname}}",
  "CourseName": "{{ $('Webhook_Creation').item.json.headers.course }}",
  "ID": "{{ $('Generate_Certification_ID').item.json.id }}"
}
```

⚠️ Il JSON deve essere valido e le chiavi devono corrispondere esattamente ai segnaposto del template.

* * *

### ✉️ 4. Invio tramite email

[](https://github.com/paoloronco/n8n-templates/tree/main/free-templates/3a-Certification-Creation%26Validation%20With%20PDF%20Templates#%EF%B8%8F-4-email-delivery)

-   Utilizza **Gmail OAuth2**
-   Invia il PDF generato come allegato
-   Oggetto e corpo del messaggio sono completamente personalizzabili

* * *

### 🔍 5. Verifica del certificato[](https://github.com/paoloronco/n8n-templates/tree/main/free-templates/3a-Certification-Creation%26Validation%20With%20PDF%20Templates#-5-certificate-verification)

L'endpoint di verifica:

```
GET /certificationscheck?id=CERTIFICATION-ID
```

Restituisce:

```
If valid:
{
  "ok": true,
  "name": "John",
  "surname": "Doe"
}

If not valid

{
  "ok": false
}
```

In questo modo, i certificati sono **verificabili pubblicamente e resistenti alle manomissioni**.

* * *

## 🧠 Template di PDF Generator API[](https://github.com/paoloronco/n8n-templates/tree/main/free-templates/3a-Certification-Creation%26Validation%20With%20PDF%20Templates#-pdf-generator-api-template)

### Cosa è incluso[](https://github.com/paoloronco/n8n-templates/tree/main/free-templates/3a-Certification-Creation%26Validation%20With%20PDF%20Templates#what-is-included)

Il repository include:

-   un **template di PDF Generator API** pronto all'uso
-   segnaposto come:
    -   `{Candidate}`
    -   `{CourseName}`
    -   `{DueDate}`
    -   `{ID}`

È possibile personalizzare liberamente:

-   layout
-   font
-   colori
-   loghi
-   firme
-   formato delle date
-   codici QR

L'aggiornamento del template non richiede alcuna modifica al workflow.

* * *

## 🤖 Modifica dei template con l'AI (Gemini)[](https://github.com/paoloronco/n8n-templates/tree/main/free-templates/3a-Certification-Creation%26Validation%20With%20PDF%20Templates#-ai-powered-template-editing-gemini)

PDF Generator API mette a disposizione una **AI Gem basata su Gemini** per aiutare gli utenti a creare e perfezionare i template.

👉 Link alla AI Gem: [https://gemini.google.com/gem/1RrpDHQocP7E7C7Bpsc7yhDT-AkuKNuT\_?usp=sharing](https://gemini.google.com/gem/1RrpDHQocP7E7C7Bpsc7yhDT-AkuKNuT_?usp=sharing)

È possibile:

-   descrivere il layout in linguaggio naturale
-   generare o modificare i template
-   procedere più velocemente senza posizionare manualmente gli elementi

* * *

## 🛠 Requisiti[](https://github.com/paoloronco/n8n-templates/tree/main/free-templates/3a-Certification-Creation%26Validation%20With%20PDF%20Templates#-requirements)

Prima di importare il workflow, sono necessari:

1.  un'**istanza n8n** (Cloud o con hosting autonomo)
2.  una **Data Table di n8n** con i campi:
    -   `Name` (string)
    -   `Surname` (string)
    -   `CertificationID` (string)
3.  un **account PDF Generator API**
4.  le **credenziali Gmail OAuth2**
5.  la possibilità di chiamare webhook HTTP

* * *

* * *

## 🚀 Installazione[](https://github.com/paoloronco/n8n-templates/tree/main/free-templates/3a-Certification-Creation%26Validation%20With%20PDF%20Templates#-installation)

### 1\. Importare il workflow[](https://github.com/paoloronco/n8n-templates/tree/main/free-templates/3a-Certification-Creation%26Validation%20With%20PDF%20Templates#1-import-the-workflow)

-   Accedere a **n8n → Workflows → Import**
-   Incollare `workflow.json`

* * *

### 2\. Configurare la Data Table

[](https://github.com/paoloronco/n8n-templates/tree/main/free-templates/3a-Certification-Creation%26Validation%20With%20PDF%20Templates#2-configure-data-table)

Aggiornare questi nodi:

-   `Insert_Certification`
-   `Find_Certification_By_ID`
-   `Find_Certification_By_ID1`

* * *

### 3\. Configurare le credenziali[](https://github.com/paoloronco/n8n-templates/tree/main/free-templates/3a-Certification-Creation%26Validation%20With%20PDF%20Templates#3-configure-credentials)

-   Nodo PDF Generator API → impostare le credenziali
-   Nodo Gmail → impostare le credenziali OAuth2

* * *

### 4\. Attivare il workflow[](https://github.com/paoloronco/n8n-templates/tree/main/free-templates/3a-Certification-Creation%26Validation%20With%20PDF%20Templates#4-activate-the-workflow)

Fare clic su **Activate**: il workflow è pronto all'uso.

* * *

* * *

## 🧪 Stato: MVP (ma pronto per la produzione)[](https://github.com/paoloronco/n8n-templates/tree/main/free-templates/3a-Certification-Creation%26Validation%20With%20PDF%20Templates#-status-mvp-but-production-ready)

Questo progetto è nato come MVP, ma è:

-   pienamente funzionante
-   testato
-   modulare
-   facile da estendere

È possibile utilizzarlo **gratuitamente**, adattarlo alle proprie esigenze e distribuirlo in produzione con modifiche minime.

* * *

## 🌍 Perché è importante[](https://github.com/paoloronco/n8n-templates/tree/main/free-templates/3a-Certification-Creation%26Validation%20With%20PDF%20Templates#-why-this-matters)

Questo repository dimostra come:

-   l'automazione low-code
-   una progettazione chiara delle API
-   i template riutilizzabili
-   la condivisione promossa dalla community

possano dare vita a **soluzioni concrete e pronte per la produzione**, non soltanto a demo.

* * *

## 📎 Link[](https://github.com/paoloronco/n8n-templates/tree/main/free-templates/3a-Certification-Creation%26Validation%20With%20PDF%20Templates#-links)

-   \[Workflow n8n su Creators Hub\](prossimamente)
-   [Video su YouTube](https://youtu.be/eqSWoPndVUg)
-   [Articolo e documentazione del progetto](https://paoloronco.it/writing/n8n-template-certification-creator-checker/)
-   [PDF Generator API](https://pdfgeneratorapi.com/)
-   [Template per AI Gem](https://github.com/paoloronco/n8n-templates/blob/main/free-templates/3a-Certification-Creation%26Validation%20With%20PDF%20Templates)
