---
title: "WorthTheHours"
summary: "App Android che converte il prezzo di un acquisto nelle ore di lavoro necessarie per permetterselo, rendendo il costo più concreto."
category: "tool"
stack: ["Kotlin", "Jetpack Compose", "Room", "Hilt"]
problem: "Un importo monetario da solo non comunica sempre chiaramente quanto tempo di lavoro rappresenti per una persona."
solution: "L'app calcola il valore orario dai dati salariali, salva gli articoli da valutare e traduce automaticamente ogni prezzo in ore e minuti di lavoro."
outcome: "Uno strumento locale e privato per confrontare acquisti in termini di tempo, con interfaccia Material 3 e dati persistenti sul dispositivo."
featured: false
order: 10
draft: false
links:
  - label: "Repository GitHub"
    href: "https://github.com/paoloronco/WorthTheHours"
  - label: "Sito del progetto"
    href: "https://paoloronco.github.io/WorthTheHours/"
---

## Dal prezzo al tempo

WorthTheHours parte da stipendio e orario di lavoro per calcolare il costo temporale degli oggetti inseriti. La lista permette di confrontare più acquisti con la stessa metrica personale.

## Architettura Android

Il progetto usa MVVM, Jetpack Compose, Hilt, Coroutines e Flow. Preferenze e articoli restano sul dispositivo attraverso DataStore e persistenza locale.
