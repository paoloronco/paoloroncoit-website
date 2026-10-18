---
title: "OrbitPage comes to ChatGPT: manage your workspace through conversation"
description: "I brought OrbitPage into ChatGPT: from AI conversations to controlled workspace management, using OAuth, MCP and a review-first approach."
pubDate: 2026-09-16
tags: ["OrbitPage", "ChatGPT", "AI", "MCP", "OpenAI", "SaaS"]
draft: false
---
OrbitPage started as a more flexible alternative to traditional link-in-bio pages, but over time it has become something much broader: a SaaS and open-source product with multi-page sites, a shop, newsletters, analytics, digital menus, APIs, SEO tools, privacy management and AI features.

One of my goals throughout this evolution was to keep artificial intelligence from remaining a secondary feature inside the dashboard. I wanted it to become an **operational interface to the product**, while retaining control, permissions and a review of changes.

That work led to the **OrbitPage plugin for ChatGPT**, now available directly in ChatGPT.

**[Open OrbitPage in ChatGPT](https://chatgpt.com/plugins/plugin_asdk_app_6a72f9db2440819182e2a20ea276ce9b?q=orbitpage)**

## From ChatGPT to your OrbitPage workspace

The idea is simple: instead of opening the dashboard and manually looking for each setting, I can start with a conversation.

After connecting an OrbitPage account, ChatGPT can interact with the capabilities I chose to expose from the product. The goal is to add a **conversational** way to use OrbitPage alongside the dashboard.

This brings AI reasoning and workspace operations into the same flow, while maintaining a clear separation between what the model proposes and what is actually applied.

It follows the same direction I had already taken when designing OrbitPage AI and its MCP integration: the dashboard, APIs and AI interface are different ways to interact with the same system.

## Why a ChatGPT plugin

Integrating OrbitPage directly into ChatGPT primarily changes the entry point.

A SaaS application normally requires users to learn its interface: open the dashboard, find the right section, edit the fields and complete the product's workflow.

With a conversational interface, the process can start from the user's intent.

I can describe what I want to achieve in natural language and let ChatGPT use the operations provided by OrbitPage to turn that intent into structured actions.

For me, this is one of the most interesting aspects of integrating AI with traditional software: a model can become an interaction layer over real APIs and functions, beyond generating text.

## Access with defined boundaries

When connecting an LLM to a real application, getting it to perform operations is only part of the work. It also means deciding **which operations to make available, with which permissions and within which limits**.

OrbitPage uses an OAuth-based authorization model and keeps the connection associated with the authorized workspace. The integration therefore gives ChatGPT access within that scope, rather than general access to the account or infrastructure.

The available capabilities are those that OrbitPage intentionally exposes to the integration, and access can be revoked.

This principle was already important in OrbitPage's MCP integration, and becomes even more relevant when the integration is made available directly to ChatGPT users.

## The review-first principle

Since introducing AI into the dashboard, I have avoided a model where a natural-language request immediately changes a public page without review.

The workflow I chose is **review-first**.

The AI interprets the request and prepares the operation. The system keeps the suggestion, the workspace change and publication separate. Where supported, users can check what is about to change before the action affects public content.

This is a UX detail and a security decision.

A language model can misunderstand a request, work with incomplete context or produce an unexpected result. Human review at sensitive points reduces the risk of automatically turning a model error into a real change.

## MCP, OAuth and an AI-native product

The plugin grew out of the wider product architecture.

Over the past few months, I have worked to make OrbitPage usable through several interfaces:

- the **dashboard**, for visual management;
- the **REST API**, for scripts, workflows and automations;
- **MCP**, for compatible AI clients and agents;
- **OrbitPage AI**, integrated directly into the product;
- now **ChatGPT**, as an additional conversational interface to the workspace.

The part I find most significant is the architecture that lets the same product be controlled through different interfaces while keeping identity, permissions and application logic consistent.

MCP has played an important role in this evolution because it exposes application capabilities to AI systems through an interface designed specifically for that interaction.

OAuth connects the user's identity and limits access without distributing credentials or static tokens inside the conversation.

## What development required

Bringing a SaaS feature into an AI interface requires thinking through aspects that a conventional UI often handles implicitly.

Operations need sufficiently structured inputs and outputs for a model to use them reliably. Errors must be understandable to both the application and the AI. Permissions must be checked on the server, independently of the model's instructions. Available actions also need to be specific enough to be useful without unnecessarily exposing internal product capabilities.

I approached the integration as an application interface with those requirements, beyond an AI demo.

This brought together **full-stack development, API design, OAuth, cybersecurity, AI engineering, MCP, cloud architecture and product design**.

## Another step in OrbitPage's evolution

When I started OrbitPage, its main purpose was to create a public page from blocks and links.

Today, the same workspace can manage content, pages, a shop, audiences, analytics, privacy, SEO, automations and AI integrations. The ChatGPT plugin adds another layer: the ability to interact with part of that system directly through a conversation.

It is also a practical experiment around a question I find increasingly relevant in software development: **how much of an application's interface will continue to consist of menus and forms, and how much could instead start from an intent expressed in natural language?**

OrbitPage will continue to have a complete dashboard. I do not see conversation as a universal replacement for traditional interfaces. For some tasks, however, describing the desired result and letting AI use authorized tools can make the interaction much more direct.

That is exactly the kind of integration I wanted to explore by building OrbitPage.

---

**[Try OrbitPage](https://orbitpage.com/) · [Open the OrbitPage plugin in ChatGPT](https://chatgpt.com/plugins/plugin_asdk_app_6a72f9db2440819182e2a20ea276ce9b?q=orbitpage) · [Explore the OrbitPage project](https://paoloronco.it/en/projects/orbitpage)**
