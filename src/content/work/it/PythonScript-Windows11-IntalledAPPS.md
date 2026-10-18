---
title: "Windows 11 Installed Apps Exporter"
summary: "Script Python che raccoglie le applicazioni installate in Windows 11 e genera automaticamente un elenco testuale sul desktop."
category: "tool"
stack: ["Python", "Windows 11", "WMIC"]
problem: "Creare un inventario leggibile dei programmi installati può richiedere di consultare manualmente più schermate e origini di sistema."
solution: "Lo script interroga tramite WMIC l'elenco dei prodotti installati, normalizza i nomi delle applicazioni e scrive il risultato in un file `installed_apps.txt`."
outcome: "Un inventario locale e facilmente condivisibile delle applicazioni presenti sul PC, prodotto con una singola esecuzione."
featured: false
order: 15
draft: false
links:
  - label: "Repository GitHub"
    href: "https://github.com/paoloronco/PythonScript-Windows11-IntalledAPPS"
---

## Inventario rapido

Il progetto riduce la raccolta delle applicazioni installate a uno script autonomo. Al termine, il file di testo viene salvato sul desktop dell'utente.

## Utilizzo

È sufficiente disporre di Python su Windows 11 ed eseguire `script.py`; non sono richiesti servizi esterni o configurazioni cloud.
