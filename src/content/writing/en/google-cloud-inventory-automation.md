---
title: "Google Cloud Inventory: how I automated resource tracking, changes and IAM reviews"
description: "How I built a personal Google Cloud inventory with n8n, BigQuery and Google Sheets to track resources, compare snapshots and review IAM."
pubDate: 2026-11-07
tags: ["Google Cloud", "n8n", "Cloud Security", "Automation", "BigQuery", "IAM"]
draft: false
---

My Google Cloud environment isn't particularly large. I mainly use it to experiment: a handful of personal projects, managed services, APIs enabled for testing, and resources I create, change or delete as I try new things. I'm not running hundreds of virtual machines or an enterprise environment spread across dozens of teams.

Still, even at this scale, keeping track of *what* I've enabled, *where* it lives and *who can access it* isn't always straightforward. The Google Cloud console lets me inspect individual projects, but it's less convenient when I want an overview of everything or, more importantly, to understand what's changed since my last check.

That's why I built **Google Cloud Inventory & Change Audit**: an automation that collects resource information, stores snapshots, compares runs and makes the results easier to explore. It also gave me a practical way to work with Google Cloud APIs, service identities, BigQuery and n8n instead of learning each one in isolation.

## It's not about how many resources you have

When I spin up a service for a test, I tend to focus on the thing I'm trying to learn. I enable the necessary APIs, grant permissions, make sure it works and move on. A few weeks later, less exciting questions come up: is that API still enabled? Which service account can read this project? Was this resource already here during the last check?

I could answer those questions manually. With so few actual workloads, that would still be manageable. But that was precisely why I wanted to automate it: less time repeating checks, more time understanding how the data is collected and interpreted.

I don't see this workflow as a replacement for a CSPM platform or as a security tool that can identify every risky configuration. First and foremost, it's **a visibility and change-tracking tool**. For a personal lab, that's already useful.

## How the n8n workflow works

I developed and published one version using **n8n**, the automation platform I use for several other personal workflows. Version 2.2.0 can scan an explicit list of Google Cloud projects, or a single folder or organization scope, subject to the permissions granted to it.

At a high level, the workflow has five stages:

1. **Collection:** Cloud Asset Inventory provides resource metadata and visible IAM policies. The workflow queries Service Usage directly to determine which APIs are enabled.
2. **Normalization:** it organizes records, assigns resource categories and separates workloads from the many administrative and configuration objects returned by Google Cloud.
3. **Storage:** it writes snapshots and execution information to a central BigQuery dataset.
4. **Comparison:** after the initial snapshot, it compares compatible runs to identify resources that were added, removed or changed.
5. **Reporting:** it updates a Google Sheets dashboard with inventory, findings, changes and scan history. HTML/CSV exports and optional email summaries are also available.

One important decision was **not to treat the total asset count as the number of services I'm actually running**. Cloud Asset Inventory also returns Google-managed objects, configuration records and supporting components. A raw count can make a tiny environment look much bigger than it really is. Categories make those numbers easier to interpret, although they cannot automatically tell me which resources are actively used or safe to delete.

## BigQuery as the memory of each run

A single snapshot shows what the collector could see at one point in time. To understand changes, I need at least two.

I chose BigQuery as the central store. When required and properly authorized, the workflow creates the dataset and tables used for resources, runs, changes and findings. That means I'm not relying only on the latest Google Sheets report: I can query structured historical data and keep collection separate from presentation.

The first run establishes a baseline. From the second compatible run onward, the workflow can calculate differences. If I change the project list or normalization rules, creating a fresh compatible baseline makes more sense than reporting resources as “removed” simply because they're no longer in scope.

BigQuery doesn't automatically mean zero cost. Storage and queries can be billed, even if costs for a small lab with a sensible scan frequency may be modest. I use query limits and treat retention, volume and scheduling as settings that deserve attention.

## A dashboard I can actually use

The most visible part of the project is the Google Sheets report. Its template has five tabs: **Dashboard, Inventory, Findings, Changes and Scans**. Beyond counts and charts, I can filter tables, add notes and mark items I've reviewed.

It's a practical choice. I don't have to open BigQuery every time I want to check a change, and I can share a template populated with synthetic data without exposing information about my own environment. The real data stays in the systems I've configured.

IAM observations still need human review. A broad-looking binding isn't necessarily an exploitable vulnerability, and a lack of findings doesn't prove a project is secure. The workflow helps identify things worth investigating; it doesn't certify an environment as safe.

## The most instructive part: permissions and reliability

Collecting cloud information sounds easy until you run into IAM boundaries. A service account that can read one project doesn't automatically have access to another. Cloud Asset Inventory, Service Usage, BigQuery and Sheets also require different permissions.

That's why I separated the list of projects to scan from the central project used for operations and storage. The configuration explicitly requires read access to each scope, the appropriate BigQuery permissions and edit access to the destination spreadsheet. A Google Cloud IAM role alone doesn't share a Google Sheets file: that file must be shared with the identity updating it.

I also spent time handling incomplete results. A failed request, a missing page or insufficient permissions must not quietly produce an inventory that looks complete. For example, a failure to list enabled APIs stops the scan, while incomplete IAM coverage is marked unavailable rather than interpreted as a clean assessment.

These details aren't as eye-catching as a dashboard, but they're probably where I learned the most: **an automation is only useful if you know when to trust its results and when not to**.

## How to try it yourself

I've published the n8n template with a sanitized workflow JSON and setup documentation. It doesn't contain ready-to-use credentials: anyone importing it needs to configure their own access and verify the selected scope.

I'd recommend starting with **one test project**, not your entire environment:

1. Choose the project to scan and the project that will host the central BigQuery dataset. They can be the same.
2. Enable the required APIs and create an identity with only the permissions needed to collect data and write reports.
3. Copy the Google Sheets template and share it with the workflow's identity.
4. Import the JSON into n8n and configure credentials, scopes, dataset and spreadsheet ID.
5. Run an initial manual scan and compare the results with the Google Cloud console.
6. Run a second scan, verify the comparison and only then enable scheduled execution.

The workflow supports a daily schedule, but a smaller lab might benefit from a different frequency. Before enabling it, check costs, quotas, logs and notifications.

The full documentation goes into more detail than this overview, including permissions, node configuration, testing and operational limits.

## A second approach: Python on Cloud Run

In parallel, I built **GoogleCloud-Inventory-Automation**, a Python collector deployed as a Cloud Run Job. The goal is similar, but the implementation is different: it gathers metadata from Cloud Asset Inventory and Service Usage, can perform additional configuration checks and generates Markdown, JSON and Excel reports published to a private GitHub repository.

This version has been particularly useful for experimenting with containers, runtime service accounts, Secret Manager, resource classification and publishing through the GitHub API. The documented release is v8, which I've validated manually. **Cloud Scheduler hasn't been configured yet**, so I wouldn't describe it as a fully scheduled process.

These aren't two parts of a single pipeline. They're **separate implementations**, with different destinations and trade-offs. n8n makes it convenient to integrate services and inspect the workflow visually; Python and Cloud Run give me more control over code, tests and reporting formats. Trying both approaches was part of the point.

## What it doesn't do (and why that matters)

I haven't built a complete cloud security posture management platform. There is no automatic remediation, no comprehensive dependency graph and no guarantee that every asset type is covered. Visibility depends on the APIs, permissions and limitations of the underlying sources. Security observations are leads to investigate, not definitive diagnoses.

Nor do I have a huge cloud estate to inventory. My day-to-day Google Cloud usage is mostly experimental, with relatively few meaningful workloads. That actually makes this a good learning environment: I can manually check the results, understand where collection falls short and improve the system without pretending I'm operating a company-scale infrastructure.

## What I learned

The interesting part isn't that I now have a list of resources. It's that I connected things often learned separately: IAM, APIs, automation, analytical storage, reporting and error handling.

The workflow saves me from repeating some manual checks, but more importantly, it makes changes easier to spot and previous states easier to revisit. I haven't measured enough time savings to claim a credible number of hours, and I don't want to invent one. For me, the tangible benefit is a repeatable check and a foundation I can extend.

If you use Google Cloud for personal projects or small test environments, this is a worthwhile exercise. You don't need a complicated infrastructure. Start with a simple question — *what's in my cloud, and what has changed?* — and build an answer you can verify.

---

### Repositories and resources

- [n8n template — Google Cloud Inventory V2](https://github.com/paoloronco/n8n-templates/tree/main/workflows/google-cloud-inventory/V2)
- [Complete setup guide](https://paoloronco.notion.site/Google-Cloud-Inventory-Change-Audit-408f0ba27c3281aea226fecadfab05f8)
- [Google Sheets template with synthetic data](https://docs.google.com/spreadsheets/d/16uTQRgZSTN2GN2nE2giTPu2ZyfWONfvt5m5gkOIOgeY/copy)
- [Python and Cloud Run collector](https://github.com/paoloronco/GoogleCloud-Inventory-Automation)
