---
title: "Infra Agent"
summary: "An AI agent for SSH-based diagnostics, monitoring, and controlled operations across homelabs, Linux servers, and Proxmox environments."
category: "ai"
stack: ["Python", "SSH", "Docker", "Proxmox"]
problem: "Investigating different hosts requires repetitive movement between shells, logs, and tools, while risky commands should not run without human control."
solution: "The app centralizes hosts and conversations, gathers read-only diagnostics, and submits risky SSH actions to an explicit propose, approve, or deny workflow."
outcome: "A persistent operations interface for investigating services, resources, disks, processes, and networks while keeping the user in the decision loop."
featured: false
order: 5
draft: false
links:
  - label: "GitHub repository"
    href: "https://github.com/paoloronco/infra-agent"
  - label: "Documentation"
    href: "https://paoloronco.github.io/infra-agent/"
---

## Assisted, controlled operations

Infra Agent stores chats with host context, manages model providers, and includes tools for registering machines and generating SSH keys. Potentially invasive operations require an explicit decision.

## Deployment

The project includes a production installer for systemd and Nginx, plus a Docker image and Compose configuration for container-based environments.
