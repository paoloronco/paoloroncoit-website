---
title: "Enclave"
summary: "An offline Android password manager with AES-256-GCM encryption, biometric unlock, and protected backups, with no cloud or telemetry."
category: "security"
stack: ["Kotlin", "Jetpack Compose", "Room", "Android Keystore"]
problem: "Personal credentials need encryption at rest and convenient access without entrusting the vault to a remote service."
solution: "Enclave encrypts sensitive fields with keys held by Android Keystore, protects access with a passcode or biometrics, and stores data locally through Room."
outcome: "A multilingual mobile vault with a password generator, search, automatic locking, temporary clipboard, and importable encrypted backups."
featured: false
order: 9
draft: false
links:
  - label: "GitHub repository"
    href: "https://github.com/paoloronco/enclave"
  - label: "Google Play"
    href: "https://play.google.com/store/apps/details?id=com.paoloronco.codevault"
---

## Local security model

Passwords, usernames, and notes are encrypted individually with AES-256-GCM. The passcode is derived with PBKDF2, while failed attempts, backgrounding, and inactivity trigger configurable locking behavior.

## Vault and backups

Entries can be searched, categorized, and marked as favorites. Export creates an encrypted `.cvbak` file protected by a password selected by the user.
