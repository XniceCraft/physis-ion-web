import User from '#models/user'
import { loginValidator } from '#validators/user'
import { errors } from '@adonisjs/auth'
import logger from '@adonisjs/core/services/logger'

import type { HttpContext } from '@adonisjs/core/http'

export default class SessionController {
  async create({ inertia }: HttpContext) {
    return inertia.render('auth/login', {})
  }

  async store({ auth, request, response, session }: HttpContext) {
    const { email, password, rememberMe } = await request.validateUsing(loginValidator)
    try {
      const user = await User.verifyCredentials(email, password)

      await auth.use('web').login(user, rememberMe ?? false)
    } catch (error) {
      if (error instanceof errors.E_INVALID_CREDENTIALS) {
        session.flash('inputErrorsBag', {
          email: 'Invalid email or password!',
        })
        return response.redirect().back()
      }

      logger.error(error)
      return response.internalServerError()
    }
    response.redirect().toRoute('dashboard.index')
  }

  async destroy({ auth, response }: HttpContext) {
    await auth.use('web').logout()
    response.redirect().toRoute('auth.login')
  }
}
