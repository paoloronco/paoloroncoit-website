---
title: "AWS AI SOC Analyzer: imparare AWS costruendo un triage per gli alert"
description: "Dal mio flusso Splunk e n8n a una V1 su AWS: cosa analizza, come passano gli alert tra API Gateway, Lambda e Bedrock e quali competenze ho acquisito."
pubDate: 2026-10-02
updatedDate: 2026-10-02
tags: ["AWS", "cybersecurity", "SOC", "AI", "n8n"]
draft: false
---

Lavoro nella cybersecurity e nel mio homelab avevo già un flusso in cui **Splunk rileva eventi di sicurezza e n8n gestisce l'instradamento delle notifiche**. Volevo capire se fosse possibile aggiungere, tra la rilevazione e la notifica, un passaggio che trasformasse i campi di un alert in un primo contesto utile per l'analista: che cosa è successo, quali evidenze lo sostengono e che cosa verificare dopo.

Ho usato questa domanda per imparare AWS costruendo [AWS AI SOC Analyzer](https://github.com/paoloronco/aws-ai-soc-analyzer). Partivo da competenze su SIEM, automazione e sicurezza, ma con poca esperienza pratica nell'assemblare servizi AWS, configurarli e farli comunicare in modo controllato. Il progetto mi ha permesso di lavorare su entrambi i lati: il problema SOC che conosco e l'infrastruttura cloud che volevo imparare.

## Da dove partivo e dove si inserisce il progetto

**Prima:** Splunk poteva inviare alert a n8n, che poteva instradarli verso canali come email o Telegram. Un alert però arriva spesso come insieme di campi: nome della detection, host, IP, contatori, finestra temporale. Per ricostruire rapidamente il quadro, qualcuno deve ancora leggere e interpretare quei dati.

**Con questa V1:** ho aggiunto un servizio AWS che riceve un alert di prova da n8n e restituisce un'analisi in JSON. Non cambia la detection di Splunk e non esegue azioni di risposta. Offre un passaggio di *triage assistito* che n8n potrebbe usare per presentare un riepilogo e organizzare i passaggi successivi.

È importante distinguere l'architettura che voglio esplorare dal test completato:

```text
Flusso già presente nel laboratorio: Splunk → n8n → notifiche
V1 verificata: trigger manuale n8n → API Gateway → Lambda → Bedrock → Lambda → n8n
Possibile integrazione: Splunk → n8n → AWS → n8n → instradamento e notifiche
```

Il webhook reale di Splunk **non è ancora collegato** al nuovo percorso AWS. La prova end-to-end riguarda n8n, i servizi AWS e il ritorno della risposta a n8n.

## Che cosa fa, concretamente, quando arriva un alert

La V1 usa un esempio di tentativi di accesso SSH: un host, un IP sorgente, 34 autenticazioni fallite in dieci minuti, più account bersaglio e nessun accesso riuscito indicato nei dati. È un [payload di esempio](https://github.com/paoloronco/aws-ai-soc-analyzer/blob/main/examples/ssh-brute-force-alert.json), non un incidente reale documentato nell'articolo.

1. **n8n prepara e invia l'alert.** Nel workflow di prova, un trigger manuale e il nodo Edit Fields costruiscono il JSON. La richiesta HTTP verso `POST /analyze` è firmata con AWS Signature Version 4.
2. **API Gateway controlla l'accesso.** La route richiede l'autorizzazione `AWS_IAM`, così il servizio non è un endpoint anonimo che chiunque può usare per invocare il modello.
3. **Lambda interpreta l'input.** La funzione Python legge il corpo della richiesta, normalizza i campi previsti dalla V1 e rifiuta un input mancante o di tipo errato. Questo schema è ancora orientato agli alert SSH.
4. **Bedrock esegue l'analisi.** Lambda chiama Amazon Nova 2 Lite tramite la Converse API, chiedendo di basarsi soltanto sulle evidenze ricevute. Il modello non interroga da solo Splunk, i log o fonti di threat intelligence: vede i dati che gli vengono passati.
5. **Lambda verifica e restituisce la risposta.** Il modello propone gravità, confidenza, sintesi, possibili tecniche MITRE ATT&CK, evidenze, verifiche consigliate e un valore `notify`. Lambda interpreta il JSON, controlla che i campi richiesti abbiano struttura e valori validi e risponde a n8n con `alert`, `analysis` e metadati. Richieste non valide e risposte malformate producono un errore invece di un'analisi apparentemente utilizzabile. La logica è leggibile nel [codice della funzione](https://github.com/paoloronco/aws-ai-soc-analyzer/blob/main/lambda/lambda_function.py); il [workflow n8n ripulito](https://github.com/paoloronco/aws-ai-soc-analyzer/blob/main/n8n/aws-ai-soc-analyzer.sanitized.json) mostra la chiamata firmata.

Per esempio, l'[output dimostrativo della repository](https://github.com/paoloronco/aws-ai-soc-analyzer/blob/main/examples/example-analysis.json) riporta severità `medium`, una sintesi dei tentativi SSH, le evidenze contenute nell'alert e controlli consigliati sui log di autenticazione. È un esempio del **formato** e del tipo di supporto atteso, non una misura dell'accuratezza del modello.

## La sicurezza del collegamento

Uno degli apprendimenti più concreti è stato separare due identità che inizialmente è facile confondere. L'utente IAM dedicato a n8n può invocare soltanto la route prevista dell'API; non ha bisogno di accedere a Bedrock. La funzione Lambda, invece, usa un ruolo di esecuzione per scrivere i log in CloudWatch e chiamare Bedrock; non conserva una chiave AWS nel codice. Le credenziali del chiamante restano nello store di n8n e l'export pubblico del workflow è ripulito dai dati dell'ambiente.

Questa separazione mi ha fatto capire IAM in un caso reale: **chi può entrare nell'API** e **che cosa può fare la funzione una volta avviata** sono domande diverse. La policy Bedrock della V1 ha ancora un ambito di risorse ampio, documentato nella repository; il progetto non va quindi descritto come una configurazione definitiva per la produzione.

## Che cosa ho imparato davvero su AWS

Il risultato più importante per me non è stato ottenere una risposta dal modello. È stato capire i servizi e i loro confini mentre risolvevo errori concreti:

- **Regioni e Bedrock:** usare direttamente l'ID di Nova 2 Lite produceva una `ValidationException`. Ho dovuto distinguere l'ID del modello dall'*inference profile* richiesto per quella chiamata (`us.amazon.nova-2-lite-v1:0`).
- **Lambda e osservabilità:** dopo aver corretto l'invocazione, la funzione terminava al timeout iniziale di tre secondi. Leggere gli errori e i log in CloudWatch mi ha permesso di riconoscere un limite di esecuzione, portato poi a trenta secondi, invece di attribuire il problema a Bedrock.
- **API e autorizzazione:** un `404` dipendeva dalla route sbagliata: l'endpoint espone `POST /analyze`, non la radice. Una richiesta non firmata alla route protetta restituisce invece `403`. Sono due problemi diversi, con correzioni diverse.
- **Contratto applicativo:** il modello a volte restituiva JSON racchiuso in un blocco Markdown e, in un test iniziale, proponeva una mappatura MITRE errata. Ho aggiunto parsing e validazione della struttura, e ristretto il prompt alle evidenze disponibili. La validazione controlla il formato, **non certifica la verità dell'analisi**.
- **Costi e organizzazione:** ho impostato un AWS Budget prima delle prove e ho visto come account, risorse regionali, ruoli e policy influenzino anche un laboratorio piccolo. Un budget avvisa quando si raggiungono soglie definite: non è un blocco automatico della spesa.

Questa esperienza ha trasformato concetti che conoscevo solo in teoria — IAM, API Gateway, Lambda, Bedrock e CloudWatch — in una catena che ho configurato, testato e diagnosticato. Ho annotato gli errori e le correzioni nel [tutorial tecnico](https://github.com/paoloronco/aws-ai-soc-analyzer/blob/main/docs/tutorial.md) e nelle [lezioni apprese](https://github.com/paoloronco/aws-ai-soc-analyzer/blob/main/docs/lessons-learned.md).

## Quale utilità mi ha dato, e quali limiti restano

Oggi il progetto dimostra che posso inviare da n8n un alert a un'API AWS autenticata e ricevere un risultato strutturato. Per il lavoro SOC, il valore potenziale è avere **un primo riepilogo delle evidenze e delle verifiche da fare** nello stesso flusso che gestisce le notifiche. Per me, il valore già ottenuto è aver imparato a progettare e attraversare quei confini cloud con un caso d'uso vicino al mio mestiere.

Non ho ancora misurato una riduzione dei tempi di triage né validato il comportamento su detection diverse. L'input è specifico per SSH, il webhook Splunk non alimenta ancora questa V1 e il campo `notify` non ha guardrail deterministici nel workflow dimostrativo. Inoltre un LLM può produrre conclusioni plausibili ma sbagliate: le decisioni operative devono restare alle regole di sicurezza e all'analista.

Non ho deciso se questo diventerà un servizio usato stabilmente, se resterà un laboratorio o quando aggiornerò la repository. Per ora il risultato è una prova funzionante del percorso n8n → AWS → n8n e un esercizio pratico documentato. Il [codice, gli esempi e la documentazione sono su GitHub](https://github.com/paoloronco/aws-ai-soc-analyzer); sul sito trovi anche la [scheda del progetto](/projects/aws-ai-soc-analyzer/).
