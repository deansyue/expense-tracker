//引入模組組
const express = require('express')

const router = express.Router()

//顯示首面的路由
router.get('/', (req, res) => {
  return res.render('index')
})

//匯出router模組
module.exports = router