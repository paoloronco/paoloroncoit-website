---
title: "Backup e Snapshot di Proxmox"
description: "Nel mio percorso di gestione del mio ambiente Proxmox VE, ho costantemente affrontato il compito critico dei backup dei dati. In passato, ho utilizzato Proxmox…"
pubDate: 2024-05-17
tags: []
draft: false
---
Nel mio percorso di gestione del mio ambiente Proxmox VE, ho costantemente affrontato il compito critico dei backup dei dati. In passato, ho utilizzato Proxmox Backup Server, ma ho presto riconosciuto che questa soluzione aveva i suoi svantaggi: richiedeva l'uso di un altro PC dedicato e non sempre garantiva l'affidabilità e l'efficienza desiderate. Alla ricerca di un approccio più integrato e affidabile, ho scoperto un metodo che si è rivelato molto più vantaggioso: l'utilizzo di snapshot direttamente su Proxmox VE, con il trasferimento dei backup su una VM TrueNAS.

**Snapshot su Proxmox VE**: Una delle caratteristiche più potenti di Proxmox VE è la capacità di creare snapshot delle macchine virtuali e dei container in modo rapido e efficiente. Sfruttando questa funzionalità, ho implementato un processo di backup che mi consente di creare snapshot regolari delle mie VM e dei miei container direttamente su Proxmox VE.

**Trasferimento dei Backup su TrueNAS**: Per garantire la sicurezza e la disponibilità dei miei backup, ho configurato una VM TrueNAS con uno storage pool dedicato all'interno del mio ambiente Proxmox VE. Questa macchina TrueNAS agisce come un repository centrale per i miei backup, consentendomi di archiviarli in modo sicuro e affidabile.

**Cloud Sync con Backblaze B2**: Per una protezione aggiuntiva e la resilienza dei dati, ho configurato la mia VM TrueNAS per eseguire un backup cloud dei backup locali su Backblaze B2. Questo processo di cloud sync, eseguito ogni notte, garantisce che i miei dati siano protetti anche in caso di guasti hardware o catastrofi locali.

**Vantaggi e Conclusioni**: Questo approccio ai backup su Proxmox VE offre numerosi vantaggi. Innanzitutto, elimina la necessità di un hardware dedicato per il backup, semplificando la mia infrastruttura e riducendo i costi. Inoltre, l'integrazione nativa con Proxmox VE e l'uso di TrueNAS come repository centrale migliorano l'efficienza e l'affidabilità complessiva del mio processo di backup. Infine, il backup cloud su Backblaze B2 fornisce una protezione aggiuntiva e la tranquillità di sapere che i miei dati sono al sicuro anche in caso di eventi catastrofici. Questo approccio ha dimostrato di essere una soluzione efficace e affidabile per la gestione dei backup nel mio ambiente Proxmox VE.
