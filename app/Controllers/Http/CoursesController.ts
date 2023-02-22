import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Course from 'App/Models/Course'
import CreateCourseValidator from 'App/Validators/Course/CreateCourseValidator'
import UpdateCourseValidator from 'App/Validators/Course/UpdateCourseValidator'

export default class CoursesController {
  public async index ({ response }: HttpContextContract) {
    const courses = await Course.query()
      .select('id', 'title')
      .orderBy('created_at')

    return response.ok({
      status: 'success',
      message: 'ok',
      data: courses
    })
  }

  public async store ({ request, response }: HttpContextContract) {
    await request.validate(CreateCourseValidator)

    await Course.create(request.body())

    return response.created({
      status: 'success',
      message: 'course successfully created!'
    })
  }

  public async show ({ params, response }: HttpContextContract) {
    try {
      const course = await Course.query()
        .where('id', params.id)
        .select('id', 'title', 'course_category_id')
        .preload('category', query => query.select('id', 'name'))
        .preload('students', query => query.select('id', 'name', 'email'))
        .firstOrFail()

      return response.ok({
        status: 'success',
        message: 'ok',
        data: course
      })
    } catch (error) {
      return response.notFound({
        status: 'fail',
        message: error.message
      })
    }
  }

  public async update ({ params, request, response }: HttpContextContract) {
    await request.validate(UpdateCourseValidator)
    try {
      const course = await Course.findOrFail(params.id)
      await course.merge(request.body()).save()

      return response.ok({
        status: 'success',
        message: 'course updated!'
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
      const course = await Course.findOrFail(params.id)
      await course.delete()

      return response.ok({
        status: 'success',
        message: 'course deleted!'
      })
    } catch (error) {
      return response.notFound({
        status: 'fail',
        message: error.message
      })
    }
  }
}
