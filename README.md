# paoloronco.it

Personal portfolio and technical blog of Paolo Ronco — Cybersecurity Analyst at Deloitte (Enterprise Cloud & AI Security Team).

**Live:** [paoloronco.it](https://paoloronco.it)

---

## Stack

| Layer | Tech |
|---|---|
| Framework | [Astro 5](https://astro.build) — static-first, 0 JS by default |
| Styling | [Tailwind CSS v4](https://tailwindcss.com) — design tokens in `src/styles/global.css` |
| Content | Astro Content Collections (Markdown/MDX) — articles and projects in Git |
| Deployment | [Vercel](https://vercel.com) — edge-deployed, static output with on-demand API routes |
| i18n | Built-in Astro i18n — Italian (default) + English, explicit language selector + hreflang |
| Analytics | Google Analytics + Microsoft Clarity (optional, loaded after analytics consent via CookieYes) |

---

## Project structure

```
src/
├── data/
│   ├── site.ts           # central profile, nav, domains — single source of truth
│   ├── skills.ts         # skill categories with proficiency levels and tools
│   └── certs.ts          # certifications data
├── content/
│   ├── writing/          # 130+ articles (it/ and en/)
│   └── work/             # project case files (it/ and en/)
├── layouts/
│   └── Base.astro        # base layout — SEO, JSON-LD and hreflang
├── components/
│   ├── views/            # one view component per page
│   └── ...               # SiteHeader, SiteFooter, CommandPalette, Terminal, ChatWidget
├── pages/                # thin page files that import view components
│   └── api/              # on-demand API routes (ask proxy)
└── i18n/
    ├── ui.ts             # all UI strings in IT and EN
    └── utils.ts          # getLangFromUrl, useTranslations, localizePath
public/
├── llms.txt              # LLM-optimized site context
├── robots.txt
├── humans.txt
└── .well-known/
    └── security.txt
```

---

## Getting started

```bash
npm install
npm run dev       # dev server → http://localhost:4321
npm run build     # static build → dist/
npm run preview   # preview the build locally
npm run check     # Astro type-check
```

---

## Environment variables

Set these in Vercel under **Project Settings → Environment Variables** (or in a local `.env`):

```bash
# Analytics (optional — loaded after analytics consent when configured)
PUBLIC_GOOGLE_ANALYTICS_ID=G-XXXXXXXXXX
PUBLIC_MICROSOFT_CLARITY_ID=your-clarity-project-id

# AI assistant proxy — /api/ask forwards to an n8n self-hosted webhook
N8N_WEBHOOK_URL=https://your-n8n-instance/webhook/ask
```

CookieYes loads directly from `src/components/Analytics.astro` to manage consent.

---

## Content migration scripts

Scripts in `scripts/` cover a full WordPress → Astro migration pipeline:

```bash
# 1. Import posts from a WordPress XML export → Markdown articles in writing/it/
node scripts/import-wordpress.mjs "path/to/export.xml"

# 2. Download remote post images locally → public/posts/<slug>/
node scripts/download-post-images.mjs

# 3. Translate IT articles → EN (writing/en/) via LLM
#    Free with local Ollama:
LLM_BASE_URL=http://localhost:11434/v1 LLM_MODEL=qwen2.5:7b node scripts/translate-articles.mjs
#    Or with OpenAI:
LLM_API_KEY=sk-... LLM_MODEL=gpt-4o-mini node scripts/translate-articles.mjs
#    Options: LIMIT=10 (first N only), FORCE=1 (re-translate existing)
```

---

## Adding content

**New article:** copy `src/content/writing/_template.md.txt`, place it in `writing/it/<slug>.md` (and optionally `writing/en/<slug>.md`), fill in the frontmatter.

**New project:** copy `src/content/work/_template.md.txt`, place it in `work/it/<slug>.md` and `work/en/<slug>.md`.

For an optional social cover, add `socialImage: "/og/projects/homelab-backup.png"` to the project's frontmatter and place the image at `public/og/projects/homelab-backup.png`. Open Graph and Twitter previews use this image; omitting the field keeps the default `/paolo.png`.

Both collection schemas are defined in `src/content.config.ts`.

---

## License

Code: [MIT](./LICENSE)  
Content (articles, projects): © Paolo Ronco — all rights reserved.
