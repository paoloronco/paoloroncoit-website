# GitHub Project Catalog Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Publish fifteen selected GitHub projects as complete, ordered Italian and English portfolio case files.

**Architecture:** Keep the existing Astro `work` content collection and localized routes unchanged. Add paired Markdown entries under `src/content/work/{it,en}` and a focused Node validation script that checks pair parity, ordering, featured projects, and canonical GitHub links before the Astro build validates the full schema.

**Tech Stack:** Astro 5 Content Collections, Markdown, Node.js ESM, npm

---

### Task 1: Add A Failing Catalog Contract Check

**Files:**
- Create: `scripts/check-project-catalog.mjs`
- Modify: `package.json`

- [ ] **Step 1: Write the catalog contract checker**

Define the canonical repository names in approved order. For every language and repository, read `src/content/work/<lang>/<repo>.md`, parse the YAML frontmatter fields needed by the contract, and report missing files, incorrect order, mismatched `featured`, or a missing exact `https://github.com/paoloronco/<repo>` URL. The expected featured set is the first three repositories only.

- [ ] **Step 2: Register the checker**

Add this script to `package.json`:

```json
"check:projects": "node scripts/check-project-catalog.mjs"
```

- [ ] **Step 3: Run the checker and verify it fails**

Run: `npm run check:projects`

Expected: exit code 1 listing the missing Italian and English Markdown entries.

### Task 2: Add The Fifteen Italian Case Files

**Files:**
- Create: `src/content/work/it/n8n-templates.md`
- Create: `src/content/work/it/AI-RAG-docuquery-app.md`
- Create: `src/content/work/it/Lynx.md`
- Create: `src/content/work/it/tab-session-saver.md`
- Create: `src/content/work/it/infra-agent.md`
- Create: `src/content/work/it/heretic-models.md`
- Create: `src/content/work/it/spotify_to_ytmusic.md`
- Create: `src/content/work/it/ai-photo-renamer.md`
- Create: `src/content/work/it/enclave.md`
- Create: `src/content/work/it/WorthTheHours.md`
- Create: `src/content/work/it/GoogleCloud-Inventory-Automation.md`
- Create: `src/content/work/it/skills-website.md`
- Create: `src/content/work/it/Disk-Management-APP.md`
- Create: `src/content/work/it/CloudFlare-DDNS-Updater.md`
- Create: `src/content/work/it/PythonScript-Windows11-IntalledAPPS.md`

- [ ] **Step 1: Create entries 1-5**

Write factual Italian summaries and case-file fields for `n8n-templates`, `AI-RAG-docuquery-app`, `Lynx`, `tab-session-saver`, and `infra-agent`. Use GitHub metadata and README documentation as the source of truth; set orders 1-5 and mark only entries 1-3 as featured.

- [ ] **Step 2: Create entries 6-10**

Write the Italian entries for `heretic-models`, `spotify_to_ytmusic`, `ai-photo-renamer`, `enclave`, and `WorthTheHours`, with orders 6-10 and `featured: false`.

- [ ] **Step 3: Create entries 11-15**

Write the Italian entries for `GoogleCloud-Inventory-Automation`, `skills-website`, `Disk-Management-APP`, `CloudFlare-DDNS-Updater`, and `PythonScript-Windows11-IntalledAPPS`, with orders 11-15 and `featured: false`.

- [ ] **Step 4: Run the checker and confirm only English pairs remain missing**

Run: `npm run check:projects`

Expected: exit code 1 reporting fifteen missing files under `src/content/work/en` and no Italian contract failures.

### Task 3: Add The Fifteen English Case Files

**Files:**
- Create: the same fifteen filenames from Task 2 under `src/content/work/en/`

- [ ] **Step 1: Localize entries 1-5**

Create natural English equivalents for the first five case files. Keep repository names, category, stack, order, featured state, and GitHub URL identical to the Italian entries.

- [ ] **Step 2: Localize entries 6-10**

Create natural English equivalents for entries 6-10 with identical structured metadata.

- [ ] **Step 3: Localize entries 11-15**

Create natural English equivalents for entries 11-15 with identical structured metadata.

- [ ] **Step 4: Run the catalog contract check**

Run: `npm run check:projects`

Expected: exit code 0 and `Project catalog contract satisfied: 15 paired repositories.`

### Task 4: Verify Astro And Rendered Routes

**Files:**
- Verify: `src/content/work/it/*.md`
- Verify: `src/content/work/en/*.md`
- Verify: `dist/index.html`
- Verify: `dist/en/index.html`
- Verify: `dist/work/index.html`
- Verify: `dist/en/work/index.html`

- [ ] **Step 1: Run static checks**

Run: `npm run check:projects && npm run check:design && npm run check`

Expected: all commands exit 0; Astro reports no content-schema errors.

- [ ] **Step 2: Build production output**

Run: `npm run build`

Expected: exit code 0 with localized project routes generated for all thirty case files.

- [ ] **Step 3: Inspect generated project indexes and representative case files**

Confirm the Italian and English work indexes contain all fifteen project names in approved order, homepages feature `n8n-templates`, `AI-RAG-docuquery-app`, and `Lynx`, and representative generated pages contain their canonical GitHub links.

- [ ] **Step 4: Review the final diff**

Run: `git diff --check` and `git status --short`.

Expected: no whitespace errors; changes are limited to the validation script, package script, thirty project entries, and this implementation plan.
