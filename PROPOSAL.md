# Redesign sito personale — Paolo Ronco

**Profilo:** Cyber Security Analyst · Security · AI/LLM · Cloud · DevOps/DevSecOps · Automazione · Open Source · Knowledge Sharing
**Stato attuale:** WordPress + NicePage (paoloronco.it) → da sostituire con sito custom.

---

## Concept guida: "Il sito È lo strumento"

Per una figura tra Security, AI e Automazione il sito non deve *descrivere* la competenza ma *dimostrarla* nel modo in cui è costruito. Tre principi:

1. **Prova, non affermazione** — dati live (GitHub, Hugging Face, uptime self-hosted), non claim statici.
2. **Operabile come un tool** — command palette (⌘K) come spina dorsale: naviga, cerca e contiene l'AI.
3. **Calma tecnica, non cyberpunk** — griglia svizzera, densità controllata, monospace sui metadati, security headers A+, security.txt. I dettagli che i peer notano.

Direzione visiva: **technical editorial** (autorevolezza di una pubblicazione di ricerca security + magazine a griglia svizzera). L'opposto dell'AI-slop.

---

## 1. Architettura

- Sito **custom statico-first**, content in Git, deploy su edge (Cloudflare Pages / Vercel).
- **Edge function proxy** verso il webhook n8n del chatbot (nasconde l'endpoint, rate-limit, auth, CORS).
- Content layer: articoli MDX + Content Collections; progetti/CV come dati strutturati (YAML/JSON).
- Data layer: GitHub API + Hugging Face API in build/ISR; endpoint `/status` per i servizi self-hosted.
- AI layer: n8n self-hosted esistente, intatto, mai esposto al client.

## 2. UX

- Doppio binario d'ingresso (LinkedIn→CV, GitHub/HN→progetti/articoli), risolto nell'above-the-fold.
- Keyboard-first (⌘K) ma pienamente usabile con mouse/touch.
- Lettura senza attrito: TOC sticky, progress, tempo di lettura, copy-code, dark/light, RSS.
- Template "case file" coerente per ogni progetto.
- Motion solo funzionale; `prefers-reduced-motion` rispettato.

## 3. Sitemap

```
/                 Home — sintesi + prove live + 3 percorsi
/about            Chi sono + infra/homelab
/cv               CV interattivo filtrabile + PDF export
/work             Portfolio filtrabile
/work/[slug]      Case file di progetto
/writing          Articoli
/writing/[slug]   Articolo MDX
/uses             Stack & strumenti
/now              Cosa sto facendo ora
/ask              AI assistant full-screen
/status           Uptime servizi self-hosted
/contact          Contatti + PGP
meta: /rss.xml /sitemap.xml /llms.txt /.well-known/security.txt /humans.txt
```

## 4. Wireframe

Home: header con ⌘K → posizionamento (1 riga) → StatWidget live (commits / models HF / uptime) → 2 CTA → progetti in evidenza (3 case file) → articoli recenti → /now.

Case file: tag + stack → PROBLEMA / CONTESTO / SOLUZIONE (con diagramma) / STACK / RISULTATO → link repo/demo/articolo.

Articolo: TOC sticky + progress + meta → corpo MDX con code copy, callout, note → condividi/RSS/correlati.

Command palette: campo unico → NAVIGA / AZIONI / CHIEDI (entra nell'AI).

## 5. Design System

- **Colore:** base inchiostro (#0B0E11 / paper #F7F6F3), **un solo accento** (amber terminale #E8A33D o signal blue #3B82F6). danger/ok solo per /status e callout. Niente gradienti.
- **Tipografia:** grotesque forte (Inter Tight/Geist) o serif editoriale (Source Serif) per la prosa; monospace (JetBrains/Geist Mono) per dati e metadati.
- **Spaziatura:** scala 4px; griglia 12 col; prosa ~68ch.
- **Motion:** 120–240ms, easing cubic-bezier(.2,.8,.2,1).
- **Texture:** griglia sottile + grain impercettibile. Mai scanline.
- **Componenti:** StatWidget, CaseFile, TagFilter, CommandPalette, CodeBlock, Callout, Timeline, StatusRow.

## 6. Tecnologie

| Layer | Scelta | Perché |
|---|---|---|
| Framework | **Astro** | statico-first, 0 JS default, Content Collections type-safe, isole solo dove servono |
| Articoli | **MDX + Content Collections** | markdown + componenti, validazione in build |
| Editor opz. | **Decap/TinaCMS** | GUI stile-WordPress sopra Git |
| Interattività | Svelte/React islands | solo palette e chat |
| Styling | Tailwind + design tokens | |
| Search | **Pagefind** | ricerca statica, zero backend |
| Hosting | **Cloudflare Pages** / Vercel | edge + edge functions per proxy chatbot |

Alternativa app-like: Next.js. Per content+portfolio vince Astro.

## 7. WordPress vs Custom → Custom

WordPress+NicePage = markup gonfio, performance mediocri, estetica template, superficie d'attacco. Custom statico = A+ security headers, Lighthouse ~100, controllo totale, ed è esso stesso un portfolio item. Si mantiene l'idea "scrivere facile" (Markdown + GUI opzionale), non la piattaforma.

## 8. Strategia contenuti

- 3 pilastri: Security in pratica · AI/LLM applicata · Automazione/DevSecOps.
- Formato "case file" per i progetti.
- Cadenza realistica: 1 articolo di qualità ogni 2–3 settimane.
- Ogni articolo collegato a un progetto (internal linking); ogni articolo arricchisce anche il chatbot.
- Struttura pillar + cluster.

## 9. SEO

- Tecnica: statico → CWV verdi, sitemap/robots/canonical, JSON-LD (Person, Article, BreadcrumbList, SoftwareSourceCode).
- `llms.txt` per AEO (Answer Engine Optimization).
- On-page: title/description, OG image dinamiche, heading semantici, alt.
- Topical authority su nicchie (n8n+security, self-hosted LLM).
- Distribuzione: RSS + cross-post canonico (dev.to/Medium) + LinkedIn/HN.
- Redirect 301 dai vecchi URL WordPress.

## 10. Chatbot (importante ma non centrale)

1. Dentro la command palette (⌘K): stesso campo naviga e chiede.
2. Pagina dedicata `/ask` full-screen (destinazione, non home).
3. Risposte con citazioni → motore di scoperta dei contenuti.
4. client → edge proxy → webhook n8n (streaming SSE). Webhook mai esposto, rate-limit, timeout.
5. Fallback dignitoso: se n8n è giù, la palette resta navigazione.

## 11. Idee distintive (wow)

1. ⌘K come spina dorsale (nav + search + AI).
2. Prove live da GitHub/HF/uptime.
3. `/status` del homelab.
4. Diagramma della propria infra ("personal SOC") in /about.
5. Case file investigativi.
6. Dettagli da peer: security.txt, headers A+, easter egg in console, humans.txt, llms.txt.
7. `/now` + build log.
8. OG image generate per articolo/progetto.
9. CV doppio formato (interattivo on-site + PDF export pulito).

## Roadmap

1. **MVP (sett. 1–2):** Astro + design system + Home + /work + /writing con 2–3 contenuti reali. Deploy edge.
2. **Fase 2:** command palette + chatbot via proxy + prove live.
3. **Fase 3:** /cv interattivo, /status, /now, OG images, meta-files, SEO/JSON-LD.
4. **Migrazione:** redirect 301.

---

## Confronto opzioni articoli

| Opzione | Pro | Contro | Complessità | Costi | Manutenibilità |
|---|---|---|---|---|---|
| **A. Headless CMS** (Strapi/Directus/Sanity/Contentful) | editor ricco, multi-utente, media library | altro servizio da gestire/proteggere, vendor lock-in (Sanity/Contentful), DB da mantenere (Strapi/Directus) | Media-Alta | Strapi/Directus self-host = server; Sanity/Contentful = free tier poi a pagamento | Media |
| **B. Markdown/MDX in Git** ✅ consigliata | zero backend, versionato, type-safe, performance, portabile, gratis | scrivere = file (mitigabile con Decap/Tina) | Bassa | ~0 | Alta |
| **C. WordPress headless** (solo backend articoli) | riusi contenuti esistenti, editor noto | mantieni WP (update/security), API REST/GraphQL extra, infra ibrida | Media | hosting WP | Bassa-Media |
| **D. Markdown + GUI Git-based** (Decap/Tina sopra opz. B) | editor WordPress-like + vantaggi di B | piccola config iniziale | Bassa-Media | ~0 | Alta |

**Raccomandazione:** Opzione **B** come fondamento, con **D** (Decap/TinaCMS) se serve una GUI di scrittura. Evita C: tenere WordPress vivo vanifica metà dei benefici (security, performance, semplicità).
