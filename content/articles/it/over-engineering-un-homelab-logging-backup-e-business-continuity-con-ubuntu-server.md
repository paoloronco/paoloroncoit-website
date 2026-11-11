---
title: "Over‑Engineering un Homelab: Logging, Backup e Business Continuity con Ubuntu Server"
description: "Questo articolo nasce da un problema molto concreto: sapere davvero se i backup funzionano, senza dover controllare manualmente log sparsi, script cron opachi…"
pubDate: 2026-01-22
tags: []
draft: false
---
Questo articolo nasce da un problema molto concreto: sapere davvero se i backup funzionano, senza dover controllare manualmente log sparsi, script cron opachi e notifiche poco affidabili.

Nel mio homelab (che resta pur sempre _una casa_, non un data center enterprise) ho deciso di applicare **principi da Business Continuity e Disaster Recovery** tipici di ambienti professionali:

-   logging deterministico e verificabile
-   separazione netta tra _esecuzione_ e _controllo_
-   principio di _fail‑closed_ (meglio un alert in più che un backup perso)
-   audit trail esterno e immutabile

Il risultato è un’architettura che ruota attorno a **Ubuntu Server**, backup ridondati (Oracle Cloud + Hetzner), **Google Cloud per il logging** e un workflow **n8n** che valida ogni giorno che tutto sia andato a buon fine.

Questo articolo spiega **l’architettura**, le **scelte tecniche** e il **perché**. Il workflow n8n è un prodotto a pagamento: lo descrivo in modo trasparente, ma senza rilasciare informazioni sensibili o replicabili uno‑a‑uno.

* * *

## Il problema reale (prima)

Prima di questa architettura, il flusso era il classico:

-   cron job → rsync / rclone
-   log locali
-   controllo manuale “quando capita”
-   alert solo in caso di errori evidenti

Questo approccio ha tre difetti strutturali:

1.  **Silenzio ≠ successo**  
    Se un job non parte o muore a metà, spesso non lo scopri subito.
2.  **Log locali = single point of failure**  
    Se perdi la VM, perdi anche la prova che il backup _era_ partito.
3.  **Tempo umano sprecato**  
    Leggere log grezzi è costoso e soggetto a errori.

Da qui la decisione di _over‑ingegnerizzare consapevolmente_.

* * *

## Obiettivi di progetto

Gli obiettivi non erano “fare cose fighe”, ma essere **operativamente sereni**:

-   sapere **ogni giorno** se tutti i job hanno girato
-   sapere **quale job** ha fallito e **perché**
-   avere log **immutabili** fuori dal server
-   poter dimostrare a posteriori cosa è successo (audit)
-   zero dipendenze inverse: il controllo non deve mai toccare il server

![](/posts/over-engineering-un-homelab-logging-backup-e-business-continuity-con-ubuntu-server/image-1024x597.png)

* * *

## Architettura ad alto livello

```
Ubuntu Server (on‑prem / Proxmox)
 ├─ cron
 ├─ rsync / rclone
 ├─ log strutturati
 │
 ├─ Google Cloud Logging (streaming)
 └─ Google Cloud Storage (snapshot log)
          │
          ▼
        n8n (monitoring & validation)
          │
          ├─ check presenza log
          ├─ parsing deterministico
          ├─ analisi contenuto
          └─ alert / ticket
```

Separazione chiave:

-   **Ubuntu Server esegue**
-   **n8n osserva**

Nessun SSH, nessuna API verso il server. Zero trust sul produttore del dato.

* * *

## Ubuntu Server come fondazione

Ubuntu Server è il punto di partenza:

-   VM su Proxmox
-   storage locale + dischi dedicati
-   script versionati (Git)
-   cron _semplice_, ma osservabile

### Log strutturati, non “testo a caso”

Ogni job di backup produce log con:

-   marker di `START`, `RSYNC_END`, `SUMMARY`, `END`
-   `run_id` univoco
-   `rc`, durata, warning, errori

Questo permette:

-   parsing deterministico
-   rilevare run incompleti
-   distinguere warning da failure

Non è logging “per l’uomo”, è logging **per le macchine**.

* * *

## Backup ridondati ≠ Business Continuity

Fare più copie non basta.

La **Business Continuity** richiede:

-   sapere che _tutte_ le copie sono state aggiornate
-   sapere _quando_ una copia non lo è
-   reagire in modo proporzionato

Per questo:

-   Oracle Cloud e Hetzner sono solo _target_
-   la verità è nei log
-   la continuità è nella verifica automatica

* * *

## Logging esterno: Google Cloud

Il logging è diviso in due canali complementari.

### 1\. Google Cloud Logging (streaming)

-   ingestione near‑real‑time dei log rsync
-   query veloci
-   troubleshooting immediato
-   costi bassissimi (spesso zero)

Serve per:

-   analisi
-   debug
-   visibilità operativa

### 2\. Google Cloud Storage (snapshot immutabili)

-   upload giornaliero dei log
-   path deterministico `YYYY/MM/DD`
-   versioning e retention
-   service account con permessi minimi

Serve per:

-   audit
-   verifica indipendente
-   input del workflow n8n

Questo bucket è la **fonte di verità** per il monitoring.

* * *

## Il ruolo di n8n (monitoring, non backup)

Il workflow n8n **non esegue backup**.

Fa solo tre cose, in ordine:

1.  **Verifica presenza**  
    Tutti i log attesi per oggi esistono?
2.  **Verifica integrità**  
    Ogni log ha START/END/SUMMARY coerenti?
3.  **Verifica semantica**  
    Errori? Warning? Pattern anomali?

Se qualcosa manca o non torna → alert.

### Perché n8n?

-   workflow leggibili
-   versionabili
-   estendibili
-   disaccoppiati dal server

Il valore non è “l’automazione”, ma **la validazione**.

* * *

### Dove acquistarlo

-   **Shop ufficiale**: [https://shop.paoloronco.it](https://shop.paoloronco.it/23-backup-sync-execution-validation-log-driven.html)
-   **Gumroad**: [https://paoloronco.gumroad.com](https://paoloronco.gumroad.com/l/ReliableBackup-SyncExecutionValidation)
-   **n8n Creators Hub / Templates**: in arrivo

## Perché è un workflow a pagamento

Questo workflow:

-   incapsula mesi di debug reale
-   gestisce edge case (log incompleti, duplicati, run parziali)
-   è pensato per essere **esteso**, non solo usato

Non vende magia.  
Vende **tempo risparmiato** e **errori evitati**.

### Dove acquistarlo

-   shop.paoloronco.it
-   Gumroad
-   n8n Creators Hub (template)

Il codice sensibile resta mio.  
L’architettura e i principi sono condivisi.

* * *

## Sicurezza e principi chiave

-   Service Account a scopo singolo
-   permessi minimi
-   niente credenziali nel workflow
-   niente accesso diretto al server

Se n8n venisse compromesso:

-   può solo _leggere log pubblici per lui_
-   non può toccare backup o server

Questo è **zero trust applicato a un homelab**.

* * *

## Cosa mi ha tolto di dosso questa architettura

-   controllo manuale quotidiano
-   ansia da “sarà partito?”
-   debug notturni
-   log inutili

In cambio ho ottenuto:

-   fiducia misurabile
-   alert significativi
-   audit trail
-   serenità operativa

* * *

## Conclusione

Questo progetto non è nato per dimostrare che _si può fare_.

È nato perché **non volevo più perdere tempo a dubitare dei backup**.

Anche in un homelab, i dati contano.  
E quando i dati contano, **il logging è parte del backup**, non un dettaglio.

Over‑engineering? Forse.  
Ma è un over‑engineering che dorme tranquillo.
