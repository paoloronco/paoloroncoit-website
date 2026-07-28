---
title: "[n8n-template] Archiviazione automatica delle fatture"
description: "Recupera, archivia ed estrai automaticamente le informazioni principali dalle fatture ricevute via email dal tuo operatore o fornitore di servizi (energia elettrica, gas, telecomunicazioni, acqua…"
pubDate: 2025-11-25
tags: ["n8n"]
draft: false
---
Recupera, archivia ed estrai automaticamente le informazioni principali dalle fatture ricevute via email dal tuo operatore o fornitore di servizi (energia elettrica, gas, telecomunicazioni, acqua ecc.). Il workflow salva le fatture su Google Drive (oppure, facoltativamente, sul tuo server FTP/SFTP personale) e registra tutti i dettagli in Google Sheets tramite un’estrazione basata sull’IA.

![](/posts/n8n-template-automated-invoice-archiving/image-1-1024x353.png)

👨🏻‍💻GitHub: [paoloronco/n8n-templates](https://github.com/paoloronco/n8n-templates/)

📽️**Video**: [Video IA: archiviazione automatica delle fatture - YouTube](https://www.youtube.com/watch?v=0s-95L8cmyE&feature=youtu.be)

👥 Template della community n8n: **Prossimamente**

## Guida alla configurazione:

Prima di configurare il workflow, ti serviranno:

1.  **Istanza n8n**
    -   Installata in proprio oppure su n8n Cloud, con accesso alle credenziali.
2.  **Account Google** con:
    -   Accesso a Gmail
    -   Google Drive
    -   Google Sheets
3.  **Server FTP/SFTP (facoltativo)** se vuoi conservare una copia di ogni fattura al di fuori dei servizi Google.
4.  **Provider LLM / IA**
    -   Ad esempio **OpenRouter** o **OpenAI**, con:
        -   Chiave API
        -   Credito o quota sufficienti.
5.  **Email contenenti le fatture**
    -   Il tuo operatore o fornitore dovrebbe inviare le fatture da un **indirizzo email sempre uguale** (ad esempio `billing@provider.com`).
    -   Le fatture devono essere **allegate in formato PDF**. I PDF contenenti testo offrono i risultati migliori.

* * *

## 2\. Importare il workflow in n8n

1.  Scarica o copia il file JSON del workflow (`20-SaveInvoices-Templates.json`).
2.  In n8n, vai su **Workflows → Import from File / Clipboard**.
3.  Importa il file JSON.
4.  Salva il workflow assegnandogli un nome chiaro, ad esempio `Automated Invoice Archiving`.

Ora dovresti vedere un flusso che include nodi come:

-   **Schedule Trigger**
-   **Get many messages (Gmail)**
-   **Filter-contains\_attachment**
-   **Gmail-Get\_Invoice**
-   **GoogleDrive-upload-file**
-   **downloadFile**
-   **FTP-upload-octopus**
-   **Extract from File1**
-   **OpenRouter Chat Model1**
-   **AI\_Agent-fields**
-   **Code\_extractFields**
-   **GoogleSheets\_save**
-   **Delete a file1**
-   **Delete a message**

Le note adesive nell’area di lavoro ti aiuteranno a riconoscere visivamente le varie sezioni.

* * *

## 3\. Configurare le credenziali

### 3.1 Gmail (OAuth2)

Questo workflow utilizza i seguenti nodi Gmail:

-   **Get many messages**
-   **Gmail-Get\_Invoice**
-   **Delete a message**

#### Procedura

1.  In n8n, vai su **Credentials → New → Gmail OAuth2**.
2.  Segui la guida ufficiale per creare le credenziali OAuth e collegare Gmail:
    -   [Documentazione del nodo Gmail](https://docs.n8n.io/integrations/builtin/app-nodes/n8n-nodes-base.gmail/)
3.  Una volta creata, seleziona questa credenziale in tutti i nodi Gmail del workflow.

> Suggerimento: se possibile, usa un account Gmail o un’etichetta dedicati alle fatture. In questo modo sarà più semplice eseguire i test e monitorare il workflow.

* * *

### 3.2 Google Drive

Utilizzato da:

-   **GoogleDrive-upload-file** — carica il PDF della fattura
-   **Delete a file1** — elimina facoltativamente il file temporaneo da Drive

#### Procedura

1.  In n8n, crea una credenziale **Google Drive OAuth2**.
2.  Segui:
    -   [Documentazione del nodo Google Drive](https://docs.n8n.io/integrations/builtin/app-nodes/n8n-nodes-base.googledrive/)
3.  Apri il nodo **GoogleDrive-upload-file** e seleziona la tua credenziale Google Drive.
4.  Nel nodo:
    -   Scegli **“My Drive”** oppure l’unità che desideri
    -   Imposta il **Folder ID** della cartella in cui vuoi archiviare le fatture.
        -   In Google Drive, apri la cartella → copia l’ID dall’URL, ad esempio:  
            `https://drive.google.com/drive/folders/ABC123...`  
            → la parte successiva a `/folders/` è l’ID.

Seleziona la stessa credenziale anche per **Delete a file1**.

* * *

### 3.3 FTP/SFTP (facoltativo)

Utilizzato da:

-   **FTP-upload-octopus**

Se non ti serve FTP, puoi disattivare o rimuovere questo nodo. Se invece vuoi usarlo:

1.  In n8n, crea una nuova credenziale **SFTP** o **FTP** con i dati del server (host, porta, nome utente, password o chiave SSH).
2.  Se necessario, consulta la documentazione ufficiale:
    -   [Documentazione del nodo FTP](https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.ftp/)
3.  Nel nodo **FTP-upload-octopus**:
    -   Imposta **Protocol** su `sftp` (consigliato) oppure `ftp`.
    -   Seleziona la tua credenziale.
    -   In **PATH**, inserisci la directory in cui vuoi archiviare le fatture, ad esempio:
        -   `/home/user/invoices/`
    -   Lascia invariate le altre impostazioni, a meno che tu non abbia esigenze specifiche.

* * *

### 3.4 Provider IA (OpenRouter / OpenAI / altri LLM)

Utilizzato da:

-   **OpenRouter Chat Model1**
-   **AI\_Agent-fields** (nodo LangChain Agent che fa riferimento al modello di chat)

Questa coppia di nodi trasforma il testo grezzo del PDF in un JSON strutturato (fornitore, data, importo, voci, imposte ecc.).

#### Procedura

1.  Registrati o accedi al provider che preferisci (ad esempio OpenRouter o OpenAI).
2.  Ottieni una **chiave API**.
3.  In n8n, crea una nuova credenziale per il provider scelto (ad esempio **OpenRouter API**).
4.  Apri il nodo **OpenRouter Chat Model1**:
    -   Seleziona la tua credenziale.
    -   Scegli il modello che preferisci. Modelli consigliati:
        -   `gpt-4.1`, `gpt-4.1-mini`
        -   oppure una variante avanzata di `llama-3`.
5.  Assicurati che il nodo **AI\_Agent-fields** utilizzi **OpenRouter Chat Model1** come modello linguistico (nel template il collegamento è già presente).

> Nota: il prompt di sistema e le istruzioni di estrazione sono già configurati nel template per restituire un JSON strutturato con `vendor_name`, `invoice_date`, `total_amount`, `line_items`, campi fiscali ecc. Puoi modificare il prompt se le tue fatture seguono formati specifici.

* * *

### 3.5 Google Sheets (account di servizio)

Utilizzato da:

-   **GoogleSheets\_save** (operazione di aggiunta)

Questo nodo aggiunge al foglio Google una riga per ogni fattura elaborata.

#### 3.5.1 Creare un foglio

1.  Crea un nuovo foglio di lavoro in Google Sheets.
2.  Nella prima riga (intestazione), crea **queste colonne**:

-   `Vendor`
-   `Type`
-   `Date`
-   `Amount`

In seguito puoi aggiungere altre colonne (ad esempio `Invoice Number`, `Tax` ecc.), ma queste quattro sono quelle utilizzate dal template per impostazione predefinita.

#### 3.5.2 Configurare l’account di servizio e l’accesso

1.  In Google Cloud Console, crea un **account di servizio** e abilita l’API di Google Sheets.
2.  Genera una chiave JSON e caricala in n8n come credenziale **Google API**.
3.  In Google Sheets, fai clic su **Share** e condividi il documento con l’indirizzo email dell’account di servizio (solitamente simile a `service-account-name@project-id.iam.gserviceaccount.com`), concedendo l’accesso in **modifica**.

#### 3.5.3 Configurare il nodo

1.  Apri **GoogleSheets\_save** in n8n.
2.  Seleziona la tua credenziale **Google API**.
3.  Imposta:
    -   **Document ID** — ricavato dall’URL del foglio
        -   `https://docs.google.com/spreadsheets/d/DOCUMENT_ID/edit#gid=...`
    -   **Sheet Name** — nome della scheda in cui aggiungere i dati.
4.  Controlla la mappatura: per impostazione predefinita, il workflow associa:
    -   `Vendor` ← `{{$json.vendor_name}}`
    -   `Type` ← `{{$json.line_items[0].description}}`
    -   `Date` ← `{{$json.invoice_date}}`
    -   `Amount` ← `{{$json.total_amount}}` Puoi ampliare la mappatura includendo altri campi (più colonne nel foglio e la relativa mappatura nel nodo).

* * *

## 4\. Configurare ogni nodo (passo dopo passo)

Esaminiamo ora i nodi principali nell’ordine di esecuzione e vediamo quali impostazioni potrebbe essere necessario modificare.

### 4.1 Schedule Trigger

Nodo: **Schedule Trigger**

-   Scopo: avvia automaticamente il workflow.
-   In questo template è impostato per essere eseguito a un minuto specifico di ogni ora.

## Configurazione:

1.  Apri il nodo.
2.  Regola l’**intervallo**:
    -   Ad esempio, ogni **ora**, al minuto **25**.
    -   Oppure una volta al giorno a un orario specifico.
3.  Salva.

* * *

### 4.2 Get many messages (Gmail)

Nodo: **Get many messages**

-   Scopo: recupera le email dalla posta in arrivo.
-   È configurato per:
    -   Utilizzare una credenziale Gmail OAuth2
    -   Filtrare per **mittente** e **allegati PDF**.

## Configurazione:

1.  Seleziona la tua credenziale Gmail.
2.  In **Filters → Sender**, imposta l’indirizzo email da cui vengono inviate le fatture, ad esempio:
    -   `billing@provider.com`
    -   `invoices@isp.com`
3.  Mantieni **downloadAttachments = true** (nel template è già impostato così).

* * *

### 4.3 Filter-contains\_attachment

Nodo: **Filter-contains\_attachment**

-   Scopo: consente di proseguire solo ai messaggi **con allegati**.

Questo nodo applica una semplice condizione “exists” ai dati binari del nodo precedente. In genere non è necessario modificare nulla.

* * *

### 4.4 Gmail-Get\_Invoice

Nodo: **Gmail-Get\_Invoice**

-   Scopo: recupera l’**email completa** e **scarica l’allegato** di ogni messaggio selezionato.

## Configurazione:

1.  Assicurati che sia selezionata la credenziale Gmail.
2.  Verifica che `downloadAttachments` sia abilitato.

Il template utilizza già l’ID proveniente dal nodo **Get many messages**, quindi non occorre modificare altro.

* * *

### 4.5 GoogleDrive-upload-file

Nodo: **GoogleDrive-upload-file**

-   Scopo: carica il PDF della fattura in una cartella specifica di Google Drive.

## Configurazione:

1.  Seleziona la tua credenziale Google Drive.
2.  In **Folder ID**, incolla l’ID della cartella destinata alle fatture.
3.  Il modello per il nome è già impostato in modo simile a:
    -   `{{ $json.from.value[0].name }}-{{ $json.date }}`
    -   Puoi lasciarlo invariato oppure modificarlo.

* * *

### 4.6 downloadFile

Nodo: **downloadFile** (HTTP Request)

-   Scopo: scarica nuovamente il file da Google Drive tramite il relativo `webContentLink`, in modo che possa essere elaborato e/o caricato via FTP.

Questo nodo dovrebbe funzionare senza modifiche; in genere non richiede alcuna configurazione.

* * *

### 4.7 FTP-upload-octopus (facoltativo)

Nodo: **FTP-upload-octopus**

-   Scopo: salva il PDF della fattura sul tuo server FTP/SFTP.

## Configurazione:

1.  Imposta **Protocol** (`sftp` è consigliato).
2.  Scegli la tua credenziale FTP/SFTP.
3.  In **Path**, inserisci la directory (ad esempio `/invoices/`) oppure un percorso annidato.
4.  Il nome del file viene già normalizzato e riceve automaticamente l’estensione `.pdf` se non è presente.

Se non disponi di FTP o non vuoi utilizzarlo:

-   **Disattiva** questo nodo
-   Oppure collega il nodo precedente (downloadFile) direttamente ai nodi successivi, saltando FTP e la successiva eliminazione da Drive.

* * *

### 4.8 Delete a file1 (facoltativo)

Nodo: **Delete a file1**

-   Scopo: elimina il PDF della fattura da Google Drive dopo che è stato caricato via FTP ed elaborato.

Puoi:

-   Lasciarlo attivo se vuoi archiviare i file solo via FTP e i dati in Sheets.
-   Disattivarlo se preferisci conservare le fatture in Google Drive.

Fa riferimento all’ID del file caricato da **GoogleDrive-upload-file**, quindi dovrebbe funzionare senza modifiche, purché quel nodo sia configurato.

* * *

### 4.9 Delete a message (facoltativo)

Nodo: **Delete a message**

-   Scopo: elimina l’email originale da Gmail dopo che l’elaborazione è terminata correttamente.

Se vuoi **conservare** le email nella posta in arrivo:

-   **Disattiva** semplicemente questo nodo.

In caso contrario, lascialo abilitato: utilizza l’ID del messaggio proveniente da **Get many messages**.

* * *

### 4.10 Extract from File1

Nodo: **Extract from File1**

-   Scopo: estrae il contenuto testuale dal PDF.

## Configurazione:

-   Modalità: `pdf` (già impostata nel template).
-   In genere non sono necessarie altre configurazioni.

Se le fatture sono PDF composti soltanto da immagini, ti servirà il supporto OCR, ad esempio tramite un altro servizio. Per i normali PDF contenenti testo, questo nodo è sufficiente.

* * *

### 4.11 AI\_Agent-fields & OpenRouter Chat Model1

Nodi: **OpenRouter Chat Model1** → **AI\_Agent-fields**

-   Scopo:
    -   Convertire il testo in un oggetto JSON strutturato.
    -   Estrarre campi quali `invoice_number`, `vendor_name`, `invoice_date`, `total_amount`, `tax_details`, `line_items` ecc.

## Configurazione:

1.  In **OpenRouter Chat Model1**:
    -   Seleziona la credenziale e il modello.
2.  In **AI\_Agent-fields**:
    -   Verifica che il **System Message** descriva le tue esigenze di estrazione.
    -   Il messaggio indica già al modello di:
        -   Restituire **soltanto JSON**
        -   Includere tutti i campi obbligatori
        -   Assicurarsi che la somma dei valori `line_total` corrisponda a `total_amount`

Puoi adattare il prompt ai formati di fattura del tuo Paese, a campi aggiuntivi o a norme fiscali specifiche.

* * *

### 4.12 Code\_extractFields

Nodo: **Code\_extractFields** (nodo Code)

-   Scopo: ripulisce e analizza l’output grezzo dell’IA trasformandolo in JSON valido, gestendo:
    -   Backtick superflui
    -   Caratteri con sequenze di escape
    -   Casi limite in cui il modello racchiude il JSON all’interno di testo.

In genere non è necessario modificare questo nodo. Restituisce un oggetto JSON pulito che il nodo Google Sheets può utilizzare.

* * *

### 4.13 GoogleSheets\_save

Nodo: **GoogleSheets\_save**

-   Scopo: aggiunge una riga al foglio Google per ogni fattura.

## Configurazione:

1.  Seleziona la tua credenziale **Google API**.
2.  Inserisci **Document ID** e **Sheet Name** come descritto in precedenza.
3.  Verifica o modifica la mappatura delle colonne:
    -   `Vendor` ← `{{$json.vendor_name}}`
    -   `Type` ← `{{$json.line_items[0].description}}`
    -   `Date` ← `{{$json.invoice_date}}`
    -   `Amount` ← `{{$json.total_amount}}`

Per acquisire altri campi:

-   Aggiungi le colonne in Google Sheets
-   Aggiungi gli stessi campi alla mappatura del nodo.

* * *

## 5\. Testare il workflow

Prima di attivare l’esecuzione programmata, testa manualmente il workflow.

### 5.1 Inviare una fattura di prova

1.  Inviati un’email **dall’indirizzo reale del mittente** allegando un PDF di fattura di esempio.
2.  In alternativa, inoltrati una fattura esistente mantenendo l’indirizzo del mittente originale, se possibile.

### 5.2 Eseguire il workflow una volta

1.  In n8n, fai clic su **Execute Workflow**.
2.  Osserva ogni nodo:
    -   `Get many messages` dovrebbe restituire l’email di prova.
    -   `Filter-contains_attachment` dovrebbe lasciarla passare.
    -   `Gmail-Get_Invoice` dovrebbe mostrare una voce `binary` contenente il PDF.
    -   `GoogleDrive-upload-file` dovrebbe caricare un file.
    -   `Extract from File1` dovrebbe restituire il testo.
    -   `AI_Agent-fields` dovrebbe restituire un JSON strutturato.
    -   `GoogleSheets_save` dovrebbe aggiungere una riga.

Se qualcosa non funziona:

-   Controlla le credenziali (token scaduti o chiavi errate).
-   Controlla il filtro del mittente (l’indirizzo email potrebbe non corrispondere al filtro).
-   Controlla il PDF: se è una scansione composta solo da immagini, l’estrazione del testo potrebbe non riuscire.
-   Controlla gli eventuali messaggi di errore del nodo IA (ad esempio limiti di frequenza o chiave non valida).

* * *

## 6\. Messa in produzione e manutenzione

Quando il test dà il risultato desiderato:

1.  Imposta il workflow come **Active** in n8n.
2.  Monitora alcune esecuzioni:
    -   Verifica che le righe vengano aggiunte correttamente in Sheets.
    -   Verifica che i file compaiano nella destinazione prevista (Drive / FTP).
3.  Regola **Schedule Trigger** in base alle tue esigenze:
    -   Più frequente nei periodi con molte fatture
    -   Meno frequente se le fatture sono rare.

### Suggerimenti per la manutenzione

-   **Costi dell’IA:** controlla l’utilizzo dell’LLM per evitare sorprese.
-   **Credenziali:** aggiorna i token OAuth (Gmail/Drive) quando necessario.
-   **Modifiche allo schema:** quando aggiungi nuove colonne a Sheets, aggiorna di conseguenza la mappatura del nodo.
-   **Gestione degli errori:** valuta l’aggiunta di un workflow per gli errori o di altri nodi di registrazione, ad esempio per ricevere un’email se l’analisi non riesce.

* * *

## 7\. Idee per la personalizzazione

Quando il workflow di base funziona, puoi ampliarlo:

-   **Più fornitori:**
    -   Duplica la sezione email usando filtri del mittente diversi
    -   Utilizza un nodo `Merge` o un unico percorso di registrazione in Sheets.
-   **Contrassegnare o etichettare le email anziché eliminarle:**
    -   Sostituisci `Delete a message` con un nodo Gmail che applichi un’etichetta come `Processed-Invoices`.
-   **Spazio di archiviazione aggiuntivo:**
    -   Carica i file su servizi cloud come S3 o MinIO tramite HTTP o nodi dedicati.
-   **Dati più dettagliati nel foglio di lavoro:**
    -   Salva `invoice_number`, `tax_breakdown` o persino le singole voci in righe separate.

* * *

Ora disponi di un workflow n8n di **archiviazione automatica delle fatture** completamente documentato e pronto per la produzione, con istruzioni dettagliate per configurare Gmail, Google Drive, FTP/SFTP, IA e Google Sheets. Una volta attivato, manterrà le fatture in ordine e i dati di spesa pronti per l’analisi, senza richiedere interventi manuali.
