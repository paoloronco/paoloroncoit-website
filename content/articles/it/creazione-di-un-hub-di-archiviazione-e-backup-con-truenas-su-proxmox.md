---
title: "Creazione di un Hub di Archiviazione e Backup con TrueNAS su Proxmox"
description: "L'implementazione di un sistema di archiviazione affidabile e sicuro è essenziale per garantire la protezione dei dati e facilitare l'accesso da qualsiasi…"
pubDate: 2023-11-13
tags: ["proxmox","server"]
draft: false
---
L'implementazione di un sistema di archiviazione affidabile e sicuro è essenziale per garantire la protezione dei dati e facilitare l'accesso da qualsiasi dispositivo. In questo articolo, condividerò la mia esperienza nella creazione di un Virtual Machine (VM) su Proxmox con TrueNAS, ex FreeNAS, trasformandolo in un hub completo per backup, archiviazione e streaming multimediale.

## Creazione della VM con TrueNAS su Proxmox

1.  **Inizializzazione della VM:**
    -   Ho creato una VM dedicata su Proxmox, fornendo risorse adeguate per garantire prestazioni ottimali.
2.  **Installazione di TrueNAS:**
    -   Ho proceduto con l'installazione di TrueNAS sulla VM, seguendo la procedura guidata e configurando le impostazioni di base.
3.  **Configurazione delle Pool in RAID 10:**
    -   Utilizzando due dischi rigidi da 6TB ciascuno, ho creato pool in RAID 10 per garantire ridondanza e prestazioni elevate. Questo è diventato il cuore del mio sistema di backup e archiviazione.

## Implementazione di Strumenti di Backup e Sincronizzazione

4.  **CloudSync:**
    -   Per garantire la sicurezza dei dati anche in un'ubicazione esterna, ho configurato CloudSync per eseguire backup su un servizio di cloud storage. Questo assicura una copia dei dati in un luogo remoto.
5.  **Syncthing:**
    -   Per una sincronizzazione continua tra i miei dispositivi locali e il server, ho integrato Syncthing. Questo strumento garantisce coerenza e accesso ai file su tutti i miei dispositivi.
6.  **rSync:**
    -   Utilizzando rSync, ho automatizzato il processo di backup tra diverse unità di archiviazione, garantendo la coerenza dei dati e semplificando la gestione delle versioni.

## Potenziamento delle Funzionalità con Jellyfin e Netdata

7.  **Jellyfin:**
    -   Aggiungendo Jellyfin al mio hub, ho trasformato il server in un centro multimediale completo. Ora posso accedere ai miei contenuti multimediali da qualsiasi dispositivo nella rete.
8.  **Netdata:**
    -   L'integrazione di Netdata offre un monitoraggio completo delle risorse del sistema, garantendo prestazioni ottimali e consentendomi di intervenire prontamente in caso di problemi.

## Vantaggi e Considerazioni Finali

L'implementazione di TrueNAS su Proxmox ha notevolmente migliorato la gestione dei dati e la sicurezza delle informazioni. La creazione di pool RAID 10, l'uso di strumenti avanzati come CloudSync, Syncthing e rSync, insieme a funzionalità multimediali di Jellyfin e monitoraggio dettagliato di Netdata, ha trasformato il mio server in un hub completo e versatile.

La possibilità di eseguire backup locali e off-site, sincronizzare file tra dispositivi e godere di una libreria multimediale centralizzata ha reso questo progetto uno dei miei più significativi. La robustezza del sistema e la sua capacità di adattarsi alle mie esigenze in continua evoluzione sottolineano l'importanza di un approccio olistico alla gestione dei dati e della sicurezza informatica.
