---
title: "AWS AI SOC Analyzer"
summary: "AI-assisted SOC triage lab: n8n sends an alert to a protected AWS API and receives structured analysis from Bedrock."
category: "security"
stack: ["Splunk", "n8n", "AWS Lambda", "API Gateway", "Bedrock", "IAM"]
problem: "I wanted to learn AWS through a use case close to my work: adding context to SOC alerts without handing security decisions to an LLM."
solution: "I connected n8n to an IAM-authenticated API Gateway route; Lambda normalizes the alert, calls Nova 2 Lite on Bedrock and validates the JSON response."
outcome: "V1 verified from n8n through AWS and back with a sample SSH alert; connecting the live Splunk webhook is the next step."
featured: false
order: 12.5
draft: false
links:
  - label: "GitHub repository"
    href: "https://github.com/paoloronco/aws-ai-soc-analyzer"
  - label: "Read the article"
    href: "https://paoloronco.it/en/writing/aws-ai-soc-analyzer-imparare-aws-con-un-progetto-soc/"
---

## Architecture and boundaries

In the intended flow, Splunk produces the alert, n8n sends it in a SigV4-signed request, API Gateway exposes `POST /analyze`, and Lambda calls Bedrock using its own IAM role. n8n receives severity, confidence, evidence and suggested actions in validated JSON.

V1 uses a manually triggered n8n workflow and an SSH-oriented input schema. The model's analysis remains an aid to the analyst; operational decisions require deterministic rules and human review.
