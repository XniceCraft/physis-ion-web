import Datum from '#models/datum'
import DatumTransformer from '#transformers/datum_transformer'
import { storeDataValidator } from '#validators/datum'

import type { HttpContext } from '@adonisjs/core/http'

export default class DataController {
  async store({ request, serialize }: HttpContext) {
    const data = await request.validateUsing(storeDataValidator)
    const result = await Datum.create(data)

    return serialize({
      data: DatumTransformer.transform(result),
    })
  }
}
