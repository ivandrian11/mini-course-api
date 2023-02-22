import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class LoginAdminValidator {
  constructor (protected ctx: HttpContextContract) {}

  public schema = schema.create({
    email: schema.string([
      rules.email(),
      rules.exists({ table: 'admins', column: 'email' })
    ]),
    password: schema.string([rules.minLength(8)])
  })

  public messages: CustomMessages = {}
}
