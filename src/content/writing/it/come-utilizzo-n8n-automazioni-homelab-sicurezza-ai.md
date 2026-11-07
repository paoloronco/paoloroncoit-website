---
title: "Come utilizzo n8n per automatizzare il mio homelab, la sicurezza e le attività quotidiane"
description: "I miei workflow n8n: fatture, alert Splunk, newsletter tecnologiche, chatbot RAG e automazioni cloud. Architettura, scelte tecniche e lezioni apprese."
pubDate: 2026-11-07
tags: ["n8n", "automazione", "homelab", "cybersecurity", "AI", "Docker", "Splunk"]
draft: false
---

Ci sono attività che, prese singolarmente, richiedono pochi minuti. Scaricare una fattura, rinominarla, archiviarla nella cartella corretta. Controllare gli ultimi alert di sicurezza. Scorrere le notizie tecnologiche per capire quali meritino davvero attenzione. Il problema è che queste piccole operazioni tornano ogni giorno o ogni mese, spesso distribuite tra servizi che non comunicano tra loro.

È soprattutto per questo che ho iniziato a utilizzare **n8n**. Non per automatizzare qualsiasi cosa a tutti i costi, ma per togliere di mezzo passaggi ripetitivi e collegare gli strumenti che uso già: Gmail, Google Sheets, Splunk, WordPress, Qdrant, servizi cloud e server del mio homelab.

Nel tempo n8n è passato dall'essere uno strumento con cui sperimentare a una componente stabile della mia infrastruttura. In questo articolo racconto come lo utilizzo, quali workflow ho sviluppato e quali compromessi ho incontrato. Alcuni progetti sono disponibili su [GitHub](https://github.com/paoloronco/n8n-templates), con file importabili e istruzioni per adattarli al proprio ambiente.

## Perché n8n, e perché self-hosted

n8n permette di costruire workflow collegando trigger, servizi esterni, condizioni e trasformazioni dei dati. L'interfaccia visuale è comoda, ma la caratteristica che apprezzo di più è la possibilità di inserire logica personalizzata quando i nodi standard non bastano. Un workflow può ricevere un webhook, interrogare un'API, elaborare un JSON con JavaScript, scrivere su un database e inviare una notifica senza richiedere un'applicazione separata per ogni passaggio.

Ho scelto di ospitarlo nel mio homelab, anziché affidare tutte le automazioni a un servizio gestito. La mia istanza gira in **Docker su una macchina virtuale Proxmox dedicata**. Nello stesso ambiente utilizzo anche **Qdrant**, un database vettoriale impiegato nei progetti RAG, e altri servizi di supporto per webhook, notifiche e integrazioni.

Questa scelta mi lascia il controllo dell'ambiente, dei dati e delle integrazioni con la rete locale. Non significa che tutto sia automaticamente più semplice: aggiornamenti, disponibilità, backup, credenziali e monitoraggio diventano responsabilità mie. È un compromesso che accetto volentieri, anche perché l'homelab è il posto in cui provo soluzioni che mi interessano professionalmente, soprattutto in ambito cloud, sicurezza e automazione.

L'accesso remoto passa attraverso Cloudflare, con controlli Zero Trust per le interfacce protette. Per i webhook, però, bisogna distinguere gli endpoint destinati a ricevere richieste esterne dalle pagine amministrative: proteggere tutto indiscriminatamente rischia di interrompere le integrazioni, mentre esporre tutto senza filtri sarebbe una pessima idea.

## Fatture: da una casella email a un archivio ordinato

Una delle automazioni che uso più concretamente riguarda le fatture dei servizi che pago. Prima dovevo aprire le email, recuperare gli allegati PDF, decidere dove salvarli e aggiornare manualmente un foglio di riepilogo. Non è un lavoro complesso, ma è facile dimenticare un documento o trascrivere un importo sbagliato.

Il mio workflow **Invoices Archive Unified** legge da Gmail le comunicazioni dei fornitori configurati, seleziona i PDF pertinenti, estrae il testo e identifica dati come numero di fattura, data, servizio e importo. Successivamente assegna un nome coerente al file, lo archivia tramite SFTP sul mio storage e aggiorna il relativo registro su Google Sheets. Attualmente gestisce documenti di servizi come Google Cloud, Hetzner, Dimensione e Octopus Energy.

La parte più interessante è che nella versione attuale **non utilizzo un LLM per interpretare le fatture**. Per documenti con formati sufficientemente prevedibili, regole di parsing dedicate e controlli deterministici possono essere più economici e più verificabili. Per esempio, ho dovuto correggere la gestione degli importi di Hetzner per evitare di registrare il netto al posto del totale comprensivo di IVA. Se i valori non tornano, preferisco interrompere l'elaborazione anziché salvare un dato apparentemente valido ma errato.

La gestione dei duplicati richiede comunque attenzione: l'aggiornamento delle righe su Sheets non equivale a un registro transazionale completo degli upload SFTP. È uno di quei dettagli che emergono quando un workflow smette di essere una demo e diventa qualcosa su cui fai affidamento.

[Workflow e documentazione su GitHub](https://github.com/paoloronco/n8n-templates/tree/main/workflows/invoice-archiving/V2).

## Splunk e n8n: dagli alert alle informazioni utili

L'automazione ha un ruolo importante anche nella parte di cybersecurity del mio homelab. Utilizzo **Splunk** per raccogliere e analizzare eventi, ma un alert isolato spesso non basta a capire quanto sia interessante. È qui che n8n diventa utile come livello di orchestrazione.

Ho sviluppato un workflow che riceve gli alert di sicurezza tramite webhook, estrae gli indicatori disponibili e può arricchire gli indirizzi IP con **AbuseIPDB**. I risultati vengono poi utilizzati per costruire notifiche più leggibili, inviate attraverso canali come email e Telegram. L'obiettivo non è sostituire un SIEM né delegare automaticamente a un servizio esterno le decisioni di sicurezza: è ridurre il tempo necessario a contestualizzare un evento.

In questo tipo di integrazione la deduplicazione è essenziale. Un sistema che ripete la stessa notifica decine di volte non aiuta a reagire meglio: genera rumore. Ho quindi lavorato sulla gestione degli eventi ripetuti e sulla separazione tra raccolta, arricchimento e notifica.

È un esempio di come utilizzo l'homelab anche per sperimentare concetti vicini alla **SOAR**: integrare strumenti diversi e automatizzare parti ripetitive del processo di analisi, mantenendo il controllo umano dove serve.

## Una newsletter tecnologica che seleziona, non soltanto riassume

Seguo molte fonti su cybersecurity, AI e tecnologia. Leggerle tutte sarebbe poco pratico; ricevere ogni giorno un elenco indistinto di link non risolverebbe il problema.

Con **Tech & AI News** ho costruito un workflow che raccoglie articoli da feed RSS, controlla date e URL, attribuisce punteggi di rilevanza, raggruppa notizie simili e tiene conto degli argomenti già inviati. Solo dopo questa prima fase interviene un modello AI per selezionare e sintetizzare le notizie più interessanti. Il risultato è una newsletter HTML distribuita via email.

La versione più recente include un percorso di fallback: **OpenAI** come elaborazione principale, **Gemini** se la prima risposta fallisce o non supera la validazione, e una modalità deterministica basata sui metadati RSS se entrambi i modelli non sono disponibili. Controllo anche che gli identificativi degli articoli restituiti dal modello corrispondano a quelli effettivamente raccolti.

Non considero il riassunto generato dall'AI una verifica dei fatti: rimando sempre alle fonti originali. Inoltre il raggruppamento per titoli è euristico e può sbagliare. Il vero miglioramento rispetto alla prima versione non è stato aggiungere più AI, ma costruire un processo più affidabile attorno all'AI.

[Repository dei template](https://github.com/paoloronco/n8n-templates).

## Un chatbot RAG per il mio sito WordPress

Un altro esperimento importante è stato costruire un chatbot capace di rispondere utilizzando i contenuti del mio sito, invece di affidarsi soltanto alle conoscenze generiche di un modello.

Il progetto usa un'architettura **Retrieval-Augmented Generation (RAG)**: i contenuti vengono indicizzati, le richieste degli utenti attivano una ricerca in **Qdrant**, **Cohere** riordina i risultati recuperati e **OpenAI** genera una risposta a partire dal contesto selezionato. n8n coordina le fasi, dalla gestione delle richieste all'interazione con i servizi.

Il problema interessante non è semplicemente collegare un chatbot a WordPress. È capire quali documenti recuperare, come gestire risultati poco pertinenti e come evitare che il modello presenti come certe informazioni che non trova nel sito. Anche la qualità dei contenuti indicizzati conta: un database vettoriale non può correggere una documentazione incompleta.

Ho pubblicato una versione riutilizzabile del progetto, con alternative per alcuni componenti di storage, nella [repository n8n-templates](https://github.com/paoloronco/n8n-templates/tree/main/free-templates/wordpress-rag-chatbot).

## Automatizzare anche la pubblicazione dei workflow

Quando ho iniziato a condividere i workflow, mi sono accorto che svilupparli era soltanto metà del lavoro. Per rendere un template davvero riutilizzabile servono un README comprensibile, istruzioni di configurazione, requisiti, immagini e una descrizione adatta alle piattaforme di distribuzione.

Da qui nasce il mio **n8n Template Publishing Assistant**. Partendo dall'export JSON di un workflow, prepara materiali di pubblicazione come README, contenuti per Gumroad, immagini e documentazione organizzata su Notion, con consegna tramite email. Non elimina la revisione manuale: un documento generato automaticamente va comunque controllato, soprattutto quando descrive credenziali, prerequisiti o nodi personalizzati.

Mi interessa particolarmente questo progetto perché automatizza un'attività nata da altre automazioni. E mi ha ricordato che la documentazione non è un accessorio: un workflow senza istruzioni chiare può essere perfettamente funzionante per il suo autore e quasi inutilizzabile per chiunque altro.

## Altri collegamenti: cloud, Home Assistant e progetti personali

n8n non è limitato ai progetti appena descritti. Nel mio ambiente lo utilizzo anche per collegare servizi cloud, gestire notifiche, interagire con Home Assistant e coordinare operazioni tramite API e SSH. Ho sperimentato integrazioni con **Google Cloud**, processi legati a **OrbitPage** e workflow che trasformano contenuti WordPress in audio con **Google Cloud Text-to-Speech**.

Non tutte queste automazioni hanno la stessa maturità o frequenza di utilizzo. Alcune sono strumenti quotidiani; altre sono prototipi, template distribuiti alla community o progetti in evoluzione. Preferisco fare questa distinzione piuttosto che presentare ogni esperimento come un sistema di produzione.

## Cosa ho imparato costruendo workflow reali

La prima lezione è che **automatizzare un errore significa ripeterlo più velocemente**. Un parsing sbagliato, un filtro troppo permissivo o una notifica mal progettata diventano problemi ricorrenti quando un workflow gira senza supervisione.

La seconda è che l'AI non è sempre la risposta. Nel workflow delle fatture, per esempio, regole deterministiche sono più adatte al problema. Nella newsletter e nel chatbot, invece, i modelli linguistici aggiungono valore, purché siano accompagnati da controlli, dati di riferimento e percorsi alternativi.

La terza riguarda l'operatività: credenziali separate, webhook protetti, log, backup, gestione dei fallimenti e test con dati reali sono importanti quanto la logica del workflow. Un'automazione affidabile deve essere comprensibile anche quando qualcosa va storto.

Infine, ho imparato a progettare pensando alla manutenzione. I workflow crescono, le API cambiano, i provider modificano i formati e ciò che oggi sembra un dettaglio domani può interrompere l'intera catena.

## Da dove partire se vuoi replicare qualcosa

Il consiglio che darei è di scegliere un'attività ripetitiva con un risultato verificabile. Per esempio: recuperare un allegato, archiviarlo e registrare l'operazione. Parti con pochi nodi, testa i casi di errore, poi aggiungi condizioni, notifiche e integrazioni più sofisticate.

Se vuoi esplorare i miei esempi, trovi i template e la relativa documentazione nella repository **[paoloronco/n8n-templates](https://github.com/paoloronco/n8n-templates)**. Prima di importare un workflow, controlla sempre i servizi richiesti, i costi delle API, le credenziali, i percorsi locali e il comportamento dei trigger: un JSON importabile non è automaticamente pronto per il tuo ambiente.

## Conclusione

n8n è diventato uno dei componenti più versatili del mio homelab perché mi permette di far collaborare strumenti che altrimenti rimarrebbero separati. Mi fa risparmiare attività manuali, ma soprattutto mi offre un ambiente concreto in cui esercitare competenze di integrazione API, sviluppo, cloud, cybersecurity e gestione dell'infrastruttura.

Il valore, per me, non sta nel numero di nodi presenti in un workflow. Sta nel fatto che risolva un problema reale, che sappia gestire gli imprevisti e che possa essere compreso e mantenuto nel tempo. È questo il criterio con cui continuo a sviluppare e condividere le mie automazioni.
