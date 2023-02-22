import { DateTime } from 'luxon'
import {
  BaseModel,
  column,
  belongsTo,
  BelongsTo,
  manyToMany,
  ManyToMany
} from '@ioc:Adonis/Lucid/Orm'
import CourseCategory from './CourseCategory'
import User from './User'

export default class Course extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public title: string

  @column()
  public courseCategoryId: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => CourseCategory)
  public category: BelongsTo<typeof CourseCategory>

  @manyToMany(() => User, {
    pivotTable: 'user_courses'
  })
  public students: ManyToMany<typeof User>
}
