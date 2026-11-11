---
title: "Disk Management App"
summary: "Applicazione desktop Windows in Python per consultare i dischi fisici ed eseguire operazioni amministrative da un'interfaccia grafica."
category: "tool"
stack: ["Python", "Tkinter", "PowerShell", "PyInstaller"]
problem: "Le informazioni e le operazioni sui dischi Windows sono distribuite tra strumenti grafici e comandi amministrativi non sempre immediati."
solution: "L'app usa una GUI Tkinter, richiede elevazione quando necessaria e richiama PowerShell per leggere dischi, partizioni, lettere di unità e file system."
outcome: "Un eseguibile Windows che riunisce la consultazione e la gestione di base dei supporti in un'unica interfaccia."
featured: false
order: 13
draft: false
links:
  - label: "Repository GitHub"
    href: "https://github.com/paoloronco/Disk-Management-APP"
---

## Interfaccia per gli strumenti Windows

Il progetto combina Python e comandi PowerShell nativi per raccogliere informazioni sui dischi fisici e sulle relative partizioni. La GUI presenta i risultati senza richiedere l'uso diretto del terminale.

## Distribuzione

La repository include configurazione e artefatti PyInstaller, così l'applicazione può essere avviata anche come eseguibile Windows.
