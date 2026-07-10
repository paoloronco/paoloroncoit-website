---
title: "OrbitPage - An Open-Source and Self-Hosted Link Manager"
description: "In an era where our digital identity is spread across dozens of platforms, having a single point of collection for one’s touchpoints becomes…"
pubDate: 2025-09-12
tags: []
draft: false
---
In an era where our digital identity is spread across dozens of platforms, having a single point of collection for one’s touchpoints becomes fundamental.  
**OrbitPage** was born with this idea: an **open-source, self-hosted link manager**, which allows you to create a personal page where you can collect links, profiles, and content, with fully customizable design and secure authentication.

? **Public Demo (reset every 15 minutes):** [https://orbitpage-demo.up.railway.app/](https://orbitpage-demo.up.railway.app/)  
Credentials: `admin / demo123`  
? **Production:** [https://orbitpage.paoloronco.it/](https://orbitpage.paoloronco.it/)  
? **GitHub Repository:** [paoloronco/orbitpage](https://github.com/paoloronco/orbitpage) - [paoloronco/orbitpage-demo](https://github.com/paoloronco/orbitpage-demo)

## ? What OrbitPage Does

OrbitPage proposes itself as an alternative to self-hosted Linktree and similar services, with the advantage of being **totally independent** and **customizable**:

-   **Custom Profile and Theme** → colors, fonts, layout, and styles definable with a simple JSON or through an admin panel.
-   **Secure Link Management** → authentication based on bcryptjs and JWT, session protection with HttpOnly cookies.
-   **Integrated Admin Panel** → manage links, bio, and themes without touching the code.
-   **Lightweight Database** → SQLite, no dependencies on external services.
-   **Flexible Deployment** → compatible with Railway, Render, Docker, Google Cloud Run, Digital Ocean, and many other platforms.

The result is a **responsive personal landing page**, easy to configure and maintain securely, ideal for creators, professionals, and brands.

* * *

## ? Technical Skills Acquired

Developing and deploying OrbitPage allowed me to touch various areas of the full-stack and DevOps world:

### ? Frontend & Backend Development

-   **Modern Stack**: React, Vite, and Tailwind CSS for frontend; Node.js, Express.js, and SQLite on the server side.
-   **Authentication and Security**: password hashing (bcryptjs), JWT with expiration, parametric queries on SQLite.
-   **Self-contained Architecture**: no dependencies on external databases or third-party providers.

### ? Deployment and CI/CD

-   **Railway & Render**: used for quick demo and testing, with automatic database reset every 15 minutes.
-   **Google Cloud Run**: chosen for production due to auto-scalability and reduced costs.
    -   Configured **Workload Identity Federation** to allow GitHub Actions to deploy without static keys.
    -   **Artifact Registry** for building and storing Docker images.
    -   Custom domain mapping `orbitpage.paoloronco.it` with Cloudflare and Google Domains.
-   **GitHub Actions**: CI/CD pipeline that builds the app with a Dockerfile and automatically releases it to Cloud Run on every push to `main`.

### ? DevOps Best Practices

-   **Hardening of the Demo**: limitations on password resets and data resets, rate-limiting, and anti-bot protections.
-   **Total Automation of the Flow**: from commit to live deployment without manual interventions.
-   **Code Cleaning**: refactoring to remove unused dependencies (Supabase, Firebase).

* * *

## ? An Open-Source Product for Everyone

OrbitPage is released under the **MIT License** and intended to be used and modified freely.  
Anyone can fork it, adapt it to their brand, and deploy it on their preferred service.

Beyond its practical utility, OrbitPage also represents a **showcase project**: an example of how one can build a complete, secure, and scalable product by combining modern development and DevOps skills.

* * *

## ? Useful Links

-   ? **Production** → [https://orbitpage.paoloronco.it/](https://orbitpage.paoloronco.it/)
-   ? **Demo (reset every 15 minutes)** → [https://orbitpage-demo.up.railway.app/](https://orbitpage-demo.up.railway.app/)
-   ? **GitHub Repository** → [OrbitPage](https://github.com/paoloronco/orbitpage) | [OrbitPage-Demo](https://github.com/paoloronco/orbitpage-demo)
-   ? **Interactive Demo** → [Storylane](https://app.storylane.io/share/tjpm3tey6ven)

* * *

✍️ **In summary:** OrbitPage is not just a link manager, but a project that demonstrates real full-stack development and cloud-native deployment skills.  
A portfolio project that unites design, security, and DevOps automation.
