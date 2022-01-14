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
  let { name, date, categoryId, amount } = req.body
  //若必輸入欄位有一個未輸入，重新渲染new頁面
  if (!name || !date || !categoryId || !amount) {
    return Category.find({}, { name: 1 })
      .lean()
      .then((categories) => {
        //修改date的日期格式
        date = moment(date).format('YYYY-MM-DD')
        //取回 修改前的種類物件資料
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
router.get('/:record_id/edit', (req, res) => {
  const record_id = req.params.record_id
  //查詢出全部的種類並在渲染edit頁面時，動態產生類別下拉選項
  Category.find({}, { name: 1 })
    .lean()
    .then((categories) => {
      Record.findById(record_id)
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
  const record_id = req.params.record_id
  let { name, date, categoryId, amount } = req.body
  //若有必輸入輸位未輸入，傳回已輸入資料讓使用者重新輸入
  if (!name || !date || !categoryId || !amount) {
    return Category.find({}, { name: 1 })
      .lean()
      .then((categories) => {
        //改變date的日期格式
        date = moment(date).format('YYYY-MM-DD')
        //將修改內容存到record物件裡
        const record = {
          _id: record_id,
          name,
          date,
          amount
        }
        //取回修改前的種類物件資料
        const selected_category = categories.find(function filter_category(category) {
          return category._id.toString() === categoryId.toString()
        })
        return res.render('edit', { record_id, categories, selected_category, record })
      })
      .catch(err => console.log(err))
  }

  //找到被修改的資料，修改資料回，回存資料庫
  return Record.findById(record_id)
    .then(record => {
      Object.assign(record, req.body)
      return record.save()
    })
    //重新導向首面
    .then(() => res.redirect('/'))
    .catch(err => console.log(err))
})

//刪除特定費用支出的路由
router.delete('/:record_id', (req, res) => {
  //取得要刪除record的id
  const record_id = req.params.record_id
  //使用id查詢資料
  Record.findById(record_id)
    .then(record => {
      //若查無資料，則直接導向首面
      if (!record) return res.redirect('/')

      //刪除指定資料後導向首面
      return record.remove()
        .then(() => res.redirect('/'))
        .catch(err => console.log(err))

    })
})

//匯出router模組
module.exports = router