# English Developer Materials Design

## Objective

Use English consistently for repository-facing developer material while preserving the website's existing Italian and English user experience.

## Translation Scope

Translate the following material to English:

- Root development documentation, including `README.md` and `PROPOSAL.md`.
- Content authoring templates under `src/content/`.
- Source-code comments in Astro, TypeScript, JavaScript, CSS, and configuration files.
- Developer-facing CLI output, script usage text, diagnostics, and log messages.
- Other repository-facing technical prose that is not rendered as localized website content.

Do not rename files, routes, slugs, data keys, environment variables, commands, APIs, or identifiers.

## Protected Localized Content

The following content must not be translated or otherwise edited as part of this work:

- `src/content/writing/it/**`
- `src/content/writing/en/**`
- Italian and English values in `src/i18n/ui.ts`
- Localized legal text in `src/data/legal.ts`
- Localized or bilingual user-facing strings in components and data files
- Public page copy, metadata, terminal responses, labels, navigation, and accessibility text

Italian and English articles remain byte-for-byte unchanged.

## Article Audit

Run a read-only scan across every article in `src/content/writing/en/` for likely Italian fragments. Report suspicious files and examples, but do not modify either language collection. False positives such as product names, URLs, code, and quoted Italian terms should be identified as such where practical.

## Implementation Approach

Use a manual allowlist of developer-facing files and review each change in context. Avoid global replacement because many source files intentionally contain both localized UI strings and English technical text.

Translate prose without changing behavior. Preserve formatting, Markdown structure, code examples, shell commands, and links. Technical messages may be reworded slightly when needed for natural English, but their meaning and exit behavior must remain unchanged.

## Verification

Before completion:

1. Confirm the protected article directories have no diff.
2. Search non-content source and documentation for remaining Italian developer comments or messages.
3. Review the complete diff for accidental user-facing changes.
4. Run `npm run check`.
5. Run `npm run build`.
6. Report any Italian fragments found by the read-only English-article audit.

## Success Criteria

- Repository-facing documentation, templates, comments, and technical messages are in English.
- The rendered Italian and English website content is unchanged.
- No article file is modified.
- Existing checks and the production build succeed.
