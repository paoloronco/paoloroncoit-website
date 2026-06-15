---
title: "Enclave — Offline Password Manager"
description: "Un password manager per Android costruito con privacy e sicurezza come vincoli non negoziabili. Sviluppato da Paolo Ronco in collaborazione con Claude AI…"
pubDate: 2026-03-23
tags: []
draft: false
---
> Un password manager per Android costruito con privacy e sicurezza come vincoli non negoziabili. Sviluppato da Paolo Ronco in collaborazione con Claude AI (Anthropic).

* * *

## Link

|  |  |
| --- | --- |
| **GitHub** | [https://github.com/paoloronco/enclave](https://github.com/paoloronco/enclave) |
| **Google Play** | _(link disponibile una volta pubblicato e approvato)_ |
| **Privacy Policy** | [https://sites.google.com/view/enclave-pp](https://sites.google.com/view/enclave-pp) |

* * *

## Perché Esiste Quest'App

La maggior parte dei password manager condivide un assunto implicito: i tuoi dati vivono nel cloud, sincronizzati tra dispositivi, accessibili ovunque. Quell'assunto richiede fiducia — nell'azienda, nei loro server, nella loro implementazione crittografica, nella loro risposta in caso di violazione.

Enclave nasce per eliminare quell'assunto alla radice.

L'obiettivo era semplice: un password manager dove l'unica persona in grado di accedere al vault sei tu, dove i dati non lasciano mai il dispositivo, e dove il modello di sicurezza è trasparente e verificabile. Nessun account, nessuna sincronizzazione, nessuna telemetria, nessun accesso a internet.

Il contesto non è teorico: la violazione di LastPass nel 2022 ha esposto vault cifrati di milioni di utenti. Quando succede a un servizio cloud, gli utenti pagano il prezzo di una fiducia che non avrebbero dovuto dover riporre.

* * *

## Come È Stato Sviluppato

Enclave è stato sviluppato interamente attraverso un workflow AI-assisted, usando **Claude** (Anthropic) come partner di sviluppo principale. L'intero codebase — decisioni architetturali, implementazione della sicurezza, interfaccia utente e documentazione — è stato progettato e raffinato attraverso conversazioni iterative con Claude.

Questo approccio ha permesso di:

-   **Iterare rapidamente sull'architettura** — modelli di sicurezza, flussi di dati e confini tra componenti esplorati e messi alla prova prima di scrivere una riga di codice
-   **Pensiero security-first** — ogni decisione progettuale valutata rispetto a scenari di minaccia in tempo reale
-   **Documentazione completa** — README, privacy policy e commenti sono emersi insieme al codice, non come afterthought

Il progetto dimostra che uno sviluppatore singolo, lavorando con un collaboratore AI, può produrre un'applicazione Android di qualità production con un modello di sicurezza paragonabile a strumenti commerciali affermati.

* * *

## Panoramica Tecnica

### Stack

| Layer | Tecnologia |
| --- | --- |
| Linguaggio | Kotlin 2.0.21 |
| UI | Jetpack Compose + Material 3 |
| Database | Room 2.6.1 (SQLite, cifratura a livello di campo) |
| Navigazione | Navigation Compose 2.8.5 |
| Sicurezza | Android Keystore (AES-256-GCM, hardware-backed) |
| Autenticazione | AndroidX Biometric 1.1.0 (BiometricPrompt) |
| Preferenze | EncryptedSharedPreferences (AES-256-SIV / AES-256-GCM) |
| Build | Gradle KTS + KSP 2.0.21-1.0.27 |
| Min SDK | Android 9 (API 28) |
| Target SDK | Android 15 (API 35) |

### Architettura

Architettura MVVM a modulo singolo con separazione netta delle responsabilità:

android/app/src/main/java/com/paoloronco/codevault/  
├── data/  
│   ├── AccountEntity.kt       # Entità Room — enum EntryType, Categorie  
│   ├── AccountDao.kt          # DAO con query Flow-based  
│   └── AppDatabase.kt         # Database Room (v3, migrazioni manuali)  
├── security/  
│   └── SecurityManager.kt     # Hashing passcode, cifratura campi,  
│                              # gestione chiavi Keystore, flag biometrico  
├── backup/  
│   └── BackupManager.kt       # Export / import AES-256-GCM via SAF  
└── ui/  
    ├── MainViewModel.kt        # ViewModel unico: stato auth, CRUD,  
    │                          # gestione clipboard, operazioni backup  
    ├── Navigation.kt           # Route come Sealed class  
    └── screens/  
        ├── SetupScreen.kt      # Setup passcode al primo avvio  
        ├── LockScreen.kt       # Sblocco PIN / password + biometrico  
        ├── PinEntry.kt         # Composable riutilizzabili PinDots + PinNumPad  
        ├── HomeScreen.kt       # Lista, ricerca, swipe-to-delete  
        ├── AddEditScreen.kt    # Form inserimento/modifica + generatore password  
        ├── AccountDetailScreen.kt  # Vista dettaglio, campi mascherati, copia  
        └── SettingsScreen.kt   # Auto-lock, biometrico, lingua, backup

* * *

## Modello di Sicurezza

La sicurezza è il prodotto principale, non una funzionalità aggiuntiva. Ogni decisione progettuale è stata presa con un threat model esplicito.

| Asset | Meccanismo di protezione |
| --- | --- |
| Passcode master | PBKDF2WithHmacSHA256, 65 536 iterazioni, chiave derivata a 256 bit, salt random da 16 byte — mai memorizzato in chiaro |
| Chiave di cifratura DB | Chiave AES-256-GCM nell'Android Keystore (`codevault_field_key`), hardware-backed sui dispositivi supportati |
| Campi sensibili nel DB | Cifrati singolarmente a livello di campo prima della scrittura — username, password, note |
| Preferenze app | EncryptedSharedPreferences (AES-256-GCM / AES-256-SIV) |
| File di backup | AES-256-GCM + derivazione chiave PBKDF2 dalla password di backup scelta dall'utente, salt random da 16 byte + IV da 12 byte |
| Appunti | Flag `IS_SENSITIVE` + cancellazione automatica dopo 30 secondi |
| Screenshot | `FLAG_SECURE` — blocca screenshot e nasconde il contenuto nel task switcher |
| Backup cloud | Esplicitamente disabilitato (`allowBackup="false"`, `backup_rules.xml` personalizzato) |
| Brute-force | 5 tentativi falliti attivano un lockout di 30 secondi con countdown visivo |

Il database è memorizzato in `/data/data/com.paoloronco.codevault/databases/codevault_secure.db` — sandbox Android, inaccessibile ad altre app o a terze parti senza accesso root.

* * *

## Funzionalità

### Tipi di Voce nel Vault

| Tipo | Campi |
| --- | --- |
| **Account** | Titolo, Username / Email, Password, Note, Categoria |
| **PIN / Carta** | Titolo, PIN (mascherato), Intestatario / Info extra, Note, Categoria |
| **Nota Sicura** | Titolo, Testo nota |
| **Wi-Fi** | Titolo, SSID, Password, Note, Categoria |

### Generatore di Password

Generatore integrato basato su `SecureRandom` (nessuna fonte pseudo-casuale):

-   Lunghezza configurabile (8–32 caratteri)
-   Toggle indipendenti per maiuscole, cifre e simboli

### Organizzazione

-   **Categorie** — Generale, Social, Banca, Email, Lavoro, Shopping
-   **Preferiti** — aggiungi alle stelle qualsiasi voce; i preferiti appaiono sempre in cima
-   **Ricerca in tempo reale** per titolo
-   **Swipe per eliminare** con dialogo di conferma

### Backup e Ripristino

Esporta l'intero vault in un file `.cvbak` cifrato tramite Android Storage Access Framework. Il file di backup è cifrato in modo indipendente con una password scelta dall'utente — leggibile solo con il passcode corretto, anche se il file venisse acquisito da terze parti.

### Autenticazione

-   PIN numerico o passcode alfanumerico
-   Sblocco biometrico tramite `BiometricPrompt` (BIOMETRIC\_STRONG — impronta / viso)
-   Timeout auto-lock configurabile (30s / 1m / 2m / 5m / 10m / mai)
-   Blocco immediato quando l'app va in background

### Supporto Linguistico

Selettore lingua integrato nell'app, senza necessità di riavvio:

-   Italiano, Inglese, Tedesco, Spagnolo

* * *

## Cosa Lo Distingue

La maggior parte dei password manager open source sono port di strumenti web-first o wrapper sottili attorno a database cifrati. Enclave è stato progettato da zero per Android, usando le primitive di sicurezza native della piattaforma (Android Keystore, BiometricPrompt, EncryptedSharedPreferences) invece di implementare crittografia custom.

Differenziatori chiave:

-   **Cifratura a livello di campo** — non solo a livello di database. Ogni campo sensibile è cifrato individualmente, quindi anche l'accesso diretto al database non espone nulla di utile.
-   **Chiavi hardware-backed** — sui dispositivi supportati, la chiave AES-256-GCM non lascia mai il secure element hardware.
-   **Zero dipendenze da servizi esterni** — niente Firebase, niente analytics, niente crash reporting. L'app non dichiara il permesso `INTERNET`.
-   **Completamente open source** sotto AGPL v3 — il modello di sicurezza è pubblicamente verificabile.

* * *

## Open Source e Licenza

Enclave è rilasciato sotto **GNU Affero General Public License v3.0**.

Questa licenza è stata scelta deliberatamente: qualsiasi fork o opera derivata — inclusa una offerta come servizio — deve essere rilasciata sotto gli stessi termini. Questo impedisce fork proprietari con modifiche non divulgate (come backdoor), garantendo che qualsiasi versione di questo codice che raggiunga gli utenti rimanga verificabile.

* * *

## Sviluppatore

**Paolo Ronco**

-   Email: info@paoloronco.it
-   GitHub: [https://github.com/paoloronco](https://github.com/paoloronco)

* * *

_Sviluppato con Claude — Anthropic (2026)_
