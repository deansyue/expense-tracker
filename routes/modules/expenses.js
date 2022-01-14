//引入模組
const express = require('express')
const { redirect } = require('express/lib/response')
const moment = require('moment')

const Category = require('../../models/Category')
const Record = require('../../models/Record')

const router = express.Router()

//新增費用支出，開啟表單頁面的路由
router.get('/new', (req, res) => {
  //查詢出全部的種類並在渲染new頁面時，動態產生類別下拉選項
  Category.find({}, { name: 1 })
    .lean()
    .then((categories) => {
      return res.render('new', { categories })
    })
    .catch(err => console.log(err))

})

//新增費用支出的路由
router.post('/', (req, res) => {
  const { name, date, categoryId, amount } = req.body
  //若必輸入欄位有一個未輸入，重新渲染new頁面
  if (!name || !date || !categoryId || !amount) {
    return Category.find({}, { name: 1 })
      .lean()
      .then((categories) => {
        const selected_category = categories.find(function filter_category(category) {
          return category._id.toString() === categoryId.toString()
        })
        return res.render('new', { categories, selected_category, name, date, amount })
      })
      .catch(err => console.log(err))
  }

  //新增資料至mongodb
  return Record.create({
    name,
    date,
    categoryId,
    amount,
  })
    .then(() => res.redirect('/'))
    .catch(err => console.log(err))

})

//修改特定費用支出，開啟修改頁面的路由
router.get('/:expense_id/edit', (req, res) => {
  const expense_id = req.params.expense_id
  //查詢出全部的種類並在渲染edit頁面時，動態產生類別下拉選項
  Category.find({}, { name: 1 })
    .lean()
    .then((categories) => {
      Record.findById(expense_id)
        .lean()
        .then(record => {
          //修改record的日期格式
          record.date = moment(record.date).format('YYYY-MM-DD')
          //取回修改前的種類物件資料
          const selected_category = categories.find(function filter_category(category) {
            return category._id.toString() === record.categoryId.toString()
          })
          return res.render('edit', { categories, selected_category, record })
        })
    })
})

//修改特定費用支出的路由
router.put('/:record_id', (req, res) => {
  //取得 record_id 及 req.body資料
  const _id = req.params.record_id
  const { name, date, categoryId, amount } = req.body
  //若有必輸入輸位未輸入，傳回已輸入資料讓使用者重新輸入
  if (!name || !date || !categoryId || !amount) {
    return Category.find({}, { name: 1 })
      .lean()
      .then((categories) => {
        //改變date的日期格式
        date = moment(data).format('YYYY-MM-DD')
        //取回修改前的種類物件資料
        const selected_category = categories.find(function filter_category(category) {
          return category._id.toString() === categoryId.toString()
        })
        return res.render('edit', { categories, selected_category, name, date, amount })
      })
      .catch(err => console.log(err))
  }

  //找到被修改的資料，修改資料回，回存資料庫
  return Record.findById(_id)
    .then(record => {
      Object.assign(record, req.body)
      return record.save()
    })
    //重新導向首面
    .then(() => res.redirect('/'))
    .catch(err => console.log(err))
})

//刪除特定費用支出的路由
router.delete('/:id', (req, res) => {

})

//匯出router模組
module.exports = router