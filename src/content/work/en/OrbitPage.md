---
title: "OrbitPage"
summary: "An open-source, self-hosted link manager for bringing a profile, links, and content into one fully customizable public page."
category: "tool"
stack: ["TypeScript", "Node.js", "SQLite", "Docker"]
problem: "Hosted link-in-bio platforms limit control over data, customization, and deployment."
solution: "OrbitPage combines a public page, admin dashboard, SQLite storage, authentication, themes, link scheduling, and JSON import/export in a Docker-ready application."
outcome: "An independent personal hub with responsive editing, live preview, click analytics, and full control over appearance and content."
featured: true
order: 3
draft: false
links:
  - label: "GitHub repository"
    href: "https://github.com/paoloronco/orbitpage"
  - label: "Demo"
    href: "https://orbitpage-demo.paoloronco.it/"
---

## A hub under your control

OrbitPage manages standard links, text, grouped content, separators, icons, and images. Items can be reordered, hidden, or scheduled for date ranges without being deleted.

## Management and security

The dashboard uses hashed passwords, signed JWT sessions, parameterized SQLite queries, and rate limiting. Links and themes can be backed up and restored as JSON.
