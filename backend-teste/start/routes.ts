import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js'

router.group(() => {
  router.post('registro', [() => import('#controllers/users_controller'), 'register'])
  router.post('login', [() => import('#controllers/users_controller'), 'login']),
  router.delete('logout', [() => import('#controllers/users_controller'), 'logout'])
}).prefix('expenseApi/users/')

router.group(() => {
  router.get('filter_expenses', [() => import('#controllers/expenses_controller'), 'filter']),
  router.get('your_transactions', [() => import('#controllers/expenses_controller'), 'index']),
  router.post('add_expense', [() => import('#controllers/expenses_controller'), 'store']),
  router.put('delete_expense', [() => import('#controllers/expenses_controller'), 'destroy'])
}).prefix('expenseApi/expenses/').use(middleware.auth())
