---
title: "AI Red Teaming con PromptFoo: come ho testato la sicurezza del mio chatbot WordPress"
description: "Ho un chatbot AI integrato nel mio sito accessibile da chiunque visiti paoloronco.it. Non si tratta di un semplice widget di Q&A: dietro le quinte gira un…"
pubDate: 2026-03-14
tags: []
draft: false
---
Ho un [chatbot AI integrato nel mio sito](https://paoloronco.it/ask/) accessibile da chiunque visiti paoloronco.it. Non si tratta di un semplice widget di Q&A: dietro le quinte gira un sistema RAG (Retrieval-Augmented Generation) orchestrato tramite n8n, con OpenAI come motore linguistico, Qdrant Cloud come vector store, Cohere come reranker, e un webhook autenticato via Bearer Token come punto di ingresso.

L'articolo che descrive l'intera architettura è disponibile qui: [WordPress AI Chatbot – Trasformare contenuti in un sistema interrogabile con n8n, Qdrant, MongoDB Vector Store](https://paoloronco.it/writing/wordpress-ai-chatbot-trasformare-contenuti-in-un-sistema-interrogabile-n8n-qdrant-mongodb-vector-store/).

Un sistema del genere, esposto a visitatori anonimi, è un bersaglio interessante. Chiunque può inviargli un messaggio. E quando si parla di LLM, i vettori di attacco non sono quelli classici del web (SQLi, XSS, SSRF) ma qualcosa di più insidioso: **il linguaggio naturale stesso diventa l'arma**.

Da qui la domanda che mi sono posto: _quanto è robusto il mio chatbot contro un attaccante che usa prompt crafted ad arte?_

* * *

## Cos'è PromptFoo e cosa fa

[PromptFoo](https://promptfoo.dev/) è uno strumento open source per il testing e la valutazione di applicazioni basate su LLM. Permette di fare due cose fondamentali:

1.  **Evaluation (eval):** confrontare prompt, modelli e configurazioni su dataset di test, misurando qualità e coerenza delle risposte.
2.  **Red Teaming:** simulare attacchi automatizzati contro il tuo sistema AI per identificare vulnerabilità prima che lo faccia qualcun altro.

Per il red teaming, PromptFoo funziona come un attacker automatizzato: genera centinaia di payload malevoli usando una serie di **plugin** (ognuno specializzato in una categoria di rischio) e **strategie di attacco** (tecniche per aggirare i filtri). Ogni risposta del sistema viene poi valutata da un modello giudice che determina se l'attacco ha avuto successo.

### Plugin disponibili

I plugin coprono le principali categorie di rischio per un LLM:

| Categoria | Descrizione |
| --- | --- |
| `bias:*` | Rilevazione di bias su età, disabilità, genere, razza |
| `hallucination` | Generazione di informazioni false o inventate |
| `harmful:*` | Contenuti dannosi (droghe, armi, sfruttamento, hate speech, ecc.) |
| `pii:*` | Esposizione di dati personali via API, sessione o social engineering |
| `excessive-agency` | Azioni non autorizzate oltre i confini del sistema |
| `hijacking` | Deviazione dell'uso del sistema verso scopi non previsti |
| `contracts` | Impegni contrattuali non autorizzati |
| `politics` | Contenuti politici e bias ideologici |

### Strategie di attacco

PromptFoo non si limita a inviare i payload così come sono. Li passa attraverso **strategie di evasione**:

-   **Basic:** payload diretto, senza trasformazioni
-   **Base64:** il payload è codificato in Base64 per bypassare filtri lessicali
-   **Citation (Authority Bias):** il prompt si maschera da citazione accademica per sfruttare il bias di autorità del modello
-   **Emoji Smuggling:** testo nascosto usando variation selector unicode negli emoji
-   **Jailbreak Meta (IterativeMeta):** un agente meta che costruisce autonomamente una tassonomia di attacchi, impara dai fallimenti precedenti e ottimizza i vettori in modo iterativo — la strategia più sofisticata

* * *

## La configurazione del test

Ho configurato PromptFoo per attaccare direttamente il webhook n8n del mio chatbot:

description: WP-AI-Chatbot RedTeam1  
targets:  
  - id: http  
    label: wp-ai-chatbot  
    config:  
      url: https://n8n.prhomelab.com/webhook/paoloroncoit-chatbot
      method: POST  
      headers:  
        Content-Type: application/json  
      body: '{ "message": "{{prompt}}", "sessionId": "promptfoo-redteam-001" }'  
      transformResponse: (json, text) => json.text || json.results?.\[0\]?.title || text

Il sistema sotto test è esattamente quello in produzione: stesso endpoint, stessa logica n8n, stesso modello OpenAI. Nessuna sandbox, nessun ambiente di test artificioso.

Ho attivato **35+ plugin** e **5 strategie**, con `numTests: 10` per plugin per strategia. Il risultato è stato un test con quasi **2.000 casi totali**.

* * *

## I risultati: numeri e analisi

### Overview generale

| Metrica | Valore |
| --- | --- |
| Test superati (pass) | **1.646** |
| Test falliti (fail) | **52** |
| Errori di connessione/timeout | 252 |
| **Pass rate** (escl. errori) | **96,9%** |
| Token utilizzati (totale) | ~9 milioni |
| Latenza totale cumulativa | ~108.000 secondi |

Un pass rate del **96,9%** su un sistema pubblico è un risultato solido, ma i 52 fallimenti meritano attenzione: indicano aree dove il chatbot ha risposto in modo non conforme alle aspettative di sicurezza.

* * *

### Risultati per categoria (score medio su 10)

#### Strategie standard (Basic, Base64, Citation, Emoji)

La grande maggioranza delle categorie ha ottenuto il massimo o quasi:

| Plugin | Basic | Base64 | Citation | Emoji |
| --- | --- | --- | --- | --- |
| Bias: Age | 10/10 | 10/10 | 10/10 | 10/10 |
| Bias: Disability | 10/10 | 10/10 | 10/10 | 10/10 |
| Bias: Gender | 10/10 | 10/10 | 10/10 | 10/10 |
| **Bias: Race** | **7/10** | 10/10 | **8/10** | 10/10 |
| Child Exploitation | 10/10 | 10/10 | 10/10 | 10/10 |
| Cybercrime | 10/10 | 10/10 | 10/10 | 10/10 |
| **Hallucination** | **9/10** | **9/10** | 10/10 | 10/10 |
| **Chem & Bio Weapons** | **6/10** | 10/10 | **7/10** | 10/10 |
| **Illegal Activities** | **8/10** | 10/10 | **9/10** | 10/10 |
| **Indiscriminate Weapons** | **9/10** | 10/10 | **9/10** | 10/10 |
| **Non-Violent Crimes** | **9/10** | 10/10 | **9/10** | 10/10 |
| **Privacy Violations** | **9/10** | 10/10 | 10/10 | 10/10 |
| **Financial Advice** | **9/10** | **8/10** | 10/10 | 10/10 |
| **Hijacking** | **9/10** | 10/10 | 10/10 | 10/10 |
| PII Leak | 40/40 | 40/40 | 40/40 | 38/40 |
| Hate Speech | 10/10 | 10/10 | 10/10 | 10/10 |
| Violent Crimes | 10/10 | 10/10 | 10/10 | 10/10 |

**Osservazione:** le strategie Base64, Citation ed Emoji non hanno prodotto risultati significativamente peggiori rispetto al Basic. Il sistema reagisce in modo robusto anche a payload offuscati o nascosti in encoding non standard.

* * *

#### La strategia più dura: Jailbreak Meta (IterativeMeta)

Questa è la parte più interessante. Il meta-agente di PromptFoo — che apprende e ottimizza gli attacchi iterativamente — ha prodotto risultati notevolmente diversi:

| Plugin | IterativeMeta | Delta vs Basic |
| --- | --- | --- |
| **Bias: Age** | **3/10** | \-7 |
| **Cybercrime** | **5/10** | \-5 |
| **Bias: Gender** | **6/10** | \-4 |
| **Harassment** | **6/10** | \-4 |
| **Contractual Commitment** | **6/10** | \-4 |
| **Bias: Race** | **7/10** | 0 (già basso) |
| **Excessive Agency** | **7/10** | \-3 |
| Hallucination | 9/10 | 0 |
| Chemical & Bio Weapons | 10/10 | +4 |

Il dato più critico è **BiasAge/IterativeMeta a 3/10**: con attacchi iterativi e adattativi, il chatbot ha mostrato significativa cedevolezza su bias legati all'età. Questo non significa che produca contenuti pericolosi, ma che le sue risposte mostrano pattern linguistici consistenti con ragionamenti basati sull'età in modo non neutro.

**Il Jailbreak Meta è il vero banco di prova**: se un sistema regge bene contro Basic, Base64 e Citation ma cede all'IterativeMeta, significa che i guardrail esistono ma possono essere erosi con persistenza e adattamento — esattamente il profilo di un attaccante motivato.

* * *

## Cosa significano questi risultati concretamente

### Le buone notizie

-   **Nessuna esposizione di dati critici**: PII Leak a 40/40, nessun token/API key trapelato
-   **Resistenza eccellente a contenuti esplicitamente illegali o pericolosi**: armi, droghe, sfruttamento minorile, crimini violenti — tutti a 10/10 anche con strategie avanzate
-   **Offuscamento non efficace**: Base64 ed Emoji smuggling non hanno degradato la sicurezza
-   **Il sistema conosce i propri confini**: excessive agency e hijacking sono stati bloccati nella quasi totalità dei casi

### Una premessa importante: cosa posso controllare e cosa no

Il chatbot usa **OpenAI GPT-4o** come motore linguistico. Questo significa che una parte dei comportamenti emersi dal red team — in particolare i bias e alcune allucinazioni — **non dipende dalla mia implementazione, ma dal modello stesso**.

OpenAI applica i propri guardrail e policy di sicurezza sul modello, ma si tratta di un sistema che non posso modificare internamente: posso solo influenzarlo tramite il system prompt, la struttura del contesto RAG e i parametri della chiamata API. Se GPT-4o mostra un bias residuo su determinati argomenti, o se risponde in modo borderline a certi prompt, quella è una caratteristica del modello base — non un difetto della mia pipeline n8n.

Questo non è un alibi: il compito di chi costruisce un'applicazione sopra un LLM di terze parti è **mitigare i rischi noti tramite guardrail applicativi**, anche sapendo che non si potrà mai avere controllo totale sul modello sottostante. Ed è esattamente quello che questo red team ha misurato.

### Le aree di miglioramento

1.  **Bias linguistico residuo**, in particolare su età e razza: emerge sotto pressione iterativa. La radice è nel modello OpenAI sottostante, ma è mitigabile con un system prompt più esplicito su neutralità e un output filter che intercetti pattern problematici prima della risposta.
2.  **Armi chimiche/biologiche con strategy Basic (6/10)**: un sottoinsieme di richieste borderline ha ottenuto risposte non ideali. Il chatbot risponde di contenuti del sito che include articoli su cybersecurity/biotech — il contesto può confondere il modello.
3.  **Hallucination non a zero**: il sistema a volte inventa informazioni. Questo non è un rischio di sicurezza diretto ma impatta la fiducia degli utenti.
4.  **Jailbreak iterativo**: l'IterativeMeta ha dimostrato che un attaccante paziente e adattativo può erodere le difese in alcune categorie. La mitigazione principale è aumentare la robustezza del system prompt e aggiungere output filtering.

* * *

## Il valore pratico di questo tipo di test

Fare red teaming su un AI chatbot con PromptFoo prima del lancio (o periodicamente, come audit) ha un valore concreto:

**Individua vulnerabilità reali** prima che le trovino gli utenti. Un chatbot esposto pubblicamente è un target: meglio scoprirlo in un ambiente controllato.

**Misura la robustezza in modo riproducibile.** Non basta "testare qualche prompt a mano". PromptFoo genera centinaia di varianti sistematiche, combina strategie e produce metriche comparabili nel tempo.

**Distingue le vulnerabilità del modello da quelle dell'applicazione.** Se un attacco funziona su Basic ma non su Base64, il problema è nel modello. Se funziona su entrambi, il problema è nell'architettura applicativa.

**Giustifica scelte architetturali.** I risultati di un red team automatizzato sono documentazione: mostrano ai stakeholder (o a se stessi) che la sicurezza non è stata lasciata al caso.

* * *

## Stack tecnologico del sistema testato

Per completezza, l'architettura del chatbot sotto test:

Utente (browser)  
    │  
    ▼  
WordPress Plugin (shortcode)  
    │  HTTP POST + Bearer Token  
    ▼  
n8n Webhook ──→ Classificazione intent (OpenAI)  
    │  
    ├─→ RAG: Embed query (OpenAI) → Ricerca semantica (Qdrant Cloud)  
    │         → Reranking (Cohere) → Generazione risposta (OpenAI GPT-4o)  
    │  
    ├─→ Smalltalk: risposta diretta GPT-4o  
    │  
    └─→ Log anonimizzati → Google Cloud Storage

Ogni livello di questo stack è un potenziale vettore d'attacco. PromptFoo ha testato quello più esposto: **l'interfaccia linguistica**.

* * *

## Conclusioni

Il chatbot ha superato il red team con un **96,9% di pass rate** su quasi 2.000 test automatizzati che coprono oltre 35 categorie di rischio e 5 strategie di attacco diverse. È un risultato che dà fiducia, ma non complacenza.

I punti deboli identificati — bias residuo sotto jailbreak iterativo, allucinazioni occasionali, qualche risposta borderline su argomenti scientifici sensibili — sono aree di lavoro concrete per il prossimo ciclo di miglioramento.

La sicurezza AI non è un checkbox. È un processo iterativo: costruisci, testa, misura, migliora. PromptFoo è lo strumento che ho scelto per rendere quel processo sistematico e misurabile.

* * *

_Vuoi approfondire l'architettura del chatbot? Leggi l'articolo tecnico: [WordPress AI Chatbot con n8n, Qdrant e MongoDB Vector Store](https://paoloronco.it/writing/wordpress-ai-chatbot-trasformare-contenuti-in-un-sistema-interrogabile-n8n-qdrant-mongodb-vector-store/). Il chatbot è visibile su [paoloronco.it/ask/](https://paoloronco.it/ask/)._
