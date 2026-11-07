---
title: "How I Secure My Homelab: Firewalls, Wazuh, Splunk and PatchMon"
description: "A practical look at my homelab security: UniFi segmentation, Proxmox firewalls, Wazuh, Splunk, PatchMon, automation and backups."
pubDate: 2026-11-07
tags: ["cybersecurity", "homelab", "proxmox", "wazuh", "splunk", "patchmon"]
draft: false
---

A homelab often starts as a place to experiment. You install a hypervisor, add a few virtual machines, then gradually introduce containers, web applications, automations and remote access. Eventually the question changes from “how do I make this work?” to “who can reach it, what happens if it is compromised, and how would I notice?”

Cybersecurity is both my profession and one of my main interests. My lab gives me a place to test configurations and operational procedures on real systems, within the limits of home hardware, time and budget. I don't pretend it's a miniature enterprise SOC.

My approach combines **network segmentation and firewalls**, **Wazuh** for endpoint visibility, **Splunk** for log analysis and detection, and **PatchMon** for patch management and compliance. Controlled remote access, backups and periodic reviews complete the picture. The value is not the number of tools installed, but how they are used and where their limitations become visible.

## Security architecture at a glance

This is a logical diagram, not a physical network inventory. Device models, IP addresses and administrative details are deliberately omitted. Arrows show telemetry flows and intended integrations, not unrestricted access between VLANs.

![Logical homelab security architecture: UniFi, Proxmox, Wazuh, Splunk, PatchMon, n8n and backups](/posts/cybersecurity-homelab/security-architecture.svg)

*Simplified logical architecture. PatchMon does not forward application alerts directly to Splunk.*

Importantly, **PatchMon does not currently forward its application alerts directly to Splunk**. Wazuh alerts and inventory data reach Splunk through a dedicated collector. Keeping operational integrations separate from planned ones is essential when evaluating security coverage.

## Network segmentation comes first

The first defense is not a dashboard. It's limiting the paths devices and services can take through the network.

My networking environment uses the **UniFi ecosystem**, with separate networks for the main LAN, office, IoT, homelab, selected DMZ services and guests. The goal is not to maximize the number of VLANs, but to prevent a smart device, guest client or published application from reaching unrelated systems and management interfaces.

Traffic from IoT to internal networks is generally restricted, with narrowly defined exceptions for integrations such as Home Assistant. Policies are directional: allowing Home Assistant to communicate with an IoT device does not mean granting that device unrestricted access back into the homelab.

A network isn't secure simply because it's labeled a DMZ. Effective firewall rules, listening services and actual reachability tests are what matter. When changing a policy, I check that legitimate flows still work and unauthorized ones are denied.

I also consider **IPv6** independently. With public prefixes delegated by my ISP, an IPv4 policy does not automatically guarantee equivalent IPv6 protection.

## Proxmox: a second firewall layer

I run virtual machines and LXC containers on **Proxmox VE**. Its firewall adds another control layer beyond UniFi. The host has restrictive inbound rules, while several containers have policies that limit allowed ports and source networks.

For PatchMon, for instance, I separate access to its web interface from administrative traffic. The same principle applies to other services.

One of the most useful audit findings was that **checking “Firewall” on a Proxmox NIC does not prove that an effective guest policy is enforced**. Some containers had the NIC flag enabled but the guest policy disabled; some VMs had no active guest rules. In one review, Home Assistant relied on UniFi and internal controls because the PVE firewall on its NIC was not enabled.

A reassuring checkbox is not evidence. I inspect effective configurations and test network paths. Before sensitive changes, I back up the configuration, prepare rollback, update one guest at a time and test both allowed and denied traffic. A firewall change that locks me out is not a successful improvement.

## Wazuh: visibility inside endpoints

Firewalls control network paths but cannot explain everything happening within a machine. I use **Wazuh**, including its manager, indexer, dashboard and agents on supported systems.

My monitoring includes **Security Configuration Assessment (SCA)** and CIS benchmarks, **File Integrity Monitoring (FIM)**, rootcheck, software inventory and vulnerability detection.

These capabilities answer practical questions: has a sensitive file changed? Are there unusual authentication events? Does a host meet its expected configuration baseline? Which installed packages match known CVEs?

Vulnerability management has been particularly instructive. At one point, my lab reported hundreds of Critical findings and thousands of High findings. Updates and further investigation improved the picture significantly, although some critical issues remained.

**A CVE finding is not proof of compromise.** I verify package versions, vendor advisories, actual applicability and feasible remediation. Likewise, zero findings do not guarantee zero risk. Kernel issues and packages with limited security support deserve special attention.

Coverage isn't universal either. Some systems lack native agents, and an enrolled agent doesn't necessarily mean fresh telemetry. I'd rather acknowledge these limitations than present a misleading coverage percentage.

## Splunk: making logs useful

I use **Splunk** as a central platform for log collection, searching and analysis. It receives data from Linux, Proxmox, applications, web services, UniFi and backup components. A dedicated collector also imports selected Wazuh telemetry.

I don't want to store logs for their own sake. I want to reconstruct incidents, recognize anomalies and receive actionable notifications. I've built dashboards and scheduled searches for authentication, system health, security events and operational issues.

My **Wazuh Security Operations** dashboard combines CVE inventory, agent health, CIS assessment results and observed alerts. It supports filtering by host, severity and CVE, and separates kernel-related findings from other packages.

An important distinction is that **a currently present vulnerability is not the same as an alert observed over time**. One is a condition requiring assessment; the other is an event requiring interpretation.

### Splunk and n8n: automation and notifications

Selected Splunk searches send authenticated webhooks to **n8n**, which handles part of the alert enrichment and routing workflow. I've worked on separating credentials, authenticating requests and using a relay to avoid secrets in URLs.

This pipeline still has gaps: payload validation, retries, deduplication, end-to-end delivery verification and detection of silent log sources need further work. A configured alert is not necessarily a delivered alert, and a scheduled search isn't automatically an effective detection.

## PatchMon: controlled patch management

I run **PatchMon** in a dedicated container to track hosts, available updates, patch history and compliance checks. It gives me a centralized view of maintenance needs without checking every machine manually.

I deliberately **don't install every update automatically on every host**. Experimental workloads share the lab with services that support networking, backups and automation. An unexpected reboot can cause significant disruption.

My approach is to review advisories, dependencies and impact, prepare rollback, apply updates carefully and validate the services afterward. Selective autopatching on non-critical hosts is a possible next step, not something I claim to have deployed everywhere.

Integration boundaries matter here too: Wazuh monitors the OS hosting PatchMon, **not automatically every application event in its database**, and Splunk currently has no direct feed of PatchMon application alerts.

## My vulnerability management workflow

I try to make remediation repeatable rather than reactive:

1. **Detection:** Wazuh reports a vulnerability or PatchMon identifies pending updates.
2. **Verification:** I check package, version, advisory, exposure and available fixes, using Splunk logs when relevant.
3. **Prioritization:** Beyond CVSS, I consider reachability, the host's role, known exploitation and potential impact.
4. **Remediation:** I prepare a backup or rollback, apply changes in an appropriate window and reboot only if necessary.
5. **Validation:** I verify services, logs, network access, agent health and updated scan results.

A practical example was hardening my security webhooks. During a review, I found issues involving token handling and access paths. I separated credentials, removed secrets from URLs and confirmed unauthenticated requests were rejected. I also documented remaining limitations, including the absence of active anti-replay protection on the general webhook route.

This is why I value a homelab: I can discover an issue, fix it and verify whether the fix actually works.

## Remote access and resilience

For remote access, I use **Tailscale**, **Twingate** and **Cloudflare Tunnel with Access**, depending on the use case. My goal is to avoid indiscriminately exposing management interfaces to the public Internet.

Reachability, authentication and authorization are separate controls. A password-protected page can still be reachable from too many networks; a working tunnel doesn't prove every access policy has been tested.

Backups are part of security too. I maintain periodic Proxmox backups and additional offsite and cloud copies. They aren't prevention or detection, but they make recovery possible after mistakes, failures or data loss. Retention, access permissions, integrity and **restore tests** matter more than a green backup job indicator.

## What I still want to improve

The lab keeps evolving. I want to narrow overly broad inter-VLAN exceptions, complete tests from real client devices, review container privileges and improve IPv6 ACL handling. For detection, I need better alert tuning, log freshness monitoring and notification delivery verification.

I'm also experimenting with AI-assisted triage through n8n: collecting read-only evidence from Wazuh, Splunk and affected hosts, then producing a reasoned summary. **Recommending remediation must not mean giving an AI agent unrestricted administrative privileges.** Sensitive actions need least-privilege access and approval.

Another priority is expanding vulnerability coverage to Docker images, application dependencies, plugins and firmware. Operating-system package findings don't describe the entire attack surface.

## How to build something similar

I wouldn't start by installing four security platforms. I'd inventory hosts, ports, services and important data first. Next I'd add segmentation, testable firewall rules and backups with at least one restore test. Only then would I introduce endpoint monitoring, centralized logging and patch management.

Wazuh, Splunk and PatchMon require resources and ongoing maintenance. In a smaller lab, fewer well-configured tools may be more useful than a complex stack that isn't properly maintained. My setup also reflects my interest in technologies related to my professional work.

## Final thoughts

Homelab security isn't measured by how many tools are installed. It's about **understanding systems, restricting access, recognizing meaningful events and responding without losing control**.

Firewalls, Wazuh, Splunk and PatchMon offer complementary perspectives. The most valuable work happens between them: validating configurations, investigating false positives, documenting issues and repeating tests after changes.

My setup isn't finished or invulnerable. It's an environment where I can learn, make controlled mistakes and turn cybersecurity concepts into practical experience.
