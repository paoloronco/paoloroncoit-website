---
title: "OrbitPage"
summary: "A platform for creating and publishing a personal or professional page, customizable in every detail and ready to share through a link or QR code."
category: "tool"
stack: ["TypeScript", "Next.js", "Firebase", "Cloudflare", "Docker"]
problem: "Presenting links, content, contact details, and services online often requires several separate tools or a complete website, even when one well-built page would be enough."
solution: "OrbitPage brings profiles, content, media, and calls to action into a visual block editor with ready-made themes and advanced customization controls."
outcome: "A product that can be used immediately as a SaaS or independently deployed through its open-source core, built for individuals, businesses, and venues."
featured: true
order: 3
draft: false
links:
  - label: "Open OrbitPage"
    href: "https://orbitpage.com/"
  - label: "Dashboard"
    href: "https://orbitpage.com/dashboard"
  - label: "Open-source code"
    href: "https://github.com/paoloronco/OrbitPage"
---

## One page, everything you need

OrbitPage lets people build a complete public page without creating and maintaining a traditional website. It brings identity, work, links, content, contact details, events, and media into one place, with a result designed for both desktop and mobile.

It can serve as the main destination for a creator or professional, a focused page for a product or business, or the digital home of a restaurant, bar, or venue. Every page can be shared through its URL or a generated QR code.

## From setup to publishing

### Profile

Personal, company, or venue name, description, image, and social links including LinkedIn, Instagram, GitHub, email, and WhatsApp. The profile card can be tailored through its colors, borders, image shape, and visual hierarchy.

### Content

The editor uses reorderable **link, CTA, heading, separator, maps, contact, social row, callout, list, event, embed, text, image, and video** blocks. Content can be hidden or scheduled to appear only during a selected period.

### Appearance

Ready-made themes and card styles provide an immediate starting point. For a more specific identity, users can fine-tune colors, cards, and backgrounds, including gradients, images, GIFs, and video. The preview matches the published result on both desktop and mobile.

### Management and visibility

OrbitPage includes click analytics and, on compatible plans, advanced reporting and Google Analytics 4. The dashboard also manages backup and restore, privacy and cookie policies, sitemaps, SEO settings, and files such as `robots.txt` and `llms.txt`.

## SaaS or self-hosted

OrbitPage supports two ways of using the same underlying product:

- **Managed SaaS:** accounts, hosting, storage, publishing, and delivery are included. Users can sign up and start building immediately.
- **Open source:** the core is available under the MIT license and can be installed, modified, and hosted on private infrastructure.

People looking for simplicity can choose the managed service, while those who need control over the code and deployment can use the self-hosted edition.

## SaaS plans

| Plan | Price | What it includes |
| --- | --- | --- |
| **Free** | €0 | An `orbitpage.net` URL, 8 blocks, 10 MB storage, essential themes, and click analytics. OrbitPage badge included. |
| **Starter** | €4.50/month | 40 blocks, 50 MB storage, premium themes, standard analytics, basic SEO, and badge removal. |
| **Pro** | €7.50/month | Custom domain, 150 blocks, 250 MB storage, video uploads, advanced themes and SEO, scheduling, GA4, and 5 collaborators. |
| **Agencies** | Coming soon | Limits, storage, domain, and collaborators configured around each agency's needs. |

## For restaurants, bars, and venues

The dedicated venue offer includes **unlimited blocks, generous storage, video uploads, hosting, and optimized SEO**, together with direct support to set up, customize, and improve the page.

It brings menus, maps, contact details, events, social profiles, images, video, and calls to action into one QR-code-ready destination. The plan keeps the OrbitPage URL and badge; a custom domain and branding removal are not included.

## Under the hood

The service separates each part of the product across dedicated domains:

- **[orbitpage.com](https://orbitpage.com/)** presents the product and handles signup and login.
- **[orbitpage.com/dashboard](https://orbitpage.com/dashboard)** hosts the editor and page management.
- **orbitpage.net/slug_url** delivers public profiles; Pro can connect a custom domain.

In the SaaS, authentication and workspaces are isolated for each account. Published pages become static HTML and assets delivered through Cloudflare, keeping the dynamic editor separate from visitor traffic. The project combines TypeScript, Next.js, Firebase, and Cloudflare; the open-source edition can also be deployed with Docker.
