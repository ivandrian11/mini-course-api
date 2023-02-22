import Route from '@ioc:Adonis/Core/Route'

Route.post('/register', 'AuthController.register').as('Auth.register')
Route.post('/login', 'AuthController.login').as('Auth.login')

Route.group(() => {
  Route.resource('categories', 'CourseCategoriesController').apiOnly()
  Route.resource('courses', 'CoursesController').apiOnly()
  Route.resource('users', 'UsersController').apiOnly()
  Route.resource('enrollments', 'EnrollmentsController').apiOnly()
}).middleware('auth')
