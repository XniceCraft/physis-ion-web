# Controllers Example

## 1

```ts
// app/controllers/lobbies_controller.ts
export default class LobbiesController {
  async index({ inertia, params, request }: HttpContext) {
    const page = request.input('page', 1)
    const matchQuery = Match.query().preload('creator').withCount('players')

    try {
      const query = await matchQueryValidator.validate(params)
      if (query?.mode && query?.mode !== 'all') {
        matchQuery.where('mode', query.mode)
      }
      if (query?.status && query?.status !== 'all') {
        matchQuery.where('status', query.status)
      }
    } catch {}

    const matches = await matchQuery.paginate(page, 25)

    return inertia.render('lobby/public/index', {
      matches: MatchTransformer.paginate(matches.all(), matches.getMeta()),
    })
  }
}
```

## 2

```ts
// app/controllers/posts_controller.ts
export default class PostsController {
  async store({ request, response, auth }: HttpContext) {
    const user = auth.use('web').user!

    const payload = await request.validateUsing(createPostValidator)
    const post = await PostService.create(user, payload)

    return response.redirect().toRoute('posts.show', { id: post.id })
  }
}
```
