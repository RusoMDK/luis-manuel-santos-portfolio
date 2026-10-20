# Luis Manuel Santos — Engineering Portfolio

A bilingual engineering portfolio focused on tangible work: KWAD (multi-tenant B2B SaaS), FORTES / SIGIES, and real-time IoT systems.

## Technology

- Next.js App Router, React, and strict TypeScript conventions
- Tailwind CSS and composable presentation components
- `next-intl` translations for Spanish and English
- Motion for progressive enhancement, with reduced-motion support

## Development

```bash
pnpm install
pnpm dev
pnpm lint
pnpm build
pnpm test:content
```

> `test:content` uses Node's built-in test runner to verify locale parity and critical portfolio facts without adding dependencies. It is not a substitute for component-level or end-to-end testing.

## Repository structure

- `app/[locale]`: localized routes and metadata
- `components/marketing/sections`: page sections
- `components/marketing/shared`: reusable presentation components
- `config/site.ts`: profile, project metadata, URLs and assets
- `messages/{es,en}.json`: localized copy
- `tests`: automated checks for copy and content contracts

## Engineering decisions

1. **Claims should be verifiable.** The featured KWAD project describes architecture and contributions without exposing proprietary source code or inventing customer metrics.
2. **Accessibility before animation.** Respect reduced-motion preferences and maintain semantic landmarks, labels and keyboard-friendly links.
3. **Code in English, UI in the reader's language.** Identifiers, comments and documentation are in English; user-facing copy is translated.
4. **Typed boundaries.** Prefer explicit prop and domain types; avoid `any` and unsafe casts.
5. **Functional consistency over stylistic dogma.** Arrow functions are reasonable for components and callbacks, but function declarations are valid TypeScript and not automatically deprecated.

## Next improvements

- Add verified KWAD screenshots and a substantial case study, with sensitive tenant data removed.
- Add component tests with Vitest + React Testing Library and user-flow tests with Playwright.
- Replace the PDF assets under `public/docs` with the approved, updated CVs.
- Run production build, accessibility checks and Lighthouse before merging.

## Privacy

KWAD is private proprietary software. Do not publish source files, tenant credentials, personal data or internal architecture documents.
