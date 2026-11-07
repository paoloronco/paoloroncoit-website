---
title: "Hermes Agent: Building a Personal AI Assistant with Self-Hosting, Memory and Security"
description: "My experience with Nous Research's Hermes Agent: a hybrid Proxmox, Linux and Windows architecture, persistent memory, AI tools and security considerations."
pubDate: 2026-11-07
tags: ["AI", "AI Agents", "self-hosting", "cybersecurity", "homelab"]
draft: false
---

Over the past few months, I have spent a lot of time experimenting with AI models, automation platforms and agents that can interact with real systems and applications. One of the most interesting distinctions is between using a language model in a conventional chat interface and working with an **AI agent** that can use tools, perform actions and retain context over time.

That is what led me to [Hermes Agent](https://github.com/NousResearch/hermes-agent), an open-source project from Nous Research. After setting it up in my personal infrastructure and experimenting with different tasks, it has become one of the projects in this space that I appreciate most.

Not because it is perfect or replaces every other AI assistant, but because it brings together memory, practical tools and architectural flexibility. There is, however, an essential caveat: **an agent with access to real systems needs a very different security model from a chatbot**.

This article covers my experience and the architecture at a conceptual level, without disclosing private homelab configurations.

## What makes Hermes interesting?

Hermes is a framework for AI assistants that can retain memory across sessions, use tools and interact with different environments. Depending on the integrations enabled, it can work with terminals, files, external services and reusable procedures.

The features I find particularly compelling include:

- **Persistent memory:** retaining useful information and retrieving it in later sessions.
- **Skills:** reusing operational knowledge and procedures.
- **Tool calling:** performing tasks through tools instead of merely suggesting actions.
- **Extensible integrations:** adding capabilities, including through MCP where supported.
- **Model flexibility:** working with cloud providers or compatible local inference endpoints.

The key architectural idea is separating the model interpreting a request from the environment managing memory, tools and actions. This can reduce dependence on a single AI provider, although the chosen model still needs to support reliable tool calling.

## My hybrid architecture

Rather than dedicating a new physical server to the experiment, I built on infrastructure I already had.

**Proxmox VE** hosts a dedicated Linux virtual machine for the agent environment. Virtualization makes it easier to organize resources and separate the runtime from other services, although it is not a security boundary to rely on by itself.

**Linux** provides the operational environment for Hermes and its configured tools. Keeping it separate from my everyday workstation helps with management, maintenance and experimentation.

**Windows** remains my main workstation, where I also use Hermes Desktop and local AI inference runtimes, including llama.cpp, making use of an NVIDIA GPU when appropriate.

The environments communicate through appropriately configured SSH connections. The GPU is not automatically passed through to the virtual machine: local inference runs on the workstation, and the agent can use a compatible endpoint when configured to do so.

This architecture allows the agent runtime, operational tools and AI models to evolve independently. More importantly, it provides a clearer way to reason about **trust boundaries**: which component can reach another, with what permissions, and for what purpose.

## Persistent memory: my favorite feature

Memory is one of the parts of Hermes that has impressed me most. When I repeatedly work on the same projects, not having to reconstruct the entire context every time makes the experience significantly more natural.

Skills are interesting for a similar reason: rather than treating every task as completely new, the agent can reuse structured knowledge and procedures.

That does not mean memory is infallible. It can be incomplete, outdated or simply wrong. Important information must remain verifiable, correctable and removable.

Memory is also a form of **data persistence**. Content, tool results and operational details may remain available after a session ends. Storage, access control, retention and deletion therefore deserve attention.

## From chatbot to operational agent

Tool calling fundamentally changes what an assistant can do. With the right permissions, an agent can read a file, inspect a log, prepare a change, execute a command and check the result.

In technical environments, this can support troubleshooting, configuration analysis, repository review, scripting and repetitive tasks. External integrations expand those possibilities, but also expand the attack surface.

I do not see Hermes as a universal replacement for n8n. Deterministic workflows are often the better choice for predictable, repeatable processes. Agents become interesting when a task requires interpretation, tool selection and less structured decision-making.

## Local and cloud models: choosing based on the task

I experiment with both local models and cloud services. Being able to choose different inference backends for different tasks is one of the advantages of this approach.

Local inference can provide more control over the environment and data, but **local does not automatically mean private or secure**. Logging, tools, integrations and outbound traffic still matter.

Cloud models may perform better on complex tasks. A hybrid setup lets me evaluate performance, cost, data sensitivity and tool compatibility without forcing the same choice on every workflow.

## Cybersecurity: the real boundary of autonomous agents

An agent that can read files, execute commands and connect to remote systems introduces real risks. A misunderstood instruction, a faulty command or a prompt-injection attack can have operational consequences. This is no longer just about an incorrect text response.

### Least privilege, not unlimited access

If the agent only needs to analyze logs, read-only access may be sufficient. If it needs to edit a project, it does not need unrestricted access to the filesystem. Remote systems should ideally use dedicated identities and narrowly scoped permissions.

SSH access and privileged commands require particular care. **A prompt saying “do not cause damage” is not a substitute for technical authorization controls.** Full administrative access should be avoided unless there is a narrowly justified need.

### Prompt injection and untrusted content

Web pages, files, repositories and tool responses may contain malicious instructions. An agent might mistake them for directions to follow, potentially attempting to read secrets or perform unauthorized operations.

Retrieved content should therefore be treated as **untrusted data**, not as authorized instructions. Approval steps are useful, but they must be backed by actual permission boundaries.

### Defense in depth

A cautious deployment should consider isolation for risky operations, dedicated identities, restricted network access, protected secrets, logging, updates and explicit approval for sensitive actions.

Third-party skills, plugins and MCP servers should also be reviewed before enabling them. Being publicly available does not make a component trustworthy.

## Using Hermes through Telegram: what needs protection?

Messaging integrations are convenient, but a bot that forwards instructions to an operational agent becomes a sensitive entry point.

For a potential Telegram integration, I would apply at least the following controls:

- **Identity allowlists:** explicitly authorize numeric Telegram user IDs rather than relying on display names.
- **Group restrictions:** avoid accepting sensitive commands from uncontrolled chats or participants.
- **Bot token protection:** keep credentials out of repositories and unprotected logs, and rotate them if compromised.
- **Separate privilege levels:** do not give a remote chat the same capabilities as an administrative session.
- **Controlled network exposure:** avoid unnecessarily exposing gateways and management interfaces.
- **Data minimization:** do not indiscriminately send secrets or sensitive information through a messaging platform.

These are recommended hardening principles, **not a claim that every control has already been implemented in my lab**.

## Lessons from the OpenClaw security discussion

The security of personal AI agents is not merely theoretical. The discussion around [OpenClaw](https://openclaw.ai/) and its [security information](https://openclaw.ai/security) illustrates why service exposure, permissions, dependencies and tools with operational access deserve scrutiny.

This does not mean Hermes necessarily shares the same vulnerabilities, or that every AI agent is inherently unsafe. It means this category of software needs an appropriate threat model.

The question is not only **“What can the agent do?”** but also **“What happens if it receives malicious instructions, makes a mistake or is used by someone who is not authorized?”**

## My assessment so far

After my initial hands-on experience, my opinion of Hermes is very positive. Persistent memory, tools and architectural flexibility are the features that have impressed me most.

I particularly like being able to treat it as a technical assistant that retains context and interacts with configurable environments, rather than as just another chat interface. Its open-source approach also makes it possible to inspect how it works and adapt it to specific needs.

I would not, however, install it and grant it unrestricted access to my systems. I prefer to introduce capabilities gradually, test their behavior and review permissions before expanding the agent's reach.

## Conclusions

Hermes Agent is one of the open-source personal AI assistant projects I most recommend exploring, especially for people interested in self-hosting, automation and IT infrastructure.

My hybrid architecture using Proxmox, Linux and Windows has allowed me to experiment with memory, tool calling and different AI models using resources I already had.

The most interesting challenge remains finding the right balance between **operational capability and control**. An agent becomes genuinely useful when it can act, but that is precisely why identity, authorization, isolation and supervision need to be part of the design from the beginning.

I plan to keep experimenting with Hermes through practical use cases and evaluating its benefits and limitations. So far, it is a project I genuinely enjoy using and one that deserves attention—with the appropriate safeguards.

## Resources

- [Hermes Agent — GitHub](https://github.com/NousResearch/hermes-agent)
- [Hermes Agent — Documentation](https://hermes-agent.nousresearch.com/docs)
- [OpenClaw — Security](https://openclaw.ai/security)
