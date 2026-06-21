# Field Manual Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the current dark, glow-heavy portfolio interface with the approved Field Manual editorial system across every existing public page while preserving content, localization and interactions.

**Architecture:** Keep Astro views, content collections and vanilla interaction scripts in place. Establish the new visual contract in global tokens and shared shell components, then migrate page families in order: home, archives/details, supporting pages and overlays. A small Node contract test catches accidental reintroduction of banned visual patterns, while Astro checks, production builds and browser QA cover behavior.

**Tech Stack:** Astro 5, Tailwind CSS 4, TypeScript, local Fontsource packages, vanilla JavaScript, Astro ClientRouter.

---

## File Map

- Modify `src/styles/global.css`: Field Manual tokens, typography, layout primitives, motion and responsive rules.
- Modify `src/layouts/Base.astro`: paper/ink theme metadata and shared body treatment.
- Modify `src/components/SiteHeader.astro`: operational grid header and mobile navigation.
- Modify `src/components/SiteFooter.astro`: oversized dark contact close.
- Modify `src/components/SectionHead.astro`: numbered editorial section heading.
- Modify `src/components/CaseFileCard.astro`: reusable dossier row.
- Modify `src/components/Motion.astro`: structural reveals, optional parallax and reduced-motion compliance.
- Modify `src/components/views/*.astro`: migrate home, archive, detail and supporting page layouts.
- Modify `src/components/CommandPalette.astro`, `src/components/ChatWidget.astro`: preserve behavior, migrate chrome.
- Create `scripts/check-field-manual.mjs`: static design-contract checks.
- Modify `package.json`: add `check:design` command.

### Task 1: Add The Design Contract

**Files:**
- Create: `scripts/check-field-manual.mjs`
- Modify: `package.json`

- [ ] **Step 1: Write a failing static contract check**

```js
import { readFile } from 'node:fs/promises';

const files = ['src/styles/global.css', 'src/components/views/HomeView.astro'];
const source = (await Promise.all(files.map((file) => readFile(file, 'utf8')))).join('\n');
const required = ['--color-paper', '--color-signal', 'field-hero', 'dossier-row'];
const missing = required.filter((token) => !source.includes(token));
if (missing.length) {
  console.error(`Missing Field Manual contract: ${missing.join(', ')}`);
  process.exit(1);
}
```

- [ ] **Step 2: Add and run the command**

Add `"check:design": "node scripts/check-field-manual.mjs"` to `package.json`, then run `npm run check:design`.

Expected: FAIL listing all four missing contract tokens.

- [ ] **Step 3: Commit the failing contract**

```bash
git add package.json scripts/check-field-manual.mjs
git commit -m "test: add field manual design contract"
```

### Task 2: Build The Shared Field Manual Shell

**Files:**
- Modify: `src/styles/global.css`
- Modify: `src/layouts/Base.astro`
- Modify: `src/components/SiteHeader.astro`
- Modify: `src/components/SiteFooter.astro`
- Modify: `src/components/SectionHead.astro`

- [ ] **Step 1: Replace global color and typography tokens**

Define paper/ink tokens and map the existing utility names to them so unmigrated views remain readable during the transition:

```css
@theme {
  --color-paper: #e9e5d9;
  --color-ink: #11110f;
  --color-signal: #f04a0b;
  --color-text: #11110f;
  --color-muted: #625d52;
  --font-display: 'Space Grotesk Variable', Arial, sans-serif;
  --font-mono: 'JetBrains Mono Variable', monospace;
  --font-editorial: Georgia, 'Times New Roman', serif;
}
```

- [ ] **Step 2: Implement reusable editorial primitives**

Add `.field-shell`, `.field-section`, `.field-rule`, `.field-label`, `.field-display`, `.field-serif`, `.signal-button`, `.outline-button`, `.dossier-row` and focus styles. Include a `320px` no-overflow rule and `prefers-reduced-motion` overrides.

- [ ] **Step 3: Rebuild the header and footer markup**

Use a three-column header on desktop, a `PR/` mark, current-route underline, square command trigger and a ruled full-width mobile drawer. Use `info@paoloronco.it` as the footer's primary action and preserve legal/social links.

- [ ] **Step 4: Convert `SectionHead` to the numbered heading contract**

Keep its public props compatible, render the eyebrow as an index label, left-align by default and use editorial accent text rather than a colored pill.

- [ ] **Step 5: Make the design contract pass**

Run: `npm run check:design && npm run check && npm run build`

Expected: all commands exit 0.

- [ ] **Step 6: Commit the shell**

```bash
git add src/styles/global.css src/layouts/Base.astro src/components/SiteHeader.astro src/components/SiteFooter.astro src/components/SectionHead.astro
git commit -m "feat: establish field manual design system"
```

### Task 3: Rebuild The Home Page

**Files:**
- Modify: `src/components/views/HomeView.astro`
- Modify: `src/components/CaseFileCard.astro`
- Modify: `src/i18n/ui.ts`

- [ ] **Step 1: Replace the hero structure**

Implement `.field-hero` with role/location metadata, the three-line statement `SYSTEMS. / SECURITY. / EVIDENCE.`, localized supporting copy, two existing localized CTAs, status stamp and `/paolo.png` documentary crop.

- [ ] **Step 2: Convert project cards to dossier rows**

Render index, title, summary, stack/category and arrow in a ruled grid. Hover/focus inverts the row to signal orange and preserves readable contrast.

- [ ] **Step 3: Replace card grids with editorial fields**

Render operating areas as a single four-column ruled field, recent writing as dated archive rows and the technology list as a CSS-only continuous ticker.

- [ ] **Step 4: Add localized statement strings**

Add matching Italian and English keys for location/status and the three-line hero statement without altering existing routes or collection data.

- [ ] **Step 5: Verify home rendering**

Run: `npm run check:design && npm run check && npm run build`

Expected: all commands exit 0 and both `/` and `/en/` are generated.

- [ ] **Step 6: Commit the home**

```bash
git add src/components/views/HomeView.astro src/components/CaseFileCard.astro src/i18n/ui.ts
git commit -m "feat: rebuild home as operational field manual"
```

### Task 4: Migrate Archives And Detail Pages

**Files:**
- Modify: `src/components/views/WorkIndexView.astro`
- Modify: `src/components/views/WritingIndexView.astro`
- Modify: `src/components/views/CaseFileView.astro`
- Modify: `src/components/views/ArticleView.astro`
- Modify: `src/styles/global.css`

- [ ] **Step 1: Replace archive card collections with rows**

Work uses numbered dossier rows and retains category filtering. Writing uses dated rows with title, description, tags and reading time; filters remain keyboard operable.

- [ ] **Step 2: Redesign case-file metadata**

Use an oversized title, a ruled metadata rail and an editorial body column. Preserve all schema.org output and external links.

- [ ] **Step 3: Redesign article reading chrome**

Use a readable `68ch` body, strong serif article title, metadata rail and updated prose/code/callout styles. Preserve article JSON-LD.

- [ ] **Step 4: Verify route generation and filtering**

Run: `npm run check && npm run build`

Expected: all collection routes build with no Astro diagnostics.

- [ ] **Step 5: Commit archive and detail pages**

```bash
git add src/components/views/WorkIndexView.astro src/components/views/WritingIndexView.astro src/components/views/CaseFileView.astro src/components/views/ArticleView.astro src/styles/global.css
git commit -m "feat: migrate archives and detail pages"
```

### Task 5: Migrate Supporting Pages And Overlays

**Files:**
- Modify: `src/components/views/AboutView.astro`
- Modify: `src/components/views/CvView.astro`
- Modify: `src/components/views/SkillsView.astro`
- Modify: `src/components/views/ContactView.astro`
- Modify: `src/components/views/AskView.astro`
- Modify: `src/components/views/LegalView.astro`
- Modify: `src/components/CommandPalette.astro`
- Modify: `src/components/ChatWidget.astro`

- [ ] **Step 1: Apply the document hierarchy to supporting pages**

Use consistent page indices, oversized titles, ruled sections and square controls. Convert CV cards to a chronological ledger, Skills to operating-range tables, Contact to channel rows and About to an editorial bio/portrait composition.

- [ ] **Step 2: Restyle AI surfaces without changing behavior**

Command palette and chat use paper/ink/signal chrome, square corners, visible focus and unchanged selectors/scripts. Ask uses the same conversation styling.

- [ ] **Step 3: Verify interactive selectors remain present**

Run:

```powershell
rg "data-cmdk-root|data-chat-toggle|data-ask-form|data-mobile-toggle|data-skills-toggle" src/components
npm run check
```

Expected: every selector appears and Astro exits 0.

- [ ] **Step 4: Commit supporting pages**

```bash
git add src/components/views src/components/CommandPalette.astro src/components/ChatWidget.astro
git commit -m "feat: complete field manual page migration"
```

### Task 6: Implement Structural Motion And Accessibility

**Files:**
- Modify: `src/components/Motion.astro`
- Modify: `src/styles/global.css`

- [ ] **Step 1: Remove tilt behavior and add structural motion**

Keep intersection reveals, add a `data-parallax` transform driven through `requestAnimationFrame`, and skip all motion when `matchMedia('(prefers-reduced-motion: reduce)')` matches.

- [ ] **Step 2: Add clipped text and rule animations**

Use `.field-reveal-line`, `[data-reveal]` and `.field-rule` transitions. Continuous ticker animation must stop under reduced motion.

- [ ] **Step 3: Verify accessibility-oriented CSS and types**

Run:

```powershell
rg "prefers-reduced-motion|focus-visible|aria-current" src
npm run check
```

Expected: required rules/attributes are present and Astro exits 0.

- [ ] **Step 4: Commit motion**

```bash
git add src/components/Motion.astro src/styles/global.css
git commit -m "feat: add accessible structural motion"
```

### Task 7: Browser QA And Fidelity Pass

**Files:**
- Modify: any files above where QA finds a mismatch

- [ ] **Step 1: Run the production verification suite**

Run: `npm run check:design && npm run check && npm run build`

Expected: all commands exit 0.

- [ ] **Step 2: Start the production preview and inspect desktop**

Open `/`, `/work`, `/writing`, one case file, one article, `/skills`, `/cv`, `/about`, `/ask` and `/contact`. Verify navigation, language switching, command palette, chat, filters and links.

- [ ] **Step 3: Inspect mobile and reduced motion**

At `390x844` and `320x700`, verify no horizontal overflow, readable hero line breaks, usable mobile menu and 44px primary targets. Emulate reduced motion and verify that all content is immediately visible.

- [ ] **Step 4: Capture and compare screenshots**

Capture the home at the concept's desktop width and at `390px`. Use `view_image` on the accepted concept and latest implementation screenshot; compare hero hierarchy, palette, type personality, portrait crop, section order, ruled container model and footer.

- [ ] **Step 5: Fix every material mismatch and rerun checks**

Run: `npm run check:design && npm run check && npm run build`

Expected: all commands exit 0 and no fixable visual mismatch remains.

- [ ] **Step 6: Commit final QA repairs**

```bash
git add src package.json scripts/check-field-manual.mjs
git commit -m "fix: finish field manual visual QA"
```
