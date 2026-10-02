---
title: "AWS AI SOC Analyzer: learning AWS by building alert triage"
description: "How I used a €100 AWS credit to connect n8n, API Gateway, Lambda and Bedrock in a SOC lab, and what IAM, real errors and AI limitations taught me."
pubDate: 2026-10-02
tags: ["AWS", "cybersecurity", "SOC", "AI", "n8n"]
draft: false
---

I had a €100 promotional AWS credit and wanted to use it to understand how Amazon's cloud services work in practice. Instead of following an isolated tutorial, I chose a problem close to my cybersecurity work: **making the first triage of a SOC alert easier to read**.

That became [AWS AI SOC Analyzer](https://github.com/paoloronco/aws-ai-soc-analyzer), a lab project that adds an AWS component to a Splunk and n8n flow already present in my homelab. My goal was not an autonomous analyst. I wanted to submit an alert, have a model examine it, and return structured context to n8n for a human analyst to verify.

## From my lab to AWS

In the intended flow, Splunk produces an alert and n8n forwards it to a protected endpoint. API Gateway receives the request, Lambda normalizes the input and calls Amazon Bedrock through the Converse API. Amazon Nova 2 Lite proposes a triage response, which Lambda checks before returning it to n8n.

```text
Splunk → n8n → API Gateway → Lambda → Bedrock / Nova 2 Lite
                  ↑                              ↓
             signed request                JSON analysis
                  └────────── n8n ←─────────────┘
```

The response includes severity, confidence, a summary, evidence, possible MITRE ATT&CK references, recommended actions and a notification suggestion. These fields support orchestration and an analyst's investigation; they are not autonomous response decisions.

**The current version is a V1 lab.** I verified the full path using a manually triggered n8n workflow and a sample SSH alert. Connecting the live Splunk webhook to this new AWS path is still a next step. The [project tutorial](https://github.com/paoloronco/aws-ai-soc-analyzer/blob/main/docs/tutorial.md) separates what has been tested from what remains to be integrated.

## What building it taught me

The most useful lessons came from real failures during implementation.

- **Cost:** I created an AWS Budget before using Lambda and Bedrock. A promotional credit makes experimentation easier, but a budget sends alerts rather than enforcing a hard spending cap.
- **Identity and permissions:** n8n signs requests with AWS Signature Version 4 and only has `execute-api:Invoke` permission for `POST /analyze`. Lambda uses its own execution role for CloudWatch logs and Bedrock calls. These are separate identities and trust boundaries.
- **Models and regions:** my first Nova 2 Lite call failed because I used the model ID directly. This invocation required an *inference profile*; switching to `us.amazon.nova-2-lite-v1:0` fixed it.
- **Timeouts and routes:** Lambda then hit its initial three-second timeout, which I raised to thirty seconds. A later `404` came from calling the API root instead of the configured `POST /analyze` route.
- **Model output:** asking for JSON does not create a reliable API contract. Lambda strips a possible Markdown code fence, parses the response and checks its required fields, types and values before returning it.

The [repository tutorial](https://github.com/paoloronco/aws-ai-soc-analyzer/blob/main/docs/tutorial.md) records these steps. The code and a sanitized n8n workflow show how the components fit together.

## Where the AI stops

In early tests, the model proposed an incorrect MITRE mapping and assumptions that the alert did not support. I tightened the prompt to rely on supplied evidence and treated its output as data to validate. Schema validation prevents malformed responses from passing through the flow, but **it cannot prove that a plausible assessment is correct**.

For that reason, V1 assists triage. It does not replace detection rules, notification policy or human review. Operational use will also need deterministic guardrails in n8n so a high-priority alert cannot disappear solely because the model returns `notify: false`.

## Next steps

The technical path from n8n through AWS and back works. I now want to connect the live Splunk webhook, replace the SSH-oriented input with a more general alert schema and narrow the Bedrock permissions. Defining the infrastructure in Terraform would also make the lab easier to recreate and remove.

The code, examples, architecture and lessons are in the [AWS AI SOC Analyzer GitHub repository](https://github.com/paoloronco/aws-ai-soc-analyzer). There is also a [project case file](/en/projects/aws-ai-soc-analyzer/) on this site.
