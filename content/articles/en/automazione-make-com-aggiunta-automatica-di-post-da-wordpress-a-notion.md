---
title: "Make.com Automation: Automatically Adding WordPress Posts to Notion"
description: "Introduction This automation uses Make.com to automatically collect posts published on a WordPress site and archive them in a Notion database.…"
pubDate: 2025-02-22
tags: []
draft: false
---
## Introduction

This automation uses **Make.com** to automatically collect posts published on a **WordPress** site and archive them in a **Notion database**. This process centralizes content management, making it easier to organize and analyze posts in one place.

* * *

## **Automation Pipeline**

### **STEP 1: Initial Setup on Make.com**

1.  Log in to **Make.com** and go to **Templates**.
2.  Search for **“Add WordPress posts to Notion”**.
3.  Select the template and begin configuring the pipeline.

### **STEP 2: Connecting WordPress**

#### **Plugin Installation**

1.  Download the [WordPress-Make](https://wordpress.org/plugins/integromat-connector/) plugin.
2.  Log in to your WordPress site (`portfolio.paoloronco.it`).
3.  Go to **Plugins > Add New > Upload Plugin**.
4.  Install and activate the plugin.
5.  Go to **Plugins > Make** and copy the **API Key**.
6.  Paste the API Key into Make.com to complete the connection.

#### **Setup on Make.com**

-   Select **Type: Post**.
-   Select **Status: All**.
-   Select **Limit: 150**.
-   Right-click **WordPress (watch posts)** → **Choose where to start → All**.

* * *

### **STEP 3: Creating a Database in Notion**

#### **Notion Setup**

1.  Log in to **Notion** and go to **Settings > Connections**.
2.  Create a **new internal integration**.
3.  Create a **new page** and add a **Database**.
4.  Add the following columns to the database:
    -   **Date**
    -   **Title**
    -   **Author**
    -   **Link**
5.  Connect the integration you created to the page.
6.  Retrieve the **page ID**:
    -   Copy the Notion page URL, for example: `https://www.notion.so/paoloronco/DATABASE-IDv=altro(che non serve)`.
    -   Take the entire value before `?v=` and use it as the **Database ID** in Make.com.

#### **Setup on Make.com**

-   Enter the **Database ID** you copied.
-   Map the fields:
    -   **Title** → `{{1.yoast_head_json.title}}`
    -   **Link** → `Link`
    -   **Date** → `Date`
    -   **Author** → `{{1.yoast_head_json.schema.@graph[].author.name}}`

* * *

### **STEP 4: Filtering to Prevent Length Errors**

-   Between **Notion Create Database Item** and **Notion Append Page Content**, add a filter with **max operator: 10000**.
-   This prevents errors caused by article length.

* * *

### **STEP 5: Appending Content to Notion**

-   **Page ID**: enter the correct value.
-   **Type**: `Paragraph`.
-   Leave all other options at their default settings.

* * *

## **Results and Potential Enhancements**

-   The system **automatically imports** new WordPress posts into Notion without requiring manual intervention.
-   Potential enhancements include:
    -   Adding more **metadata** (categories, tags, images).
    -   Automating post sharing on other platforms.
    -   Integrating **Google Sheets** for backups or analysis.

This automation demonstrates how **Make.com** can simplify content management and streamline workflows.
