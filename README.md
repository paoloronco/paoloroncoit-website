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
| Analytics | Google Analytics + Microsoft Clarity (optional, loaded after analytics consent via Termly) |

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
npm run test:agents # Markdown conversion and negotiation regression tests
npm run test:seo   # verification-file validation and broken language-link regression tests
npm run agents:audit # verify generated Markdown, discovery and API language isolation
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

Termly loads first in the page head from `src/components/Analytics.astro`, with Auto Blocker enabled. Google Analytics and Clarity load only after analytics consent; withdrawal disables them and reloads the page. The footer opens the consent preferences. Banner settings are managed in Termly (the current free plan supports English only).

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

Set `featured: true` for a main project: it appears in the first Projects section and on the homepage. Other projects appear in the second section. Set `order` in both languages to control the order within each section; category filters apply to both groups and hide empty sections.

Every build generates a white 1200×630 PNG cover for each project's Italian and English page, using its title, summary, category and first four technologies. Covers use the site's Space Grotesk font and are rendered locally with Sharp, without AI or external services. Their URLs include a content fingerprint, so content changes produce a new image URL. Existing unversioned cover URLs remain available with the English cover.

Writing articles use the same automatic covers, with their localized title, description and first four tags. No image or additional frontmatter is needed. Open Graph, Twitter and Article structured data select the article's cover automatically; drafts do not generate covers.

Open Graph and Twitter metadata select the correct localized project cover automatically. For a custom project override, set `socialImage: "/og/custom/homelab-backup.png"` and add that file under `public/og/custom/`.

Run `npm run test:social` to check rendering and cache fingerprints. After deployment, use [LinkedIn Post Inspector](https://www.linkedin.com/post-inspector/) for any article or project URL that LinkedIn has already cached; IT and EN URLs are inspected separately. Existing LinkedIn entries may need the link removed and added again after refreshing its preview.

Both collection schemas are defined in `src/content.config.ts`.

### AI agent access

Every build generates Markdown from each rendered page's main content, including Italian and English pages, tables and code blocks. The existing Turndown dependencies run at build time only. Pages stay static; Vercel routes requests with an acceptable `Accept: text/markdown` to the corresponding `.md` file. `q=0` opts out. HTML and Markdown declare `Vary: Accept`; direct Markdown files use `text/markdown`. Unknown Markdown page requests retain HTTP 404.

`public/llms.txt` documents both languages and usage guidance. `robots.txt` and response headers declare `search=yes, ai-input=yes, ai-train=no`. Discovery headers advertise the sitemap, llms.txt, RFC 9727 API catalog and OpenAPI specification. The catalog describes only the read-only published-articles API.

`/api/terminal/writings.json?lang=it|en` runs on demand so the language query is evaluated per request. Its existing response shape, Italian fallback, draft filtering and five-minute public cache remain intact. The chat proxy is not part of the public API catalog.

After deployment, run `npm run agents:audit -- https://paoloronco.it` to also verify HTTP negotiation, cache order, discovery content types and API responses on the live site.

`npm run seo:audit` checks the built pages, sitemap, language alternates, internal references and migration redirects. Google HTML ownership-verification files are validated against their expected token separately from editorial pages; their original contents must remain intact. Published writing articles need matching Italian and English entries so both the language selector and hreflang links resolve.

---

## License

Code: [MIT](./LICENSE)  
Content (articles, projects): © Paolo Ronco — all rights reserved.
