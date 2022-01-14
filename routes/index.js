//引入模組
const express = require('express')

const router = express.Router()

const home = require('./modules/home')
const expenses = require('./modules/expenses')
const users = require('./modules/users')
const { authenticator } = require('../middleware/auth')

//根據路由位置有符合字樣，特定路由先使用authenticator判斷已有登入使用者，再導向該相關路由模組
router.use('/users', users)
router.use('/expenses', authenticator, expenses)
router.use('/', authenticator, home)

//匯出模組
module.exports = router 