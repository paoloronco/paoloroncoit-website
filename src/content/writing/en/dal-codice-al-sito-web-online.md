---
title: "From Code to Online Website"
description: "Developing a website through code requires web programming skills and in-depth knowledge of languages such as HTML, CSS, JavaScript, and others, along with familiarity with servers, FTP tools, and other utilities."
pubDate: 2023-12-02
tags: ["kali-linux","proxmox","web"]
draft: false
---
Developing a website through code requires web programming skills and in-depth knowledge of languages such as HTML, CSS, JavaScript, and others, along with familiarity with servers, FTP tools, and other utilities. This detailed guide will illustrate the complete process for bringing a manually developed website online, from choosing a domain to hosting and uploading the files.

**1\. Domain Purchase:**  
The first step is purchasing a domain from a domain registrar such as GoDaddy, Namecheap, or others. The domain is the web address of your site (e.g., [www.yoursite.com](http://www.yoursite.com/)).

**2\. Choosing Hosting:**  
Hosting is the space on the web where your website files will be hosted. You can opt for shared hosting (Linux or Windows) or self-hosting using services like AWS, DigitalOcean, or a personal server.

-   **Shared Linux Hosting vs. Windows Hosting vs. Self-Hosting with CloudFlare:**
    -   Shared Linux hosting is popular for its reliability, security, and support for programming languages such as PHP and MySQL. It's ideal for most websites.  
        With providers like Aruba, Register, OVHcloud, Siteground, GoDaddy, it ranges around 30€/year.
    -   Windows hosting is specific for sites that require ASP.NET or other Microsoft-specific technologies.  
        Usually slightly more expensive, we are around 30-40€/year.
    -   Self-hosting with CloudFlare offers greater control and flexibility, allowing you to manage the server from home or a cloud provider.  
        Initially free for small sites. However, considering maintaining a personal server, it's necessary to factor in the cost of purchasing the server, energy, and maintenance. CloudFlare offers a basic free plan for smaller sites but may involve additional costs for more advanced ones.

**3\. FTP Connectivity and File Upload:**  
Once hosting is acquired, you need to use an FTP client like FileZilla to connect to the server and upload your website files. This process requires the server's IP address, username, and password provided by the hosting service.

**4\. DNS Configuration and CloudFlare:**  
DNS (Domain Name System) is a system that translates web addresses into IP addresses, allowing browsers to find websites. Often, with Windows/Linux hosting from providers like Aruba, Register, OVHcloud, Siteground, GoDaddy, DNS is pre-configured and does not require changes, unless you want to use advanced services offered by CloudFlare.

**5\. GitHub and Predefined Templates:**  
Platforms like GitHub offer templates and ready-to-use projects. Developers can download an existing project, customize it, and upload it to their own server.

**Case Study: Hosting and Online Presence of Paolo Ronco's Sites:**

-   The site [https://prportfolio.paoloronco.it](https://prportfolio.paoloronco.it/) is hosted on a Ubuntu container in Paolo’s personal server and brought online via CloudFlare.
-   The site [https://paoloronco.it](https://paoloronco.it/) is hosted through Aruba, and developed manually by Paolo.

In conclusion, bringing an online website developed through code requires a series of technical steps. Following this guide enables you to make your website accessible and visible worldwide. Choosing hosting, configuring the domain, and using tools like FTP and CloudFlare are crucial for project success.
---

