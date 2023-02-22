import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class RegisterAdminValidator {
  constructor (protected ctx: HttpContextContract) {}

  public schema = schema.create({
    name: schema.string([
      rules.maxLength(64),
      rules.unique({ table: 'admins', column: 'name' })
    ]),
    email: schema.string([
      rules.email(),
      rules.unique({ table: 'users', column: 'email' }),
      rules.unique({ table: 'admins', column: 'email' })
    ]),
    password: schema.string([rules.minLength(8)])
  })

  public messages: CustomMessages = {}
}
