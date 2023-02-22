import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import CreateUserValidator from 'App/Validators/User/CreateUserValidator'
import UpdateUserValidator from 'App/Validators/User/UpdateUserValidator'

export default class UsersController {
  public async index ({ response }: HttpContextContract) {
    const users = await User.query()
      .select('id', 'name', 'email')
      .orderBy('created_at')

    return response.ok({
      status: 'success',
      message: 'ok',
      data: users
    })
  }

  public async store ({ request, response }: HttpContextContract) {
    await request.validate(CreateUserValidator)

    await User.create(request.body())

    return response.created({
      status: 'success',
      message: 'user successfully created!'
    })
  }

  public async show ({ params, response }: HttpContextContract) {
    try {
      const user = await User.query()
        .select('id', 'name', 'email')
        .where('id', params.id)
        .preload('courses', query =>
          query
            .select('id', 'title', 'course_category_id')
            .preload('category', query => query.select('id', 'name'))
        )
        .firstOrFail()

      return response.ok({
        status: 'success',
        message: 'ok',
        data: user
      })
    } catch (error) {
      return response.notFound({
        status: 'fail',
        message: error.message
      })
    }
  }

  public async update ({ params, request, response }: HttpContextContract) {
    await request.validate(UpdateUserValidator)
    try {
      const user = await User.findOrFail(params.id)
      await user.merge(request.body()).save()

      return response.ok({
        status: 'success',
        message: 'user updated!'
      })
    } catch (error) {
      return response.notFound({
        status: 'fail',
        message: error.message
      })
    }
  }

  public async destroy ({ params, response }: HttpContextContract) {
    try {
      const user = await User.findOrFail(params.id)
      await user.delete()

      return response.ok({
        status: 'success',
        message: 'user deleted!'
      })
    } catch (error) {
      return response.notFound({
        status: 'fail',
        message: error.message
      })
    }
  }
}
