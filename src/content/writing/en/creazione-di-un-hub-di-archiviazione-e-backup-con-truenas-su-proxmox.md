---
title: "Creation of a Storage and Backup Hub with TrueNAS on Proxmox"
description: "Implementing a reliable and secure storage system is essential to ensure data protection and facilitate access from any device. In this article, I will share my experience in creating a Virtual Machine (VM) on Proxmox with TrueNAS, formerly FreeNAS, transforming it into a complete hub for backup, storage, and multimedia streaming."
pubDate: 2023-11-13
tags: ["proxmox","server"]
draft: false
---
Implementing a reliable and secure storage system is essential to ensure data protection and facilitate access from any device. In this article, I will share my experience in creating a Virtual Machine (VM) on Proxmox with TrueNAS, formerly FreeNAS, transforming it into a complete hub for backup, storage, and multimedia streaming.

## Creation of the VM with TrueNAS on Proxmox

1.  **Initialization of the VM:**
    -   I created a dedicated VM on Proxmox, providing adequate resources to ensure optimal performance.
2.  **Installation of TrueNAS:**
    -   I proceeded with the installation of TrueNAS on the VM, following the guided procedure and configuring basic settings.
3.  **Configuration of RAID 10 Pools:**
    -   Using two 6TB hard drives each, I created pools in RAID 10 to ensure redundancy and high performance. This became the core of my backup and storage system.

## Implementation of Backup and Synchronization Tools

4.  **CloudSync:**
    -   To ensure data security even in an external location, I configured CloudSync to perform backups on a cloud storage service. This ensures a copy of the data in a remote location.
5.  **Syncthing:**
    -   For continuous file synchronization between my local devices and the server, I integrated Syncthing. This tool guarantees file consistency across all my devices.
6.  **rSync:**
    -   Using rSync, I automated the backup process between different storage units, ensuring data consistency and simplifying version management.

## Enhancing Features with Jellyfin and Netdata

7.  **Jellyfin:**
    -   By adding Jellyfin to my hub, I transformed the server into a complete multimedia center. Now I can access my media content from any device on the network.
8.  **Netdata:**
    -   Integrating Netdata provides comprehensive system monitoring, ensuring optimal performance and allowing me to intervene promptly in case of issues.

## Advantages and Final Considerations

Implementing TrueNAS on Proxmox has significantly improved data management and information security. The creation of RAID 10 pools, the use of advanced tools like CloudSync, Syncthing, and rSync, along with multimedia features from Jellyfin and detailed system monitoring from Netdata, transformed my server into a complete and versatile hub.

The ability to perform local and off-site backups, synchronize files between devices, and enjoy a centralized media library has made this project one of the most significant for me. The robustness of the system and its adaptability to evolving needs underscore the importance of an holistic approach to data management and information security.
---

