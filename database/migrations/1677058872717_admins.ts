import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'admins'

  public async up () {
    this.schema.createTable(this.tableName, table => {
      table.increments('id')
      table.string('name', 64).notNullable().unique()
      table.string('email', 255).notNullable().unique()
      table.string('password', 180).notNullable()
      table.timestamps(true, true)
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
