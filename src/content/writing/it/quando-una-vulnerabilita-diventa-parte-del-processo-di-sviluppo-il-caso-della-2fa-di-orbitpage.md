---
title: "Quando una vulnerabilità diventa parte del processo di sviluppo: il caso della 2FA di OrbitPage"
description: "La gestione responsabile di una vulnerabilità nel flusso 2FA di OrbitPage: dalla segnalazione alla correzione, ai test di regressione e alla disclosure."
pubDate: 2026-09-15
tags: ["security", "OrbitPage", "open source", "2FA", "JWT"]
draft: false
---

Sviluppare un prodotto significa anche accettare che la sicurezza non sia mai un’attività conclusa.

OrbitPage è un progetto che ho ideato, sviluppato e che continuo a mantenere personalmente, sia nella sua versione **SaaS gestita** sia nell’edizione **open source self-hosted** disponibile su GitHub.

Il progetto è cresciuto progressivamente da un semplice page builder fino a diventare una piattaforma più ampia, con gestione di contenuti e pagine, Shop, menu, analytics, privacy, SEO, team, API, integrazioni AI e numerose altre funzionalità.

Con l’aumentare delle funzionalità aumenta inevitabilmente anche la superficie che deve essere protetta.

Recentemente questo processo ha portato a un caso particolarmente interessante: la segnalazione responsabile di una vulnerabilità nel flusso di autenticazione a due fattori della versione open source di OrbitPage.

La vulnerabilità è stata individuata dal security researcher **Onurcan Genç**, che mi ha contattato attraverso il processo di responsible disclosure del progetto.

Dopo aver verificato la segnalazione, ho riprodotto il comportamento, analizzato la causa tecnica e pubblicato una correzione.

L'episodio è poi diventato anche oggetto di un'analisi tecnica pubblicata dallo stesso Onurcan.

## Cybersecurity e sviluppo: due prospettive che si incontrano

Professionalmente lavoro come **Cybersecurity Analyst**.

Il mio lavoro non è focalizzato principalmente sulla vulnerability research o sulla ricerca sistematica di vulnerabilità nei software, ma lavorare quotidianamente nel settore della sicurezza influenza inevitabilmente il modo in cui progetto e sviluppo i miei sistemi.

Quando sviluppo un prodotto cerco infatti di ragionare non soltanto in termini di funzionalità, ma anche di:

* autenticazione e autorizzazione;
* separazione dei privilegi;
* gestione delle sessioni;
* protezione dei secret;
* validazione degli input;
* rate limiting;
* gestione sicura dei dati;
* logging e troubleshooting;
* aggiornamenti e dipendenze;
* backup e recovery;
* gestione responsabile delle vulnerabilità.

Questo non significa che un'applicazione diventi automaticamente immune da vulnerabilità.

Al contrario, uno degli aspetti più importanti della sicurezza applicativa è proprio costruire un processo capace di **ricevere una segnalazione, verificarla, comprenderne l'impatto e correggerla rapidamente**.

Il caso emerso in OrbitPage è stato un buon esempio di questo processo.

## La segnalazione

La vulnerabilità è stata scoperta e segnalata da **Onurcan Genç** ([GitHub](https://github.com/onurcangnc)), al quale vanno i crediti per la discovery.

Il problema riguardava il flusso di autenticazione a due fattori di OrbitPage.

OrbitPage supporta l'autenticazione TOTP per gli account amministrativi. Dopo la verifica corretta di username e password, un account protetto da 2FA non riceve immediatamente una normale sessione autenticata: viene invece creato un challenge temporaneo necessario per completare il secondo fattore.

Questo challenge aveva:

* durata limitata;
* uno specifico `purpose`;
* audience e issuer dedicati;
* utilizzo previsto esclusivamente nel flusso di verifica 2FA.

Dal punto di vista logico, quindi, si trattava già di un token differente da una normale sessione.

Il problema era più sottile.

## Il problema: due token con scopi differenti nello stesso trust domain

Il challenge 2FA e i normali token di sessione erano firmati utilizzando lo stesso secret JWT.

Il challenge conteneva correttamente informazioni che ne indicavano lo scopo, ma il normale meccanismo di validazione delle sessioni non imponeva una separazione sufficientemente forte tra le due classi di token.

In determinate condizioni, un challenge JWT valido generato durante il processo di autenticazione poteva quindi essere interpretato come un token utilizzabile dal normale livello di autenticazione.

In termini più generali, il problema non era una debolezza crittografica di JWT.

La firma era valida.

Il problema era **semantico e architetturale**: due token appartenenti a fasi di autenticazione differenti condividevano lo stesso dominio di fiducia.

Un token che significava:

> “la password è stata verificata, ma l'autenticazione non è ancora completa”

non avrebbe mai dovuto poter essere interpretato come:

> “l'utente è completamente autenticato”.

È una distinzione apparentemente semplice, ma fondamentale nei sistemi di autenticazione.

## Riprodurre prima di correggere

Dopo aver ricevuto la segnalazione non mi sono limitato ad applicare una modifica al codice.

Il primo passaggio è stato riprodurre il comportamento.

Volevo capire:

1. quali condizioni fossero necessarie;
2. quale componente stesse accettando il token;
3. se il problema dipendesse dalla generazione del challenge o dalla sua validazione;
4. quali altri flussi JWT potessero essere coinvolti;
5. quale fosse il confine corretto tra pre-authentication e authenticated session.

Questo passaggio è particolarmente importante.

Un fix che corregge esclusivamente il payload utilizzato dal proof of concept rischia di eliminare il sintomo senza correggere la causa.

L'obiettivo era quindi individuare il problema a livello di **trust boundary**.

L'analisi ha confermato che il punto critico era proprio l'assenza di una separazione sufficientemente forte tra il verificatore delle sessioni e quello dei challenge 2FA.

## Il fix

La correzione è stata pubblicata con **OrbitPage 4.21.1**.

Ho introdotto più livelli di separazione.

Il primo è una **signing domain separata per i challenge 2FA**.

I normali token di sessione continuano a essere firmati attraverso il secret principale dell'istanza, mentre i challenge utilizzano un contesto di firma dedicato.

Questo significa che un token creato per il flusso 2FA non appartiene più allo stesso dominio crittografico delle normali sessioni.

Il secondo cambiamento riguarda la validazione.

L'algoritmo accettato viene ora specificato esplicitamente durante la verifica dei token, evitando che il verificatore accetti implicitamente configurazioni differenti da quella prevista.

Il terzo livello riguarda direttamente il significato del token.

Il verificatore delle normali sessioni rifiuta ora esplicitamente token che presentano un `purpose` applicativo, impedendo a un challenge di essere interpretato come una sessione anche indipendentemente dalla separazione della chiave.

La difesa quindi non dipende da un singolo controllo.

È stata trasformata in una separazione multilivello:

**session token → verificatore sessione → signing domain sessione**

**2FA challenge → verificatore 2FA → signing domain 2FA**

Questa è una proprietà molto più forte rispetto al semplice controllo di un campo all'interno del payload.

## Testare anche il comportamento che non deve più essere possibile

Insieme al fix ho aggiunto test specifici sul boundary tra i due tipi di JWT.

I test verificano che:

* un normale session token venga accettato dal session verifier;
* un challenge 2FA venga accettato dal verificatore 2FA;
* un challenge 2FA venga rifiutato dal session verifier;
* anche un challenge costruito secondo il precedente modello venga rifiutato come normale sessione.

Per me quest'ultimo passaggio è particolarmente importante.

Una vulnerabilità corretta dovrebbe diventare anche un **test di regressione**.

In questo modo una futura modifica al sistema di autenticazione non può reintrodurre accidentalmente lo stesso comportamento senza far fallire la suite di test.

## Dal singolo fix al security model del progetto

L'intervento non è rimasto isolato al codice interessato.

OrbitPage dispone oggi di una security policy pubblica che descrive come segnalare privatamente una vulnerabilità, quali informazioni includere e come viene gestita la disclosure.

Il modello di sicurezza della versione open source comprende inoltre, tra gli altri aspetti:

* password memorizzate utilizzando hashing bcrypt;
* sessioni JWT firmate e con scadenza;
* separazione dei challenge di autenticazione a due fattori;
* TOTP con recovery codes;
* invalidazione delle sessioni quando cambiano credenziali o configurazioni di autenticazione;
* rate limiting sui flussi sensibili;
* query parametrizzate;
* gestione controllata del `JWT_SECRET`;
* HTTPS raccomandato per le installazioni production;
* controlli sui permessi attraverso ruoli differenti;
* procedure documentate di backup, aggiornamento e recovery.

Per un progetto open source trovo importante che questi aspetti non rimangano esclusivamente nel codice.

Chi installa un software deve poter capire anche quale sia il suo modello operativo e quali responsabilità rimangano all'amministratore dell'istanza.

## Responsible disclosure

Un aspetto che tengo particolarmente a sottolineare riguarda il modo in cui la vulnerabilità è stata gestita.

**Onurcan Genç**, autore della scoperta, ha seguito un processo di responsible disclosure permettendomi di analizzare e correggere il problema prima della pubblicazione dei dettagli tecnici.

È il modello che considero corretto per la ricerca di sicurezza su un progetto open source.

Il ricercatore può documentare il proprio lavoro e ricevere il giusto riconoscimento; il maintainer ha la possibilità di proteggere gli utenti prima che i dettagli siano resi pubblici.

Dopo la correzione, Onurcan ha pubblicato una propria analisi tecnica approfondita della vulnerabilità:

**Two-Factor Authentication Bypass via JWT Challenge Token Reuse**

L'articolo descrive la vulnerabilità dal punto di vista del security researcher e completa bene questa analisi, che invece racconta l'episodio dal punto di vista del maintainer e sviluppatore di OrbitPage.

I crediti per la scoperta della vulnerabilità appartengono quindi a **Onurcan Genç**.

## GitHub Security Advisory e CVE

La vulnerabilità è stata gestita attraverso un **GitHub Security Advisory**, utilizzando il canale previsto dal repository per le segnalazioni di sicurezza.

L'advisory permette di mantenere inizialmente privata la discussione tra researcher e maintainer, coordinare il fix e successivamente pubblicare le informazioni quando gli utenti dispongono già di una versione corretta.

Ho inoltre richiesto attraverso GitHub l'assegnazione di un **CVE**, in modo che la vulnerabilità possa avere un identificatore standard utilizzabile anche da vulnerability database, scanner e strumenti di dependency/security management.

Al momento della pubblicazione di questo articolo, il riferimento principale rimane:

`GHSA-gfh5-m7w7-f6g2`

Al momento della pubblicazione non risulta ancora assegnato un CVE.

## Open source significa anche esporsi al review

Uno degli aspetti interessanti dell'edizione open source di OrbitPage è proprio questo.

Pubblicare il codice significa permettere a sviluppatori e security researcher esterni di studiarlo.

Naturalmente questo aumenta la possibilità che vengano individuati problemi.

Ma non considero questo un punto debole dell'open source.

È uno dei suoi vantaggi.

Un progetto software complesso difficilmente può essere considerato sicuro perché “nessuno ha ancora trovato una vulnerabilità”.

È molto più significativo poter dimostrare di avere un processo per gestirla quando viene trovata.

In questo caso una segnalazione esterna ha portato non solo alla correzione della vulnerabilità, ma anche a una separazione più forte dei trust boundary JWT, a nuovi test di regressione e a una documentazione più esplicita del modello di autenticazione.

## Quello che porto da questa esperienza

OrbitPage per me non è solamente un progetto di sviluppo.

È anche un ambiente reale nel quale applico competenze che normalmente appartengono a discipline differenti: sviluppo software, cloud, DevOps, automazione e cybersecurity.

Essere contemporaneamente **owner, ideatore e sviluppatore di OrbitPage** significa dover ragionare su tutto il ciclo di vita del prodotto.

Non soltanto su come implementare una funzionalità, ma anche su come:

* distribuirla;
* mantenerla;
* proteggerla;
* monitorarla;
* aggiornarla;
* documentarla;
* e correggerla quando qualcosa non funziona come previsto.

Questo episodio ne è stato un buon esempio.

Una vulnerabilità è stata individuata da un researcher esterno, segnalata responsabilmente, riprodotta, analizzata e corretta. Il fix è stato rilasciato agli utenti e il comportamento vulnerabile è diventato un caso di test permanente.

Per me questo è parte integrante dello sviluppo di software.

La sicurezza non consiste nell'affermare che un prodotto non abbia vulnerabilità.

Consiste anche nel costruire il processo necessario per reagire correttamente quando una vulnerabilità viene scoperta.

---

### Riferimenti

* **OrbitPage Open Source:** [github.com/paoloronco/OrbitPage](https://github.com/paoloronco/OrbitPage)
* **OrbitPage:** [orbitpage.com](https://orbitpage.com)
* **OrbitPage – progetto e case study:** [paoloronco.it/projects/orbitpage](https://paoloronco.it/projects/orbitpage)
* **GitHub Security Advisory:** [GHSA-gfh5-m7w7-f6g2](https://github.com/paoloronco/OrbitPage/security/advisories/GHSA-gfh5-m7w7-f6g2)
* **Analisi di Onurcan Genç:** [Two-Factor Authentication Bypass via JWT Challenge Token Reuse](https://onurcangenc.com.tr/blog/two-factor-authentication-bypass-via-jwt-challenge-token-reuse)
* **Onurcan Genç – GitHub:** [github.com/onurcangnc](https://github.com/onurcangnc)
