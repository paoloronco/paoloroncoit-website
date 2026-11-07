---
title: "AWS AI SOC Analyzer: Exploring Security Alert Triage with Amazon Bedrock"
description: "A hands-on AWS experiment combining Lambda, API Gateway, Bedrock and n8n to explore AI-assisted security alert triage, its architecture, lessons learned and limitations."
pubDate: 2026-10-02
updatedDate: 2026-11-07
tags: ["AWS", "cybersecurity", "SOC", "AI", "n8n"]
draft: false
---

Generative AI is finding increasingly interesting applications in cybersecurity, particularly in workflows that involve interpreting large amounts of information and identifying what deserves attention.

Security Operations is one of the areas that interests me most. Analysts often need to review alerts, correlate events, examine evidence and determine which investigations should come next.

That curiosity led me to build [AWS AI SOC Analyzer](https://github.com/paoloronco/aws-ai-soc-analyzer), a personal experiment combining AWS services, generative models and security automation.

**The goal was not to build a production-ready SOC platform or replace a security analyst.** I wanted to learn AWS through a practical use case and explore whether an AI model could turn alert data into an initial, structured assessment.

The result is a working first version, with limitations that still need to be addressed. Along the way, I gained hands-on experience with Lambda, API Gateway, IAM, CloudWatch and Amazon Bedrock.

## From a SIEM alert to AI-assisted analysis

In my homelab, I already use Splunk to collect and analyze security logs, with n8n handling some automation tasks, including notification routing.

The basic workflow is straightforward: Splunk detects an event, and n8n can receive the alert, process it and deliver a notification.

The interesting question is what happens in between.

An alert provides technical fields, but not necessarily an immediate interpretation. An analyst still has to understand the context, assess the available evidence and decide what to investigate.

I wanted to explore adding an AI component that could provide an initial assessment **without changing the existing detection logic or automatically taking response actions**.

The model is asked to produce:

- A preliminary severity assessment.
- A concise summary of the event.
- Evidence supporting the assessment.
- Potentially relevant MITRE ATT&CK techniques.
- Recommended follow-up checks for an analyst.

These are **model-generated suggestions, not automatically verified findings**.

## Project architecture

For this experiment, I chose a serverless architecture rather than deploying another virtual machine or managing dedicated inference infrastructure.

| Service | Responsibility |
| --- | --- |
| n8n | Alert preparation and orchestration |
| Amazon API Gateway | Authenticated HTTPS endpoint |
| AWS Lambda | Input processing and output validation |
| Amazon Bedrock | Managed generative AI runtime |
| Amazon Nova 2 Lite | AI-assisted alert analysis |
| AWS IAM | Authentication and authorization |
| Amazon CloudWatch | Execution logs and troubleshooting |

The intended architecture is:

```text
Splunk → n8n → API Gateway → Lambda → Bedrock → Lambda → n8n
```

There is, however, an important distinction between the intended architecture and what I have actually tested.

```text
Existing homelab: Splunk → n8n → notifications
Verified V1: manual n8n trigger → API Gateway → Lambda → Bedrock → Lambda → n8n
Potential next step: Splunk → n8n → AWS → n8n → routing and notifications
```

**The real Splunk webhook is not yet connected to the new AWS service.** The verified end-to-end test covers sending a sample alert from n8n, processing it through AWS and returning the result to n8n.

This is a proof of concept, not an operational SOC integration.

## How the analysis works

For the first test, I used a simulated alert involving repeated failed SSH authentication attempts.

The payload includes the detection name, affected host, source IP address, number of attempts, targeted accounts and time window.

Here is a simplified example:

```json
{
  "alert_name": "SSH Brute Force",
  "host": "securitylab",
  "source_ip": "203.0.113.10",
  "failed_attempts": 34,
  "target_accounts": ["root", "admin"],
  "time_window": "10 minutes",
  "successful_authentication": false
}
```

The IP address is reserved for documentation, and the data does not describe a real incident. The repository also includes a [sample alert payload](https://github.com/paoloronco/aws-ai-soc-analyzer/blob/main/examples/ssh-brute-force-alert.json).

n8n sends the JSON to API Gateway's `POST /analyze` route. The request is authenticated with AWS Signature Version 4 and IAM authorization.

Lambda then validates and normalizes the input before invoking Amazon Nova 2 Lite through the Amazon Bedrock Converse API.

The prompt asks the model to base its assessment on the supplied evidence and avoid inventing facts that are not present in the alert. The model does **not** independently query Splunk, inspect authentication logs or consult threat intelligence sources.

The expected output is structured JSON containing fields such as `severity`, `confidence`, `summary`, `mitre`, `evidence`, `recommended_actions` and `notify`.

Lambda parses the response and validates its required structure and values before returning the analysis to n8n. Invalid inputs or malformed model outputs are handled as errors instead of being presented as usable assessments.

The [Lambda implementation](https://github.com/paoloronco/aws-ai-soc-analyzer/blob/main/lambda/lambda_function.py), [sanitized n8n workflow](https://github.com/paoloronco/aws-ai-soc-analyzer/blob/main/n8n/aws-ai-soc-analyzer.sanitized.json) and [illustrative analysis output](https://github.com/paoloronco/aws-ai-soc-analyzer/blob/main/examples/example-analysis.json) are available in the repository.

**Schema validation improves reliability, but it does not prove that the model's security conclusions are correct.**

## IAM and integration security

One of the most valuable parts of this project was learning how AWS identities and permissions fit together.

The architecture separates two identities with different responsibilities.

The IAM identity used by n8n is authorized to invoke the specific API Gateway route. It does not need permission to call Bedrock directly.

Lambda has its own execution role, which grants access to the required Bedrock invocation and CloudWatch logging capabilities. No static AWS key needs to be embedded in the Lambda source code.

n8n stores the caller's credentials in its credential management system rather than in the exported workflow. API Gateway uses `AWS_IAM` authorization instead of exposing an anonymous inference endpoint.

This helped me understand an important distinction: **who is allowed to call the API** and **what the function is allowed to do after invocation** are separate security boundaries.

These choices are a reasonable starting point for a lab, but they do not make the architecture production-ready. For example, the first version's Bedrock resource permissions are still broader than I would want in a hardened deployment.

## Problems encountered during development

Troubleshooting was one of the most useful parts of the experiment. It exposed several practical details that are easy to miss when studying individual AWS services in isolation.

### Bedrock model IDs and inference profiles

My initial attempt to invoke Nova 2 Lite directly resulted in a `ValidationException`.

I had to distinguish the model identifier from the inference profile required for the invocation method I was using.

The project uses the inference profile `us.amazon.nova-2-lite-v1:0`.

### Lambda timeouts

Another issue was Lambda's initial three-second timeout.

The model invocation needed more time, so the function terminated before the analysis could complete.

CloudWatch helped me identify the execution timeout rather than incorrectly attributing the failure to Bedrock. I increased the timeout to thirty seconds for the experiment.

### API routes and authentication

I also encountered HTTP errors caused by calling the wrong route and sending requests without the required signature.

A `404` resulted from using the wrong path: the API exposes `POST /analyze`, not the root endpoint. An unsigned request to the protected route returned `403`.

These were simple problems, but useful lessons in how API Gateway routing and IAM authorization work in practice.

### Unpredictable model output

In some tests, the model wrapped its JSON response inside Markdown code fences. An early response also included an incorrect MITRE ATT&CK mapping.

I added parsing and output validation and tightened the prompt to emphasize the evidence provided.

The broader lesson is that **well-formed output is not the same thing as a correct analysis**. A structured response can still contain inaccurate or unsupported conclusions.

### Cost awareness

I also created an AWS Budget before running the experiments. Even a small lab benefits from cost monitoring and clear visibility into billable resources.

A budget provides alerts at configured thresholds; it does not automatically prevent spending.

I documented the implementation challenges in the [technical tutorial](https://github.com/paoloronco/aws-ai-soc-analyzer/blob/main/docs/tutorial.md) and [lessons learned](https://github.com/paoloronco/aws-ai-soc-analyzer/blob/main/docs/lessons-learned.md).

## Results and limitations of V1

The main result is that a sample security alert can pass through an authenticated AWS endpoint, be processed by Lambda and Bedrock, and return to n8n as structured data.

That validates the integration path. It does **not** yet establish that the system is effective in a real SOC.

I have not benchmarked the solution against a representative incident dataset or measured a reduction in analyst triage time.

The current input schema is also designed primarily around SSH-related events. Other Splunk detections may use very different fields and structures.

Possible next steps include:

- Introducing a generic alert schema for multiple detection types.
- Connecting the real Splunk webhook to the AWS workflow.
- Testing with broader datasets and more varied scenarios.
- Adding deterministic controls around notification decisions.
- Tightening IAM permissions and improving error handling.
- Evaluating costs and performance under realistic workloads.
- Optionally enriching alerts with external threat intelligence.

These are potential directions rather than a committed production roadmap.

## What role can AI play in Security Operations?

This experiment reinforced my interest in generative AI as a supporting component in Security Operations.

A model can help summarize available information, organize evidence and suggest what an analyst should check next.

That does not mean it can replace detection rules, incident response procedures or professional judgment.

Model-generated assessments can be wrong, unsupported or misleading. In any future operational implementation, I would keep the model's recommendations separate from actual response decisions, using deterministic controls and human approval for sensitive actions.

Data handling also deserves attention. A real deployment would need to consider data classification, minimization, logging, retention and compliance requirements before forwarding security telemetry to a managed AI service.

## Conclusions

AWS AI SOC Analyzer started as a personal learning experiment: a way to understand AWS by building something related to a real cybersecurity use case.

It gave me hands-on experience with services I previously knew mainly in theory and helped me understand how to connect, secure and troubleshoot them.

The most interesting part was not simply getting an answer from an AI model. It was building the full path: authentication, API routing, serverless processing, inference, validation and delivery back to the automation workflow.

For now, **this remains an experimental proof of concept**, with no production deployment and no evidence yet to claim operational SOC effectiveness.

It has nevertheless been a useful exercise in both the AWS ecosystem and the possibilities—and limitations—of generative AI applied to cybersecurity.

## GitHub repository

The project repository contains the Lambda Python code, IAM policies, a sanitized n8n proof-of-concept workflow, example JSON payloads and technical documentation.

**[AWS AI SOC Analyzer — GitHub](https://github.com/paoloronco/aws-ai-soc-analyzer)**

You can also explore the [project case study](/en/projects/aws-ai-soc-analyzer/) on this site.
