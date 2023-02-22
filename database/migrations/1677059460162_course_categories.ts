import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'course_categories'

  public async up () {
    this.schema.createTable(this.tableName, table => {
      table.increments('id')
      table.string('name', 64).notNullable().unique()
      table.timestamps(true, true)
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
