# Transformers Examples

## Examples

```ts
import UserTransformer from '#transformers/user_transformer'
// app/transformers/post_transformer.ts
import { BaseTransformer } from '@adonisjs/core/transformers'

import type Post from '#models/post'

export default class PostTransformer extends BaseTransformer<Post> {
  toObject() {
    return {
      ...this.pick(this.resource, ['id', 'title', 'createdAt', 'updatedAt']),
      author: UserTransformer.transform(this.resource.author),
    }
  }

  async forDetailedView() {
    return {
      ...this.toObject(),
      content: await markdownToHtml(this.resource.content),
    }
  }
}
```

## Usage in Controller

```ts
import PostTransformer from '#transformers/post_transformer'

export default class PostsController {
  async index({ inertia }) {
    const posts = await Post.query().preload('author')
    return inertia.render('posts/index', {
      posts: PostTransformer.transform(posts),
    })
  }

  async indexWithPagination({ inertia, request }) {
    const page = request.input('page', 1)
    const limit = request.input('limit', 20)
    const posts = await Post.query().preload('author').paginate(page, Math.min(limit, 25))
    return inertia.render('posts/index', {
      posts: PostTransformer.transform(posts.all(), posts.getMeta()),
    })
  }

  async show({ params, inertia }) {
    const post = await Post.query().preload('author').where('id', params.id).firstOrFail()
    return inertia.render('posts/show', {
      post: PostTransformer.transform(post).useVariant('forDetailedView'),
    })
  }
}
```
