---
title: "OrbitPage"
summary: "A SaaS and open-source platform for creating, publishing, and managing a complete digital presence from a single workspace."
category: "tool"
stack: ["TypeScript", "React", "Next.js", "Node.js", "Docker", "REST API", "OAuth", "MCP", "OpenAI", "Stripe", "GitHub Actions", "Cloud & Edge Services"]
problem: "Presenting an identity, links, content, contact details, and services online often means using several different tools or building and maintaining an entire website."
solution: "OrbitPage brings these needs together in a single product."
outcome: "The product is available both as a ready-to-use managed SaaS and as a self-hosted open-source core."
featured: true
order: 3
draft: false
links:
  - label: "Try OrbitPage"
    href: "https://orbitpage.com/"
  - label: "Explore the documentation"
    href: "https://orbitpage.com/en-US/docs"
  - label: "View the open-source project on GitHub"
    href: "https://github.com/paoloronco/OrbitPage"
---

OrbitPage began as a more flexible alternative to traditional link-in-bio tools and has evolved into a complete platform for creators, professionals, companies, and local businesses.

From a single dashboard, users can build public pages, organize content and services, create menus and secondary pages, sell digital products, collect subscribers, analyze traffic, and integrate automations and AI tools.

The product is available both as a **ready-to-use managed SaaS** and as a **self-hosted open-source core**.

**Role:** concept, product design, full-stack development, cloud architecture, security, DevOps, and product management.

---

## From a link page to a complete digital presence

OrbitPage started from a simple problem: presenting an identity, links, content, contact details, and services online often means using several different tools or building and maintaining an entire website.

OrbitPage brings these needs together in a single product.

The workspace can begin as a simple profile and gradually grow into a more complete digital presence, while retaining a consistent management experience.

The result can be a link-in-bio page, a compact portfolio, a digital business card, a product page, a professional microsite, or the digital presence of a restaurant, bar, or local business.

## Content and pages

At the heart of OrbitPage is a visual editor built around reorderable blocks.

Links, text, images, videos, contact details, social profiles, maps, events, calls to action, embeds, and other components can be freely combined and managed without touching code.

The platform is not limited to a single page: compatible workspaces can create **secondary pages with independent URLs and content**, building a small multi-page structure within the same product.

Content can also be hidden, reordered, or scheduled for publication only within a specific time window.

### Menus for venues and local businesses

OrbitPage also includes a dedicated system for creating digital menus.

Restaurants, bars, and other businesses can organize sections, categories, products, variants, prices, images, and availability directly from the dashboard, keeping their menu and public presence in the same workspace.

The result can be shared through a URL or QR code without having to manage a separate application.

## Design and customization

Every page can start from a predefined theme or be adapted to match its own identity.

The customization system provides control over typography, colors, surfaces, cards, borders, spacing, corner radius, shadows, images, and media backgrounds.

A profile, logo or personal image, favicon, social profiles, footer, and other elements all contribute to the page's identity.

A responsive preview makes it possible to check the result during configuration, before publishing.

## Shop and payments

OrbitPage includes a **Shop** module that can also turn a page into a point of sale.

Sellers can connect Stripe, create a catalog, and sell digital products or services directly from their OrbitPage presence.

The catalog, checkout, and purchase management are therefore part of the same ecosystem used for content, audience, and publishing.

The goal is not to build a general-purpose ecommerce platform, but to let creators and professionals monetize products and services without having to integrate a separate system.

## Newsletter and audience

Compatible workspaces can collect subscribers and manage newsletter campaigns directly from the dashboard.

The system includes consent management, subscriber lists, configuration of the owner's email service, campaign creation and scheduling, and delivery and engagement metrics.

OrbitPage can therefore support the entire **visitor → subscriber → customer** journey, keeping content, audience, and growth tools in the same workspace.

## AI Assistant

Artificial intelligence is integrated directly into the page management process.

**OrbitPage AI** can understand the workspace's content and configuration and propose changes to its profile, content, and design from natural-language instructions.

The AI does not change the public page directly: its actions are converted into structured proposals that the user can review before applying them.

I designed this as a **review-first** workflow, keeping the AI suggestion, the workspace change, and publication separate.

This makes it possible to use an LLM as an operational interface without automatically handing it control of public content.

## OpenAI and Model Context Protocol

The same interaction model is also available externally through an **MCP (Model Context Protocol)** integration.

A compatible OpenAI client can connect to a specific OrbitPage workspace through OAuth authorization and use a controlled set of operations.

This makes it possible, for example, to inspect the configuration of a page, prepare changes, review them, and manage the publishing cycle through a conversational interface.

Permissions and workspace access are defined during authorization, and access can be revoked.

MCP does not replace the dashboard: it intentionally exposes only a controlled subset of the platform's capabilities.

## API and automation

OrbitPage also provides an **Automation REST API** designed for workflows, integrations, and external applications.

Personal tokens with specific scopes make it possible to automate operations without sharing a dashboard session.

The API can be used by scripts, backends, CI/CD pipelines, and automation platforms such as n8n to work programmatically with different workspace features, from content management and publishing to supported SaaS functionality.

The dashboard, API, and MCP are therefore three different interfaces to the same product: visual, programmatic, and conversational.

## SEO and AI discovery

Publishing does not end when the page is generated.

OrbitPage includes tools for **SEO, indexing, and discovery**, including metadata configuration, canonical URLs, Open Graph, Twitter Cards, structured data, and sitemaps.

The dashboard also provides control over public files and directives such as:

- `robots.txt`
- `llms.txt`
- `humans.txt`
- `ai.txt`
- `security.txt`

The goal is to make the published presence understandable not only to visitors, but also to search engines, crawlers, and new AI-based discovery systems.

Both managed OrbitPage addresses and, on compatible plans, custom domains are supported.

## Analytics

OrbitPage includes a native analytics system for understanding how a page is used.

Visits, visitors, clicks, CTR, traffic sources, devices, geographic location, and campaigns make it possible to assess performance without necessarily installing an external platform.

Google Analytics 4 integration is also available for more advanced needs.

Analytics was designed as part of the product cycle: **publish → measure → understand → improve**.

## Privacy, consent, and CMP

Analytics, embeds, and third-party tools inevitably introduce privacy requirements.

OrbitPage therefore includes policy management, consent controls, tracking behavior configuration, and support for external CMP solutions.

Privacy settings are managed from the same workspace used to publish the page, so they do not become an afterthought added at the end of the process.

## Teams and workspaces

OrbitPage is not designed exclusively for individual users.

Workspaces can include collaborators with different roles and permissions, allowing several people to work on the same project without sharing credentials.

The platform also manages accounts, workspaces, page versions, backup, and restore, providing the operational tools that become necessary when a page moves from a simple experiment to a real, actively used presence.

## Plans and billing

The SaaS edition uses a freemium model with **Free, Starter, and Pro** plans, alongside a future offering for agencies.

Each tier progressively expands capabilities such as the number of content blocks and pages, storage, customization, analytics, AI, newsletters, Shop, collaborators, and custom domain use.

Billing, subscriptions, limits, and workspace entitlements are managed directly by the platform.

Prices and limits are kept up to date on the official OrbitPage website, avoiding the duplication of commercial information that may change over time on this project page.

## SaaS and open source

One of the aspects I consider most important about the project is that it offers two ways to use it.

**OrbitPage SaaS** provides accounts, hosting, storage, updates, and publishing as a fully managed service.

**OrbitPage Open Source** provides an MIT-licensed, self-hosted edition that can be installed on private infrastructure with Docker.

The open-source edition retains the product's central concept—visual editing, public pages, customization, menus, analytics, privacy, SEO, and management—while some services tied to the managed platform remain specific to the SaaS.

This has allowed me to work simultaneously on the requirements of a multi-user cloud product and those of software that users can genuinely distribute and manage themselves.

## Engineering

OrbitPage is more than a frontend interface.

The project includes a **full-stack web application**, backend services, authentication and authorization, data and media management, publishing, APIs, AI integrations, payments, analytics, consent systems, and a software delivery pipeline.

The SaaS architecture was designed to separate the management environment from public pages while enforcing access controls and isolation between workspaces.

For the open-source edition, I also worked on the entire distribution lifecycle: containerization, automated installation, data persistence, updates, backups, health checks, and deployment and rollback procedures.

### Core technologies

**TypeScript · React · Next.js · Node.js · Docker · REST API · OAuth · MCP · OpenAI · Stripe · GitHub Actions · Cloud & Edge Services**

I intentionally keep the architecture at a high level on this page: some infrastructure components, managed services, and SaaS implementation details are not part of the project's public documentation.

## What building OrbitPage required

OrbitPage is one of the projects in which I have applied the broadest range of skills within a single product.

**Product engineering**

From the initial idea to feature definition, dashboard UX, the SaaS model, plans, and the product's ongoing evolution.

**Full-stack development**

Frontend, backend, APIs, state management, authentication, data, media, and integration between the application's different components.

**Cloud architecture**

Designing a managed platform with a separation between the control plane and public content, including storage, delivery, and cloud services.

**Cybersecurity**

Authentication and authorization, role management, workspace isolation, OAuth, scoped tokens, secret protection, validation, rate limiting, and the secure design of external integrations.

**AI engineering**

Integrating LLMs into a real product, with structured output, context management, validation, and human-in-the-loop workflows before changes are applied.

**API and automation**

REST APIs, personal access tokens, MCP, and integration with external workflows and automation tools.

**DevOps**

Containerization, CI/CD, release management, multi-architecture images, deployment, updates, health checks, backup, and rollback.

**Privacy and analytics**

Consent management, CMP integration, first-party analytics, and integration with external services.

**SaaS and payments**

Subscription lifecycle, billing, entitlements and plan limits, payment integration, and commerce features.

---

OrbitPage continues to evolve as both a SaaS product and an open-source project.

**[Try OrbitPage](https://orbitpage.com/) · [Explore the documentation](https://orbitpage.com/en-US/docs) · [View the open-source project on GitHub](https://github.com/paoloronco/OrbitPage)**
