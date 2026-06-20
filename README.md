# paoloronco.it — v0.4

Sito personale di Paolo Ronco (Cyber Security Analyst). Reinterpretazione completa:
statico-first, edge-deployed, "il sito è lo strumento".

Vedi [PROPOSAL.md](./PROPOSAL.md) per la strategia completa (architettura, UX, design
system, SEO, integrazione chatbot, idee distintive).

## Stack
- **Astro 5** — statico-first, 0 JS di default
- **Tailwind v4** — design tokens in `src/styles/global.css`
- **Content Collections** (MDX) — articoli e progetti in Git (`src/content/`)
- Accento: **signal blue** (`#3B82F6`)

## Comandi
```bash
npm install      # installa le dipendenze
npm run dev      # dev server → http://localhost:4321
npm run build    # build statico → dist/
npm run preview  # anteprima del build
npm run check    # type-check Astro
```
## Analytics configuration (Vercel)

Set these public environment variables in Vercel under **Project Settings -> Environment Variables**:

```bash
PUBLIC_COOKIEYES_ID=your-cookieyes-client-id
PUBLIC_GOOGLE_ANALYTICS_ID=G-XXXXXXXXXX
PUBLIC_MICROSOFT_CLARITY_ID=your-clarity-project-id
```

Apply them to Production (and Preview if needed), then redeploy. CookieYes loads first;
Google Analytics and Microsoft Clarity are enabled through its Analytics consent category.
If CookieYes or a provider ID is missing, that provider is not included in the generated site.

## Script di migrazione contenuti (in `scripts/`)
```bash
# 1) Importa i post da un export WordPress (.xml) -> articoli Markdown in writing/it/
node scripts/import-wordpress.mjs "percorso/export.xml"

# 2) Scarica in locale le immagini remote degli articoli -> public/posts/<slug>/
node scripts/download-post-images.mjs

# 3) Traduci gli articoli IT -> EN (writing/en/) con un LLM.
#    Gratis con Ollama locale (ollama pull qwen2.5:7b):
LLM_BASE_URL=http://localhost:11434/v1 LLM_MODEL=qwen2.5:7b node scripts/translate-articles.mjs
#    Oppure con OpenAI:
LLM_API_KEY=sk-... LLM_MODEL=gpt-4o-mini node scripts/translate-articles.mjs
#    Opzioni: LIMIT=10 (solo i primi 10), FORCE=1 (ritraduce gli esistenti)
```

## Struttura
```
src/
  data/site.ts          # profilo, nav, stats — punto unico di verità
  content.config.ts     # schema collezioni writing + work
  content/              # articoli (writing) e case file (work) in Markdown
  layouts/Base.astro    # layout + SEO/JSON-LD + meta
  components/            # SiteHeader, SiteFooter, CommandPalette, CaseFileCard
  pages/                 # home, work, writing, cv, about, ask, contact
public/                  # security.txt, humans.txt, llms.txt, robots.txt
```

## Roadmap (post-MVP)
- **Fase 2:** edge proxy `/api/ask` → webhook n8n (streaming).
- **Fase 3:** export `/cv.pdf`, OG image generate per pagina, ricerca (Pagefind).
- **Migrazione:** redirect 301 dagli URL WordPress.

## Da personalizzare
- `src/data/site.ts` → social, email, descrizione
- `src/pages/cv.astro` → dati CV reali
- `public/.well-known/security.txt` e `/contact` → chiave PGP
- `astro.config.mjs` → dominio definitivo
