# Environment-Configured Analytics Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [x]`) syntax for tracking.

**Goal:** Activate CookieYes, Google Analytics 4, and Microsoft Clarity automatically when their public IDs are configured in Vercel environment variables.

**Architecture:** A focused Astro component reads three `PUBLIC_*` build-time variables and emits provider scripts only when CookieYes and the corresponding analytics ID are present. CookieYes loads first; GA4 and Clarity scripts are categorized as analytics and Clarity sends ConsentV2 after consent.

**Tech Stack:** Astro 5, Vercel build-time environment variables, CookieYes CMP, Google tag (`gtag.js`), Microsoft Clarity.

---

### Task 1: Add a build-output integration contract test

**Files:**
- Create: `scripts/check-analytics-integration.mjs`

- [x] Assert that a build with test IDs includes all three providers, CookieYes loads first, GA4 and Clarity are categorized as analytics, and Clarity ConsentV2 is present.
- [x] Run the enabled check before implementation and verify it fails because the generated page does not include the providers.

### Task 2: Implement the analytics component

**Files:**
- Create: `src/components/Analytics.astro`
- Modify: `src/layouts/Base.astro`

- [x] Read and normalize `PUBLIC_COOKIEYES_ID`, `PUBLIC_GOOGLE_ANALYTICS_ID`, and `PUBLIC_MICROSOFT_CLARITY_ID`.
- [x] Render CookieYes only when its ID exists.
- [x] Render GA4 and Clarity only when CookieYes and their respective IDs exist.
- [x] Mark analytics scripts with `type="text/plain"` and `data-cookieyes="analytics"`.
- [x] Queue Clarity ConsentV2 with advertising denied and analytics granted after CookieYes consent.
- [x] Mount the component once in the global `<head>`.
- [x] Run the contract test and verify it passes.

### Task 3: Document Vercel configuration

**Files:**
- Modify: `.env.example`
- Modify: `README.md`

- [x] Add placeholder values for all three public IDs.
- [x] Document that Vercel must rebuild after ENV changes and that missing values disable the integrations safely.

### Task 4: Verify and publish

**Files:**
- Verify all changed files.

- [x] Run the enabled and disabled build-output checks.
- [x] Run `npm run check`.
- [x] Run `npm run build` with temporary test IDs and inspect generated HTML for all three providers.
- [x] Run `npm run build` without the CookieYes ID and confirm provider scripts are absent.
- [x] Review the intended analytics diff and exclude unrelated working-tree changes.
