import { schema, rules, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CreateCourseValidator {
  constructor (protected ctx: HttpContextContract) {}

  public schema = schema.create({
    title: schema.string([
      rules.maxLength(64),
      rules.unique({ table: 'courses', column: 'title' })
    ]),
    course_category_id: schema.number([
      rules.exists({ table: 'course_categories', column: 'id' })
    ])
  })

  public messages: CustomMessages = {}
}
