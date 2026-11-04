import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'data'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.float('ph').unsigned().notNullable()
      table.integer('ppm').unsigned().notNullable()
      table.float('temp').notNullable()

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
