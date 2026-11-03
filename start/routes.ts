/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import { controllers } from '#generated/controllers'
import { middleware } from '#start/kernel'
import router from '@adonisjs/core/services/router'

router.get('/', [controllers.web.Dashboard, 'index']).use(middleware.auth({ guards: ['web'] }))

router
  .group(() => {
    router
      .group(() => {
        router.get('/login', [controllers.web.Session, 'create']).as('auth.login')
        router.post('/login', [controllers.web.Session, 'store']).as('auth.login.store')
      })
      .use(middleware.guest())

    router
      .post('/logout', [controllers.web.Session, 'destroy'])
      .as('auth.logout')
      .use(middleware.auth({ guards: ['web'] }))
  })
  .prefix('/auth')

router
  .group(() => {
    router
      .group(() => {
        router.post('/login', [controllers.api.Session, 'store']).as('api.auth.login.store')
        router.post('/logout', [controllers.api.Session, 'destroy']).as('api.auth.logout')
      })
      .prefix('/auth')

    router.post('/data', [controllers.api.Data, 'store']).use(
      middleware.auth({
        guards: ['api'],
        role: ['esp'],
      })
    )
  })
  .prefix('/api/v1')
