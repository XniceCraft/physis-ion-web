import { BaseTransformer } from '@adonisjs/core/transformers'

import type Datum from '#models/datum'

export default class DatumTransformer extends BaseTransformer<Datum> {
  toObject() {
    return this.pick(this.resource, ['id', 'ph', 'ppm', 'temp', 'createdAt'])
  }
}
