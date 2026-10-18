---
title: "AWS AI SOC Analyzer"
summary: "Laboratorio di triage SOC assistito da AI: n8n invia un alert a un'API AWS protetta e riceve un'analisi strutturata da Bedrock."
category: "security"
stack: ["Splunk", "n8n", "AWS Lambda", "API Gateway", "Bedrock", "IAM"]
problem: "Volevo imparare AWS con un caso d'uso vicino al mio lavoro: aggiungere contesto agli alert SOC senza affidare a un LLM le decisioni di sicurezza."
solution: "Ho collegato n8n a un'API Gateway autenticata con IAM; Lambda normalizza l'alert, interroga Nova 2 Lite su Bedrock e valida la risposta JSON."
outcome: "V1 verificata da n8n ad AWS e ritorno con un alert SSH di esempio; l'integrazione del webhook Splunk reale resta il passo successivo."
featured: false
order: 12.5
draft: false
links:
  - label: "Repository GitHub"
    href: "https://github.com/paoloronco/aws-ai-soc-analyzer"
  - label: "Leggi l'articolo"
    href: "https://paoloronco.it/writing/aws-ai-soc-analyzer-imparare-aws-con-un-progetto-soc/"
---

## Architettura e confini

Nel percorso previsto, Splunk produce l'alert, n8n lo invia con una richiesta firmata SigV4, API Gateway espone `POST /analyze` e Lambda chiama Bedrock con il proprio ruolo IAM. n8n riceve gravità, confidenza, evidenze e azioni suggerite in un JSON validato.

La V1 usa un workflow n8n avviato manualmente e uno schema di input orientato agli eventi SSH. L'analisi del modello resta un supporto all'analista; le decisioni operative richiedono regole deterministiche e revisione umana.
