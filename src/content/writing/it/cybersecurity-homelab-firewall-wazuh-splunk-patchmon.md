---
title: "Come gestisco la cybersecurity del mio homelab: firewall, Wazuh, Splunk e PatchMon"
description: "Come proteggo il mio homelab con segmentazione UniFi, firewall Proxmox, Wazuh, Splunk, PatchMon, automazioni e backup."
pubDate: 2026-11-07
tags: ["cybersecurity", "homelab", "proxmox", "wazuh", "splunk", "patchmon"]
draft: false
---

Un homelab nasce spesso per sperimentare: si installa un hypervisor, si aggiungono macchine virtuali, poi arrivano container, applicazioni, automazioni e accessi remoti. A un certo punto la domanda cambia. Non è più soltanto «come faccio funzionare questo servizio?», ma anche «chi può raggiungerlo, cosa succede se viene compromesso e come me ne accorgo?».

La cybersecurity è sia il mio lavoro sia uno dei miei interessi principali. Il laboratorio mi permette di sperimentare configurazioni e procedure su sistemi reali, con i vincoli di un'infrastruttura domestica. Non è un SOC aziendale in miniatura e non voglio presentarlo come tale.

La mia strategia si basa su controlli complementari: **segmentazione e firewall**, **Wazuh** per la visibilità sugli endpoint, **Splunk** per log e detection, **PatchMon** per aggiornamenti e compliance. Aggiungo accesso remoto controllato, backup e verifiche periodiche. Il valore non è nel numero di strumenti, ma nel modo in cui li utilizzo e nei limiti che riesco a identificare.

## L'architettura di sicurezza

Lo schema riassume i ruoli e i flussi logici, non l'inventario fisico della rete. Ho volutamente omesso modelli dei dispositivi UniFi, IP e dettagli amministrativi. Le frecce indicano percorsi di raccolta e integrazioni, non permessi di accesso indiscriminati.

![Schema logico della sicurezza del mio homelab: UniFi, Proxmox, Wazuh, Splunk, PatchMon, n8n e backup](/posts/cybersecurity-homelab/security-architecture.svg)

*Schema logico semplificato. PatchMon non invia direttamente gli alert applicativi a Splunk.*

In particolare, **PatchMon non invia direttamente gli alert applicativi a Splunk**. Wazuh, invece, fornisce alert e inventari attraverso un collector dedicato. Distinguere le integrazioni realmente operative da quelle soltanto possibili è importante anche per valutare la copertura di sicurezza.

## Segmentazione di rete: partire dai percorsi

La prima difesa non è una dashboard: è ridurre i percorsi che un dispositivo può utilizzare. La mia infrastruttura di networking si basa sull'ecosistema **UniFi** e comprende reti separate per LAN principale, ufficio, IoT, homelab, DMZ e ospiti.

Non creo VLAN per il gusto di averne molte. Voglio evitare che un dispositivo smart, un client guest o un'applicazione pubblicata possano raggiungere automaticamente interfacce amministrative e sistemi che non servono al loro funzionamento.

Il traffico IoT verso le reti interne è generalmente bloccato, con eccezioni specifiche per integrazioni come Home Assistant. Le policy sono direzionali: consentire a Home Assistant di comunicare con un dispositivo IoT non significa autorizzare indiscriminatamente il percorso inverso.

Anche una DMZ non diventa sicura solo perché la chiamiamo così. Contano le regole effettive, i servizi in ascolto e i test di raggiungibilità. Quando modifico una policy, verifico sia che i flussi legittimi continuino a funzionare sia che quelli non autorizzati siano negati.

Dedico attenzione anche a **IPv6**. Con prefissi pubblici delegati dall'ISP, un controllo corretto su IPv4 non implica automaticamente la stessa protezione su IPv6.

## Proxmox: un secondo livello di firewall

Su **Proxmox VE** ospito VM e container LXC. Il firewall dell'hypervisor aggiunge un livello di controllo a quello della rete UniFi. Sul nodo host applico una politica restrittiva in ingresso; per diversi container definisco porte e sorgenti consentite in base alla funzione del servizio.

Per PatchMon, per esempio, distinguo l'accesso all'interfaccia web dalle porte di amministrazione. Per i servizi esposti separo il traffico applicativo dai percorsi di management.

Un audit mi ha insegnato un dettaglio fondamentale: **la spunta “Firewall” sulla NIC Proxmox non dimostra che una policy guest sia realmente attiva**. Ho trovato container con il flag sulla scheda ma policy disabilitata, e VM con flag abilitato senza regole guest effettive. Home Assistant, in una verifica, si affidava alle regole UniFi e ai controlli interni perché il firewall PVE sulla sua NIC non era attivo.

Non basta guardare la GUI: bisogna verificare configurazioni applicate e percorsi reali. Prima di modificare regole delicate salvo la configurazione, preparo un rollback, procedo su un guest alla volta e testo accessi consentiti e negati. Un firewall che mi blocca fuori dall'infrastruttura non è un miglioramento riuscito.

## Wazuh: osservare cosa succede dentro gli endpoint

Il firewall controlla la rete, ma non racconta cosa accade dentro una macchina. Per questo utilizzo **Wazuh**, con manager, indexer, dashboard e agenti sui sistemi supportati.

Uso **Security Configuration Assessment (SCA)** per verificare configurazioni e benchmark CIS, **File Integrity Monitoring (FIM)** per monitorare modifiche ai file, rootcheck, inventario software e vulnerability detection.

Questi moduli mi aiutano a rispondere a domande concrete: un file sensibile è cambiato? Ci sono eventi anomali di autenticazione? Un host non rispetta una baseline? Quali pacchetti sono associati a CVE note?

La gestione delle vulnerabilità è stata una delle esperienze più istruttive. In una fase ho osservato centinaia di finding Critical e migliaia di High. Aggiornamenti e verifiche hanno migliorato sensibilmente il quadro, ma alcune criticità sono rimaste.

**Un finding CVE non equivale a una compromissione dimostrata.** Verifico pacchetto, versione, advisory del vendor, applicabilità reale e possibilità di remediation. Anche un conteggio pari a zero non garantisce assenza di rischio. Kernel e pacchetti con supporto limitato meritano attenzione particolare.

Non tutti i sistemi hanno agenti nativi e un agente registrato non dimostra da solo che i dati siano aggiornati. Preferisco documentare i limiti di copertura anziché mostrare percentuali rassicuranti ma poco significative.

## Splunk: trasformare i log in informazioni utili

Utilizzo **Splunk** come punto centrale per raccolta, ricerca e analisi dei log. Riceve telemetria da Linux, Proxmox, applicazioni, servizi web, UniFi e componenti di backup. Un collector dedicato importa anche dati Wazuh.

Non voglio accumulare log senza uno scopo: voglio ricostruire eventi, riconoscere anomalie e ricevere segnalazioni che meritano attenzione. Ho creato dashboard e ricerche schedulate per autenticazioni, stato dei sistemi, sicurezza e operatività.

La dashboard **Wazuh Security Operations** è particolarmente utile: combina inventario CVE, stato degli agenti, controlli CIS e alert osservati. Permette di filtrare per host, severità e CVE e di separare i finding kernel dagli altri pacchetti.

Qui c'è una distinzione importante: **una vulnerabilità attualmente presente non è la stessa cosa di un alert osservato nel tempo**. La prima descrive una condizione da valutare; il secondo un evento da interpretare.

### Splunk e n8n: notifiche e automazione

Alcune ricerche Splunk inviano eventi tramite webhook a **n8n**, che gestisce parte dell'arricchimento e dell'instradamento delle notifiche. Ho lavorato sulla separazione delle credenziali, sull'autenticazione delle richieste e sull'uso di un relay per evitare segreti negli URL.

La pipeline non è perfetta: validazione dei payload, retry, deduplicazione, consegna end-to-end e rilevazione delle sorgenti che smettono di inviare dati sono aspetti da migliorare. Un alert configurato non è automaticamente un alert consegnato; una ricerca schedulata non è necessariamente una detection efficace.

## PatchMon: patching senza aggiornamenti impulsivi

Per il patch management utilizzo **PatchMon**, ospitato in un container dedicato. Mi offre una vista degli host, degli aggiornamenti disponibili, dello storico degli interventi e dei controlli di compliance.

Non applico automaticamente ogni aggiornamento a ogni macchina. Nel laboratorio convivono servizi di test e componenti essenziali per rete, backup e automazioni. Un riavvio imprevisto può creare problemi importanti.

Preferisco controllare advisory, dipendenze e impatto, predisporre un rollback, aggiornare in modo controllato e verificare i servizi. L'autopatching selettivo su host non critici è una possibile evoluzione, non una funzionalità già estesa a tutta l'infrastruttura.

Va chiarito anche il confine delle integrazioni: Wazuh monitora il sistema che ospita PatchMon, **non automaticamente il database degli alert applicativi**; Splunk non riceve oggi un feed diretto da PatchMon.

## Il mio processo di vulnerability management

Quando emerge un problema cerco di seguire una procedura ripetibile:

1. **Individuazione:** Wazuh segnala una CVE o PatchMon evidenzia aggiornamenti.
2. **Verifica:** controllo pacchetto, versione, advisory, esposizione e disponibilità del fix; quando utile confronto i log in Splunk.
3. **Priorità:** oltre al CVSS considero raggiungibilità, ruolo della macchina, exploit noti e impatto.
4. **Intervento:** preparo backup o rollback, applico la modifica in una finestra appropriata e riavvio solo se necessario.
5. **Conferma:** verifico servizi, log, accessi, agenti e nuova scansione.

Un caso concreto è stato l'hardening dei webhook di sicurezza. Durante una revisione ho trovato problemi nel trattamento dei token e nei percorsi di accesso. Ho separato credenziali, eliminato segreti dagli URL e verificato il rifiuto di richieste non autenticate. Ho anche documentato i limiti rimasti, inclusa l'assenza di anti-replay attivo sul percorso generale.

Il vantaggio dell'homelab è proprio questo: poter scoprire un problema, correggerlo e verificare se la correzione funziona.

## Accesso remoto e resilienza

Per accedere ai servizi fuori casa utilizzo, secondo il caso, **Tailscale**, **Twingate** e **Cloudflare Tunnel con Access**. Cerco di evitare la pubblicazione indiscriminata delle interfacce amministrative su Internet.

Raggiungibilità, autenticazione e autorizzazione sono controlli distinti: una pagina protetta da password può essere accessibile da troppe reti; un tunnel funzionante non certifica da solo ogni policy.

Anche i backup sono parte della sicurezza. Mantengo copie periodiche dell'ambiente Proxmox e copie esterne, usando storage offsite e cloud. Non sostituiscono prevention o detection, ma permettono di affrontare errori, guasti e perdita di dati. Contano retention, permessi, integrità e soprattutto **test di ripristino**, non solo l'esito verde di un job.

## Cosa voglio migliorare

Il laboratorio è in continua evoluzione. Devo restringere alcune eccezioni inter-VLAN, completare test da client reali, rivedere privilegi dei container e perfezionare le ACL IPv6. Sul lato detection voglio migliorare il tuning, la freschezza dei log e la verifica della consegna delle notifiche.

Sto anche sperimentando il triage assistito da AI e n8n: raccogliere evidenze in sola lettura da Wazuh, Splunk e dagli host e produrre un riepilogo motivato. **Suggerire una remediation non deve equivalere a concedere a un agente privilegi amministrativi illimitati.** Le operazioni sensibili richiedono permessi ridotti e approvazione.

Resta da ampliare la copertura di immagini Docker, dipendenze applicative, plugin e firmware: le CVE dei pacchetti OS non rappresentano tutta la superficie d'attacco.

## Da dove partire per replicare l'approccio

Non installerei subito quattro piattaforme. Partirei dall'inventario di host, porte, servizi e dati da proteggere. Poi introdurrei segmentazione, firewall verificabili e backup con almeno un restore test. Solo dopo aggiungerei endpoint monitoring, log centralizzati e patch management.

Wazuh, Splunk e PatchMon richiedono risorse e manutenzione. Su un laboratorio piccolo, pochi strumenti configurati bene possono essere più utili di uno stack complesso ma poco controllato. Il mio ambiente riflette anche la volontà di approfondire tecnologie vicine al mio lavoro.

## Conclusioni

La sicurezza di un homelab non si misura dal numero di tool installati, ma dalla capacità di **conoscere i sistemi, limitare gli accessi, riconoscere gli eventi importanti e intervenire senza perdere il controllo**.

Firewall, Wazuh, Splunk e PatchMon offrono prospettive complementari. Il lavoro più prezioso resta quello fra gli strumenti: verificare le configurazioni, investigare i falsi positivi, documentare i problemi e ripetere i test dopo ogni modifica.

Non è una configurazione definitiva o invulnerabile. È un ambiente in cui posso imparare, sbagliare in modo controllato e trasformare concetti di cybersecurity in esperienza concreta.
