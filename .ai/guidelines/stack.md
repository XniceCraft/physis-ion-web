# Tech Stack

- **Backend**: AdonisJS V7, Lucid ORM, VineJS, `@adonisjs/mail`, `@adonisjs/transmit` (SSE)
- **Frontend**: Inertia.js + React 19, TailwindCSS V4, Shadcn UI, React-hook-form, Zod
- **Package Manager**: pnpm

## Folder Structure

```text
app/
  controllers/        # HTTP controllers — thin, delegate to services
  exceptions/         # AdonisJS exception handler
  jobs/               # AdonisJS jobs
  middleware/         # Middleware
  models/             # Lucid models (extended from database/schema.ts)
  services/           # Business logic
  transformers/       # Serialize backend data for Inertia frontend
  validators/         # VineJS validators
database/
  migrations/
  seeders/
  factories/          # Test factories ({model}_factory.ts)
  schema.ts           # Generated schema — run: node ace schema:generate
inertia/
  css/                # Tailwind v4 CSS (app.css with @theme)
  pages/              # Inertia pages — follows Next.js App Router structure
  components/
    ui/               # Shadcn-generated components (owned, editable)
    {group}/          # App-specific components grouped by type
  hooks/
  lib/
    validators/       # Zod schemas for react-hook-form
  providers/
  types/              # Shared TS types
  app.tsx             # Client entry
  ssr.tsx             # SSR entry
start/
  env.ts              # Env parser — import env from '#start/env'
  routes.ts
  kernel.ts
tests/
  unit/               # Service/util tests — no HTTP
  functional/         # Full HTTP tests
```
