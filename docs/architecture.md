# Architecture Overview

This document describes the high-level architecture of DevPortfolio Pro.

## System Diagram

```mermaid
graph TD
    subgraph Client["Browser"]
        A[Next.js App<br/>React + Tailwind CSS]
        B[Theme System<br/>next-themes]
        C[i18n<br/>next-intl]
    end

    subgraph Server["Next.js Server"]
        D[App Router<br/>Server Components]
        E[API Routes<br/>Route Handlers]
        F[Middleware<br/>Locale Routing]
    end

    subgraph External["External APIs"]
        G[GitHub API<br/>GraphQL]
        H[WakaTime API<br/>REST]
    end

    subgraph Cache["Caching Layer"]
        I[In-Memory Cache<br/>TTL-based]
        J[Upstash Redis<br/>Production]
    end

    A --> D
    A --> E
    F --> D
    E --> I
    I --> G
    I --> H
    J -.-> G
    J -.-> H

    style Client fill:#1e293b,color:#f8fafc
    style Server fill:#334155,color:#f8fafc
    style External fill:#164e63,color:#f8fafc
    style Cache fill:#362c76,color:#f8fafc
```

## Data Flow

1. **Page Request**: Browser → Middleware (locale detection) → Server Component → Render
2. **Dashboard Data**: Client → API Route → Cache Check → External API → Response
3. **Contact Form**: Client → API Route → Zod Validation → Rate Limit Check → Process

## Key Design Principles

- **Server-first**: Server Components by default, client only when needed
- **API Proxy**: External APIs accessed only through server-side routes
- **Graceful Degradation**: Demo data when APIs are unavailable
- **Separation of Concerns**: Components, lib, i18n, and API routes clearly separated
