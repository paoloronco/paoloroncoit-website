---
title: "Proxmox Backups and Snapshots"
description: "Throughout my experience managing my Proxmox VE environment, I have repeatedly faced the critical task of backing up data. In the past, I used Proxmox…"
pubDate: 2024-05-17
tags: []
draft: false
---
Throughout my experience managing my Proxmox VE environment, I have repeatedly faced the critical task of backing up data. In the past, I used Proxmox Backup Server, but I soon realized that this solution had its drawbacks: it required another dedicated PC and did not always provide the desired reliability and efficiency. While looking for a more integrated and dependable approach, I discovered a method that proved far more effective: creating snapshots directly in Proxmox VE and transferring the backups to a TrueNAS VM.

**Snapshots in Proxmox VE**: One of the most powerful features of Proxmox VE is its ability to create snapshots of virtual machines and containers quickly and efficiently. By taking advantage of this feature, I implemented a backup process that allows me to create regular snapshots of my VMs and containers directly in Proxmox VE.

**Transferring Backups to TrueNAS**: To ensure the security and availability of my backups, I configured a TrueNAS VM with a dedicated storage pool within my Proxmox VE environment. This TrueNAS machine serves as a central repository for my backups, allowing me to store them securely and reliably.

**Cloud Sync with Backblaze B2**: For additional protection and data resilience, I configured my TrueNAS VM to back up the local backups to Backblaze B2. This cloud sync runs every night, ensuring that my data remains protected even in the event of hardware failure or a local disaster.

**Benefits and Conclusions**: This approach to backups in Proxmox VE offers several benefits. First, it eliminates the need for dedicated backup hardware, simplifying my infrastructure and reducing costs. In addition, native integration with Proxmox VE and the use of TrueNAS as a central repository improve the overall efficiency and reliability of my backup process. Finally, the cloud backup to Backblaze B2 provides an additional layer of protection and the peace of mind that my data is safe even in the event of a disaster. This approach has proven to be an effective and reliable solution for managing backups in my Proxmox VE environment.
