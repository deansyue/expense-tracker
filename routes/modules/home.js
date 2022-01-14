//引入模組組
const express = require('express')
const moment = require('moment')

const Category = require('../../models/Category')
const Record = require('../../models/Record')

const router = express.Router()

//顯示首面的路由
router.get('/', (req, res) => {
  Category.find({}, { name: 1 })
    .lean()
    .then(categories => {
      Record.find()
        //record做用categoryId與 category關連
        .populate('categoryId')
        //按照支出日期遞減排序
        .sort({ date: 'desc' })
        .lean()
        .then(records => {
          let totalAmount = 0
          //計算總金額，並為每一筆日期修改格式成yyyy/mm/dd
          records.forEach(record => {
            totalAmount += record.amount
            record.date = moment(record.date).format('YYYY/MM/DD')
          })
          res.render('index', { categories, records, totalAmount })
        })
        .catch(err => console.log(err))
    })
    .catch(err => console.log(err))

  // return res.render('index')
})

//匯出router模組
module.exports = router