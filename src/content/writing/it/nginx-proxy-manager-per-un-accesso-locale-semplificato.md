---
title: "NGINX Proxy Manager per un Accesso Locale Semplificato"
description: "Nella gestione del mio homelab, ho implementato con successo NGINX Proxy Manager come componente chiave per semplificare l'accesso locale ai servizi e alle…"
pubDate: 2023-11-10
tags: ["proxmox","server","web"]
draft: false
---
Nella gestione del mio homelab, ho implementato con successo NGINX Proxy Manager come componente chiave per semplificare l'accesso locale ai servizi e alle applicazioni della mia rete. Questo articolo fornirà una panoramica di come NGINX Proxy Manager migliora l'esperienza di accesso ai servizi web sulla mia rete locale.

## Problema Iniziale
Inizialmente, l'accesso alle applicazioni locali richiedeva l'utilizzo di indirizzi IP e porte specifiche, risultando poco pratico e difficile da ricordare. Inoltre, l'uso di certificati auto-generati comportava fastidiosi avvisi di sicurezza nei browser.

## Soluzione Implementata con NGINX Proxy Manager
Per risolvere questi problemi, ho adottato NGINX Proxy Manager come reverse proxy e DNS locale. Questa soluzione semplifica l'accesso alle applicazioni attraverso domini locali personalizzati senza gli avvertimenti di sicurezza.

## Funzionamento di NGINX Proxy Manager
NGINX Proxy Manager sfrutta il metodo di verifica del certificato SSL chiamato DNS-01, consentendo di generare certificati validi per i domini locali senza esporre la macchina alla pubblica rete. Questo approccio supera le limitazioni del metodo HTTP-01, rendendo possibile l'uso di wildcard certificates per sottodomini.

## Implementazione Pratica

1.  **Preparativi:**
    -   Ho scelto DuckDNS come fornitore DNS gratuito per semplificare il processo.
    -   NGINX Proxy Manager è stato selezionato come reverse proxy per la sua facilità di configurazione e il supporto per la verifica DNS-01 di Let's Encrypt.
2.  **Configurazione NGINX Proxy Manager:**
    -   Ho eseguito NGINX Proxy Manager tramite Docker su un sistema Debian 11.
    -   Il file docker-compose.yml è stato configurato con i servizi desiderati, come Nginx Proxy Manager, Jellyfin, Home Assistant, e Nextcloud.
3.  **Configurazione DNS con DuckDNS:**
    -   Creato un dominio DuckDNS e configurato il CNAME per il sottodominio desiderato.
4.  **Generazione Certificato SSL:**
    -   Utilizzando l'interfaccia di NGINX Proxy Manager, ho creato un certificato SSL valido per il mio dominio locale e i relativi sottodomini.
5.  **Configurazione dei Proxy:**
    -   Per ogni applicazione, ho aggiunto un'entry proxy in NGINX Proxy Manager specificando il dominio, il forwarding IP e la porta.
6.  **Accesso Sicuro:**
    -   Ora, posso accedere alle applicazioni locali attraverso domini personalizzati (es. [https://jellyfin.local](https://jellyfin.local/)) senza avvisi di sicurezza.

## Conclusioni

L'integrazione di NGINX Proxy Manager nella mia rete locale ha notevolmente migliorato l'accesso e la gestione delle applicazioni, offrendo una soluzione elegante e sicura. Questo approccio rappresenta un aggiornamento significativo rispetto all'utilizzo di IP e porte, contribuendo a semplificare la navigazione nei servizi del mio homelab. Per ulteriori dettagli sulle funzionalità avanzate di NGINX Proxy Manager, visita il sito ufficiale: [nginxproxymanager.com](https://nginxproxymanager.com/).
