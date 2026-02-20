# MSAPortfolio

My Modern Portfolio with Interactive Dashboard & Multi-Language Support (EN/ID).

Built with **Next.js 15**, **TypeScript**, **Tailwind CSS v4**, **Framer Motion**, and **next-intl**.

## Features

- 🌐 **Bilingual** — English & Indonesian with URL-based routing
- 🌗 **Dark/Light Mode** — Smooth theme transitions
- 📊 **Developer Dashboard** — GitHub stats, WakaTime, analytics, typing performance
- 🎨 **Modern Design** — Glassmorphism, gradient animations, micro-interactions
- ⚡ **Performance** — Server Components, dynamic imports, caching
- 🔒 **Security** — API route validation (zod), rate limiting, secure headers
- 📱 **Responsive** — Mobile-first design with adaptive navigation
- 🔍 **SEO** — Dynamic metadata, OpenGraph, JSON-LD, sitemap, hreflang

## Getting Started

### Prerequisites

- Node.js 20+
- npm

### Installation

```bash
# Install dependencies
npm install

# Copy environment variables
cp .env.example .env.local

# Start development server
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000)

### Environment Variables

| Variable               | Required | Description                               |
| ---------------------- | -------- | ----------------------------------------- |
| `NEXT_PUBLIC_SITE_URL` | No       | Site URL (default: http://localhost:3000) |
| `GITHUB_TOKEN`         | No       | GitHub personal access token              |
| `GITHUB_USERNAME`      | No       | GitHub username                           |
| `WAKATIME_API_KEY`     | No       | WakaTime API key                          |
| `CONTACT_EMAIL`        | No       | Contact form recipient                    |
| `SENTRY_DSN`           | No       | Sentry error monitoring DSN               |

> Dashboard displays demo data when API keys are not configured.

## Project Structure

```
src/
├── app/
│   ├── [locale]/         # Locale-based pages (Home, About, Projects, Contact, Dashboard)
│   └── api/              # API routes (contact, github, wakatime, health)
├── components/
│   ├── layout/           # Navbar, Footer, ThemeToggle, LanguageSwitcher
│   ├── ui/               # Reusable components (Button, Card, Badge, etc.)
│   └── dashboard/        # Chart components (dynamically loaded)
├── i18n/                 # Internationalization config
├── lib/                  # Utilities, constants, API helpers, env validation
├── messages/             # Translation files (en.json, id.json)
└── styles/               # Global CSS with Tailwind v4 theme
```

## Scripts

| Command         | Description              |
| --------------- | ------------------------ |
| `npm run dev`   | Start development server |
| `npm run build` | Build for production     |
| `npm start`     | Start production server  |
| `npm run lint`  | Run ESLint               |

## Deployment

### Vercel (Recommended)

Push to GitHub and connect to [Vercel](https://vercel.com). Set environment variables in the dashboard.

### Docker

```bash
docker-compose up -d
```

## Documentation

- [Architecture Overview](docs/architecture.md)
- [ADR Decisions](docs/adr/decisions.md)

## License

MIT
