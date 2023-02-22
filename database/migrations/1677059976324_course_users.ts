import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'user_courses'

  public async up () {
    this.schema.createTable(this.tableName, table => {
      table.increments('id')
      table
        .integer('user_id')
        .unsigned()
        .references('users.id')
        .onDelete('CASCADE')
      table
        .integer('course_id')
        .unsigned()
        .references('courses.id')
        .onDelete('CASCADE')
      table.unique(['user_id', 'course_id'])
      table.timestamps(true, true)
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
