---
title: "Google Cloud Inventory Automation"
summary: "A GitHub Actions pipeline that automatically generates and versions a Google Cloud inventory using read-only access and keyless OIDC authentication."
category: "cloud"
stack: ["Python", "Google Cloud", "GitHub Actions", "OIDC"]
problem: "A manually maintained cloud inventory quickly becomes stale, while long-lived service-account keys increase operational risk."
solution: "The workflow uses Workload Identity Federation to impersonate a read-only service account, queries Cloud Asset Inventory and Service Usage API, and commits outputs only when they change."
outcome: "A transparent, versioned inventory stored in the repository and updated without paid GCP services or persistent JSON credentials."
featured: false
order: 11
draft: false
links:
  - label: "GitHub repository"
    href: "https://github.com/paoloronco/GoogleCloud-Inventory-Automation"
  - label: "Documentation"
    href: "https://paoloronco.github.io/GoogleCloud-Inventory-Automation/"
---

## Federated identity

GitHub obtains a temporary identity through OIDC and can impersonate only the service account authorized for that repository. The required permissions are read-oriented and remain revocable from Google Cloud.

## Inventory as code

The Python script produces outputs tracked in Git; the workflow compares results and creates a commit only when changes are present, preserving a history of observed resources.
