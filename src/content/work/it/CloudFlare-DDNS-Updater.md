---
title: "Cloudflare DDNS Updater"
summary: "Script shell che rileva l'indirizzo IPv4 pubblico e aggiorna automaticamente un record DNS Cloudflare negli ambienti con IP dinamico."
category: "cloud"
stack: ["Shell", "Cloudflare API", "Linux", "Cron"]
problem: "Quando il provider cambia l'IP pubblico, i nomi DNS usati per raggiungere server domestici o risorse remote smettono di puntare all'indirizzo corretto."
solution: "Lo script confronta l'IPv4 corrente con il record Cloudflare e usa l'API per aggiornarlo; cron può eseguirlo periodicamente senza intervento manuale."
outcome: "Un semplice aggiornamento DDNS self-hosted che mantiene raggiungibile un dominio Cloudflare anche senza un indirizzo pubblico statico."
featured: false
order: 14
draft: false
links:
  - label: "Repository GitHub"
    href: "https://github.com/paoloronco/CloudFlare-DDNS-Updater"
---

## DNS dinamico essenziale

Il progetto è pensato per un server Linux e richiede un dominio gestito da Cloudflare, un record DNS, le credenziali API e l'identificativo della zona.

## Automazione periodica

Una voce cron esegue lo script all'intervallo desiderato, trasformando il controllo dell'IP e l'aggiornamento DNS in un'attività ripetibile.
