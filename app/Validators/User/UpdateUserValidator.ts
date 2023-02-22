import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class UpdateUserValidator {
  constructor (protected ctx: HttpContextContract) {}

  public schema = schema.create({
    name: schema.string.optional([
      rules.maxLength(64),
      rules.unique({ table: 'users', column: 'name' })
    ]),
    email: schema.string.optional([
      rules.email(),
      rules.unique({ table: 'users', column: 'email' }),
      rules.unique({ table: 'admins', column: 'email' })
    ]),
    password: schema.string.optional([rules.minLength(8)])
  })

  public messages: CustomMessages = {}
}
