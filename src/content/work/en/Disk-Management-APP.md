---
title: "Disk Management App"
summary: "A Python desktop application for Windows that displays physical disks and exposes administrative operations through a graphical interface."
category: "tool"
stack: ["Python", "Tkinter", "PowerShell", "PyInstaller"]
problem: "Windows disk information and operations are split across graphical tools and administrative commands that are not always immediate."
solution: "The app uses a Tkinter GUI, requests elevation when required, and calls PowerShell to inspect disks, partitions, drive letters, and file systems."
outcome: "A Windows executable that brings basic disk inspection and management into one interface."
featured: false
order: 13
draft: false
links:
  - label: "GitHub repository"
    href: "https://github.com/paoloronco/Disk-Management-APP"
---

## An interface for Windows tools

The project combines Python with native PowerShell commands to gather information about physical disks and their partitions. The GUI presents the results without requiring direct terminal use.

## Distribution

The repository includes PyInstaller configuration and artifacts so the application can also be launched as a Windows executable.
