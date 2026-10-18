---
title: "Spotify to YouTube Music"
summary: "Strumento Python da riga di comando per trasferire playlist e brani preferiti da Spotify a YouTube Music e mantenere aggiornate le raccolte migrate."
category: "automation"
stack: ["Python", "Spotify API", "ytmusicapi", "OAuth"]
problem: "Cambiare servizio musicale comporta ricreare manualmente playlist e preferiti, con molto lavoro e possibili omissioni."
solution: "La CLI legge playlist pubbliche o private e brani salvati tramite Spotify, cerca le corrispondenze su YouTube Music e gestisce creazione, aggiornamento e rimozione delle playlist."
outcome: "Un processo ripetibile per migrare singole playlist, tutte le playlist pubbliche o la libreria dei preferiti tra le due piattaforme."
featured: false
order: 7
draft: false
links:
  - label: "Repository GitHub"
    href: "https://github.com/paoloronco/spotify_to_ytmusic"
---

## Migrazione da terminale

Il progetto deriva dal tool open source di `sigma67` e aggiunge modifiche documentate nel fork. Supporta credenziali Spotify e autenticazione browser oppure OAuth per YouTube Music.

## Operazioni disponibili

Oltre alla copia iniziale, il comando può aggiornare playlist già trasferite, mettere like ai brani corrispondenti e rimuovere playlist dalla destinazione.
