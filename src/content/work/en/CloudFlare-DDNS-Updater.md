---
title: "Cloudflare DDNS Updater"
summary: "A shell script that detects the public IPv4 address and automatically updates a Cloudflare DNS record in dynamic-IP environments."
category: "cloud"
stack: ["Shell", "Cloudflare API", "Linux", "Cron"]
problem: "When an ISP changes the public IP, DNS names used to reach home servers or remote resources stop pointing to the correct address."
solution: "The script compares the current IPv4 address with the Cloudflare record and uses the API to update it; cron can run the check periodically without manual intervention."
outcome: "A simple self-hosted DDNS updater that keeps a Cloudflare-managed domain reachable without a static public address."
featured: false
order: 14
draft: false
links:
  - label: "GitHub repository"
    href: "https://github.com/paoloronco/CloudFlare-DDNS-Updater"
---

## Focused dynamic DNS

The project targets a Linux server and requires a Cloudflare-managed domain, a DNS record, API credentials, and the zone identifier.

## Scheduled automation

A cron entry runs the script at the selected interval, turning public-IP checks and DNS updates into a repeatable background task.
