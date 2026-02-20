# ADR-001: Why Next.js App Router

## Status

Accepted

## Context

We needed a React framework that supports SSR/SSG, file-based routing, and modern server components.

## Decision

Use Next.js 15 with App Router for server-first architecture, built-in SEO optimizations, and seamless i18n routing via `next-intl`.

## Consequences

- Server Components reduce client-side JavaScript
- Built-in image optimization and font loading
- Streamlined API routes for proxy architecture
- Ecosystem maturity and Vercel deployment support

---

# ADR-002: Why next-intl

## Status

Accepted

## Context

Required bilingual support (EN/ID) with URL-based locale routing.

## Decision

Use `next-intl` for its tight App Router integration, type-safe translations, and middleware-based locale detection.

## Consequences

- URL patterns: `/en/*`, `/id/*`
- Automatic locale detection from browser headers
- JSON-based translation files for easy maintenance

---

# ADR-003: Why SWR over React Query

## Status

Accepted

## Context

Dashboard needs client-side data fetching with caching.

## Decision

Use SWR for its lightweight API and stale-while-revalidate caching strategy, aligned with HTTP cache semantics.

## Consequences

- Smaller bundle than React Query
- Built-in deduplication and focus revalidation
- Server-side cache + SWR client cache = optimal TTL strategy

---

# ADR-004: Why Tailwind CSS v4

## Status

Accepted

## Context

Need a utility-first CSS framework with dark mode support.

## Decision

Use Tailwind CSS v4 with CSS-first configuration via `@theme` directive.

## Consequences

- No `tailwind.config.js` needed — theme defined in CSS
- Native CSS layers for better specificity control
- PostCSS-based with `@tailwindcss/postcss`
