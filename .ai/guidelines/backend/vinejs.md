# VineJS Schema Composition

```ts
// #validators/user.ts

const userSchema = vine.object({
  id: vine.number(),
  username: vine.string(),
  email: vine.string().email(),
  password: vine.string(),
  role: vine.string(),
})

// Create/update pair — partial + omit sensitive fields
export const createUserValidator = vine.create(userSchema)

export const updateUserValidator = vine.create(
  userSchema.partial(['email', 'username']).omit(['password'])
)

// Compose into other schemas
const postSchema = vine.object({
  title: vine.string(),
  author: userSchema.clone().nullable(), // reuse as nullable nested object
  // author: vine.object({ ...userSchema.pick(['id', 'username']) }), // or spread a subset
})
```

**Pattern reference:**

- Nullable nested object → `.clone().nullable()`
- Spread subset of fields → `...userSchema.pick(['a', 'b'])` / `...userSchema.omit(['password'])`
- Create/update pair → `.partial()` (all) or `.partial(['a', 'b'])` (some), chain `.omit()` to strip fields
