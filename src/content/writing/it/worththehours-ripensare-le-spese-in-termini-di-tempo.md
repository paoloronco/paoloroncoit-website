---
title: "WorthTheHours – Ripensare le spese in termini di tempo"
description: "WorthTheHours è un’app Android nativa che ho sviluppato per trasformare il modo in cui valutiamo le spese quotidiane. L’idea alla base è semplice ma potente:…"
pubDate: 2025-12-17
tags: []
draft: false
---
**WorthTheHours** è un’app Android nativa che ho sviluppato per trasformare il modo in cui valutiamo le spese quotidiane.  
L’idea alla base è semplice ma potente: invece di chiederci _“posso permettermelo?”_, l’app ci invita a porci una domanda più profonda:

> **“Quante ore della mia vita lavorativa costa questo acquisto?”**

Convertendo i prezzi in **ore e minuti di lavoro**, WorthTheHours aiuta a prendere decisioni di spesa più consapevoli e ragionate.

## 🔗 Link al progetto

-   **Codice sorgente (GitHub):**  
    👉 [https://github.com/paoloronco/WorthTheHours](https://github.com/paoloronco/WorthTheHours)
-   **App sul Play Store:**  
    👉 [https://play.google.com/store/apps/details?id=com.paoloronco.worththehours&hl=it](https://play.google.com/store/apps/details?id=com.paoloronco.worththehours&hl=it)

* * *

## 💡 Concept & Obiettivo

WorthTheHours nasce come progetto personale per unire:

-   riflessione sul valore del tempo
-   minimalismo digitale
-   sviluppo Android moderno

Visualizzare una spesa in termini di tempo lavorativo cambia radicalmente la percezione del suo “costo reale”, rendendo immediato l’impatto che un acquisto ha sulla nostra vita.

* * *

## ✨ Funzionalità principali

-   **Configurazione flessibile dello stipendio**
    -   Inserimento diretto della paga oraria netta
    -   Oppure calcolo automatico partendo da stipendio mensile e ore lavorative
    -   I dati sensibili sono **salvati localmente e cifrati**
-   **Gestione degli acquisti**
    -   Aggiunta rapida di articoli con nome e prezzo
    -   Conversione immediata in **ore e minuti di lavoro**
-   **Privacy-first**
    -   Nessun account
    -   Nessuna connessione di rete
    -   Nessun backend o tracciamento
    -   Tutti i dati rimangono sul dispositivo
-   **Interfaccia moderna**
    -   UI sviluppata interamente con **Jetpack Compose**
    -   **Material 3**, design pulito e minimale
    -   Supporto tema chiaro/scuro

* * *

## 🧱 Stack Tecnologico & Architettura

L’app è costruita seguendo le **best practice Android moderne** e un’architettura **MVVM** chiara e scalabile.

**Tecnologie utilizzate:**

-   **Kotlin**
-   **Jetpack Compose**
-   **Material 3**
-   **MVVM Architecture**
-   **Hilt** (Dependency Injection)
-   **Kotlin Coroutines & Flow**
-   **Navigation Compose**
-   **Room** (persistenza locale)
-   **EncryptedSharedPreferences** (dati sensibili)
-   **DataStore** (preferenze utente)

* * *

## 📂 Struttura del progetto

Il codice è organizzato in modo modulare e leggibile, separando chiaramente:

-   **data layer** (repository, database, storage sicuro)
-   **UI layer** (schermate Compose, navigazione, tema)
-   **ViewModel** (logica di business e stato)
-   **Dependency Injection** con Hilt

Questo approccio rende il progetto facilmente manutenibile ed estendibile.

* * *

## 🚀 Considerazioni finali

WorthTheHours è un progetto che rappresenta bene il mio approccio allo sviluppo:

-   attenzione all’esperienza utente
-   focus su privacy e sicurezza
-   utilizzo consapevole delle tecnologie moderne

È un’app semplice all’apparenza, ma costruita con una base solida e professionale, pensata per crescere nel tempo.
