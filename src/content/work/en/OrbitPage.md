---
title: "OrbitPage"
summary: "A visual page builder for creating, customizing, and publishing professional pages, one-page sites, menus, portfolios, and QR-connected experiences. Available as managed SaaS and self-hosted open source."
category: "tool"
stack: ["TypeScript", "React", "Next.js", "Firebase", "Cloudflare", "Docker"]
problem: "Link-in-bio tools are too limited, while a traditional website demands more time, skills, and maintenance than many real-world projects need."
solution: "A visual block editor that brings content, design, pages, menus, publishing, analytics, SEO, and automation into one product."
outcome: "An actively maintained product with two editions: a ready-to-use SaaS and an MIT-licensed open-source core for private infrastructure."
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

## A page builder, not a list of links

I created **OrbitPage** to cover the space between a link-in-bio and a traditional website: simple enough to publish in minutes, yet complete enough to become the online presence of a professional, business, or venue.

A link-in-bio is only the most immediate use case. OrbitPage can build **portfolios, digital business cards, product pages, company microsites, venue menus, event pages, and landing pages**, all through the same visual system and with the same quality across mobile and desktop.

There is no need to start from code or remain trapped in a rigid template. Build the page, see the real result immediately, and publish it.

## What you can build

### Content beyond buttons

The editor includes blocks for links and calls to action as well as text, headings, images, native video, social profiles, contact details, maps, events, callouts, separators, and consent-aware embeds. Every block can be reordered, hidden, scheduled, customized, and paired with icons or cover media.

The homepage can sit alongside **dedicated pages with their own slug, title, description, and content**. Restaurants, bars, and hospitality businesses get a proper menu editor with sections, subsections, products, variants, images, prices, and availability. There is no need to force a list of links into a job it was never designed to do.

### Real design control

Ready-made themes provide a quick starting point, while the editor exposes colors, typography, spacing, surfaces, borders, radii, shadows, blur, backgrounds, and per-card overrides. Images, gradients, GIFs, and video can all become part of the page's visual identity.

The preview uses the same renderer as the public page. What you edit is what visitors see, across mobile, laptop, and desktop views.

### Publishing, SEO, and QR are part of the product

OrbitPage generates canonical metadata, Open Graph and Twitter Cards, Schema.org data, sitemaps, and indexing controls. The dashboard also manages `robots.txt`, `llms.txt`, `humans.txt`, `ai.txt`, `security.txt`, and safe custom text endpoints.

QR codes can be exported as PNG or SVG with screen and print presets. **Smart QR codes** keep the same physical code while changing their destination based on local time—for example, a restaurant can automatically open its lunch or dinner menu.

Built-in analytics, click and CTA counters, Google Analytics 4, Consent Mode, and external CMP support complete the path from publishing to measurement.

### AI and automation, with explicit control

OrbitPage AI can prepare changes to a profile, content, and theme using the currently open page as context. It does not write directly: it produces an exact plan, displays it in the editor, and applies only the operations the user confirms after permissions and page revision have been checked again.

For the managed service, I also built an **Automation API**, granular access tokens, an OAuth-based MCP integration, and an n8n community node. Content, media, publishing, analytics, domains, backups, and other operations can become part of real workflows without giving up security controls.

## Managed SaaS and self-hosted open source

OrbitPage is one product delivered in two ways for different needs.

| | **OrbitPage SaaS** | **OrbitPage Open Source** |
| --- | --- | --- |
| Best for | People who want to build and publish immediately | People who want full control over code and data |
| Infrastructure | Managed accounts, hosting, storage, updates, and delivery | One container with the application, SQLite, and local storage |
| Publishing | OrbitPage URL, CDN, and custom domains on compatible plans | Domain and reverse proxy managed on private infrastructure |
| Operations | Free, Starter, and Pro plans, teams, API, and hosted features | MIT license, Docker, Compose, Linux, and Proxmox installers |

The open-source edition is not a demo export of the SaaS. It is a usable, documented application with a React and TypeScript editor, Express backend, SQLite database, local uploads, migrations, and portable backups. It runs on a private server or homelab without requiring an external database.

The SaaS adds what a cloud service needs: signup and billing, workspace isolation, managed storage, quotas, custom domains, automation, and multi-tenant operations. Published pages are delivered as static HTML and assets through Cloudflare, keeping visitor traffic separate from the dynamic control plane.

Media backups can move between OSS and SaaS. The freedom to self-host is not just a claim; it is built into the data format.

## A product I continue to build

OrbitPage is not an AI-generated app left on GitHub. It is a product I **design, develop, operate, and actively maintain**, both as a public codebase and as a commercial service.

The open-source repository receives versioned releases, fixes, and security patches. Its pipeline checks lint, builds, unit tests, and Playwright end-to-end tests; multi-architecture Docker images for AMD64 and ARM64 are published to Docker Hub and GitHub Container Registry. Operational documentation, health checks, backup and restore, updates, and rollback are as much a part of the project as the interface.

On the application side, I implemented multiple users with scoped permissions, TOTP two-factor authentication, consent management, upload validation, secret encryption, and additive migrations. These decisions come from hands-on work across **cloud, security, DevSecOps, and automation**, and from operating a service used by real people.

OrbitPage brings those skills together: not a technical demo presented as a product, but a complete product that also chose to have an open-source edition.
