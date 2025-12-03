import type { HttpContext } from '@adonisjs/core/http'
import Expense from '#models/expense'
import { rules, schema } from '@adonisjs/validator'
import { DateTime } from 'luxon'

export default class ExpensesController {
  async store({ auth, request, response }: HttpContext) {
    const user = auth.user!

    const newExpenseSchema = schema.create({
      origin: schema.string({ trim: true }, [
        rules.required(),
        rules.minLength(3),
        rules.maxLength(255)
      ]),
      category: schema.string({}, [
        rules.required(),
      ]),
      value: schema.number([
        rules.required(),
        rules.unsigned(),
        rules.range(0.01, 999999999)
      ]),
      quantity: schema.number([
        rules.required(),
        rules.range(1, 9999)
      ]),
      type: schema.enum(['expense', 'income'], [
        rules.required()
      ])
    })

    const payload = await request.validate({
      schema: newExpenseSchema,
      messages: {
        'origin.string': 'A origim da transação deve ser um texto.',
        'origin.required': 'Você deve indicar a origem da transação. (Ex: shampoo, salário...)',
        'origin.minLength': 'O nome do item deve ter 3 ou mais caracteres.',
        'origin.maxLength': 'O nome do item deve ter menos de 255 caracteres.',

        'category.required': 'Você deve indicar a categoria do item. (Ex: trabalho, refeição, mercado...)',

        'value.required': 'Você deve indicar o valor gasto com o(s) item(s).',
        'value.unsigned': 'O valor gasto não pode ser negativo.',
        'value.range': 'O valor gasto deve estar entre R$0.01 e R$999.999.999',

        'quantity.required': 'A quantidade de itens deve ser indicada.',
        'quantity.range': 'A quantidade de itens mínima é de 1 e a máxima é de 9.999.',

        'type.required': 'Escolha o tipo da transação.',
        'type.enum': 'O tipo selecionado não é válido.'
      }
    })

    const expense = await Expense.create({
      userId: user.id,
      origin: payload.origin,
      category: payload.category,
      value: payload.value,
      quantity: payload.quantity,
      type: payload.type,
    })

    return response.created(expense)
  }

  async delete({ auth, response, params }: HttpContext) {
    const user = auth.user!

    if (!user) {
      return response.unauthorized({ message: "Faça login para utilizar nossos serviços."})
    }

    try {
      const expense = await Expense.find(params.id)

      if (!expense) {
        return response.notFound({ message: "Transação não encontrada." })
      } if (expense.deletedAt) {
        return response.badRequest({ message: "Essa transação já foi deletada." })
      }

      expense.deletedAt = DateTime.now()
      await expense.save()

      return response.ok({ message: `A transação ${expense.origin} foi deletada.`})
    } catch (error) {
      if (error.code === 'E_ROW_NOT_FOUND') {
        return response.notFound({ message: 'Transação inexistente ou não encontrada.' })
      }
    }
  }

  async filter({ auth, request, response }: HttpContext) {
    const user = auth.user!

    if (!user) {
      return response.unauthorized({ message: "Ação não autorizada." })
    }

    const filterSchema = schema.create({
      category: schema.string.optional({ trim: true }, [rules.maxLength(50)]),
      type: schema.enum.optional(['expense', 'income']),
      minValue: schema.number.optional([rules.unsigned()]),
      maxValue: schema.number.optional([rules.unsigned()]),
      year: schema.number.optional([rules.range(2025, 2026)]),
      month: schema.number.optional([rules.range(1, 12)])
    })
    
    const filters = await request.validate({
      schema: filterSchema,
      data: request.qs()
    })

    try {
      let query = Expense.query().where('user_id', user.id)

      if (filters.category) {
        query = query.where('category', filters.category)
      } 

      if (filters.type) {
        query = query.where('type', filters.type)
      }

      if (filters.minValue) {
        query = query.where('value', '>=', filters.minValue)
      }

      if (filters.maxValue) {
        query = query.where('value', '<=', filters.maxValue)
      }

      if (filters.year) {
        query = query.whereRaw('EXTRACT(YEAR FROM created_at) = ?', [filters.year])
      }

      if (filters.month) {
        query = query.whereRaw('EXTRACT(MONTH FROM created_at) = ?', [filters.month])
      }

      const expenses = await query.orderBy('created_at', 'desc').limit(20)
      return response.ok(expenses)
    } catch (error) {
      console.log(error)
    }
  }


}