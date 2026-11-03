import { getDashboardData } from '#services/dashboard_service'
import { dashboardFilterValidator } from '#validators/datum'

import type { HttpContext } from '@adonisjs/core/http'

export default class DashboardController {
  async index({ inertia, request }: HttpContext) {
    const { days = 7 } = await request.validateUsing(dashboardFilterValidator)
    const data = await getDashboardData(days)

    return inertia.render('dashboard/dashboard', data)
  }
}
