---
title: "Enclave"
summary: "Password manager Android offline con cifratura AES-256-GCM, sblocco biometrico e backup protetti, senza cloud o telemetria."
category: "security"
stack: ["Kotlin", "Jetpack Compose", "Room", "Android Keystore"]
problem: "Le credenziali personali richiedono protezione a riposo e un accesso pratico senza affidare il vault a servizi remoti."
solution: "Enclave cifra i campi sensibili con chiavi nell'Android Keystore, protegge l'accesso con passcode o biometria e salva i dati localmente tramite Room."
outcome: "Un vault mobile multilingue con generatore di password, ricerca, blocco automatico, clipboard temporanea e backup cifrati importabili."
featured: false
order: 9
draft: false
links:
  - label: "Repository GitHub"
    href: "https://github.com/paoloronco/enclave"
  - label: "Google Play"
    href: "https://play.google.com/store/apps/details?id=com.paoloronco.codevault"
---

## Sicurezza locale

Password, username e note sono cifrati singolarmente con AES-256-GCM. Il passcode viene derivato con PBKDF2, mentre tentativi errati, background e inattività attivano meccanismi di blocco configurabili.

## Vault e backup

Le voci possono essere cercate, categorizzate e contrassegnate come preferite. L'esportazione produce un file `.cvbak` cifrato con una password scelta dall'utente.
