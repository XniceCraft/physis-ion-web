# Frontend Guidelines

## A. HTML

- Minimize DOM depth and complexity
- Minimize unnecessary classes and aria
- No custom attributes without asked, e.g. id's, data-*
- Use `html` skills for code generation

## B. TypeScript & React

- No `any`; use `unknown` + narrowing
- Type-only imports: `import type { X }`
- Never write once used variable
- Use `typescript-advanced-types` skills for code generation
- Function declarations (not arrow functions)
- Named exports `{}` except page components (default export).
- **Never** write components props type into separate type (interface/type) unless it's reused
- Use `vercel-composition-patterns`, `vercel-react-best-practices` skills for code generation

## C. Tailwind CSS

- No `tailwind.config.ts`
- Tokens go in `@theme {}` inside `inertia/css/app.css`
- Never hardcode hex/px; always reference tokens (`bg-brand`, `rounded-card`)
- Dynamic values only → inline style.
- Use `tailwind-design-system` and `tailwind-4-docs` skills for code generation

> [!WARN] Always: `import { cn } from '@/lib/utils'` for class merging.

## D. Shadcn UI

- Install via `pnpm dlx shadcn@latest add <component>`.
- Treat as owned code; edit directly.
- Check `components/ui/` before building custom primitives.
- Keep CSS vars in the same `@theme`/`:root` block.
- Use `shadcn` skills for code generation

## E. SSR

- Guard all browser APIs: `typeof window !== 'undefined'`

## F. Pages and Local Components

- One file per route, path matches `inertia.render()` exactly.
- Local components: `pages/{route}/_components/{name}.tsx`.
- Group by subfolder if more than one domain.

## G. Backend Props

- Always type via generated data + InertiaProps:

```ts
import { InertiaProps } from '@/types'
import { Paginate } from '@/types/paginate'
import { Data } from '@generated/data'

export default function Index({ posts }: InertiaProps<{ posts: Paginate<Data.Post[]> }>) {}
```

- For non-model data (e.g. `calendar: Record<string, boolean>`), manually match the frontend type.
- If `inertia/types/paginate.ts` doesn't exists, create one:

```ts
export type Paginate<T> = {
  data: T
  metadata: {
    total: number
    perPage: number
    currentPage: number
    lastPage: number
    firstPage: number
  }
}
```

## H. Link, Routing, and Head

- Use `<Link route="..." routeParams={{}}>` from `@adonisjs/inertia/react`.
- Use `<Head title="Home" />` from `@inertiajs/react`.
- Use `urlFor()` from `@/client` (Tuyau) for programmatic URLs.

```ts
import { urlFor } from '@/client'

const url = urlFor('home')
const paginationUrl = urlFor('posts.index', {}, { qs: { page: 2 } })
```

### I. Zod Validation

- Always `import { z } from 'zod/mini'`.
- See `frontend/zod.md`

### J. Form

- `react-hook-form` + `zodResolver`.
- Submit via `router.visit()`, map server errors via `setError()` in `onError`.
- See `frontend/form.md`
