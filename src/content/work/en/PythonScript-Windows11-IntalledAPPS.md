---
title: "Windows 11 Installed Apps Exporter"
summary: "A Python script that gathers applications installed on Windows 11 and automatically creates a text inventory on the desktop."
category: "tool"
stack: ["Python", "Windows 11", "WMIC"]
problem: "Creating a readable inventory of installed software can require manually checking several screens and system sources."
solution: "The script queries installed products through WMIC, normalizes application names, and writes the result to `installed_apps.txt`."
outcome: "A local, shareable inventory of applications present on the PC, produced in a single run."
featured: false
order: 15
draft: false
links:
  - label: "GitHub repository"
    href: "https://github.com/paoloronco/PythonScript-Windows11-IntalledAPPS"
---

## Quick inventory

The project reduces collection of installed applications to one standalone script. When processing completes, the text file is saved to the user's desktop.

## Usage

Python on Windows 11 is the only requirement; run `script.py` without external services or cloud configuration.
