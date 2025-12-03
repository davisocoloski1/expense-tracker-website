import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class Expense extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare origin: string

  @column()
  declare category: string

  @column()
  declare value: number

  @column()
  declare quantity: number

  @column()
  declare type: string

  @column()
  declare userId: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime()
  declare deletedAt: DateTime | null
}