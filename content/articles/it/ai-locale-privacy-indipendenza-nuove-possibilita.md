---
title: "AI locale: tra privacy, indipendenza e nuove possibilità"
description: "I miei esperimenti con Ollama, llama.cpp e PolyStrata: modelli Qwen e Nemotron, privacy, architetture MoE e inferenza con una RTX 3070 da 8 GB."
pubDate: 2026-11-07
tags: ["ai", "local-ai", "privacy", "ollama", "cybersecurity"]
draft: false
---

*Dai modelli Qwen e Nemotron alle architetture MoE: cosa sto imparando sperimentando con l'AI locale.*

L'intelligenza artificiale è ormai parte integrante del mio lavoro e di molti progetti personali. Utilizzo quotidianamente modelli cloud per programmare, approfondire argomenti tecnici, sviluppare automazioni e affrontare problemi complessi. I cosiddetti *frontier model* hanno raggiunto capacità impressionanti e continuano a migliorare a un ritmo difficile da prevedere.

Negli ultimi mesi, però, ho iniziato a interessarmi sempre di più a un'alternativa: **eseguire modelli AI direttamente sul mio hardware**, senza dover necessariamente dipendere da infrastrutture esterne.

Non è soltanto una questione economica. Certo, oggi molti dei servizi AI più avanzati sono accessibili tramite abbonamenti o API a consumo. Personalmente, mi chiedo quanto questo modello sarà sostenibile nel lungo periodo e se, con la crescente domanda di capacità computazionale, assisteremo anche a un aumento dei prezzi. È una possibilità, non una certezza: la concorrenza e i miglioramenti nell'efficienza potrebbero produrre anche l'effetto opposto.

Ma c'è un altro aspetto che, lavorando nell'ambito della cybersecurity, considero particolarmente importante: **il controllo sui propri dati**.

Quando utilizziamo un modello cloud, i nostri prompt, documenti e, nel caso degli strumenti di coding, potenzialmente intere porzioni dei nostri repository vengono trasmessi a infrastrutture gestite da terzi. Ogni provider ha le proprie condizioni relative a conservazione dei dati, utilizzo per l'addestramento, logging e sicurezza. Alcuni offrono garanzie contrattuali e controlli molto solidi, soprattutto in ambito enterprise, ma rimane una differenza fondamentale: non abbiamo il controllo diretto sull'infrastruttura che esegue l'elaborazione.

Con un modello locale, invece, possiamo mantenere l'intero processo sul nostro computer o nella nostra infrastruttura, decidendo come gestire i dati, quali componenti utilizzare e quali connessioni consentire.

È proprio questa combinazione di **privacy, autonomia tecnologica, curiosità e sperimentazione** che mi ha spinto ad approfondire il mondo dell'AI locale.

## Il mio hardware: un desktop potente, ma non una workstation AI

Partiamo da una precisazione: il computer che utilizzo non è certamente un PC economico o un dispositivo da ufficio di fascia bassa.

La mia configurazione comprende:

| Componente | Hardware |
|---|---|
| CPU | Intel Core i9-13900K, 13ª generazione |
| RAM | 32 GB DDR |
| GPU | NVIDIA GeForce RTX 3070 |
| VRAM | 8 GB GDDR6 |
| Sistema operativo | Windows 11 |

Si tratta di un desktop di fascia alta, progettato principalmente per utilizzi intensivi, gaming, sviluppo e multitasking.

Non è però una workstation dedicata all'intelligenza artificiale.

Il principale limite, in questo contesto, è la memoria video: **8 GB di VRAM sono relativamente pochi per eseguire modelli linguistici di grandi dimensioni**.

Una RTX 3070 offre comunque una buona capacità di calcolo e supporta CUDA, ma eseguire un modello da 14, 30 o 35 miliardi di parametri è molto diverso dall'eseguire un videogioco o compilare un progetto software.

Non basta considerare la potenza della GPU. Bisogna valutare la quantità di memoria necessaria per i pesi del modello, la quantizzazione, la dimensione del contesto e la memoria utilizzata durante l'inferenza.

Ed è qui che la sperimentazione diventa interessante.

Non ho intenzione, almeno per il momento, di acquistare una GPU con 24 o 32 GB di VRAM soltanto per eseguire modelli AI. Voglio prima capire quanto posso ottenere dall'hardware che possiedo già, sfruttandolo nel modo più efficiente possibile.

## I primi esperimenti: Ollama e llama.cpp

Uno dei primi strumenti che ho iniziato a utilizzare è stato **Ollama**.

Il suo principale vantaggio è la semplicità: permette di scaricare, gestire ed eseguire modelli locali senza dover configurare manualmente ogni componente dell'ambiente di inferenza.

Ho iniziato a sperimentare con diverse famiglie di modelli, soprattutto **Qwen** e **NVIDIA Nemotron**, valutandone prestazioni, qualità delle risposte e possibilità di integrazione con altri strumenti.

L'obiettivo non era semplicemente ottenere una chat funzionante, ma capire quanto questi modelli potessero essere realmente utili nelle attività quotidiane.

Successivamente ho approfondito **llama.cpp**, un progetto che offre maggiore controllo sull'esecuzione dei modelli, sulla quantizzazione e sulla distribuzione del carico tra CPU e GPU.

Tra le configurazioni che ho provato c'è **Qwen2.5-Coder-14B-Instruct**, in formato GGUF con quantizzazione Q4_K_M.

Utilizzando `llama-server` su Windows, con un contesto di 8192 token e parte dei layer caricati sulla GPU, sono riuscito a ottenere prestazioni interessanti per la generazione di codice e le attività di sviluppo.

Naturalmente, non significa avere le stesse capacità di un modello frontier. Un modello locale di queste dimensioni può comportarsi bene su modifiche circoscritte, spiegazioni tecniche o attività di coding relativamente semplici, ma può incontrare difficoltà su repository molto grandi, ragionamenti complessi e task agentici articolati.

La differenza tra un modello che genera codice e un agente capace di modificare correttamente un progetto software è tutt'altro che trascurabile.

## PolyStrata: superare i limiti degli 8 GB di VRAM

La parte più interessante della mia sperimentazione recente riguarda **PolyStrata**.

Ho scoperto questo progetto approfondendo discussioni su Reddit, guide tecniche e video YouTube. La community dell'AI locale si sta dimostrando una risorsa estremamente utile: spesso sono proprio gli esperimenti condivisi da altri utenti a far emergere soluzioni che difficilmente avrei individuato da solo.

PolyStrata mi ha incuriosito perché affronta uno dei principali problemi dell'inferenza locale: la quantità di memoria video disponibile.

Invece di richiedere che tutti i pesi di un modello risiedano nella VRAM, permette di sfruttare una combinazione di **memoria video, RAM di sistema e CPU**, con strategie particolarmente interessanti per alcune architetture Mixture of Experts.

Questo non significa trasformare magicamente 8 GB di VRAM in 32 GB, né ottenere le prestazioni di una GPU professionale.

Significa però riuscire a eseguire configurazioni che normalmente sarebbero molto difficili da gestire con la sola memoria della scheda video.

Attualmente sto sperimentando soprattutto con due modelli:

- **Tiel Coder 35B**, orientato principalmente alle attività di coding e sviluppo software.
- **Qwen 35B**, che sto valutando per utilizzi più generali e per le sue capacità di ragionamento e generazione.

Entrambi sono ancora in fase di test.

Le prime impressioni sono incoraggianti. Tiel Coder si è dimostrato promettente soprattutto su repository di dimensioni medio-piccole, mentre Qwen sta offrendo risultati che, almeno nelle prove effettuate finora, considero molto interessanti.

Non ho ancora dati sufficienti per formulare un confronto definitivo con i modelli cloud o con altre configurazioni locali.

Ci sono inoltre compromessi evidenti. Il caricamento iniziale può richiedere diversi minuti, il computer può diventare temporaneamente poco reattivo e la velocità di generazione dipende fortemente dal modello e dalla gestione della memoria.

Ma vedere un modello di queste dimensioni funzionare su una RTX 3070 con 8 GB di VRAM è già, dal punto di vista tecnico, un risultato che merita di essere approfondito.

## Mixture of Experts: perché questa architettura mi interessa tanto

Una delle evoluzioni che seguo con maggiore interesse è quella dei modelli **Mixture of Experts (MoE)**.

Nei modelli tradizionali, definiti *dense*, una grande parte dei parametri viene utilizzata per elaborare ogni token.

Nei modelli MoE, invece, la rete è organizzata in gruppi di parametri chiamati *expert*. Un meccanismo di routing seleziona quali expert attivare durante l'elaborazione.

Questo permette di avere modelli con un numero elevato di parametri complessivi, ma con un numero molto inferiore di parametri effettivamente attivi per ciascun token.

Per esempio, un modello può avere circa 35 miliardi di parametri totali e utilizzarne soltanto una frazione durante una determinata operazione.

È importante distinguere due concetti: **parametri totali e parametri attivi non sono la stessa cosa**.

Anche se vengono attivati pochi expert alla volta, tutti i pesi necessari devono comunque essere accessibili. Quando non entrano nella VRAM, il sistema deve gestirli attraverso altri livelli di memoria, con possibili penalizzazioni sulle prestazioni.

Tuttavia, combinando architetture MoE, quantizzazione e tecniche di caching, stanno emergendo possibilità molto interessanti anche per hardware consumer.

Mi chiedo spesso cosa sarà possibile fare tra due o tre anni.

Avremo modelli più piccoli ma capaci quanto quelli molto più grandi di oggi? Runtime in grado di sfruttare ancora meglio CPU, GPU e RAM? Agenti locali sufficientemente affidabili da svolgere autonomamente attività di sviluppo e automazione?

Non credo sia possibile rispondere con certezza, ma è uno degli aspetti che rende questo settore così stimolante.

## Privacy, data retention e controllo: il vero valore dell'AI locale

Uno dei motivi principali per cui considero importante approfondire l'AI locale è la possibilità di **mantenere il controllo diretto sulle informazioni elaborate**.

Pensiamo a un caso concreto: utilizzare un agente AI per lavorare su una repository privata.

Con molti strumenti cloud, parte del codice sorgente, la struttura del progetto e altre informazioni di contesto devono essere trasmesse al provider che esegue il modello.

Questo non significa necessariamente che il provider utilizzi quei dati per addestrare i propri modelli o che li conservi indefinitamente. Esistono servizi con politiche di retention limitate, controlli enterprise e impegni contrattuali specifici.

Resta però una dipendenza da un'infrastruttura esterna.

Con un modello locale, invece, posso configurare un ambiente nel quale codice, prompt e risultati rimangano all'interno del mio computer.

Posso verificare quali processi vengono eseguiti, monitorare le connessioni di rete, limitare l'accesso a Internet e controllare eventuali file di log o dati persistenti.

Inoltre, molti modelli locali vengono distribuiti come **open weights**, consentendo di scaricare ed eseguire direttamente i pesi del modello.

Occorre però fare una distinzione: *open weights* non significa necessariamente *open source*. Avere accesso ai pesi non implica disporre del codice di addestramento, dei dataset utilizzati o di tutti i dettagli relativi alla costruzione del modello.

Allo stesso modo, utilizzare un modello locale non garantisce automaticamente privacy e sicurezza.

Un'interfaccia potrebbe includere telemetria, un plugin potrebbe comunicare con servizi esterni e un agente potrebbe utilizzare API cloud senza che questo sia immediatamente evidente.

Per questo considero fondamentale verificare non soltanto il modello, ma l'intera pipeline: runtime, interfaccia, strumenti collegati, permessi e connessioni di rete.

**La vera differenza è che, con un'infrastruttura locale correttamente configurata, posso verificare e controllare direttamente molti di questi aspetti.**

Naturalmente rimangono altre responsabilità: proteggere il sistema operativo, gestire correttamente i permessi, evitare l'esposizione non necessaria degli endpoint e mantenere aggiornate le dipendenze.

Dal punto di vista della cybersecurity, l'AI locale non elimina i rischi. Permette però di adottare un modello di sicurezza differente, nel quale una parte importante del controllo rimane nelle mani di chi gestisce l'infrastruttura.

## Non soltanto chatbot: coding, agenti e automazioni

Un altro aspetto che considero particolarmente interessante è l'integrazione dei modelli locali con strumenti già presenti nel mio ambiente di sviluppo e nel mio homelab.

Non mi interessa utilizzare un modello esclusivamente per fare domande tramite un'interfaccia web.

Vorrei capire quanto possa essere utile all'interno di workflow reali.

### Coding e sviluppo software

Sto sperimentando l'utilizzo di modelli locali attraverso endpoint compatibili con le API utilizzate da diversi strumenti, con particolare interesse verso **OpenCode**.

Ho effettuato alcune prove nelle quali un agente doveva modificare direttamente file HTML esistenti, individuando elementi specifici e sostituendoli secondo istruzioni precise.

Sono attività apparentemente semplici, ma rappresentano un buon punto di partenza per valutare capacità di interpretazione, utilizzo degli strumenti e affidabilità delle modifiche.

La verifica dell'output rimane fondamentale.

Un agente che afferma di aver modificato correttamente un file non ha necessariamente prodotto il risultato desiderato. Bisogna controllare il codice, verificare le differenze e assicurarsi che non siano state introdotte modifiche indesiderate.

### Automazioni con n8n

Un altro possibile ambito di utilizzo è **n8n**, che impiego già per diverse automazioni personali e progetti software.

Alcune attività potrebbero essere gestite da modelli locali senza ricorrere necessariamente a servizi cloud: classificazione di informazioni, estrazione di dati strutturati, trasformazioni di testo, analisi preliminari e passaggi intermedi di workflow più complessi.

Naturalmente, non tutte le attività richiedono un modello linguistico e non tutti i modelli locali sono sufficientemente affidabili per essere inseriti in un'automazione senza controlli.

Il mio obiettivo è capire dove l'inferenza locale possa offrire un vantaggio concreto, mantenendo un equilibrio tra qualità, tempi di elaborazione, consumo di risorse e complessità operativa.

## I limiti che sto incontrando

Nonostante i progressi, utilizzare modelli AI locali comporta ancora diversi compromessi.

Il primo riguarda la **memoria disponibile**. Gli 8 GB della RTX 3070 impongono di scegliere attentamente modello, quantizzazione e dimensione del contesto. I 32 GB di RAM aiutano, ma non possono offrire le stesse prestazioni della memoria video.

Il secondo riguarda la **velocità di inferenza**. Alcuni modelli risultano sufficientemente reattivi per un utilizzo interattivo, mentre altri richiedono tempi di attesa più lunghi, soprattutto quando parte dei pesi deve essere gestita dalla CPU.

Il terzo è la **qualità delle risposte**. I modelli locali stanno migliorando rapidamente, ma nelle attività più complesse continuo a trovare vantaggioso utilizzare modelli frontier.

C'è infine la complessità della configurazione. Driver NVIDIA, CUDA, formati GGUF, quantizzazione, gestione della memoria e compatibilità con gli strumenti agentici sono tutti aspetti che richiedono attenzione.

Personalmente, però, considero anche questo parte del valore dell'esperienza.

Sperimentare con questi strumenti mi permette di comprendere meglio il funzionamento dell'inferenza, i requisiti hardware e le differenze tra le varie architetture.

## Come iniziare a sperimentare

Per chi vuole avvicinarsi all'AI locale, il mio consiglio è partire con una configurazione relativamente semplice.

Ollama rappresenta un buon punto di ingresso: permette di installare rapidamente un modello e verificare come si comporta sul proprio hardware.

Successivamente si possono approfondire strumenti come llama.cpp, sperimentando con quantizzazioni differenti e con la distribuzione dei layer tra CPU e GPU.

Per valutare i risultati, trovo utile utilizzare attività concrete anziché limitarsi a domande generiche.

Per esempio, si può chiedere a più modelli di analizzare lo stesso script, correggere un errore, modificare una pagina HTML o generare una struttura JSON seguendo uno schema preciso.

È importante considerare non soltanto la correttezza della risposta, ma anche il tempo necessario, il consumo di memoria e l'affidabilità complessiva.

Soltanto dopo aver acquisito familiarità con questi aspetti ha senso passare a configurazioni più sperimentali, come quelle basate su modelli MoE di grandi dimensioni e strumenti come PolyStrata.

## Quale futuro per l'AI locale?

Non penso che l'AI locale sostituirà completamente i servizi cloud, almeno nel prossimo futuro.

I modelli frontier continueranno probabilmente a offrire vantaggi importanti, soprattutto nelle attività che richiedono capacità di ragionamento avanzate, contesti molto estesi e prestazioni elevate.

Allo stesso tempo, credo che l'inferenza locale diventerà sempre più accessibile e interessante.

Nuove architetture, quantizzazioni più efficienti e runtime meglio ottimizzati potrebbero permettere di eseguire modelli sempre più capaci anche su hardware consumer.

Quello che oggi richiede una configurazione sperimentale potrebbe diventare, tra qualche anno, una funzionalità relativamente comune.

Per quanto mi riguarda, continuerò a esplorare entrambe le possibilità.

Utilizzerò i modelli cloud quando rappresentano la soluzione più efficace, ma continuerò anche a investire tempo nell'AI locale, soprattutto per le applicazioni in cui privacy, controllo dei dati e indipendenza tecnologica rappresentano vantaggi concreti.

La cosa che più mi incuriosisce è vedere quanto si possa ottenere da un hardware che, pur essendo potente, non è stato progettato specificamente per questo tipo di utilizzo.

**Riuscire a sperimentare con modelli da decine di miliardi di parametri utilizzando una RTX 3070 da 8 GB è qualcosa che fino a poco tempo fa avrei considerato poco realistico.**

Oggi è possibile, pur con compromessi significativi.

E probabilmente siamo ancora nelle prime fasi di questa evoluzione.

Continuerò a condividere i risultati delle mie sperimentazioni, comprese le configurazioni che funzionano, quelle che non funzionano e i limiti che incontro. Perché, al di là dei benchmark e dei numeri, penso che il modo migliore per comprendere queste tecnologie sia provarle direttamente, confrontarsi con la community e capire dove possano essere davvero utili.
