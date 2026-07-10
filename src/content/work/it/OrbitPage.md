---
title: "OrbitPage"
summary: "Link manager open source e self-hosted per riunire profilo, collegamenti e contenuti in una pagina pubblica completamente personalizzabile."
category: "tool"
stack: ["TypeScript", "Node.js", "SQLite", "Docker"]
problem: "Le piattaforme link-in-bio gestite da terzi limitano controllo sui dati, personalizzazione e modalità di distribuzione."
solution: "OrbitPage combina pagina pubblica, pannello amministrativo, storage SQLite, autenticazione, temi, pianificazione dei link e import/export JSON in un'app distribuibile via Docker."
outcome: "Un hub personale autonomo con editing responsive, anteprima live, analytics dei click e controllo completo su aspetto e contenuti."
featured: true
order: 3
draft: false
links:
  - label: "Repository GitHub"
    href: "https://github.com/paoloronco/orbitpage"
  - label: "Demo"
    href: "https://orbitpage-demo.paoloronco.it/"
---

## Un hub sotto il proprio controllo

OrbitPage gestisce link classici, testi, gruppi, separatori, icone e immagini. I contenuti possono essere riordinati, nascosti o programmati per intervalli di date senza eliminarli.

## Gestione e sicurezza

Il pannello usa password hashate, sessioni JWT firmate, query SQLite parametrizzate e rate limiting. Backup e ripristino di link e temi avvengono tramite file JSON.
