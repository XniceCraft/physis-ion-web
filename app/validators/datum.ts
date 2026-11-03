import vine from '@vinejs/vine'

export const storeDataValidator = vine.create({
  ph: vine.number().min(0).max(14),
  ppm: vine.number(),
  temp: vine.number(),
})

export const dashboardFilterValidator = vine.create({
  days: vine.number().min(1).max(30).optional(),
})
