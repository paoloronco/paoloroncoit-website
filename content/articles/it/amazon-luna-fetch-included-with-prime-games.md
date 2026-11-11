---
title: "[template n8n] Recupera i giochi Amazon Luna e invia notifiche Discord"
description: "Sincronizza automaticamente i giochi “Inclusi con Prime” in Google Sheets e ricevi notifiche Discord. Recupera, organizza e mantieni aggiornato il catalogo Amazon Luna…"
pubDate: 2025-11-25
tags: ["n8n"]
draft: false
---
## Sincronizza i giochi “Inclusi con Prime” in Google Sheets con notifiche Discord

[](https://github.com/paoloronco/n8n-templates/tree/main/free-templates/1-amazonluna-fetch#auto-sync-included-with-prime-games--google-sheets-with-discord-notifications)Recupera, organizza e mantieni aggiornato automaticamente il catalogo dei giochi **Amazon Luna – Inclusi con Prime**. Questo workflow interroga regolarmente l'endpoint ufficiale di Amazon Luna, estrae tutti i metadati e sincronizza ogni elemento in Google Sheets senza duplicati.

Ideale per:

-   seguire le **rotazioni mensili di Prime Luna**
-   conservare un archivio personale dei giochi
-   monitorare i **nuovi giochi pubblicati su Amazon Games / Prime Gaming**, così da poter provare subito i titoli che ti interessano
-   creare dashboard o database dedicati ai videogiochi
-   alimentare sistemi di notifica (Discord, Telegram, email, ecc.)[](https://github.com/paoloronco/n8n-templates/tree/main/free-templates/1-amazonluna-fetch#auto-sync-included-with-prime-games--google-sheets-with-discord-notifications)

![](/posts/amazon-luna-fetch-included-with-prime-games/amazonluna-fetch-asset1-1024x337.png)

👨🏻‍💻GitHub: [paoloronco/n8n-templates](https://github.com/paoloronco/n8n-templates/)

📽️Video: [Amazon Luna – Recuperare i giochi “Inclusi con Prime” - YouTube](https://youtu.be/PS6qdCbc5fU)

📽️Video: [Amazon Luna – Recuperare i giochi “Inclusi con Prime” \[video AI\] - YouTube](https://www.youtube.com/watch?v=rgee4kPZO7c)

👥 Template della community n8n: [Sincronizza i giochi Amazon Luna Prime in Google Sheets con aggiornamenti automatici | template workflow n8n](https://n8n.io/workflows/10733-sync-amazon-luna-prime-games-to-google-sheets-with-automatic-updates/)

* * *

### **Panoramica**

Il catalogo “Inclusi con Prime” di Amazon Luna cambia spesso: vengono aggiunti nuovi giochi e rimossi quelli precedenti. Invece di controllarlo manualmente, questo template n8n automatizza l'intero processo:

-   recupera l'elenco più recente dal backend di Amazon
-   estrae dalla risposta metadati dettagliati
-   sincronizza i dati in Google Sheets
-   evita i duplicati aggiornando le righe esistenti
-   supporta tutte le principali aree geografiche di Amazon

Una volta configurato, viene eseguito automaticamente e mantiene il catalogo dei giochi corretto, ordinato e sempre aggiornato.

* * *

Come funziona

1.  **Trigger pianificato** – avvia il workflow ogni 5 giorni alle 15:00 (puoi modificare frequenza e orario).
2.  **Richiesta HTTP** – interroga l'endpoint ufficiale di Amazon Luna per recuperare l'elenco dei giochi “Inclusi con Prime”.
3.  **Nodo Code (JavaScript)** – elabora la risposta JSON ed estrae titolo, anno di pubblicazione, generi, ASIN e immagini.
4.  **Google Sheets** – salva o aggiorna automaticamente i dati in un foglio Google, evitando i duplicati.

* * *

## ⭐ Funzionalità

-   Recupera automaticamente l'intero catalogo “Inclusi con Prime”
-   Estrae tutti i metadati: titolo, generi, anno di pubblicazione, ASIN e immagini
-   Sincronizza automaticamente i dati in Google Sheets (aggiunta o aggiornamento)
-   Impedisce i duplicati tramite una chiave univoca
-   Rileva i NUOVI giochi e invia notifiche (Discord, Telegram, ecc.)
-   Supporta più Paesi (IT, US, DE, FR, ES, JP…)
-   Offre un workflow ordinato, modulare e completamente personalizzabile

* * *

## 🧩 Panoramica del workflow

1.  **Trigger pianificato**  
    Avvia il workflow secondo una pianificazione prestabilita (impostazione predefinita: ogni 5 giorni alle 15:00). Puoi modificare liberamente sia la frequenza sia l'orario.
2.  **Richiesta HTTP → Amazon Luna**  
    Chiama l'endpoint regionale di Amazon Luna e recupera l'intero catalogo **“Inclusi con Prime”**.
3.  **Nodo Code JavaScript – Estrazione dei dati**\* Analizza la risposta JSON ed estrae campi strutturati:
    -   Titolo
    -   Generi
    -   Anno di pubblicazione
    -   ASIN
    -   URL delle immagini
    -   Metadati aggiuntivi. Il risultato è un insieme di dati ordinato e pronto all'uso.
4.  **Sincronizzazione con Google Sheets**  
    Ogni gioco viene inserito nel foglio Google selezionato:
    
    -   i giochi esistenti vengono aggiornati
    -   i nuovi giochi vengono aggiunti
    
    Il **Titolo** viene utilizzato come identificatore univoco per impedire i duplicati.
5.  **Facoltativo: notifiche**  
    Quando compaiono nuovi giochi, il workflow invia un messaggio (Discord, Telegram, email…).

* * *

## ⚙️ Parametri di configurazione

#### Parametri da configurare

| Parametro | Descrizione | Opzioni consigliate |
| --- | --- | --- |
| **x-amz-locale** | Lingua e area geografica della richiesta | `it_IT` 🇮🇹 (Italia) · `en_US` 🇺🇸 (Stati Uniti) · `de_DE` 🇩🇪 (Germania) · `fr_FR` 🇫🇷 (Francia) · `es_ES` 🇪🇸 (Spagna) · `en_GB` 🇬🇧 (Regno Unito) · `ja_JP` 🇯🇵 (Giappone) · `en_CA` 🇨🇦 (Canada) |
| **x-amz-marketplace-id** | Identificatore del marketplace Amazon | `APJ6JRA9NG5V4` 🇮🇹 (Italia) · `ATVPDKIKX0DER` 🇺🇸 (Stati Uniti) · `A1PA6795UKMFR9` 🇩🇪 (Germania) · `A13V1IB3VIYZZH` 🇫🇷 (Francia) · `A1RKKUPIHCS9HS` 🇪🇸 (Spagna) · `A1F83G8C2ARO7P` 🇬🇧 (Regno Unito) · `A1VC38T7YXB528` 🇯🇵 (Giappone) · `A2EUQ1WTGCTBG2` 🇨🇦 (Canada) |
| **Accept-Language** | Lingua preferita per la risposta | `it-IT,it;q=0.9,en;q=0.8` (o equivalente per la tua area geografica) |
| **User-Agent** | Identificativo del browser simulato | Mantieni il valore predefinito o sostituiscilo con uno aggiornato |
| **Intervallo del trigger** | Frequenza di aggiornamento automatico | Ogni 5 giorni alle 15:00 (modificabile) |
| **Foglio Google** | Destinazione dei dati | Seleziona il documento e il foglio di lavoro |

* * *

## 🔔 Notifiche (facoltative)

Questo workflow può inviare automaticamente avvisi relativi ai nuovi giochi.

Canali supportati:

-   Discord (bot ufficiale o webhook)
-   Telegram Bot API
-   Email (SMTP)
-   Slack / Microsoft Teams / Matrix / Bark
-   Qualsiasi webhook

Per una guida completa, consulta **notes-notify.md** in questa cartella.

* * *

## 📁 File inclusi

-   `workflow.json` → il workflow n8n completo
-   `README.md` → questo file
-   `notes-fetch.md` → logica di recupero, intestazioni e analisi dei dati
-   `notes-notify.md` → logica e configurazione delle notifiche
-   `assets/overview.png` → immagine di anteprima facoltativa

* * *

## 🗎 Documentazione aggiuntiva

-   [Note sul recupero dei dati](https://github.com/paoloronco/n8n-templates/blob/main/free-templates/1-amazonluna-fetch/docs/NOTES-Fetch.md)
-   [Note sulle notifiche](https://github.com/paoloronco/n8n-templates/blob/main/free-templates/1-amazonluna-fetch/docs/NOTES-Notify.md)

* * *

## 🔒 Note importanti

-   Tutti i dati appartengono ad Amazon.
-   Questo workflow è destinato esclusivamente a un uso **personale, di test o didattico**.
-   **Non** ripubblicare o ridistribuire l'elenco completo dei giochi.
-   Amazon può modificare le API interne in qualsiasi momento: se necessario, ricontrolla intestazioni e corpo della richiesta.
