import type User from '#models/user'
import type { Authenticators } from '@adonisjs/auth/types'
import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'

/**
 * Auth middleware is used authenticate HTTP requests and deny
 * access to unauthenticated users.
 */
export default class AuthMiddleware {
  async handle(
    ctx: HttpContext,
    next: NextFn,
    options: {
      guards?: (keyof Authenticators)[]
      role?: User['role'][]
    } = {}
  ) {
    await ctx.auth.authenticateUsing(options.guards, { loginRoute: '/auth/login' })

    const { user } = ctx.auth
    if (user && options.role && !options.role.includes(user.role)) {
      return ctx.response.abort('Forbidden', 403)
    }

    return next()
  }
}
