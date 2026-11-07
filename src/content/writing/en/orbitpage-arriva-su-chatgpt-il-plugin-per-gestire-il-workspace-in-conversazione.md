---
title: "OrbitPage comes to ChatGPT: manage your website through conversation"
description: "The OrbitPage app for ChatGPT connects AI to your workspace: inspect context, prepare edits and interact with your website through MCP and OAuth, with scoped access and review."
pubDate: 2026-09-16
tags: ["OrbitPage", "ChatGPT", "AI", "MCP", "OpenAI", "SaaS"]
draft: false
---

**OrbitPage is now available directly in ChatGPT.** I built an integration that connects your workspace to a conversation, allowing AI to interact with supported platform features without having to return to the dashboard for every task.

OrbitPage is a visual website builder for multi-page sites, portfolios, landing pages and other digital presences. The ChatGPT app adds another way to work: **describe what you want to achieve in natural language**.

**[Open OrbitPage in ChatGPT](https://chatgpt.com/plugins/plugin_asdk_app_6a72f9db2440819182e2a20ea276ce9b?q=orbitpage)**

## What can you do with OrbitPage in ChatGPT?

After connecting your account and authorizing a workspace, you can use the operations OrbitPage exposes to the integration. For example, you can ask ChatGPT to **inspect page settings, prepare content or design updates and help review changes** before applying them in supported workflows.

This is not just a chat that generates text for you to copy manually: ChatGPT can call application tools connected to your workspace. Actual capabilities depend on the tools exposed, permissions and authorized context.

The dashboard remains available for visual editing and more detailed configuration. The app is a complementary interface, especially useful when explaining a goal feels easier than finding a particular setting.

## How the connection works

The integration uses **MCP (Model Context Protocol)** to expose a defined set of OrbitPage tools to ChatGPT. Account connection uses **OAuth** authorization scoped to a particular workspace.

ChatGPT does not receive unrestricted account access: it can only use exposed and permitted operations. Authentication, authorization and validation remain enforced server-side, and access can be revoked.

## AI proposes, you stay in control

A central principle behind OrbitPage AI and its conversational integrations is **review-first**. In supported editing flows, AI prepares a structured proposal that can be reviewed before application. **Changing a workspace and publishing the result are separate steps.**

This makes it possible to benefit from AI speed without automatically turning a misunderstanding into a public-facing change.

## Why I built this integration

I wanted ChatGPT to be more than an external assistant that talks *about* OrbitPage: it should become an interface for working *with* OrbitPage.

The app builds on the platform's existing API, MCP, OAuth and AI capabilities. The dashboard, Automation REST API, built-in assistant and ChatGPT provide different ways to work with the same product, governed by consistent application permissions.

It is a practical step toward software where **interaction can start with user intent**, not only menus, buttons and forms.

---

Want to try it? **[Connect OrbitPage to ChatGPT](https://chatgpt.com/plugins/plugin_asdk_app_6a72f9db2440819182e2a20ea276ce9b?q=orbitpage)** or **[explore OrbitPage](https://orbitpage.com/)**. For the complete feature overview, see the **[project page](/en/projects/orbitpage)**.
