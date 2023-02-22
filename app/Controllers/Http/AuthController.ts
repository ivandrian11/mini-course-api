import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Admin from 'App/Models/Admin'
import LoginAdminValidator from 'App/Validators/Auth/LoginAdminValidator'
import RegisterAdminValidator from 'App/Validators/Auth/RegisterAdminValidator'

export default class AuthController {
  public async register ({ request, response }: HttpContextContract) {
    await request.validate(RegisterAdminValidator)

    await Admin.create(request.body())

    return response.created({
      status: 'success',
      message: 'account successfully created!'
    })
  }

  public async login ({ request, response, auth }: HttpContextContract) {
    await request.validate(LoginAdminValidator)

    const email = request.input('email')
    const password = request.input('password')

    const token = await auth.use('api').attempt(email, password, {
      expiresIn: '30 mins'
    })

    return response.created({
      status: 'success',
      message: 'token successfully created!',
      data: token
    })
  }
}
