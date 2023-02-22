import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'courses'

  public async up () {
    this.schema.createTable(this.tableName, table => {
      table.increments('id')
      table.string('title', 64).notNullable().unique()
      table
        .integer('course_category_id')
        .unsigned()
        .references('course_categories.id')
        .onDelete('CASCADE')
      table.timestamps(true, true)
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
