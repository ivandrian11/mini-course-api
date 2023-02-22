import { schema, rules, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CreateEnrollmentValidator {
  constructor (protected ctx: HttpContextContract) {}

  public schema = schema.create({
    user_id: schema.number([rules.exists({ table: 'users', column: 'id' })]),
    course_id: schema.number([rules.exists({ table: 'courses', column: 'id' })])
  })

  public messages: CustomMessages = {}
}
