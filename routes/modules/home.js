//引入模組組
const express = require('express')
const moment = require('moment')

const Category = require('../../models/Category')
const Record = require('../../models/Record')

const router = express.Router()

//顯示首面的路由
router.get('/', (req, res) => {
  //取得使用者id
  const userId = req.user._id
  //取出sort-bar的關鍵字
  let categoryId = req.query.categoryId
  Category.find({}, { name: 1 })
    .lean()
    .then(categories => {
      let filter_categories = []
      //若categoryId有值時，將符合的Id賦值給filter_categories，
      //並把被選擇到的category新增屬性isSelected做為渲染hbs時判斷該選項是否要新增selected屬性用，
      //若資料庫的category都沒有isSelected時，就等於使用者選擇了全部，sor-bar就會直接指到最上面的"全部"
      if (categoryId !== '' && typeof (categoryId) !== 'undefined') {
        filter_categories = categories.filter(function filterCategoryId(category) {
          if (category._id.toString() === categoryId) {
            category.isSelected = true
            return category
          }

        })
      } else {
        //若sort-bar選擇全部或為空時，將categories全部欄位賦值給filter_categories
        filter_categories = categories
      }
      Record.find({ userId })
        //record做用categoryId與 category關連
        .populate('categoryId')
        //按照支出日期遞減排序
        .sort({ date: 'desc' })
        .lean()
        .then(records => {
          let totalAmount = 0
          let filter_record = []

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

          res.render('index', { categories, records: filter_record, totalAmount })
        })
        .catch(err => console.log(err))
    })
    .catch(err => console.log(err))

  // return res.render('index')
})

//匯出router模組
module.exports = router