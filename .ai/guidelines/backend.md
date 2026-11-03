# Backend Guidelines

Rules:

- Use `adonisjs` skills for code generation. This only contains general guidelines.

## A. Controllers

- General lifecycle: parse input → call validator → call service → return Inertia response / response with code (e.g. response.forbidden(), response.notFound()).
- If controllers method contains simple business logic or once used logic, that must be not in service. E.g. simple CRUD
- If business logic includes other aspect or more complex, separate it and move to separate service
- Use resource-style (based on Laravel) naming convention: `index`, `store`, `show`, `update`, `destroy`.

Example: See `./backend/controllers.md`

## B. Transformers

- All **model instances** that passed to `inertia.render()`, must be via transformers.
- Except model instances, like js native types (number, string, etc) can passed without transformers

Example: See `./backend/transformers.md`

## C. Services

- One class or set of functions per domain concern (e.g. `PostService`).
- Own transactions, cross-model orchestration, external API calls.
- Independently testable without an HTTP context.

## D. Models (Lucid ORM)

- All models in `#models/{models}` extended from `#database/schema.ts`
- Use `lucid` skills for code generation

### E. Validators (VineJS)

- One validator file per domain: `#validators/{domain}.ts`.
- Never inline in controllers.
- Docs: <https://vinejs.dev/docs/schema_101>
- Use `adonisjs` skills as is declare vinejs reference
- See `backend/vinejs.md`
