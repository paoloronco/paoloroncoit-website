---
title: "Over-Engineering an Homelab: Logging, Backup and Business Continuity with Ubuntu Server"
description: "This article stems from a very concrete problem: knowing for sure if backups work without having to manually check scattered logs, opaque cron scripts... "
pubDate: 2026-01-22
tags: []
draft: false
---
This article stems from a very concrete problem: knowing for sure if backups work without having to manually check scattered logs, opaque cron scripts and unreliable notifications.

In my homelab (which remains _a home_, not an enterprise data center) I decided to apply **business continuity and disaster recovery principles** typical of professional environments:

- deterministic and verifiable logging
- clear separation between _execution_ and _control_
- principle of _fail-closed_ (better more alerts than lost backups)
- immutable external audit trail

The result is an architecture centered around **Ubuntu Server**, redundant backups (Oracle Cloud + Hetzner), **Google Cloud for logging** and a workflow **n8n** that validates every day that everything went well.

This article explains the **architecture**, the **technical choices** and the **why**. The n8n workflow is a paid product: I describe it transparently, but without releasing sensitive or replicable information one-by-one.

* * *

## The Real Problem (Before)

Before this architecture, the flow was the classic:

- cron job → rsync / rclone
- local logs
- manual control "when it happens"
- alerts only in case of obvious errors

This approach has three structural flaws:

1. **Silence ≠ success**  
    If a job doesn't start or dies halfway, you often don't find out right away.
2. **Local logs = single point of failure**  
    If you lose the VM, you also lose proof that the backup _was_ started.
3. **Wasted human time**  
    Reading raw logs is costly and error-prone.

From here, the decision to _over-engineer consciously_ was made.

* * *

## Project Objectives

The objectives were not "to do cool things", but to be **operationally at ease**:

- know **every day** if all jobs ran
- know **which job failed and why**
- have immutable logs **outside the server**
- be able to prove what happened later (audit)
- zero reverse dependencies: control should never touch the server

![](/posts/over-engineering-un-homelab-logging-backup-e-business-continuity-con-ubuntu-server/image-1024x597.png)

* * *

## High-Level Architecture

```
Ubuntu Server (on-prem / Proxmox)
 ├─ cron
 ├─ rsync / rclone
 ├─ structured logs
 │
 ├─ Google Cloud Logging (streaming)
 └─ Google Cloud Storage (log snapshots)
          │
          ▼
        n8n (monitoring & validation)
          │
          ├─ check log presence
          ├─ deterministic parsing
          ├─ content analysis
          └─ alerts / tickets
```

Key separation:

- **Ubuntu Server executes**
- **n8n observes**

No SSH, no API towards the server. Zero trust on the data producer.

* * *

## Ubuntu Server as Foundation

Ubuntu Server is the starting point:

- VM on Proxmox
- local storage + dedicated disks
- versioned scripts (Git)
- simple but observable cron

### Structured Logs, Not "Random Text"

Every backup job produces logs with:

- `START`, `RSYNC_END`, `SUMMARY`, `END` markers
- unique `run_id`
- `rc`, duration, warnings, errors

This allows:

- deterministic parsing
- detecting incomplete runs
- distinguishing warnings from failures

It's not "human-readable" logging; it's **machine-readable** logging.

* * *

## Redundant Backups ≠ Business Continuity

Making more copies is not enough.

**Business Continuity** requires:

- knowing that _all_ copies were updated
- knowing when a copy isn't
- reacting proportionally

For this:

- Oracle Cloud and Hetzner are only _targets_
- the truth is in the logs
- continuity is in automatic verification

* * *

## External Logging: Google Cloud

Logging is divided into two complementary channels.

### 1. Google Cloud Logging (streaming)

- near-real-time ingestion of rsync logs
- fast queries
- immediate troubleshooting
- very low costs (often zero)

Used for:

- analysis
- debugging
- operational visibility

### 2. Google Cloud Storage (immutable snapshots)

- daily upload of logs
- deterministic path `YYYY/MM/DD`
- versioning and retention
- service account with minimal permissions

Used for:

- audit
- independent verification
- input to the n8n workflow

This bucket is the **source of truth** for monitoring.

* * *

## The Role of n8n (Monitoring, Not Backup)

The n8n workflow **does not perform backups**.

It only does three things in order:

1. **Verify presence**  
    Do all expected logs exist today?
2. **Verify integrity**  
    Does every log have coherent START/END/SUMMARY?
3. **Semantic verification**  
    Errors? Warnings? Anomalous patterns?

If anything is missing or doesn't match → alert.

### Why n8n?

- readable workflows
- versionable
- extensible
- decoupled from the server

The value is not "the automation", but **validation**.

* * *

### Where to Buy It

- **Official Shop**: [https://shop.paoloronco.it](https://shop.paoloronco.it/23-backup-sync-execution-validation-log-driven.html)
- **Gumroad**: [https://paoloronco.gumroad.com](https://paoloronco.gumroad.com/l/ReliableBackup-SyncExecutionValidation)
- **n8n Creators Hub / Templates**: in development

## Why It's a Paid Workflow

This workflow:

- encapsulates months of real debugging
- handles edge cases (incomplete, duplicate, partial runs)
- is designed to be **extended**, not just used

It doesn't sell magic.  
It sells **time saved** and **errors avoided**.

### Where to Buy It

- shop.paoloronco.it
- Gumroad
- n8n Creators Hub (template)

Sensitive code remains mine.  
The architecture and principles are shared.

* * *

## Security and Key Principles

- Single-purpose Service Account
- minimal permissions
- no credentials in the workflow
- no direct server access

If n8n is compromised:

- can only _read public logs for it_
- cannot touch backups or servers

This is **applied zero trust to a homelab**.

* * *

## What This Architecture Has Taken Off My Plate

- daily manual control
- anxiety from "will it run?"
- nighttime debugging
- useless logs

In return, I have gained:

- measurable trust
- meaningful alerts
- audit trail
- operational peace of mind

* * *

## Conclusion

This project was not born to prove that _it can be done_.

It was born because **I no longer wanted to waste time doubting the backups**.

Even in a homelab, data matters.  
And when data matters, **logging is part of the backup**, not a detail.

Over-engineering? Maybe.  
But it's an over-engineering that sleeps soundly.
