import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'
import CreateEnrollmentValidator from 'App/Validators/Enrollment/CreateEnrollmentValidator'
import UpdateEnrollmentValidator from 'App/Validators/Enrollment/UpdateEnrollmentValidator'
import { DateTime } from 'luxon'

export default class EnrollmentsController {
  public async index ({ response }: HttpContextContract) {
    const data = await Database.from('user_courses')
      .select('id', 'user_id', 'course_id')
      .orderBy('created_at')

    return response.ok({
      status: 'success',
      message: 'ok',
      data
    })
  }

  public async store ({ request, response }: HttpContextContract) {
    await request.validate(CreateEnrollmentValidator)

    try {
      await Database.table('user_courses').insert(request.body())

      return response.created({
        status: 'success',
        message: 'enrollment successfully created!'
      })
    } catch (error) {
      return response.internalServerError({
        status: 'error',
        message: error.message
      })
    }
  }

  public async show ({ params, response }: HttpContextContract) {
    try {
      const enrollment = await Database.from('user_courses')
        .where('id', params.id)
        .firstOrFail()

      return response.ok({
        status: 'success',
        message: 'ok',
        data: enrollment
      })
    } catch (error) {
      return response.notFound({
        status: 'fail',
        message: error.message
      })
    }
  }

  public async update ({ params, request, response }: HttpContextContract) {
    await request.validate(UpdateEnrollmentValidator)
    try {
      const rowCount = await Database.from('user_courses')
        .where('id', params.id)
        .update({
          ...request.body(),
          updated_at: DateTime.now().toISO()
        })

      if (!rowCount) {
        return response.notFound({
          status: 'error',
          message: 'not found'
        })
      }

      return response.ok({
        status: 'success',
        message: 'enrollment updated!'
      })
    } catch (error) {
      return response.notFound({
        status: 'fail',
        message: error.message
      })
    }
  }

  public async destroy ({ params, response }: HttpContextContract) {
    const rowCount = await Database.from('user_courses')
      .where('id', params.id)
      .delete()

    if (!rowCount) {
      return response.notFound({
        status: 'error',
        message: 'not found'
      })
    }

    return response.ok({
      status: 'success',
      message: 'enrollment deleted!'
    })
  }
}
