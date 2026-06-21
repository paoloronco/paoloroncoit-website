# Field Manual Redesign

**Date:** 2026-06-21  
**Status:** Approved for MVP implementation

## Objective

Redesign the existing Astro portfolio into a distinctive, modern and animated personal site that demonstrates technical judgment instead of resembling a generic AI or SaaS landing page. Preserve the existing content model, Italian and English routes, SEO, analytics, command palette, chat, and static-first architecture.

## Creative Direction

The approved direction is **Field Manual / Operational Editorial**. The site should feel like an authored technical dossier: direct, precise, tactile and recognizably Paolo Ronco.

- Palette: warm ivory paper, near-black ink, signal orange as the only expressive accent.
- Typography: assertive grotesk for display, editorial serif for human emphasis, monospace for navigation, indices and metadata.
- Composition: asymmetric editorial grids, oversized type, ruled rows, numbered sections and deliberate overlaps.
- Avoid: glow effects, glassmorphism, gradients, pill-heavy UI, generic card grids, fake dashboards, cyberpunk decoration and vague AI language.
- Photography: Paolo's portrait is treated as documentary evidence with a hard-edged crop, not as a floating avatar.

## Information Architecture

The existing routes remain intact. Shared header, footer, command palette, chat widget and language switching are redesigned as one system.

### Home

1. Compact operational header with PR mark, primary navigation and command trigger.
2. Asymmetric hero with role/location metadata, oversized statement, portrait, concise introduction and two direct actions.
3. Continuous capability ticker.
4. Three selected projects displayed as numbered dossier rows.
5. Four operating areas displayed as a single ruled field rather than independent cards.
6. Recent writing displayed as a dated archive index.
7. High-impact contact footer.

### Index Pages

Work and writing use dense archive layouts with strong filtering, numbered or dated rows, and informative hover/focus expansions. Skills becomes an operating-range document rather than proficiency percentages. CV, About, Contact and Ask use the same editorial shell and page-specific layouts.

### Detail Pages

Case files and articles preserve all existing content while adopting a readable editorial column, strong metadata rail, sticky progress/context where useful, and typographically distinct callouts and code blocks.

## Design System

### Tokens

- Paper: `#e9e5d9`
- Ink: `#11110f`
- Muted ink: `#625d52`
- Signal: `#f04a0b`
- Hairline: current ink at controlled opacity
- Maximum content width: approximately `1320px`
- Text measure: `62-72ch` for prose

The existing local font packages are reused. Space Grotesk/Hanken Grotesk provides display type, a system serif stack provides editorial contrast, and JetBrains Mono provides operational metadata.

### Components

- `SiteHeader`: compact grid, active-route marker, mobile drawer and command trigger.
- `SectionHead`: numbered editorial heading with no eyebrow pill.
- `CaseFileCard`: converted from a rounded card to an expandable dossier row.
- `ArchiveRow`: shared dated/indexed row for projects and writing where appropriate.
- `SiteFooter`: dark closing field with oversized contact statement.
- `CommandPalette` and `ChatWidget`: restyled to match the document system without changing their behavior.

## Motion And Interaction

Motion conveys structure and state rather than decoration.

- Hero lines reveal through clipped masks on first load.
- Portrait and selected large elements use restrained scroll parallax.
- Rules draw or slide into position as sections enter the viewport.
- Dossier rows shift and invert to signal selection.
- The ticker moves continuously at a readable speed.
- Astro page transitions preserve continuity between archive and detail views.
- A custom cursor is optional and desktop-only; it must never be required for understanding controls.
- `prefers-reduced-motion: reduce` disables all nonessential transforms, parallax and continuous animation.

## Responsive Behaviour

Desktop uses asymmetric 12-column compositions. Tablet reduces overlaps and preserves the document hierarchy. Mobile becomes a single-column field manual: large but controlled type, portrait behind or beneath the hero statement, two-column operating areas, simplified metadata and full-width touch targets. No horizontal overflow is permitted at 320px width.

## Accessibility

- Maintain semantic landmarks and the existing skip link.
- Preserve visible keyboard focus and full keyboard access to navigation, palette, filters and dialogs.
- Meet WCAG AA contrast for body copy and controls.
- Keep minimum 44px touch targets where controls are compact.
- Ensure motion reduction works without hiding content.

## Architecture And Data Flow

Astro 5, Tailwind v4, content collections and the current i18n utilities remain. The redesign changes presentation and small interaction scripts, not routing or data ownership. Home, archive and detail views continue to receive localized content from the existing collections. No new backend, client framework or runtime dependency is required for the MVP.

## Error And Empty States

Existing content collection failures remain build-time errors. Empty project or article collections render a clear editorial empty state rather than leaving a blank section. Chat/API errors retain their current functional fallback but adopt the new visual language. Image failures must not collapse layout or obscure text.

## Verification

- Run `npm run check` and `npm run build`.
- Verify the rendered site in the in-app browser at desktop and mobile widths.
- Exercise navigation, language switching, mobile menu, command palette, chat entry points, project links and article links.
- Compare the accepted Field Manual concept against final browser screenshots for layout, typography, palette, spacing, portrait treatment, section order and motion.
- Confirm reduced-motion behavior, keyboard focus and absence of horizontal overflow.

## MVP Scope

The MVP includes the global design system, shared shell and all current public page types so the site feels coherent end to end. It does not add new data providers, live GitHub/Hugging Face metrics, new routes or a CMS. Those remain future enhancements and must not block the redesign.
