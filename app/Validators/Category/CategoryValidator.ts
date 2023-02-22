import { schema, rules, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CategoryValidator {
  constructor (protected ctx: HttpContextContract) {}

  public schema = schema.create({
    name: schema.string([
      rules.maxLength(64),
      rules.unique({ table: 'course_categories', column: 'name' })
    ])
  })

  public messages: CustomMessages = {}
}
