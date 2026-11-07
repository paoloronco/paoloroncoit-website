---
title: "Hermes Agent: un assistente AI personale tra self-hosting, memoria e sicurezza"
description: "La mia esperienza con Hermes Agent di Nous Research: architettura ibrida Proxmox, Linux e Windows, memoria persistente, strumenti AI e cybersecurity."
pubDate: 2026-11-07
tags: ["AI", "AI Agents", "self-hosting", "cybersecurity", "homelab"]
draft: false
---

Negli ultimi mesi ho dedicato parecchio tempo alla sperimentazione di modelli AI, automazioni e agenti capaci di interagire con sistemi e applicazioni. Una delle differenze più interessanti è quella tra un modello linguistico in una normale chat e un **agente AI** che utilizza strumenti, esegue operazioni e conserva il contesto nel tempo.

È in questo ambito che ho iniziato a sperimentare [Hermes Agent](https://github.com/NousResearch/hermes-agent), il progetto open source di Nous Research. Dopo averlo configurato nella mia infrastruttura personale e provato in diverse attività, è uno degli strumenti di questa categoria che mi ha convinto maggiormente.

Non perché sia perfetto o sostituisca ogni altro assistente, ma per la combinazione di memoria, strumenti e flessibilità. C'è però una condizione fondamentale: **un agente con accesso ai sistemi richiede un modello di sicurezza ben diverso da quello di un chatbot**.

Questo articolo racconta la mia esperienza e le scelte architetturali a livello concettuale, senza esporre configurazioni o dettagli privati dell'homelab.

## Perché Hermes è interessante

Hermes è un framework per assistenti AI che possono mantenere memoria tra sessioni, utilizzare strumenti e interagire con ambienti diversi. A seconda delle integrazioni abilitate, può lavorare con terminali, file, servizi e procedure riutilizzabili.

Le funzionalità che trovo più interessanti sono:

- **Memoria persistente:** conservare informazioni utili e recuperarle nelle sessioni successive.
- **Skills:** riutilizzare conoscenze e procedure operative.
- **Tool calling:** usare strumenti anziché limitarsi a suggerire azioni.
- **Integrazioni estensibili:** collegare capacità aggiuntive, anche attraverso MCP dove supportato.
- **Flessibilità dei modelli:** utilizzare provider cloud o endpoint locali compatibili.

Il punto centrale è la separazione tra il modello che interpreta la richiesta e l'ambiente che gestisce strumenti, memoria e azioni. Questo rende l'assistente meno dipendente da un singolo provider AI, pur richiedendo attenzione alla compatibilità dei modelli con il tool calling.

## La mia architettura ibrida

Ho scelto di sfruttare l'infrastruttura già disponibile, senza dedicare un nuovo server fisico al progetto.

**Proxmox VE** ospita una macchina virtuale Linux dedicata all'ambiente dell'agente. La virtualizzazione permette di organizzare le risorse e separare il runtime dagli altri servizi, anche se non costituisce da sola una garanzia di isolamento.

**Linux** è l'ambiente operativo in cui vengono eseguiti Hermes e gli strumenti configurati. Mantenerlo separato dalla workstation quotidiana semplifica gestione, manutenzione e sperimentazione.

**Windows** rimane la mia workstation principale, dove utilizzo anche Hermes Desktop e runtime di inferenza locale, tra cui llama.cpp, sfruttando quando opportuno la GPU NVIDIA.

L'interazione tra gli ambienti utilizza connessioni SSH opportunamente configurate. La GPU non viene automaticamente assegnata alla VM: l'inferenza locale viene eseguita dal runtime sulla workstation, mentre l'agente può utilizzare un endpoint compatibile, se configurato.

Questa separazione consente di evolvere indipendentemente il runtime dell'agente, gli strumenti e i modelli. Soprattutto, offre un modo più chiaro di ragionare sui **confini di fiducia**: chi può raggiungere quale componente, con quali autorizzazioni e per quali operazioni.

## Memoria persistente: la funzionalità che apprezzo di più

La memoria è una delle parti di Hermes che personalmente trovo meglio riuscite. Quando lavoro ripetutamente sugli stessi progetti, non dover ricostruire ogni volta tutto il contesto rende l'interazione molto più naturale.

Anche le skills sono interessanti: invece di trattare ogni attività come completamente nuova, l'agente può utilizzare procedure e conoscenze già organizzate.

Questo non significa che la memoria sia infallibile. Può essere incompleta, superata o contenere errori. Le informazioni importanti devono poter essere verificate, corrette ed eliminate.

La memoria è inoltre una forma di **persistenza dei dati**: contenuti, risultati dei tool e dettagli operativi potrebbero rimanere disponibili oltre la sessione. È quindi necessario valutare archiviazione, accessi, retention e cancellazione.

## Dal chatbot all'agente operativo

Il tool calling cambia radicalmente l'utilità dell'assistente. Un agente autorizzato può leggere un file, analizzare un log, preparare una modifica, eseguire un comando e verificarne il risultato.

In un ambiente tecnico può supportare troubleshooting, analisi di configurazioni, revisione di repository, scripting e attività ripetitive. Le integrazioni esterne ampliano le possibilità, ma anche la superficie d'attacco.

Non vedo Hermes come un sostituto universale di n8n. Un workflow deterministico resta spesso preferibile per processi ripetitivi e prevedibili; un agente può essere utile quando servono interpretazione, scelta degli strumenti e gestione di attività meno strutturate.

## Modelli locali e cloud: scegliere in base al contesto

Sto sperimentando sia modelli locali sia servizi cloud. La possibilità di scegliere un endpoint diverso per determinate attività è uno dei vantaggi dell'approccio.

L'inferenza locale può offrire maggiore controllo sull'ambiente e sui dati, ma **locale non significa automaticamente privato o sicuro**: contano log, strumenti, integrazioni e traffico verso servizi esterni.

I modelli cloud possono essere più efficaci in compiti complessi. Una soluzione ibrida consente di valutare prestazioni, costi, sensibilità delle informazioni e compatibilità con gli strumenti senza imporre un'unica scelta per ogni attività.

## Cybersecurity: il vero confine degli agenti autonomi

Un agente che può leggere file, eseguire comandi e collegarsi a sistemi remoti introduce rischi concreti. Un'istruzione interpretata male, un comando errato o una prompt injection possono avere conseguenze operative: non si tratta più soltanto di una risposta testuale sbagliata.

### Minimo privilegio, non accesso illimitato

Se l'agente deve analizzare log, spesso basta la sola lettura. Se deve modificare un progetto, non serve accesso all'intero filesystem. Per i sistemi remoti sono preferibili identità dedicate e permessi limitati.

Gli accessi SSH e i comandi privilegiati richiedono particolare attenzione. **Un prompt che dice “non fare danni” non sostituisce autorizzazioni tecniche efficaci.** L'accesso amministrativo completo dovrebbe essere evitato salvo necessità strettamente giustificate.

### Prompt injection e contenuti non attendibili

Pagine web, file, repository e risultati dei tool possono contenere istruzioni malevole. Un agente potrebbe scambiarle per indicazioni da seguire, tentando di leggere segreti o eseguire operazioni non richieste.

I contenuti recuperati devono quindi essere trattati come **dati non attendibili**, non come istruzioni autorizzate. Le approvazioni sono utili, ma vanno affiancate da controlli reali sui privilegi.

### Difesa a più livelli

Una configurazione prudente dovrebbe prevedere isolamento delle operazioni rischiose, identità dedicate, accessi di rete limitati, gestione protetta dei segreti, logging, aggiornamenti e approvazione per le azioni sensibili.

Anche skills, plugin e server MCP di terze parti vanno valutati prima di abilitarli: disponibilità pubblica non equivale ad affidabilità.

## Utilizzare Hermes tramite Telegram: cosa proteggere

L'accesso tramite messaggistica è comodo, ma un bot che inoltra comandi a un agente operativo diventa un punto di ingresso critico.

In un'eventuale integrazione Telegram adotterei almeno questi controlli:

- **Allowlist di identità:** autorizzare esplicitamente gli ID numerici degli utenti, non fidarsi soltanto dei nomi visualizzati.
- **Limitazione dei gruppi:** non accettare comandi sensibili da chat o partecipanti non controllati.
- **Protezione del token:** conservare la credenziale fuori da repository e log, con rotazione in caso di compromissione.
- **Privilegi separati:** non concedere a una chat remota le stesse capacità di una sessione amministrativa.
- **Accesso di rete controllato:** evitare esposizioni inutili di gateway e interfacce di amministrazione.
- **Minimizzazione dei dati:** non inoltrare indiscriminatamente segreti o informazioni riservate attraverso la piattaforma di messaggistica.

Questi sono principi di hardening consigliati, non una dichiarazione che ogni controllo sia già implementato nel mio laboratorio.

## Cosa insegna il dibattito su OpenClaw

La sicurezza degli agenti personali è un tema concreto. Il dibattito intorno a [OpenClaw](https://openclaw.ai/) e alle sue [informazioni di sicurezza](https://openclaw.ai/security) mostra quanto sia importante esaminare esposizione dei servizi, autorizzazioni, dipendenze e strumenti con accesso operativo.

Questo non significa che Hermes condivida automaticamente le stesse vulnerabilità o che ogni agente sia intrinsecamente insicuro. Significa che la categoria richiede un threat model adeguato.

La domanda non è soltanto **“cosa può fare l'agente?”**, ma anche **“cosa può succedere se riceve istruzioni malevole, sbaglia o viene usato da una persona non autorizzata?”**.

## La mia valutazione

Dopo i primi utilizzi, la mia valutazione di Hermes è molto positiva. Memoria persistente, strumenti e flessibilità dell'architettura sono le caratteristiche che mi hanno convinto di più.

Mi piace poterlo trattare come un assistente tecnico che conserva contesto e interagisce con ambienti configurabili, anziché come una semplice interfaccia di chat. L'approccio open source permette inoltre di studiarne il funzionamento e adattarlo alle proprie esigenze.

Non lo installerei però concedendogli accesso indiscriminato ai sistemi. Preferisco introdurre capacità gradualmente, testarne il comportamento e verificare i privilegi prima di ampliarne il raggio d'azione.

## Conclusioni

Hermes Agent è uno dei progetti open source dedicati agli assistenti AI personali che consiglio maggiormente di esplorare, soprattutto a chi è interessato a self-hosting, automazione e infrastrutture IT.

La mia architettura ibrida con Proxmox, Linux e Windows mi ha permesso di sperimentare memoria, tool calling e modelli differenti sfruttando risorse già disponibili.

La sfida più interessante resta trovare il giusto equilibrio tra **capacità operativa e controllo**. Un agente diventa davvero utile quando può agire, ma proprio per questo identità, autorizzazioni, isolamento e supervisione devono essere parte del progetto fin dall'inizio.

Continuerò a sperimentare Hermes attraverso casi d'uso concreti, valutandone benefici e limiti. Per ora è un progetto che mi sta piacendo molto e che, con le precauzioni appropriate, merita attenzione.

## Risorse

- [Hermes Agent — GitHub](https://github.com/NousResearch/hermes-agent)
- [Hermes Agent — Documentazione](https://hermes-agent.nousresearch.com/docs)
- [OpenClaw — Security](https://openclaw.ai/security)
