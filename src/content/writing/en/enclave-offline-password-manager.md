---
title: "Enclave — Offline Password Manager"
description: "A password manager for Android built with privacy and security as non-negotiable constraints. Developed by Paolo Ronco in collaboration with Claude AI…"
pubDate: 2026-03-23
tags: []
draft: false
---
> A password manager for Android built with privacy and security as non-negotiable constraints. Developed by Paolo Ronco in collaboration with Claude AI (Anthropic).

* * *

## Links

|  |  |
| --- | --- |
| **GitHub** | [https://github.com/paoloronco/enclave](https://github.com/paoloronco/enclave) |
| **Google Play** | _(link available once published and approved)_ |
| **Privacy Policy** | [https://sites.google.com/view/enclave-pp](https://sites.google.com/view/enclave-pp) |

* * *

## Why This App Exists

Most password managers share an implicit assumption: your data lives in the cloud, synchronized across devices, accessible anywhere. That assumption requires trust — in the company, their servers, their cryptographic implementation, and their response to breaches.

Enclave was born to eliminate that assumption at its root.

The goal was simple: a password manager where you are the only person who can access the vault, where data never leaves the device, and where the security model is transparent and verifiable. No accounts, no synchronization, no telemetry, no internet access.

The context is not theoretical: the 2022 breach of LastPass exposed encrypted vaults of millions of users. When it happens to a cloud service, users pay the price for a trust they should not have had to place.

* * *

## How It Was Developed

Enclave was developed entirely through an AI-assisted workflow, using **Claude** (Anthropic) as the main development partner. The entire codebase — architectural decisions, security implementation, user interface, and documentation — was designed and refined through iterative conversations with Claude.

This approach allowed for:

-   **Rapid iteration on architecture** — security models, data flows, and component boundaries explored and tested before writing a single line of code
-   **Security-first thinking** — every design decision evaluated against real-time threat scenarios
-   **Complete documentation** — READMEs, privacy policies, and comments emerged alongside the code, not as afterthoughts

The project demonstrates that a single developer working with an AI collaborator can produce a high-quality production Android app with a security model comparable to established commercial tools.

* * *

## Technical Overview

### Stack

| Layer | Technology |
| --- | --- |
| Language | Kotlin 2.0.21 |
| UI | Jetpack Compose + Material 3 |
| Database | Room 2.6.1 (SQLite, field-level encryption) |
| Navigation | Navigation Compose 2.8.5 |
| Security | Android Keystore (AES-256-GCM, hardware-backed) |
| Authentication | AndroidX Biometric 1.1.0 (BiometricPrompt) |
| Preferences | EncryptedSharedPreferences (AES-256-SIV / AES-256-GCM) |
| Build | Gradle KTS + KSP 2.0.21-1.0.27 |
| Min SDK | Android 9 (API 28) |
| Target SDK | Android 15 (API 35) |

### Architecture

Single-module MVVM architecture with clear responsibility separation:

android/app/src/main/java/com/paoloronco/codevault/  
├── data/  
│   ├── AccountEntity.kt       # Room entity — enum EntryType, Categories  
│   ├── AccountDao.kt          # DAO with Flow-based queries  
│   └── AppDatabase.kt         # Room database (v3, manual migrations)  
├── security/  
│   └── SecurityManager.kt     # Password hashing, field-level encryption,  
│                              # key management in Keystore, biometric flag  
├── backup/  
│   └── BackupManager.kt       # Export / import AES-256-GCM via SAF  
└── ui/  
    ├── MainViewModel.kt        # Single ViewModel: auth state, CRUD,  
    │                          # clipboard management, backup operations  
    ├── Navigation.kt           # Routes as Sealed class  
    └── screens/  
        ├── SetupScreen.kt      # Set up master password on first launch  
        ├── LockScreen.kt       # Unlock PIN / password + biometric  
        ├── PinEntry.kt         # Reusable PinDots + PinNumPad composable  
        ├── HomeScreen.kt       # List, search, swipe-to-delete  
        ├── AddEditScreen.kt    # Form for insertion/modification + password generator  
        ├── AccountDetailScreen.kt  # Detailed view, masked fields, copy  
        └── SettingsScreen.kt   # Auto-lock, biometric, language, backup

* * *

## Security Model

Security is the primary product, not an add-on feature. Every design decision was made with an explicit threat model.

| Asset | Protection Mechanism |
| --- | --- |
| Master password | PBKDF2WithHmacSHA256, 65,536 iterations, derived key of 256 bits, random salt of 16 bytes — never stored in plaintext |
| Database encryption key | AES-256-GCM key in Android Keystore (`codevault_field_key`), hardware-backed on supported devices |
| Sensitive fields in the database | Field-level encryption before writing to the database — usernames, passwords, notes |
| App preferences | EncryptedSharedPreferences (AES-256-GCM / AES-256-SIV) |
| Backup file | AES-256-GCM + key derivation from user-chosen password — readable only with correct master password, even if acquired by third parties. |

### Authentication

-   Numeric PIN or alphanumeric passcode
-   Biometric unlock via `BiometricPrompt` (BIOMETRIC_STRONG — fingerprint / face)
-   Configurable auto-lockout timeout (30s / 1m / 2m / 5m / 10m / never)
-   Immediate lock when app goes to background

### Language Support

Integrated language selector within the app, no need for restart:

-   Italian, English, German, Spanish

* * *

## What Sets It Apart

Most open-source password managers are ports of web-first tools or thin wrappers around encrypted databases. Enclave was designed from scratch for Android, using native platform security primitives (Android Keystore, BiometricPrompt, EncryptedSharedPreferences) instead of implementing custom encryption.

Key differentiators:

-   **Field-level encryption** — not just at the database level. Each sensitive field is individually encrypted, so direct access to the database does not reveal anything useful.
-   **Hardware-backed keys** — on supported devices, the AES-256-GCM key never leaves the hardware secure element.
-   **Zero dependencies on external services** — no Firebase, no analytics, no crash reporting. The app declares no `INTERNET` permission.

### Open Source and License

Enclave is released under **GNU Affero General Public License v3.0**.

This license was chosen deliberately: any fork or derivative work — including an offer as a service — must be released under the same terms. This prevents proprietary forks with undisclosed changes (like backdoors), ensuring that any version of this code reaching users remains verifiable.

* * *

## Developer

**Paolo Ronco**

-   Email: info@paoloronco.it
-   GitHub: [https://github.com/paoloronco](https://github.com/paoloronco)

* * *

_Developed with Claude — Anthropic (2026)_

