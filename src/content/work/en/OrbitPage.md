---
title: "OrbitPage"
summary: "OrbitPage is a visual page builder for publishing personal pages, portfolios, business sites, menus, Shops, and QR-connected pages. It is available as a managed SaaS and as self-hosted open-source software."
category: "tool"
stack: ["SaaS", "Open Source", "Cloud", "Docker", "REST API"]
problem: "Publishing a polished online presence often means choosing between tools that are too limited and a traditional website that takes more effort to build and manage."
solution: "A visual dashboard for building the page, organizing its content, customizing its design, and managing publishing, audiences, and collaborators."
outcome: "A product I develop and maintain in two editions: the managed OrbitPage service and an open-source version for private infrastructure."
featured: true
order: 3
draft: false
links:
  - label: "Explore OrbitPage"
    href: "https://orbitpage.com/en-US/product"
  - label: "View live demos"
    href: "https://orbitpage.com/en-US/demos"
  - label: "Open-source code"
    href: "https://github.com/paoloronco/OrbitPage"
---

## Creating and managing an OrbitPage

OrbitPage is the visual page builder I develop and maintain for creating a complete online presence from one dashboard. It can be used for a personal page, a portfolio, a focused business site, a venue menu, an event page, or a Shop for digital products and services.

The editor displays the page while it is being built. Users can start from a theme, define the profile, add the content they need, and adapt every section to their identity. The same dashboard also includes the tools needed after the initial build: publishing, domains, SEO, analytics, privacy, newsletters, collaborators, and billing.

OrbitPage is designed for people who want to focus on their content and the final result without developing a new website from scratch every time.

## The dashboard

I organized the dashboard into distinct workspaces so that every task has a clear place and remains easy to find as the page grows.

### Profile, content, and design

A profile can represent a person, company, or studio. It includes the name, description, profile image or logo, role, contact details, social profiles, favicon, and the information shown by browsers and search engines.

Content is added through visual blocks. These include links, buttons, text, headings, images, video, social profiles, contact details, maps, events, callouts, separators, embeds, forms, bookings, and internal navigation. Each block can be reordered, configured, hidden, or scheduled, and can have its own icon, cover image, call to action, and layout settings.

Customization starts with ready-made themes but goes well beyond switching colors. Typography, spacing, backgrounds, cards, borders, corners, shadows, transparency, and many other details can be adjusted. The responsive preview matches the published page and makes it possible to check the result on mobile, laptop, and desktop layouts.

The dashboard interface is available in 14 languages and includes right-to-left support for Arabic.

### Pages and navigation

An OrbitPage can have a homepage and multiple dedicated pages. Each secondary page has its own address, title, description, and set of blocks. Internal links create consistent navigation without sending visitors outside the project.

This structure can separate a portfolio, services, contact details, and events, or create focused campaign pages while keeping the same design as the main page.

### Menus and Shop

Restaurant, bar, and venue menus are managed as structured content. Users can create sections and subsections, add products with descriptions, images, prices, and variants, set availability, and publish a dedicated menu address.

OrbitPage Shop sells digital files and bookable services directly from the page. The seller connects a Stripe account, prepares the catalog, and defines what the customer receives. OrbitPage handles checkout, the order, and protected delivery of the purchase. The Shop remains integrated with the profile and the rest of the content instead of requiring a separate website.

### Publishing, domains, and SEO

A page can be published on an OrbitPage address or, on compatible plans, a custom domain. The Publish area brings together publication status, QR codes, the sitemap, and files used for online discovery.

SEO controls cover the canonical URL, title and description, Open Graph and Twitter Card previews, Schema.org data, and indexing. OrbitPage generates `sitemap.xml` and provides editors for `robots.txt`, `llms.txt`, `humans.txt`, `ai.txt`, `security.txt`, and other text endpoints.

QR codes can be downloaded as PNG or SVG for screen and print. Smart QR codes keep the same physical code while changing its destination according to a schedule. A venue, for example, can open the lunch or dinner menu automatically.

### Analytics, privacy, and newsletters

Analytics cover visits, visitors, clicks, CTR, traffic sources, devices, countries, and campaigns. Google Analytics 4 can be connected when a broader external analytics setup is needed.

Privacy controls include policies, consent preferences, Google Consent Mode, and external CMP integrations. Embeds that require consent respect the visitor's choice before loading third-party content.

The Newsletter section manages subscribers, consent, campaigns, scheduling, and delivery reports through the email service selected by the workspace owner. Audience collection and updates therefore stay connected to the same public page.

### AI assistant, OpenAI MCP, and API

The built-in AI assistant works with the profile, content, and theme of the open page. The user describes the intended result; OrbitPage prepares the changes and presents them for review. They are applied only after confirmation, and manual editing remains available at all times.

The same workflow is available to compatible OpenAI clients through an OAuth-based MCP integration. The connection is tied to one workspace and the permissions it was granted. It can read data, prepare changes, and, when allowed, apply, publish, or restore a version.

For wider automation, the SaaS exposes a versioned REST API with personal tokens and granular scopes. Scripts, backends, CI, or n8n can work with pages, media, publishing, domains, analytics, AI, Shop, newsletters, and billing without sharing a dashboard session.

### Teams, plans, and billing

A workspace can be managed by more than one person. Owners invite collaborators, assign roles and permissions, and decide who can edit, publish, or administer different areas. People working across several projects can switch workspaces with their own account instead of sharing credentials.

OrbitPage SaaS offers Free, Starter, and Pro plans for different levels of use. Accounts manage plans, renewals, invoices, and subscription status from the dashboard. The [pricing page](https://orbitpage.com/en-US/pricing) shows the differences in blocks, storage, domains, AI, Shop, and collaboration.

The dashboard also includes full or selective backups, published-version history, restore controls, and tools for finding unused media.

## SaaS and open source

I developed OrbitPage in two editions.

**OrbitPage SaaS** is the ready-to-use service. It includes signup, workspaces, hosting, storage, updates, publishing, custom domains, plans, and billing. It suits people who want to build and operate their project while OrbitPage manages the service itself.

**OrbitPage Open Source** is the MIT-licensed self-hosted edition. It can be installed with Docker on a server, VM, or homelab, keeping the application and its data under the owner's control. The public repository contains a usable product, installation documentation, and procedures for updates, backup, and recovery.

Both editions share the main page-building and management experience. The SaaS adds accounts, billing, managed infrastructure, and features designed for the hosted service. Portable backups can also move content and media between compatible installations.

## Development and maintenance

OrbitPage is under continuous development. I manage its product design, interface, security, documentation, releases, and SaaS operations. The open-source edition is updated through public releases, while the managed platform evolves alongside features built specifically for hosted accounts.

Maintenance covers testing, security updates, access controls, two-factor authentication, backup, recovery, and error handling. Work continues after a feature ships: documentation, compatibility, and reliability are part of the same product work.

OrbitPage brings my experience in development, cloud, security, automation, and operating a production SaaS into one real product.
