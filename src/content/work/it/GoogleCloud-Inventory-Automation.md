---
title: "Google Cloud Inventory Automation"
summary: "Pipeline GitHub Actions che genera e versiona automaticamente un inventario Google Cloud usando accesso read-only e autenticazione OIDC senza chiavi statiche."
category: "cloud"
stack: ["Python", "Google Cloud", "GitHub Actions", "OIDC"]
problem: "Un inventario cloud mantenuto a mano diventa presto obsoleto, mentre le chiavi di service account a lunga durata aumentano il rischio operativo."
solution: "Il workflow usa Workload Identity Federation per impersonare un service account read-only, interroga Cloud Asset Inventory e Service Usage API e committa gli output solo quando cambiano."
outcome: "Un inventario trasparente e versionato nel repository, aggiornabile senza servizi GCP a pagamento né credenziali JSON persistenti."
featured: false
order: 11
draft: false
links:
  - label: "Repository GitHub"
    href: "https://github.com/paoloronco/GoogleCloud-Inventory-Automation"
  - label: "Documentazione"
    href: "https://paoloronco.github.io/GoogleCloud-Inventory-Automation/"
---

## Identità federata

GitHub ottiene un'identità temporanea tramite OIDC e può impersonare soltanto il service account autorizzato per quella repository. Le autorizzazioni richieste sono orientate alla lettura e rimangono revocabili da Google Cloud.

## Inventario come codice

Lo script Python produce output tracciabili in Git; il workflow confronta i risultati e crea un commit soltanto in presenza di variazioni, mantenendo una cronologia delle risorse osservate.
