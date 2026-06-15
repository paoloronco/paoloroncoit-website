---
title: "Automazione Make.com: Aggiunta Automatica di Post da WordPress a Notion"
description: "Introduzione Questa automazione utilizza Make.com per raccogliere automaticamente i post pubblicati su un sito WordPress e archiviarli in un database Notion .…"
pubDate: 2025-02-22
tags: []
draft: false
---
# Introduzione

Questa automazione utilizza **Make.com** per raccogliere automaticamente i post pubblicati su un sito **WordPress** e archiviarli in un **database Notion**. Questo processo consente una gestione centralizzata dei contenuti, facilitando l’organizzazione e l’analisi dei post in un unico spazio.

* * *

## **Pipeline di Automazione**

### **STEP 1: Configurazione Iniziale su Make.com**

1.  Accedi a **Make.com** e vai su **Templates**.
2.  Cerca **“Add WordPress posts to Notion”**.
3.  Seleziona il template e inizia la configurazione della pipeline.

### **STEP 2: Connessione con WordPress**

#### **Installazione del Plugin**

1.  Scarica il plugin [WordPress-Make](https://wordpress.org/plugins/integromat-connector/).
2.  Accedi al tuo WordPress (`portfolio.paoloronco.it`).
3.  Vai su **Plugin > Aggiungi nuovo > Carica Plugin**.
4.  Installa e attiva il plugin.
5.  Vai su **Plugin > Make** e copia la **API Key**.
6.  Incolla la API Key su Make.com per completare la connessione.

#### **Configurazione su Make.com**

-   Seleziona **Type: Post**.
-   Seleziona **Status: All**.
-   Seleziona **Limit: 150**.
-   Clic destro su **WordPress (watch posts)** → **Choose where to start → All**.

* * *

### **STEP 3: Creazione di un Database su Notion**

#### **Configurazione di Notion**

1.  Accedi a **Notion** e vai su **Settings > Connections**.
2.  Crea una **nuova integrazione interna**.
3.  Crea una **nuova pagina** e aggiungi un **Database**.
4.  Imposta le seguenti colonne nel database:
    -   **Data**
    -   **Title**
    -   **Author**
    -   **Link**
5.  Associa la connessione creata alla pagina.
6.  Recupera l’**ID della pagina**:
    -   Copia l'URL della pagina Notion, es: `https://www.notion.so/paoloronco/DATABASE-IDv=altro(che non serve)`.
    -   Prendi tutto il valore prima di `?v=` e usalo come **Database ID** su Make.com.

#### **Configurazione su Make.com**

-   Inserisci il **Database ID** copiato.
-   Mappa i campi:
    -   **Title** → `{{1.yoast_head_json.title}}`
    -   **Link** → `Link`
    -   **Data** → `Date`
    -   **Author** → `{{1.yoast_head_json.schema.@graph[].author.name}}`

* * *

### **STEP 4: Filtraggio per Evitare Errori di Lunghezza**

-   Tra **Notion Create Database Item** e **Notion Append Page Content**, imposta un filtro con **max operator: 10000**.
-   Questo eviterà errori di lunghezza dell’articolo.

* * *

### **STEP 5: Appendere Contenuti a Notion**

-   **Page ID**: inserisci il valore corretto.
-   **Type**: `Paragraph`.
-   Lascia tutto il resto con le impostazioni di default.

* * *

## **Risultati e Possibili Estensioni**

-   Il sistema **importa automaticamente** nuovi post di WordPress su Notion senza necessità di intervento manuale.
-   Potenziali estensioni:
    -   Aggiungere ulteriori **metadati** (categorie, tag, immagini).
    -   Automatizzare la condivisione dei post su altre piattaforme.
    -   Creare un’integrazione con **Google Sheets** per backup o analisi.

Questa automazione dimostra come **Make.com** possa semplificare la gestione dei contenuti e ottimizzare i flussi di lavoro ?.
