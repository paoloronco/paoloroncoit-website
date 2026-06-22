# GitHub Project Catalog Design

## Goal

Populate the portfolio's Projects section with fifteen selected GitHub repositories. Each project must have a complete Italian and English case-file page, accurate descriptions based on the repository documentation, and a direct link to its GitHub repository.

## Scope

The catalog contains these repositories in this order:

1. `paoloronco/n8n-templates`
2. `paoloronco/AI-RAG-docuquery-app`
3. `paoloronco/Lynx`
4. `paoloronco/tab-session-saver`
5. `paoloronco/infra-agent`
6. `paoloronco/heretic-models`
7. `paoloronco/spotify_to_ytmusic`
8. `paoloronco/ai-photo-renamer`
9. `paoloronco/enclave`
10. `paoloronco/WorthTheHours`
11. `paoloronco/GoogleCloud-Inventory-Automation`
12. `paoloronco/skills-website`
13. `paoloronco/Disk-Management-APP`
14. `paoloronco/CloudFlare-DDNS-Updater`
15. `paoloronco/PythonScript-Windows11-IntalledAPPS`

No redesign of the Projects section, content schema, navigation, or global styles is included.

## Content Architecture

Use the existing Astro `work` content collection. Create one Markdown entry per language and repository under `src/content/work/it` and `src/content/work/en`, for thirty entries total.

Every entry will provide the existing required frontmatter fields:

- `title`: readable project name.
- `summary`: concise portfolio-card description.
- `category`: one existing filter category: `security`, `ai`, `automation`, `cloud`, or `tool`.
- `stack`: technologies verified from repository documentation.
- `problem`: the need addressed by the project.
- `solution`: the project's documented technical approach.
- `outcome`: a factual description of the usable result, without unsupported metrics.
- `links`: at minimum a `GitHub repository` link to the canonical URL.
- `order`: the one-based position from the approved list.
- `featured`: true only for the first three projects.
- `draft`: false.

The Markdown body will add a short overview and a focused capabilities or architecture section when the repository documentation supports it. Italian and English entries will convey equivalent facts with natural localization rather than word-for-word translation.

## Presentation And Ordering

The `/work` and `/en/work` archives will render all fifteen projects through the existing dossier-row component and existing category filters. Ordering follows the approved list.

The homepage currently displays the first three entries by `order`; therefore `n8n-templates`, `AI-RAG-docuquery-app`, and `Lynx` will be the selected projects in both languages. Their `featured` values will also be set to true so the content metadata matches that intent.

Each dossier row links to the localized case-file page. Each case-file page exposes a clear external link to the corresponding GitHub repository using the existing link presentation.

## Content Accuracy

Repository README files, repository metadata, and checked-in configuration files are the source of truth for descriptions and technology labels. Content must not claim performance gains, adoption, production readiness, security guarantees, or supported platforms unless documented by the repository.

If a repository provides sparse documentation, the case file will remain concise and describe only observable purpose, implementation, and outputs. Repository names and URLs retain their canonical capitalization and spelling, including `PythonScript-Windows11-IntalledAPPS`.

## Failure And Edge Cases

- A repository with no detailed README still receives a valid entry using verified repository metadata and code structure.
- External links open through the current case-file behavior and must use valid HTTPS GitHub URLs.
- All entries must satisfy the existing Zod schema; no optional field will be used as a substitute for a required fact.
- Language pairs must share the same `order`, category, stack, featured state, and canonical repository URL.

## Verification

Verification will include:

1. A content check confirming fifteen Italian and fifteen English entries, unique order values from 1 through 15, matching language pairs, and exact repository URLs.
2. The project's existing field-manual check and Astro production build.
3. Inspection of `/`, `/en/`, `/work`, `/en/work`, and representative localized case-file pages to confirm ordering, links, filters, and readable layout.
4. A Git diff review ensuring the change is limited to project content and any narrowly necessary content-validation test.
