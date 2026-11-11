---
title: "Google Cloud Inventory: come ho automatizzato inventario, modifiche e controlli IAM"
description: "Un progetto personale per raccogliere le risorse Google Cloud, confrontare gli snapshot e rendere consultabili i risultati con n8n, BigQuery e Google Sheets."
pubDate: 2026-11-07
tags: ["Google Cloud", "n8n", "Cloud Security", "Automation", "BigQuery", "IAM"]
draft: false
---

Il mio ambiente Google Cloud non è particolarmente grande. Lo uso soprattutto per sperimentare: qualche progetto personale, servizi gestiti, API abilitate per fare test e risorse che creo, modifico o elimino quando provo qualcosa di nuovo. Non sto gestendo centinaia di macchine virtuali o un'infrastruttura aziendale distribuita su decine di team.

Eppure mi sono accorto che, anche in un ambiente così, ricordare *cosa* ho attivato, *dove* e *con quali permessi* non è sempre immediato. La console di Google Cloud permette di esplorare ogni progetto, ma non è il posto più comodo per ricostruire a colpo d'occhio lo stato complessivo e, soprattutto, capire cosa è cambiato dall'ultima verifica.

Da qui è nata l'idea di costruire **Google Cloud Inventory & Change Audit**: un'automazione che raccoglie informazioni sulle risorse, conserva gli snapshot, confronta le esecuzioni e presenta i risultati in un formato più semplice da consultare. Il progetto è anche un'occasione per lavorare concretamente con API Google Cloud, identità di servizio, BigQuery e n8n, anziché limitarmi a studiarli separatamente.

## Il problema non è il numero di risorse

Quando creo un servizio per una prova, la mia attenzione è quasi sempre sulla parte che voglio testare. Configuro le API necessarie, assegno i permessi, verifico che tutto funzioni e passo al progetto successivo. Dopo qualche settimana, però, può essere utile rispondere a domande molto meno entusiasmanti: quella API è ancora abilitata? Quale service account può leggere questo progetto? Questa risorsa c'era già nell'ultimo controllo?

Potrei controllare tutto manualmente. Nel mio caso sarebbe ancora fattibile, visto che il numero di workload reali è contenuto. Ma proprio per questo ho preferito automatizzare: volevo dedicare meno tempo ai controlli ripetitivi e più tempo a capire come raccogliere e interpretare i dati.

Non considero questo workflow un sostituto di una piattaforma CSPM, né un sistema di sicurezza capace di individuare ogni configurazione rischiosa. È, prima di tutto, **uno strumento di visibilità e change tracking**. E per un laboratorio personale è già un risultato utile.

## Google Cloud ha già un inventario: perché crearne un altro?

Google Cloud non parte certo da zero su questo fronte. Nella console posso consultare **Cloud Asset Inventory** per cercare gli asset visibili nel mio scope e analizzarne i metadati. Dalla Cloud Shell, o da una macchina con Google Cloud CLI configurata, posso fare ricerche analoghe con un comando come questo:

```bash
gcloud asset search-all-resources --scope=projects/PROJECT_ID
```

Esistono poi i comandi specifici dei singoli servizi, per esempio `gcloud run services list` o `gcloud compute instances list`, e le API che permettono di interrogare direttamente risorse e configurazioni. Cloud Asset Inventory supporta anche esportazioni e analisi storiche, a seconda della funzionalità utilizzata. Quindi non sarebbe corretto dire che Google Cloud non offre un inventario, o che per ottenere uno storico sia obbligatorio costruire un workflow personalizzato.

Il punto, per me, è un altro: **un elenco di asset non è necessariamente una rappresentazione leggibile di ciò che ho distribuito**. Se interrogo un progetto posso trovare workload, API abilitate, account di servizio, regole di rete, configurazioni e risorse gestite dalla piattaforma. Sono informazioni utili, ma non tutte raccontano la stessa cosa. Un asset registrato non equivale automaticamente a un'applicazione in esecuzione, né il totale degli asset corrisponde al numero di workload.

Con questa automazione ho voluto costruire una vista più vicina alle domande che mi faccio davvero: quali workload e servizi risultano presenti? Quali elementi sono solo configurazione o infrastruttura di supporto? Quali API sono abilitate? Che cosa è cambiato rispetto all'ultima scansione? E quali permessi meritano una verifica?

Il workflow **riutilizza gli strumenti nativi di Google Cloud come sorgenti**, non prova a reinventarli. Il lavoro aggiuntivo è nella normalizzazione, nella classificazione, nel confronto tra snapshot e nella presentazione dei dati attraverso BigQuery e Sheets. È una differenza soprattutto di fruibilità: passo da più interrogazioni tecniche a un report che posso consultare periodicamente, senza perdere la possibilità di risalire ai dati di origine.

Resta un limite fondamentale: la presenza di una risorsa non dimostra che sia attivamente utilizzata, e l'inventario non garantisce una mappa completa delle applicazioni distribuite. Per questo parlo di una **vista ragionata delle risorse osservabili**, non di una fonte infallibile sul loro utilizzo.

## Come funziona il workflow n8n

Ho sviluppato e pubblicato una versione del progetto in **n8n**, il motore di automazione che utilizzo anche per altri workflow personali. Nella versione 2.2.0 il flusso può analizzare un elenco esplicito di progetti Google Cloud, oppure un singolo scope di cartella o organizzazione, nei limiti dei permessi concessi.

Il funzionamento, semplificando, è questo:

1. **Raccolta:** il workflow interroga Cloud Asset Inventory per recuperare i metadati delle risorse e le policy IAM visibili. Per lo stato delle API abilitate utilizza direttamente Service Usage.
2. **Normalizzazione:** organizza i risultati, assegna categorie alle risorse e distingue i workload dai numerosi oggetti amministrativi e di configurazione che Google Cloud restituisce.
3. **Persistenza:** salva gli snapshot e i dati delle esecuzioni in un dataset BigQuery centrale.
4. **Confronto:** dopo il primo snapshot, confronta le esecuzioni compatibili per evidenziare risorse aggiunte, rimosse o modificate.
5. **Consultazione:** aggiorna un foglio Google Sheets con dashboard, inventario, finding, modifiche e scansioni. Può anche produrre esportazioni HTML/CSV e inviare riepiloghi via email.

Una scelta importante è stata **non confondere il numero totale degli asset con il numero di servizi che utilizzo davvero**. Cloud Asset Inventory può restituire oggetti gestiti da Google, configurazioni e componenti di supporto. Un conteggio grezzo, da solo, rischia di dare un'immagine esagerata dell'infrastruttura. La categorizzazione aiuta a leggere i risultati con maggiore criterio, pur senza pretendere di stabilire automaticamente quali risorse siano effettivamente usate o eliminabili.

## BigQuery come memoria delle esecuzioni

Uno snapshot isolato dice cosa il sistema riesce a vedere in un determinato momento. Per capire cosa è cambiato serve conservarne almeno due.

Ho scelto BigQuery come archivio centrale. Il workflow prepara, quando necessario e con i permessi appropriati, il dataset e le tabelle dedicate a risorse, esecuzioni, modifiche e finding. In questo modo non dipendo soltanto dal contenuto corrente di Google Sheets: posso interrogare uno storico strutturato e distinguere i dati raccolti dalla loro presentazione.

La prima esecuzione crea una baseline. Dalla seconda, a parità di profilo di confronto, diventano disponibili i delta. Se cambio l'elenco dei progetti o le regole di normalizzazione, è più corretto avviare una nuova baseline compatibile piuttosto che segnalare come «rimosse» risorse che semplicemente non rientrano più nello scope.

BigQuery non significa automaticamente costo zero. Storage e query possono avere costi, anche se per un laboratorio piccolo e con una frequenza ragionevole possono restare molto contenuti. Ho previsto limiti per le query e considero retention, volumi e frequenza di scansione aspetti da configurare, non dettagli da ignorare.

## Una dashboard che posso effettivamente usare

La parte più visibile del progetto è il report in Google Sheets. Il modello include cinque schede: **Dashboard, Inventory, Findings, Changes e Scans**. Oltre ai conteggi e ai grafici, posso filtrare le tabelle, aggiungere note e contrassegnare gli elementi già esaminati.

Per me è una scelta pratica: non devo aprire BigQuery ogni volta che voglio verificare cosa è cambiato, e posso condividere un modello con dati sintetici senza pubblicare informazioni sul mio ambiente. I dati originali restano invece nei sistemi che ho configurato.

Le osservazioni IAM richiedono comunque un controllo umano. Un binding apparentemente ampio non equivale, da solo, a una vulnerabilità sfruttabile; allo stesso modo, l'assenza di finding non dimostra che un progetto sia sicuro. Il workflow aiuta a individuare ciò che merita attenzione, non emette certificazioni di sicurezza.

## La parte più istruttiva: permessi e affidabilità

La raccolta di informazioni cloud sembra semplice finché non si incontrano i confini IAM. Un service account che riesce a leggere un progetto non ha automaticamente accesso a tutti gli altri. Anche Cloud Asset Inventory, Service Usage, BigQuery e Sheets richiedono autorizzazioni diverse.

Nel template ho quindi separato lo scope dei progetti da analizzare dal progetto usato per le operazioni e lo storage centralizzato. La configurazione richiede esplicitamente le autorizzazioni di lettura sugli scope, i permessi necessari a BigQuery e l'accesso in modifica al foglio di destinazione. Quest'ultimo non viene concesso automaticamente da un ruolo IAM su Google Cloud: il file deve essere condiviso con l'identità che lo aggiorna.

Un altro punto su cui ho lavorato è la gestione dei risultati incompleti. Una richiesta fallita, una pagina non recuperata o un permesso mancante non devono trasformarsi silenziosamente in un inventario apparentemente pulito. Per esempio, un problema nella lettura delle API abilitate interrompe la scansione, mentre una copertura IAM incompleta viene indicata come non disponibile, non come assenza di problemi.

Queste situazioni sono meno appariscenti di una dashboard, ma sono probabilmente la parte del progetto da cui ho imparato di più: **un'automazione è utile solo se si capisce quando i suoi risultati sono affidabili e quando non lo sono**.

## Come replicarlo

Ho reso disponibile il template n8n con workflow JSON anonimizzato e documentazione di configurazione. Non contiene credenziali pronte all'uso: chi lo importa deve predisporre i propri accessi e verificare che lo scope sia corretto.

Per provarlo consiglierei di partire da **un solo progetto di test**, non dall'intero ambiente:

1. Scegliere il progetto da analizzare e quello che ospiterà il dataset BigQuery centrale (possono coincidere).
2. Abilitare le API necessarie e creare un'identità con i soli permessi richiesti per la raccolta e la scrittura dei report.
3. Copiare il modello Google Sheets e condividerlo con l'identità utilizzata dal workflow.
4. Importare il JSON in n8n, configurare credenziali, scope, dataset e identificativo del foglio.
5. Eseguire una prima scansione manuale e verificare che i dati corrispondano alla console Google Cloud.
6. Eseguire una seconda scansione, controllare il confronto e solo dopo abilitare l'esecuzione programmata.

Il workflow supporta una schedulazione giornaliera, ma per un piccolo laboratorio si può scegliere una frequenza diversa in base all'effettiva utilità. Prima di attivarla conviene controllare costi, quote, log ed eventuali notifiche.

La documentazione completa è più precisa di questa panoramica: include permessi, configurazione dei nodi, test e limiti operativi.

## Un secondo approccio: Python su Cloud Run

In parallelo ho sviluppato anche **GoogleCloud-Inventory-Automation**, un collector in Python distribuito come Cloud Run Job. Qui l'obiettivo è simile, ma l'implementazione è diversa: raccolgo metadati da Cloud Asset Inventory e Service Usage, posso eseguire controlli aggiuntivi su alcune configurazioni e genero report Markdown, JSON ed Excel pubblicati in una repository GitHub privata.

Questa versione è utile soprattutto per sperimentare con container, service account associati al runtime, Secret Manager, classificazione delle risorse e pubblicazione automatica via API GitHub. La versione documentata nella repository è la v8, validata manualmente; **Cloud Scheduler non risulta ancora configurato**, quindi non la descriverei come un processo già interamente schedulato.

Non sono due strumenti da far passare per un'unica pipeline: sono **due implementazioni distinte**, con destinazioni e compromessi differenti. n8n è comodo per integrare rapidamente servizi e costruire un flusso ispezionabile; Python e Cloud Run mi danno maggiore controllo sul codice, sui test e sul formato dei report. Sperimentare entrambe le strade è stato parte del valore del progetto.

## Cosa non fa (e perché è importante dirlo)

Non ho costruito una piattaforma completa di cloud security posture management. Non eseguo remediation automatica, non ricostruisco ogni relazione tra le risorse e non posso garantire che tutti i tipi di asset siano rappresentati. La visibilità dipende dalle API, dai permessi e dai limiti delle sorgenti. Le osservazioni di sicurezza sono punti da verificare, non diagnosi definitive.

E non ho nemmeno un'infrastruttura enorme da inventariare. Il mio utilizzo quotidiano di Google Cloud rimane prevalentemente sperimentale, con pochi workload realmente significativi. Proprio per questo il progetto ha senso come laboratorio: posso controllare i risultati a mano, capire dove la raccolta sbaglia e migliorare il sistema senza dover simulare un'azienda che non esiste.

## Cosa mi porto a casa

La cosa più interessante non è aver ottenuto un elenco di risorse. È aver collegato pezzi che normalmente si studiano separatamente: IAM, API, automazione, storage analitico, reporting e gestione degli errori.

Il workflow mi evita di ripetere alcune verifiche manuali, ma soprattutto rende più facile accorgermi delle modifiche e tornare sui dati precedenti. Non ho misurato un risparmio di ore tale da poterlo quantificare seriamente, e non avrebbe senso inventarlo. Il vantaggio concreto, nel mio caso, è avere un controllo ripetibile e una base da estendere.

Se anche tu usi Google Cloud per progetti personali o piccoli ambienti di test, può essere un esercizio interessante: non serve partire da un'infrastruttura complessa. Serve partire da una domanda semplice — *che cosa c'è nel mio cloud, e che cosa è cambiato?* — e costruire una risposta che si possa verificare.

---

### Repository e risorse

- [Template n8n — Google Cloud Inventory V2](https://github.com/paoloronco/n8n-templates/tree/main/workflows/google-cloud-inventory/V2)
- [Guida completa alla configurazione](https://paoloronco.notion.site/Google-Cloud-Inventory-Change-Audit-408f0ba27c3281aea226fecadfab05f8)
- [Modello Google Sheets con dati sintetici](https://docs.google.com/spreadsheets/d/16uTQRgZSTN2GN2nE2giTPu2ZyfWONfvt5m5gkOIOgeY/copy)
- [Collector Python e Cloud Run](https://github.com/paoloronco/GoogleCloud-Inventory-Automation)
