---
title: "[n8n-template] Fetch Amazon Luna Games and send Discord notifications"
description: "Auto-Sync “Included with Prime” Games → Google Sheets with Discord Notifications Automatically fetch, organize, and maintain an updated catalog of Amazon Luna…"
pubDate: 2025-11-25
tags: ["n8n"]
draft: false
---
## Auto-Sync “Included with Prime” Games → Google Sheets with Discord Notifications

[](https://github.com/paoloronco/n8n-templates/tree/main/free-templates/1-amazonluna-fetch#auto-sync-included-with-prime-games--google-sheets-with-discord-notifications)Automatically fetch, organize, and maintain an updated catalog of **Amazon Luna – Included with Prime** games. This workflow regularly queries Amazon’s official Luna endpoint, extracts complete metadata, and syncs everything into Google Sheets without duplicates.

Ideal for:

-   tracking monthly **Prime Luna rotations**
-   keeping a personal archive of games
-   monitoring **new games appearing on Amazon Games / Prime Gaming**, so you can instantly play titles you’re interested in
-   building dashboards or gaming databases
-   powering notification systems (Discord, Telegram, email, etc.)[](https://github.com/paoloronco/n8n-templates/tree/main/free-templates/1-amazonluna-fetch#auto-sync-included-with-prime-games--google-sheets-with-discord-notifications)

![](/posts/amazon-luna-fetch-included-with-prime-games/amazonluna-fetch-asset1-1024x337.png)

👨🏻‍💻GitHub: [paoloronco/n8n-templates](https://github.com/paoloronco/n8n-templates/)

📽️Video: [Amazon Luna – Fetch “Included with Prime” Games - YouTube](https://youtu.be/PS6qdCbc5fU)

📽️Video: [Amazon Luna – Fetch “Included with Prime” Games \[AI Video\] - YouTube](https://www.youtube.com/watch?v=rgee4kPZO7c)

👥 n8n Community Template: [Sync Amazon Luna Prime Games to Google Sheets with Automatic Updates | n8n workflow template](https://n8n.io/workflows/10733-sync-amazon-luna-prime-games-to-google-sheets-with-automatic-updates/)

* * *

### **Overview**

Amazon Luna’s “Included with Prime” lineup changes frequently, with new games added and old ones removed. Instead of checking manually, this n8n template fully automates the process:

-   Fetches the latest list from Amazon’s backend
-   Extracts detailed metadata from the response
-   Syncs the data into Google Sheets
-   Avoids duplicates by updating existing rows
-   Supports all major Amazon regions

Once configured, it runs automatically—keeping your game catalog correct, clean, and always up to date.

* * *

How it works

1.  **Scheduled Trigger** – starts the workflow every 5 days at 3:00 PM (you can change the frequency and time).
2.  **HTTP Request** – queries Amazon Luna’s official endpoint to retrieve the list of “Included with Prime” games.
3.  **Code Node (JavaScript)** – processes the JSON response and extracts the title, release year, genres, ASIN, and images.
4.  **Google Sheets** – automatically saves or updates the data in a Google Sheet, avoiding duplicates.

* * *

## ⭐ Features

-   Automatically fetch the complete “Included with Prime” catalog
-   Extract full metadata: title, genres, release year, ASIN, images
-   Auto-sync to Google Sheets (append or update)
-   Prevent duplicates using a unique key
-   Detect NEW games and send notifications (Discord, Telegram, etc.)
-   Supports multiple countries (IT, US, DE, FR, ES, JP…)
-   Clean, modular, fully customizable workflow

* * *

## 🧩 Workflow Overview

1.  **Schedule Trigger**  
    Starts the workflow on a set schedule (default: every 5 days at 3:00 PM). You can change both frequency and time freely.
2.  **HTTP Request → Amazon Luna**  
    Calls Amazon Luna’s regional endpoint and retrieves the full **“Included with Prime”** catalog.
3.  **JavaScript Code Node – Data Extraction**\* Parses the JSON response and extracts structured fields:
    -   Title
    -   Genres
    -   Release Year
    -   ASIN
    -   Image URLs
    -   Additional metadataThe result is a clean, ready-to-use dataset.
4.  **Google Sheets Sync**  
    Each game is written into the selected Google Sheet:
    
    -   Existing games get updated
    -   New games are appended
    
    The **Title** acts as the unique identifier to prevent duplicates.
5.  **Optional: Notifications**  
    When new games appear, the workflow fires a message (Discord, Telegram, Email…).

* * *

## ⚙️ Configuration Parameters

#### Parameters to configure

| Parameter | Description | Recommended options |
| --- | --- | --- |
| **x-amz-locale** | Language and region of the request | `it_IT` 🇮🇹 (Italy) · `en_US` 🇺🇸 (USA) · `de_DE` 🇩🇪 (Germany) · `fr_FR` 🇫🇷 (France) · `es_ES` 🇪🇸 (Spain) · `en_GB` 🇬🇧 (United Kingdom) · `ja_JP` 🇯🇵 (Japan) · `en_CA` 🇨🇦 (Canada) |
| **x-amz-marketplace-id** | Amazon marketplace identifier | `APJ6JRA9NG5V4` 🇮🇹 (Italy) · `ATVPDKIKX0DER` 🇺🇸 (USA) · `A1PA6795UKMFR9` 🇩🇪 (Germany) · `A13V1IB3VIYZZH` 🇫🇷 (France) · `A1RKKUPIHCS9HS` 🇪🇸 (Spain) · `A1F83G8C2ARO7P` 🇬🇧 (UK) · `A1VC38T7YXB528` 🇯🇵 (Japan) · `A2EUQ1WTGCTBG2` 🇨🇦 (Canada) |
| **Accept-Language** | Preferred response language | `it-IT,it;q=0.9,en;q=0.8` (or equivalent for your region) |
| **User-Agent** | Simulated browser agent | Keep the default value or replace with an updated one |
| **Trigger interval** | Automatic refresh frequency | Every 5 days at 3:00 PM (modifiable) |
| **Google Sheet** | Data destination | Select your document and worksheet |

* * *

## 🔔 Notifications (Optional)

This workflow can automatically send alerts for new games.

Supported outputs:

-   Discord (official bot or webhook)
-   Telegram Bot API
-   Email (SMTP)
-   Slack / Microsoft Teams / Matrix / Bark
-   Any Webhook

For a complete guide, see **notes-notify.md** in this folder.

* * *

## 📁 Files Included

-   `workflow.json` → the complete n8n workflow
-   `README.md` → this file
-   `notes-fetch.md` → fetch logic, headers, parsing
-   `notes-notify.md` → notifications logic & setup
-   `assets/overview.png` → optional preview image

* * *

## 🗎 Extra Docs

-   [Fetch Notes](https://github.com/paoloronco/n8n-templates/blob/main/free-templates/1-amazonluna-fetch/docs/NOTES-Fetch.md)
-   [Notify Notes](https://github.com/paoloronco/n8n-templates/blob/main/free-templates/1-amazonluna-fetch/docs/NOTES-Notify.md)

* * *

## 🔒 Important Notes

-   All data belongs to Amazon.
-   This workflow is for **personal / testing / educational** use only.
-   Do **not** republish or redistribute the full game list.
-   Amazon may change internal APIs anytime, so re-check headers/body when needed.

