import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import CourseCategory from 'App/Models/CourseCategory'
import CategoryValidator from 'App/Validators/Category/CategoryValidator'

export default class CourseCategoriesController {
  public async index ({ response }: HttpContextContract) {
    const categories = await CourseCategory.query()
      .select('id', 'name')
      .orderBy('created_at')

    return response.ok({
      status: 'success',
      message: 'ok',
      data: categories
    })
  }

  public async store ({ request, response }: HttpContextContract) {
    await request.validate(CategoryValidator)

    await CourseCategory.create(request.body())

    return response.created({
      status: 'success',
      message: 'category successfully created!'
    })
  }

  public async show ({ params, response }: HttpContextContract) {
    try {
      const category = await CourseCategory.query()
        .select('id', 'name')
        .preload('courses', query =>
          query.select('id', 'title', 'course_category_id')
        )
        .where('id', params.id)
        .firstOrFail()

      return response.ok({
        status: 'success',
        message: 'ok',
        data: category
      })
    } catch (error) {
      return response.notFound({
        status: 'fail',
        message: error.message
      })
    }
  }

  public async update ({ params, request, response }: HttpContextContract) {
    await request.validate(CategoryValidator)
    try {
      const category = await CourseCategory.findOrFail(params.id)
      await category.merge(request.body()).save()

      return response.ok({
        status: 'success',
        message: 'category updated!'
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
      const category = await CourseCategory.findOrFail(params.id)
      await category.delete()

      return response.ok({
        status: 'success',
        message: 'category deleted!'
      })
    } catch (error) {
      return response.notFound({
        status: 'fail',
        message: error.message
      })
    }
  }
}
