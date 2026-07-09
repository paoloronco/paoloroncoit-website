---
title: "[n8n-template] RSS Tech News to your inbox"
description: "The Tech & AI Daily Briefing Workflow is a fully automated content–aggregation and AI–driven editorial system designed to collect, enrich, and deliver the most…"
pubDate: 2025-12-03
tags: ["n8n"]
draft: false
---
The **Tech & AI Daily Briefing Workflow** is a fully automated content–aggregation and AI–driven editorial system designed to collect, enrich, and deliver the most important daily news across technology, artificial intelligence, cybersecurity, and the digital industry.

Built using **n8n**, it transforms dozens of heterogeneous RSS feeds into a clean, curated newsletter — drafted intelligently by an LLM and delivered via email with zero manual intervention.

Below is a full overview of how the system works, including detailed module setup, credentials configuration, and customization options.

GitHub: [https://github.com/paoloronco/n8n-templates/tree/main/free-templates/4-RSS\_News\_Tech](https://github.com/paoloronco/n8n-templates/tree/main/free-templates/4-RSS_News_Tech)

Youtube Video: [https://youtu.be/Gck8nmvx1UA](https://youtu.be/Gck8nmvx1UA)

![](/posts/n8n-template-rss-tech-news-to-your-inbox/workflow-1024x515.png)

* * *

## **1\. Scheduled Automation – Automatic Daily Execution**

The workflow begins with a **Schedule Trigger** that runs at a predefined interval (usually daily at a fixed hour).  
This ensures that the newsletter is always generated automatically without human intervention.

### 🔧 Setup

-   In n8n, choose the **Schedule Trigger** node
-   Select “Every day” or set a cron-like execution
-   Optionally define different timezones for global use

Once configured, this trigger becomes the starting point for the entire pipeline.

* * *

## **2\. Multi-Source RSS Ingestion (25+ feeds)**

The workflow pulls content from more than two dozen industry-leading sources. Each feed is handled by an individual **RSS Feed Read** node to ensure stability and easy troubleshooting.

The feeds are grouped into categories:

### 🔐 _Cybersecurity_

Sources include:  
The Hacker News, KrebsOnSecurity, DarkReading, SANS, CVE feeds, Google Cloud Threat Intelligence, Cisco Talos, ESET, and more.

### 🤖 _Artificial Intelligence_

Google Research, MIT AI news, OpenAI News, Artificial Intelligence News.

### 💻 _Tech Industry & Digital Business_

Il Sole 24 Ore (Tech & Cybersecurity sections), Cybersecurity360.

### ⚙️ _Nvidia Ecosystem_

Nvidia Newsroom, Nvidia Developer Blog, Nvidia Blog.

### 🔧 Setup

Each RSS node has exactly one configurable field:

-   **Feed URL** → Paste any RSS link
-   Additional options (e.g., limit, filter by date) can be set inside the “Options” panel.

This modular structure allows you to **add, remove, or update feeds without changing the logic of the workflow**.

* * *

## **3\. Merging Streams by Topic**

Because each feed is separate, the workflow uses several **Merge** nodes to combine them into logical categories:

-   Merge\_Cyber1 / Cyber2 / Cyber3 → all cybersecurity sources
-   Merge\_AI → AI & research feeds
-   Merge\_Nvidia → news from Nvidia channels
-   Merge\_All → every category merged into one global stream

### 🔧 Setup

Each Merge node is configured in “Append” mode, ensuring all items are passed through sequentially.  
You can adjust the number of inputs depending on how many feeds you want to aggregate.

* * *

## **4\. Freshness Filter – Only News from the Last 24 Hours**

To avoid RSS clutter and redundancy, the **Filter** node applies a strict condition:

> _Include only articles whose `isoDate` is later than “now minus 24 hours”_

This ensures the briefing remains a **true daily digest**, not a catch-all archive.

### 🔧 Setup

The Filter node uses a DateTime condition:

```
leftValue: {{$json.isoDate}}
operator: after
rightValue: {{ DateTime.now().minus({ hours: 24 }).toISO() }}
```

You can change the time window (e.g., 48h, 72h) if you want longer retention.

* * *

## **5\. Automatic Sorting by Publication Date**

The **Sort – Articles by Date** node arranges items in descending chronological order.  
This guarantees that the most recent and time-sensitive events are prioritized.

### 🔧 Setup

-   Sort field: `isoDate`
-   Order: descending

* * *

## **6\. Normalization of All Articles (JavaScript Code Node)**

At this stage, dozens of RSS entries from different sources are unified into a single structured object.  
The Code node creates one item with an `articles` array containing:

-   `title`
-   `content` or `contentSnippet`
-   `link`
-   `isoDate`

### 🔧 Customization Options

You can modify the code to:

-   include authors
-   include images from RSS feeds
-   perform keyword filtering
-   extract tags or categories

* * *

## **7\. AI Editorial Engine – Powered by Google Gemini**

This is the heart of the workflow.

The **Gemini node** receives the entire `articles` array and applies a long, high-precision editorial prompt.  
The model acts like the editor-in-chief of a major tech newspaper.

### It performs:

✔ Relevance filtering (max 8–10 key stories)  
✔ Topic categorization  
✔ Deduplication across sources  
✔ Journalistic summarization  
✔ HTML formatting following strict rules  
✔ Automatic subject line creation

### Output

Gemini returns a **strict JSON object**:

```
{
  "subject": "Tech & AI Briefing – Day Month Year",
  "html": "<h2>AI & Machine Learning</h2>…"
}
```

### 🔧 Setup

To use Gemini:

1.  Create a **Google Cloud Project**
2.  Enable the _Gemini API_
3.  Generate an API key or OAuth credential
4.  Insert credentials into n8n under **Google PaLM / Gemini**

If the project is used in production, set usage quotas and billing controls.

* * *

## **8\. HTML Assembly – Final Newsletter Builder**

The **Build Final Newsletter HTML** node parses, validates and transforms the LLM output into a professional, responsive email template.

It handles:

-   removal of ` ```json ` wrappers
-   strict JSON parsing
-   validation of required fields
-   dynamic insertion of the AI-generated content
-   generation of a timestamp footer

### 🔧 Customization Options

You can edit the HTML template to change:

-   branding / logo
-   fonts
-   color palette
-   layout structure
-   footer information

The template is clean, responsive, and mobile-friendly.

* * *

## **9\. Email Delivery – Gmail Node**

The final step sends the curated newsletter to your inbox using the **Gmail node**.

### 🔧 Gmail Credentials Setup (via Google Cloud Platform)

To use Gmail in n8n:

1.  Create a **Google Cloud Project**
2.  Enable the **Gmail API**
3.  Go to _APIs & Services → OAuth Consent Screen_
4.  Configure OAuth for "External" users or internal domain
5.  Create **OAuth 2.0 Client Credentials**
6.  Upload credentials to n8n under:  
    → _Credentials → Gmail OAuth2_
7.  Grant access and authorize your Google account

Once set up, the node can send emails automatically every day.

### Customizable Fields

-   Sender name (e.g., "Tech Briefing" or your brand)
-   Recipient email (single or multiple)
-   HTML body (from the previous node)
-   Dynamic subject line generated by Gemini

* * *

## **Personalization & Scalability**

This workflow is fully customizable:

### 🔧 Add/remove RSS feeds

Just duplicate an existing RSS node and update the feed URL.

### 🔧 Replace Gmail with:

-   SMTP
-   Notion
-   Slack
-   Telegram
-   Webhooks
-   Internal dashboards

### 🔧 Change the editorial tone

Modify the prompt in the Gemini node to alter writing style, number of items, categories, or depth.

### 🔧 Multi-language output

The AI can generate the briefing in English, Italian, Spanish, or automatically detect the reader’s language.

### 🔧 Unlimited horizontal scaling

RSS modules and Merge nodes can be expanded without breaking the pipeline.

* * *

## **Conclusion**

The **Tech & AI Daily Briefing Workflow** is a complete end-to-end automation system that delivers a highly curated, editorial-quality newsletter powered by AI.

It consolidates huge amounts of data into a **clean, professional, and timely daily briefing**, saving hours of manual research and offering a powerful, scalable solution for:

-   industry monitoring
-   corporate intelligence
-   automated newsletters
-   analyst teams
-   content creators
-   newsroom augmentation

Everything — from feed ingestion to AI synthesis to email delivery — happens automatically, making this one of the most advanced and efficient tech-news workflows built on n8n.

