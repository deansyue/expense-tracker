//引入模組組
const express = require('express')
const moment = require('moment')

const Category = require('../../models/Category')
const Record = require('../../models/Record')

const router = express.Router()

//顯示首面的路由
router.get('/', (req, res) => {
  //取出sort-bar的關鍵字
  let categoryId = req.query.categoryId
  Category.find({}, { name: 1 })
    .lean()
    .then(categories => {
      let filter_categories = []
      //若categoryId有值時，將符合的Id賦值給filter_categories
      if (categoryId !== '' && typeof (categoryId) !== 'undefined') {
        filter_categories = categories.filter(function filterCategoryId(category) {
          return category._id.toString() === categoryId
        })
      } else {
        //若sort-bar選擇全部或為空時，將categories全部欄位賦值給filter_categories
        filter_categories = categories
      }
      Record.find()
        //record做用categoryId與 category關連
        .populate('categoryId')
        //按照支出日期遞減排序
        .sort({ date: 'desc' })
        .lean()
        .then(records => {
          let totalAmount = 0
          let filter_record = []
          let selected_category = {}

          //將符合sort-bar選值的record，給予filter_record為handlebar渲染資料用
          records.forEach(function filterCategory(record) {
            filter_categories.forEach(category => {
              if (record.categoryId._id.toString() === category._id.toString()) {
                filter_record.push(record)
              }
            })
          })
          //計算sort-bar選擇種類的總金額，並為每一筆日期修改格式成yyyy/mm/dd
          filter_record.forEach(record => {
            totalAmount += record.amount
            record.date = moment(record.date).format('YYYY/MM/DD')
          })

          //將sort-bar選擇的種類，賦值給selected_category
          //用其渲染下拉選單第一選項，讓使用者知道自己現在選擇的是哪一個選項
          if (filter_categories.length !== 1) {
            selected_category.name = '全部'
            selected_category._id = ''
          } else {
            selected_category = filter_categories[0]
          }
          console.log(selected_category)

          res.render('index', { categories, selected_category, records: filter_record, totalAmount })
        })
        .catch(err => console.log(err))
    })
    .catch(err => console.log(err))

  // return res.render('index')
})

//匯出router模組
module.exports = router