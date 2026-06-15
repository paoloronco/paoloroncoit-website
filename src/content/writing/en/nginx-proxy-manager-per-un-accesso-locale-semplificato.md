---
title: "NGINX Proxy Manager for Simplified Local Access"
description: "In managing my homelab, I successfully implemented NGINX Proxy Manager as a key component to simplify local access to services and applications in my network. This article will provide an overview of how NGINX Proxy Manager enhances the experience of accessing web services on my local network."
pubDate: 2023-11-10
tags: ["proxmox","server","web"]
draft: false
---
In managing my homelab, I successfully implemented NGINX Proxy Manager as a key component to simplify local access to services and applications in my network. This article will provide an overview of how NGINX Proxy Manager enhances the experience of accessing web services on my local network.

**Initial Problem**  
Initially, accessing local applications required specific IP addresses and ports, making it impractical and hard to remember. Additionally, using self-generated certificates led to annoying security warnings in browsers.

**Implemented Solution with NGINX Proxy Manager**  
To address these issues, I adopted NGINX Proxy Manager as a reverse proxy and local DNS. This solution simplifies access to applications through custom local domains without the security warnings.

**How NGINX Proxy Manager Works**  
NGINX Proxy Manager leverages the DNS-01 certificate validation method, allowing for valid certificates to be generated for local domains without exposing the machine to public networks. This approach overcomes the limitations of the HTTP-01 method, making it possible to use wildcard certificates for subdomains.

**Practical Implementation**

1.  **Preparations:**
    -   I chose DuckDNS as a free DNS provider to simplify the process.
    -   NGINX Proxy Manager was selected as the reverse proxy due to its ease of configuration and support for Let's Encrypt DNS-01 validation.
2.  **Configuring NGINX Proxy Manager:**
    -   I ran NGINX Proxy Manager via Docker on a Debian 11 system.
    -   The docker-compose.yml file was configured with the desired services, such as Nginx Proxy Manager, Jellyfin, Home Assistant, and Nextcloud.
3.  **Configuring DNS with DuckDNS:**
    -   I created a DuckDNS domain and configured the CNAME for the desired subdomain.
4.  **Generating SSL Certificate:**
    -   Using NGINX Proxy Manager's interface, I created a valid SSL certificate for my local domain and its subdomains.
5.  **Configuring Proxies:**
    -   For each application, I added a proxy entry in NGINX Proxy Manager specifying the domain, forwarding IP, and port.
6.  **Secure Access:**
    -   Now, I can access local applications through custom domains (e.g., [https://jellyfin.local](https://jellyfin.local/)) without security warnings.

**Conclusions**

Integrating NGINX Proxy Manager into my local network has significantly improved access and management of applications, offering an elegant and secure solution. This approach represents a significant upgrade from using IP addresses and ports, contributing to the simplification of navigation through services in my homelab. For further details on advanced features of NGINX Proxy Manager, visit the official site: [nginxproxymanager.com](https://nginxproxymanager.com/).

