---
title: "OrbitPage"
summary: "A highly customizable Linktree alternative, available both as an MIT-licensed open-source project and a managed SaaS."
category: "tool"
stack: ["TypeScript", "Next.js", "Firebase", "Cloudflare", "Docker"]
problem: "Commercial link-in-bio tools did not provide the level of customization, control, and portability I was looking for."
solution: "I built an open-source, self-hosted page builder and later turned it into a SaaS with accounts, isolated workspaces, hosting, publishing, and custom domains."
outcome: "An OSS + SaaS product that lets creators, professionals, businesses, and venues publish a rich, distinctive page without managing a full CMS."
featured: true
order: 3
draft: false
links:
  - label: "Website and SaaS"
    href: "https://orbitpage.com/"
  - label: "Dashboard"
    href: "https://orbitpage.com/dashboard"
  - label: "Open-source code"
    href: "https://github.com/paoloronco/OrbitPage"
---

## From a personal need to a SaaS product

OrbitPage began because existing commercial tools did not let me truly customize a link-in-bio page. It grew from an open-source, self-hosted alternative into a product with two complementary paths: the MIT-licensed core can be inspected, modified, and hosted independently, while the managed service adds all the infrastructure needed to get started immediately.

It is more than a collection of buttons. OrbitPage treats the public profile as a small one-page website that combines identity, content, contact details, media, and calls to action in a responsive, highly customizable layout.

## The service's three domains

- **[orbitpage.com](https://orbitpage.com/)** is the marketing and commercial website, with product information, plan comparison, signup, login, and free access.
- **[orbitpage.com/dashboard](https://orbitpage.com/dashboard)** is the management area where each user edits and publishes their page.
- **orbitpage.net/slug_url** hosts public user profiles. Eligible plans can also connect a custom domain.

In the SaaS, authentication and user workspaces are managed in isolation. Published pages become static HTML and assets delivered through Cloudflare, separating the editor's dynamic workload from fast visitor delivery.

## Main features

### Profile

Users can set a personal, company, or venue name, add a description, and connect channels including LinkedIn, Instagram, GitHub, email, and WhatsApp. OrbitPage generates a QR code for the page and provides detailed profile-card controls for the image, colors, theme, borders, shape, and visual hierarchy.

### Content blocks

Pages can combine and reorder **link, CTA, heading, separator, maps, contact, social row, callout, list, event, embed, text, image, and video** blocks. Content can be hidden or scheduled to appear and disappear on specific dates when the selected plan supports it.

### Themes and customization

Ready-made themes and card styles provide a quick starting point. Fine tuning covers page colors, profile, cards, and backgrounds — including gradients, images, GIFs, and video — while preserving a consistent result across desktop preview, mobile preview, and the published page.

### Data, analytics, and publishing

- Configuration backup and restore.
- Built-in click analytics, with advanced reporting and Google Analytics 4 integration on compatible plans.
- Legal-policy management, including privacy and cookie policies.
- Editing of crawler-facing files such as `robots.txt` and `llms.txt`.
- Sitemap generation and SEO controls for titles, descriptions, and indexing.

## Managed-service plans

The open-source core remains free to self-host. The plans below cover the SaaS accounts, storage, publishing, delivery, and platform features.

| Plan | Price | URL and capacity | Main features |
| --- | --- | --- | --- |
| **Free** | €0 | `orbitpage.net/name`, 8 blocks, 10 MB storage, files up to 2 MB | Essential themes, basic clicks, OrbitPage badge included; no video upload, SEO, or scheduling |
| **Starter** | €4.50/month | `orbitpage.net/name`, 40 blocks, 50 MB storage, files up to 2 MB | Premium themes, standard analytics, basic SEO, badge removed; no video upload or scheduling |
| **Pro** | €7.50/month | Custom domain, 150 blocks, 250 MB storage, files up to 4 MB | Advanced themes and SEO, advanced analytics + GA4, scheduling, video up to 50 MB, badge removed, 5 collaborators |
| **Agencies** | Coming soon | Custom domain, blocks, storage, and limits | Advanced themes, SEO, analytics + GA4, scheduling, and a custom collaborator allowance |

## Plan for restaurants, bars, and venues

A dedicated venue offer includes **unlimited blocks, generous storage, video uploads, hosting, and optimized SEO**, plus direct assistance from our team to customize and improve the page. It keeps the OrbitPage URL and product badge: a custom domain and branding removal are not included, so the public page also helps people discover the service.

This option brings menus, maps, contact details, events, social profiles, images, video, and calls to action into a single QR-code-ready destination.
