> [!IMPORTANT]
> Run `pnpm oxlint`, `pnpm format` and `pnpm typecheck` after every implementation.

## Rules

**Do:**

- Follow YAGNI — build only what's needed right now
- Follow code conventions (see guidelines below)
- [ALWAYS!] Clasify the task and read relevant guidelines
- [NEVER!] Write comments
- Ask if unsure

**Don't:**

- Reformat/rewrite unrelated files
- Install packages without permission
- Create other feature even it's related, it must be user asked
- Run dev server or build without being asked

## Guidelines

| Topic                                                             | File                                      |
| ----------------------------------------------------------------- | ----------------------------------------- |
| Import aliases, website copy                                      | [general.md](.ai/guidelines/general.md)   |
| Tech stack & folder structure                                     | [stack.md](.ai/guidelines/stack.md)       |
| Backend (controllers, services, transformers, validators, models) | [backend.md](.ai/guidelines/backend.md)   |
| Frontend (HTML, React, Tailwind, Shadcn, SSR, routing, forms)     | [frontend.md](.ai/guidelines/frontend.md) |
| Testing                                                           | Use `japa` skill                          |
