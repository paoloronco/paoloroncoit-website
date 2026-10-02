---
title: "AWS AI SOC Analyzer: learning AWS by building alert triage"
description: "From my Splunk and n8n flow to an AWS V1: what it analyzes, how alerts pass through API Gateway, Lambda and Bedrock, and what I learned."
pubDate: 2026-10-02
updatedDate: 2026-10-02
tags: ["AWS", "cybersecurity", "SOC", "AI", "n8n"]
draft: false
---

I work in cybersecurity, and my homelab already had a flow where **Splunk detects security events and n8n routes notifications**. I wanted to see whether I could add a step between detection and notification that turns alert fields into useful first-pass context for an analyst: what happened, what evidence supports it, and what to check next.

I used that question to learn AWS by building [AWS AI SOC Analyzer](https://github.com/paoloronco/aws-ai-soc-analyzer). I brought experience with SIEM, automation and security, but had little hands-on experience assembling AWS services, configuring them and making them communicate under controlled permissions. This project joined a SOC problem I knew with cloud infrastructure I wanted to understand.

## Where I started and where the project fits

**Before:** Splunk could send alerts to n8n, which could route them to channels such as email or Telegram. An alert, however, often arrives as a set of fields: detection name, host, IP address, counters and time window. Someone still has to read and interpret those fields to understand the event.

**With this V1:** I added an AWS service that receives a sample alert from n8n and returns JSON analysis. It does not change Splunk's detection or take response actions. It offers an *assisted triage* step that n8n could use to present a summary and organize the next checks.

The existing lab, the completed test and a possible integration are different things:

```text
Existing lab flow: Splunk → n8n → notifications
Verified V1: manual n8n trigger → API Gateway → Lambda → Bedrock → Lambda → n8n
Possible integration: Splunk → n8n → AWS → n8n → routing and notifications
```

The live Splunk webhook is **not yet connected** to the new AWS path. The end-to-end test covers n8n, AWS services and the response back to n8n.

## What happens when an alert arrives

V1 uses a sample SSH login alert: a host, source IP, 34 failed authentications over ten minutes, multiple targeted accounts and no successful login indicated by the supplied data. It is a [sample payload](https://github.com/paoloronco/aws-ai-soc-analyzer/blob/main/examples/ssh-brute-force-alert.json), not a real incident documented in this article.

1. **n8n prepares and sends the alert.** In the test workflow, a manual trigger and an Edit Fields node build the JSON. The HTTP request to `POST /analyze` is signed with AWS Signature Version 4.
2. **API Gateway controls access.** The route requires `AWS_IAM` authorization, so it is not an anonymous endpoint that anyone can use to invoke the model.
3. **Lambda interprets the input.** The Python function reads the request body, normalizes the fields expected by V1 and rejects missing or incorrectly typed input. The schema is still SSH-oriented.
4. **Bedrock performs the analysis.** Lambda calls Amazon Nova 2 Lite through the Converse API and asks it to rely only on the supplied evidence. The model does not query Splunk, logs or threat intelligence on its own; it sees only the data passed to it.
5. **Lambda checks and returns the response.** The model proposes severity, confidence, a summary, possible MITRE ATT&CK techniques, evidence, recommended checks and a `notify` value. Lambda parses the JSON, checks required fields and values, and returns `alert`, `analysis` and metadata to n8n. Invalid requests and malformed model responses produce errors instead of apparently usable analysis. The [Lambda source](https://github.com/paoloronco/aws-ai-soc-analyzer/blob/main/lambda/lambda_function.py) shows that logic, and the [sanitized n8n workflow](https://github.com/paoloronco/aws-ai-soc-analyzer/blob/main/n8n/aws-ai-soc-analyzer.sanitized.json) shows the signed call.

For example, the repository's [illustrative output](https://github.com/paoloronco/aws-ai-soc-analyzer/blob/main/examples/example-analysis.json) has `medium` severity, SSH-related evidence and a recommendation to inspect authentication logs. It shows the expected **format and kind of assistance**, not a measurement of model accuracy.

## Securing the connection

One of the clearest lessons was separating two identities that are easy to confuse. The dedicated n8n IAM user can invoke only the intended API route; it does not need Bedrock access. Lambda uses its own execution role to write CloudWatch logs and call Bedrock; it does not keep an AWS key in the code. Caller credentials stay in n8n's credential store, and the public workflow export is sanitized.

This made IAM concrete for me: **who can enter the API** and **what the function can do after it starts** are different questions. The V1 Bedrock policy still has broad resource scope, documented in the repository, so this should not be described as a final production configuration.

## What I actually learned about AWS

The most important result for me was not getting a model response. It was understanding service boundaries while resolving real errors:

- **Regions and Bedrock:** calling Nova 2 Lite by its model ID directly produced a `ValidationException`. I had to distinguish that ID from the *inference profile* required for this invocation (`us.amazon.nova-2-lite-v1:0`).
- **Lambda and observability:** after fixing the model call, the function hit its initial three-second timeout. Reading the errors and CloudWatch logs helped me identify an execution limit, which I raised to thirty seconds, rather than assuming Bedrock was failing.
- **API routes and authorization:** a `404` came from calling the wrong path: the API exposes `POST /analyze`, not its root. An unsigned request to the protected route returns `403`. Those are different failures with different fixes.
- **Application contracts:** the model sometimes returned JSON inside a Markdown code fence and initially suggested an incorrect MITRE mapping. I added parsing and schema validation, and constrained the prompt to supplied evidence. Validation checks the format; **it cannot certify that the analysis is true**.
- **Cost and organization:** I set up an AWS Budget before testing and learned how account boundaries, regional resources, roles and policies affect even a small lab. A budget alerts at defined thresholds; it does not automatically stop spending.

This turned IAM, API Gateway, Lambda, Bedrock and CloudWatch from concepts I mostly knew in theory into a chain I configured, tested and debugged. I documented the failures and fixes in the [technical tutorial](https://github.com/paoloronco/aws-ai-soc-analyzer/blob/main/docs/tutorial.md) and [lessons learned](https://github.com/paoloronco/aws-ai-soc-analyzer/blob/main/docs/lessons-learned.md).

## What it gave me, and what remains unproven

Today the project demonstrates that I can send an alert from n8n to an authenticated AWS API and receive a structured result. The potential SOC value is **a first summary of evidence and suggested checks** inside the same flow that handles notifications. The value I have already gained is learning to design and cross those cloud boundaries with a use case close to my work.

I have not measured any reduction in triage time or validated behavior across different detections. The input is SSH-specific, the Splunk webhook does not yet feed this V1, and the demo workflow has no deterministic guardrails around `notify`. An LLM can also produce plausible but incorrect conclusions: operational decisions must remain with security rules and the analyst.

I have not decided whether this will become a service I use regularly, remain a lab, or when I will update the repository. For now it is a working proof of the n8n → AWS → n8n path and a documented hands-on exercise. The [code, examples and documentation are on GitHub](https://github.com/paoloronco/aws-ai-soc-analyzer), with a [project case file](/en/projects/aws-ai-soc-analyzer/) on this site.
