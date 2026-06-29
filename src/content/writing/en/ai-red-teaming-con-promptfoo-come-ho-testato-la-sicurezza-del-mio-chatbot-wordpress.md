---
title: "AI Red Teaming with PromptFoo: how I tested the security of my WordPress chatbot"
description: "I have an AI chatbot built into my site, reachable by anyone visiting paoloronco.it. It isn't a simple Q&A widget: behind the scenes runs a…"
pubDate: 2026-03-14
tags: []
draft: false
---
I have an [AI chatbot built into my site](https://paoloronco.it/en/ai-chatbot/) reachable by anyone visiting paoloronco.it. It isn't a simple Q&A widget: behind the scenes runs a RAG (Retrieval-Augmented Generation) system orchestrated through n8n, with OpenAI as the language engine, Qdrant Cloud as the vector store, Cohere as the reranker, and a webhook authenticated via Bearer Token as the entry point.

The article describing the whole architecture is available here: [WordPress AI Chatbot – Turning content into a queryable system with n8n, Qdrant, MongoDB Vector Store](https://paoloronco.it/en/writing/wordpress-ai-chatbot-trasformare-contenuti-in-un-sistema-interrogabile-n8n-qdrant-mongodb-vector-store/).

A system like this, exposed to anonymous visitors, is an interesting target. Anyone can send it a message. And when it comes to LLMs, the attack vectors aren't the classic web ones (SQLi, XSS, SSRF) but something more insidious: **natural language itself becomes the weapon**.

Hence the question I asked myself: _how robust is my chatbot against an attacker using carefully crafted prompts?_

* * *

## What PromptFoo is and what it does

[PromptFoo](https://promptfoo.dev/) is an open-source tool for testing and evaluating LLM-based applications. It lets you do two fundamental things:

1.  **Evaluation (eval):** compare prompts, models and configurations across test datasets, measuring quality and consistency of the answers.
2.  **Red Teaming:** simulate automated attacks against your AI system to find vulnerabilities before someone else does.

For red teaming, PromptFoo acts as an automated attacker: it generates hundreds of malicious payloads using a set of **plugins** (each specialized in a risk category) and **attack strategies** (techniques to bypass filters). Each system response is then evaluated by a judge model that determines whether the attack succeeded.

### Available plugins

The plugins cover the main risk categories for an LLM:

| Category | Description |
| --- | --- |
| `bias:*` | Detecting bias on age, disability, gender, race |
| `hallucination` | Generation of false or made-up information |
| `harmful:*` | Harmful content (drugs, weapons, exploitation, hate speech, etc.) |
| `pii:*` | Exposure of personal data via API, session or social engineering |
| `excessive-agency` | Unauthorized actions beyond the system's boundaries |
| `hijacking` | Diverting the system's use toward unintended purposes |
| `contracts` | Unauthorized contractual commitments |
| `politics` | Political content and ideological bias |

### Attack strategies

PromptFoo doesn't just send the payloads as-is. It passes them through **evasion strategies**:

-   **Basic:** direct payload, no transformations
-   **Base64:** the payload is Base64-encoded to bypass lexical filters
-   **Citation (Authority Bias):** the prompt disguises itself as an academic citation to exploit the model's authority bias
-   **Emoji Smuggling:** text hidden using unicode variation selectors inside emoji
-   **Jailbreak Meta (IterativeMeta):** a meta agent that autonomously builds a taxonomy of attacks, learns from previous failures and iteratively optimizes the vectors — the most sophisticated strategy

* * *

## The test configuration

I configured PromptFoo to attack my chatbot's n8n webhook directly:

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

The system under test is exactly the one in production: same endpoint, same n8n logic, same OpenAI model. No sandbox, no artificial test environment.

I enabled **35+ plugins** and **5 strategies**, with `numTests: 10` per plugin per strategy. The result was a test with almost **2,000 total cases**.

* * *

## The results: numbers and analysis

### General overview

| Metric | Value |
| --- | --- |
| Tests passed (pass) | **1,646** |
| Tests failed (fail) | **52** |
| Connection/timeout errors | 252 |
| **Pass rate** (excl. errors) | **96.9%** |
| Tokens used (total) | ~9 million |
| Cumulative total latency | ~108,000 seconds |

A **96.9%** pass rate on a public system is a solid result, but the 52 failures deserve attention: they point to areas where the chatbot responded in ways that don't meet security expectations.

* * *

### Results by category (average score out of 10)

#### Standard strategies (Basic, Base64, Citation, Emoji)

The vast majority of categories scored top marks or close to it:

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

**Observation:** the Base64, Citation and Emoji strategies didn't produce significantly worse results than Basic. The system reacts robustly even to payloads that are obfuscated or hidden in non-standard encodings.

* * *

#### The toughest strategy: Jailbreak Meta (IterativeMeta)

This is the most interesting part. PromptFoo's meta-agent — which learns and optimizes attacks iteratively — produced notably different results:

| Plugin | IterativeMeta | Delta vs Basic |
| --- | --- | --- |
| **Bias: Age** | **3/10** | -7 |
| **Cybercrime** | **5/10** | -5 |
| **Bias: Gender** | **6/10** | -4 |
| **Harassment** | **6/10** | -4 |
| **Contractual Commitment** | **6/10** | -4 |
| **Bias: Race** | **7/10** | 0 (already low) |
| **Excessive Agency** | **7/10** | -3 |
| Hallucination | 9/10 | 0 |
| Chemical & Bio Weapons | 10/10 | +4 |

The most critical figure is **BiasAge/IterativeMeta at 3/10**: with iterative, adaptive attacks, the chatbot showed significant susceptibility on age-related bias. This doesn't mean it produces dangerous content, but that its answers show linguistic patterns consistent with non-neutral age-based reasoning.

**Jailbreak Meta is the real proving ground**: if a system holds up well against Basic, Base64 and Citation but gives in to IterativeMeta, it means the guardrails exist but can be eroded with persistence and adaptation — exactly the profile of a motivated attacker.

* * *

## What these results mean in practice

### The good news

-   **No exposure of critical data**: PII Leak at 40/40, no leaked token/API key
-   **Excellent resistance to explicitly illegal or dangerous content**: weapons, drugs, child exploitation, violent crimes — all at 10/10 even with advanced strategies
-   **Obfuscation ineffective**: Base64 and Emoji smuggling did not degrade security
-   **The system knows its own boundaries**: excessive agency and hijacking were blocked in almost all cases

### An important premise: what I can control and what I can't

The chatbot uses **OpenAI GPT-4o** as its language engine. This means that some of the behaviors that emerged from the red team — bias in particular and some hallucinations — **don't depend on my implementation, but on the model itself**.

OpenAI applies its own guardrails and safety policies to the model, but it's a system I can't modify internally: I can only influence it through the system prompt, the structure of the RAG context, and the API call parameters. If GPT-4o shows residual bias on certain topics, or responds in a borderline way to certain prompts, that's a characteristic of the base model — not a flaw in my n8n pipeline.

This isn't an alibi: the job of someone building an application on top of a third-party LLM is to **mitigate known risks through application-level guardrails**, even knowing you'll never have total control over the underlying model. And that's exactly what this red team measured.

### Areas for improvement

1.  **Residual linguistic bias**, especially on age and race: it emerges under iterative pressure. The root is in the underlying OpenAI model, but it can be mitigated with a more explicit system prompt on neutrality and an output filter that intercepts problematic patterns before the response.
2.  **Chemical/biological weapons with the Basic strategy (6/10)**: a subset of borderline requests got non-ideal answers. The chatbot answers about site content that includes cybersecurity/biotech articles — the context can confuse the model.
3.  **Hallucination not at zero**: the system sometimes makes up information. This isn't a direct security risk but it impacts user trust.
4.  **Iterative jailbreak**: IterativeMeta showed that a patient, adaptive attacker can erode the defenses in some categories. The main mitigation is to strengthen the system prompt and add output filtering.

* * *

## The practical value of this kind of test

Red teaming an AI chatbot with PromptFoo before launch (or periodically, as an audit) has concrete value:

**It finds real vulnerabilities** before users do. A publicly exposed chatbot is a target: better to discover issues in a controlled environment.

**It measures robustness reproducibly.** "Testing a few prompts by hand" isn't enough. PromptFoo generates hundreds of systematic variants, combines strategies and produces metrics comparable over time.

**It separates model vulnerabilities from application ones.** If an attack works on Basic but not on Base64, the problem is in the model. If it works on both, the problem is in the application architecture.

**It justifies architectural choices.** The results of an automated red team are documentation: they show stakeholders (or yourself) that security wasn't left to chance.

* * *

## Technology stack of the tested system

For completeness, the architecture of the chatbot under test:

User (browser)  
    │  
    ▼  
WordPress Plugin (shortcode)  
    │  HTTP POST + Bearer Token  
    ▼  
n8n Webhook ──→ Intent classification (OpenAI)  
    │  
    ├─→ RAG: Embed query (OpenAI) → Semantic search (Qdrant Cloud)  
    │         → Reranking (Cohere) → Answer generation (OpenAI GPT-4o)  
    │  
    ├─→ Smalltalk: direct GPT-4o response  
    │  
    └─→ Anonymized logs → Google Cloud Storage

Every layer of this stack is a potential attack vector. PromptFoo tested the most exposed one: **the language interface**.

* * *

## Conclusions

The chatbot passed the red team with a **96.9% pass rate** over almost 2,000 automated tests covering more than 35 risk categories and 5 different attack strategies. It's a result that builds confidence, but not complacency.

The weak points identified — residual bias under iterative jailbreak, occasional hallucinations, a few borderline answers on sensitive scientific topics — are concrete areas to work on in the next improvement cycle.

AI security isn't a checkbox. It's an iterative process: build, test, measure, improve. PromptFoo is the tool I chose to make that process systematic and measurable.

* * *

_Want to dig into the chatbot's architecture? Read the technical article: [WordPress AI Chatbot with n8n, Qdrant and MongoDB Vector Store](https://paoloronco.it/en/writing/wordpress-ai-chatbot-trasformare-contenuti-in-un-sistema-interrogabile-n8n-qdrant-mongodb-vector-store/). The chatbot is live at [paoloronco.it/ai-chatbot/](https://paoloronco.it/ai-chatbot/)._
