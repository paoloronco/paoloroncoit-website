---
title: "OrbitPage"
summary: "Visual website builder available as managed SaaS and open-source self-hosted software, combining multi-page sites, design, SEO, analytics, AI and automation."
category: "tool"
stack: ["TypeScript", "React", "Next.js", "Node.js", "Firebase", "Cloudflare Workers", "R2", "Docker", "SQLite", "REST API", "OAuth", "MCP", "OpenAI", "Stripe", "GitHub Actions"]
problem: "Building and maintaining a complete web presence often requires separate CMS, hosting, marketing tools and integrations, adding technical and operational complexity."
solution: "OrbitPage combines visual editing, pages, publishing, content, analytics, integrations and AI in one workspace, as managed SaaS or self-hosted software."
outcome: "A website-building platform with an MIT-licensed open-source edition and a managed SaaS service built around a shared editor and renderer."
featured: true
order: 2
draft: false
links:
  - label: "Try OrbitPage"
    href: "https://orbitpage.com/"
  - label: "Open OrbitPage in ChatGPT"
    href: "https://chatgpt.com/plugins/plugin_asdk_app_6a72f9db2440819182e2a20ea276ce9b?q=orbitpage"
  - label: "Explore the documentation"
    href: "https://orbitpage.com/en-US/docs"
  - label: "View the open-source project on GitHub"
    href: "https://github.com/paoloronco/OrbitPage"
---

**OrbitPage is a visual website builder** for creating, customizing and publishing websites, landing pages, portfolios and sites for professionals or local businesses. What started as a link-in-bio idea has grown into a multi-page product combining content, publishing, growth tools, automation and AI without requiring users to edit code.

The project offers a **managed SaaS service** and an **MIT-licensed, self-hosted open-source edition**. They share core editing and rendering components while maintaining distinct infrastructure and capabilities.

**My role:** concept, product design, full-stack development, cloud architecture, cybersecurity, AI engineering, DevOps and product management.

## One editor, many kinds of websites

The block-based editor combines text, images, videos, links, contact details, social profiles, maps, events, embeds and calls to action. Users can build **multiple pages**, manage navigation, schedule content visibility and customize themes, colors, typography, layouts and components with a responsive live preview.

OrbitPage also supports **digital menus** with categories, products, variants, prices and availability, shared by URL or QR code. The **Shop** adds digital products and services, orders and Stripe payments in supported editions.

## Publishing, audience and growth

The platform includes technical SEO and social metadata, canonical URLs, structured data, sitemaps and discovery files such as `robots.txt` and `llms.txt`. It also provides QR codes, supported custom-domain options, visit and interaction analytics, optional GA4 integration, and privacy, consent and CMP tools.

Newsletter features bring subscribers, campaigns and reports into the same dashboard. The goal is to support the full **create → publish → measure → improve** cycle without assembling numerous disconnected services.

## AI, ChatGPT and automation

The **AI Assistant** turns natural-language requests into structured proposals for profile, content and theme changes. I designed it around a **review-first** model: proposals are validated and explicitly confirmed before application, with publishing kept separate.

For the SaaS platform, I also built a scoped-token **Automation REST API**, an **OAuth-based MCP integration** and a **ChatGPT app**. A community **n8n node** connects OrbitPage to external workflows. The dashboard, API and conversational interfaces provide different ways to work with the same product while enforcing workspace authorization.

## Two editions, one shared core

**OrbitPage Open Source** is a self-hosted application with a React/TypeScript frontend, Node.js/Express backend, SQLite database and local files. It supports Docker, Linux and Proxmox installation, user roles, two-factor authentication, backups, updates and health checks. Users retain control of their infrastructure and data.

**OrbitPage SaaS** adds managed accounts and workspaces, plans and billing, cloud services, integrations and hosted publishing. Its architecture separates the **Next.js control plane on Vercel**, backed by Firebase Authentication and Firestore, from **public delivery on Cloudflare Workers and R2**. Published pages are served as snapshots, without querying Firestore or Vercel on every public visit. This separation supports performance, scalability and clear service boundaries.

## Security and product engineering

Security is designed across the system: authentication and MFA, workspace roles and authorization, OAuth and scoped tokens, secret protection, server-side validation, rate limiting, publishing checks and audit trails. AI integrations never receive implicit privileges; sensitive actions remain governed by application-side controls.

Building OrbitPage has involved the full product lifecycle: **UX and full-stack development, cloud architecture, APIs and AI, CI/CD, containerization, releases, monitoring, backup and recovery, privacy, payments and SaaS operations**. Both editions share the application core while keeping public code, managed services and internal operations clearly separated.

---

**[Try OrbitPage](https://orbitpage.com/) · [Documentation](https://orbitpage.com/en-US/docs) · [Open-source GitHub](https://github.com/paoloronco/OrbitPage) · [OrbitPage in ChatGPT](https://chatgpt.com/plugins/plugin_asdk_app_6a72f9db2440819182e2a20ea276ce9b?q=orbitpage)**
