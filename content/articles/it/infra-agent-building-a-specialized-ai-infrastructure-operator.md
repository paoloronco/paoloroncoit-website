---
title: "Infra Agent | Building a Specialized AI Infrastructure Operator"
description: "Negli ultimi mesi ho lavorato a un progetto personale chiamato Infra Agent. L’idea non era creare “l’ennesimo AI assistant”. Esistono già ottimi agent…"
pubDate: 2026-05-21
tags: []
draft: false
---
Negli ultimi mesi ho lavorato a un progetto personale chiamato Infra Agent.

L’idea non era creare “l’ennesimo AI assistant”.

Esistono già ottimi agent general-purpose come:

-   [OpenClaw](https://openclaw.ai/?utm_source=chatgpt.com)
-   OpenAI Codex
-   Anthropic Claude Code

Il problema è che questi strumenti cercano di fare tutto:

-   coding
-   browser automation
-   productivity
-   email
-   files
-   generic workflows

Io volevo invece costruire qualcosa di molto più verticale:

> un AI Agent specializzato esclusivamente in infrastruttura Linux, troubleshooting e operazioni SSH remote.

* * *

## The Problem

Quando gestisci sistemi Linux reali, spesso perdi tempo in task ripetitivi:

-   controllare servizi
-   leggere log
-   verificare disk usage
-   capire perché nginx è down
-   diagnosticare container
-   controllare systemd
-   verificare networking
-   fare remediation basilari

Gli LLM sono ottimi nel reasoning operativo.

Ma dare accesso shell diretto a un AI è pericoloso.

Specialmente perché molti AI agents moderni hanno enormi superfici d’attacco e problemi di sicurezza.

Infra Agent nasce proprio per risolvere questo problema:

-   AI utile
-   ma confinata
-   auditabile
-   approval-based
-   limitata all’ambito infrastrutturale

* * *

## A Specialized Infrastructure Agent

Infra Agent non è un “computer-use agent”.

Non controlla desktop.  
Non naviga browser.  
Non manda email.

Fa una cosa sola:

> Infrastructure Operations.

È progettato per:

-   Linux servers
-   SSH operations
-   system diagnostics
-   service lifecycle management
-   operational troubleshooting

L’agente lavora tramite:

-   SSH
-   command validation
-   policy enforcement
-   scoped execution
-   approval workflows

* * *

## Safety First

La parte più importante del progetto è stata la sicurezza.

Molti AI agents moderni operano con privilegi enormi e poca separazione.

Infra Agent invece utilizza:

-   allowlists
-   blocklists
-   scoped sudo
-   explicit approvals
-   dedicated AI users
-   SSH isolation
-   server-side validation

Esempi:

-   lettura log → consentita
-   restart nginx → approval richiesta
-   comandi distruttivi → bloccati

L’obiettivo non è sostituire il sysadmin.

È ridurre:

-   tempo operativo
-   troubleshooting manuale
-   context switching
-   task ripetitivi

mantenendo però:

-   controllo umano
-   auditabilità
-   sicurezza operativa

* * *

## Homelab & Real Infrastructure

Il progetto è sviluppato e testato principalmente nel mio homelab personale.

Questo mi ha permesso di lavorare su:

-   infrastrutture Linux reali
-   networking
-   SSH hardening
-   service orchestration
-   reverse proxy
-   monitoring
-   containerized workloads
-   AI orchestration

anziché costruire un semplice proof-of-concept teorico.

* * *

## Technologies

## Backend

-   Python
-   FastAPI
-   LangChain
-   SQLite

## Frontend

-   React
-   TypeScript

## AI Providers

-   OpenAI
-   Anthropic
-   Gemini
-   Ollama
-   Groq
-   DeepSeek
-   & Many mores

* * *

## What I Learned

Questo progetto mi ha permesso di approfondire:

-   AI agent architecture
-   operational safety
-   Linux systems
-   infrastructure automation
-   SSH security
-   approval-based execution
-   LLM orchestration
-   secure remote tooling
-   system observability

* * *

## Current Status

Infra Agent è ancora in sviluppo attivo e continuo a lavorare su:

-   orchestrazione multi-host
-   automation workflows
-   observability
-   AI safety
-   infrastructure reasoning
-   policy systems

Repository GitHub: [Infra Agent Repository](https://github.com/paoloronco/infra-agent?utm_source=chatgpt.com)
