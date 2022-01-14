//引入模組
const express = require('express')

const router = express.Router()

const home = require('./modules/home')
const expenses = require('./modules/expenses')
const users = require('./modules/users')

//根據路由位置有符合字樣，導向該相關路由模組
router.use('/users', users)
router.use('/expenses', expenses)
router.use('/', home)

//匯出模組
module.exports = router 