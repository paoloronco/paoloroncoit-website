---
title: "AWS AI SOC Analyzer: imparare AWS costruendo un triage per gli alert"
description: "Come ho usato un credito AWS da 100 euro per collegare n8n, API Gateway, Lambda e Bedrock in un laboratorio SOC, tra IAM, errori reali e limiti dell'AI."
pubDate: 2026-10-02
tags: ["AWS", "cybersecurity", "SOC", "AI", "n8n"]
draft: false
---

Avevo un credito promozionale AWS di 100 euro e volevo usarlo per capire davvero come funzionano i servizi cloud di Amazon. Invece di seguire un tutorial isolato, ho scelto un problema vicino al mio lavoro nella cybersecurity: **rendere più leggibile il primo triage di un alert SOC**.

Da qui è nato [AWS AI SOC Analyzer](https://github.com/paoloronco/aws-ai-soc-analyzer), un progetto di laboratorio che aggiunge un componente AWS a un flusso Splunk e n8n già presente nel mio homelab. L'obiettivo non era costruire un analista autonomo: volevo ricevere un alert, farlo esaminare da un modello e restituire a n8n un'analisi strutturata, utile a chi dovrà verificare l'evento.

## Dal mio laboratorio ad AWS

Nel flusso previsto, Splunk genera l'alert e n8n lo inoltra a un endpoint protetto. API Gateway riceve la richiesta, Lambda normalizza i dati e interroga Amazon Bedrock tramite la Converse API. Il modello Amazon Nova 2 Lite restituisce una proposta di triage che Lambda controlla prima di rimandarla a n8n.

```text
Splunk → n8n → API Gateway → Lambda → Bedrock / Nova 2 Lite
                  ↑                              ↓
             richiesta firmata             analisi JSON
                  └────────── n8n ←─────────────┘
```

Il risultato contiene gravità, livello di confidenza, sintesi, evidenze, eventuali riferimenti MITRE ATT&CK, azioni consigliate e un'indicazione per la notifica. Sono campi pensati per l'orchestrazione e per il lavoro dell'analista, non per prendere decisioni di risposta in autonomia.

**Lo stato attuale è una V1.** Ho verificato il percorso completo con un workflow n8n avviato manualmente e un alert SSH di esempio. Il collegamento del webhook reale di Splunk a questo nuovo percorso AWS è ancora un passo successivo; [la documentazione del progetto](https://github.com/paoloronco/aws-ai-soc-analyzer/blob/main/docs/tutorial.md) descrive sia i test completati sia ciò che resta da integrare.

## Le cose che ho imparato costruendolo

La parte più utile è stata incontrare problemi reali, anziché limitarmi a configurare servizi dalla console.

- **Costi:** ho creato un AWS Budget prima di usare Lambda e Bedrock. Il credito aiuta a sperimentare, ma un budget invia avvisi: non blocca automaticamente la spesa.
- **Identità e permessi:** n8n firma le richieste con AWS Signature Version 4 e dispone soltanto del permesso `execute-api:Invoke` per `POST /analyze`. Lambda usa invece il proprio ruolo di esecuzione per scrivere i log in CloudWatch e chiamare Bedrock. Sono due identità e due confini di fiducia distinti.
- **Modelli e regioni:** una prima chiamata a Nova 2 Lite falliva perché usavo l'ID del modello direttamente. In questo caso serviva un *inference profile*. Passare a `us.amazon.nova-2-lite-v1:0` ha risolto l'errore.
- **Timeout e routing:** dopo la correzione del modello, Lambda scadeva con il timeout iniziale di tre secondi; l'ho portato a trenta. Un successivo `404` dipendeva invece dal percorso richiesto: l'API espone `POST /analyze`, non la radice dell'endpoint.
- **Output del modello:** chiedere «rispondi in JSON» non basta a garantire un contratto affidabile. Lambda rimuove un eventuale blocco Markdown, interpreta la risposta e verifica campi, tipi e valori prima di restituirla.

Questi passaggi sono raccontati nel [tutorial della repository](https://github.com/paoloronco/aws-ai-soc-analyzer/blob/main/docs/tutorial.md). Il codice e un workflow n8n esportato senza credenziali permettono di vedere come sono collegati i componenti.

## Dove l'AI deve fermarsi

Già nei primi test il modello ha suggerito una mappatura MITRE errata e ha aggiunto ipotesi non supportate dall'alert. Ho quindi ristretto il prompt alle evidenze disponibili e tratto l'output come dato da validare. Il controllo dello schema impedisce a una risposta malformata di attraversare il flusso, ma **non può garantire che una valutazione plausibile sia corretta**.

Per questo la V1 assiste il triage: non sostituisce le regole di rilevamento, le policy di notifica o la revisione umana. Prima di usarla per decisioni operative serviranno anche guardrail deterministici in n8n, così un alert importante non potrà essere ignorato solo perché il modello ha restituito `notify: false`.

## Il prossimo passo

La prova tecnica da n8n ad AWS e ritorno funziona. Ora voglio collegare il webhook Splunk reale, superare lo schema d'ingresso oggi orientato agli alert SSH e rendere le autorizzazioni Bedrock più strette. Anche descrivere l'infrastruttura con Terraform renderebbe il laboratorio più facile da ricreare e rimuovere.

Ho raccolto codice, esempi, architettura e lezioni apprese nella [repository AWS AI SOC Analyzer su GitHub](https://github.com/paoloronco/aws-ai-soc-analyzer). Sul sito c'è anche la [scheda del progetto](/projects/aws-ai-soc-analyzer/).
