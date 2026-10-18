---
title: "Infra Agent"
summary: "Agente AI per diagnosi, monitoraggio e operazioni controllate via SSH su homelab, server Linux e ambienti Proxmox."
category: "ai"
stack: ["Python", "SSH", "Docker", "Proxmox"]
problem: "Analizzare host differenti richiede passaggi ripetitivi tra shell, log e strumenti, mentre i comandi rischiosi non dovrebbero essere eseguiti senza controllo umano."
solution: "L'app centralizza host e conversazioni, raccoglie diagnostica in sola lettura e sottopone le azioni SSH rischiose a un flusso esplicito di proposta, approvazione o rifiuto."
outcome: "Un'interfaccia operativa persistente per indagare servizi, risorse, dischi, processi e rete mantenendo l'utente nel ciclo decisionale."
featured: false
order: 5
draft: false
links:
  - label: "Repository GitHub"
    href: "https://github.com/paoloronco/infra-agent"
  - label: "Documentazione"
    href: "https://paoloronco.github.io/infra-agent/"
---

## Operazioni assistite, non automatiche

Infra Agent conserva chat con il contesto dell'host, gestisce provider di modelli e offre strumenti per registrare macchine e generare chiavi SSH. Le operazioni potenzialmente invasive richiedono una decisione esplicita.

## Distribuzione

Il progetto include installazione di produzione con systemd e Nginx, oltre a immagine Docker e configurazione Compose per ambienti containerizzati.
