//引入模組
const express = require('express')

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
        return res.render('new', { categories, name, date, amount })
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
router.get('/:id/edit', (req, res) => {
  //查詢出全部的種類並在渲染edit頁面時，動態產生類別下拉選項
  Category.find({}, { name: 1 })
    .lean()
    .then((categories) => {
      return res.render('edit', { categories })
    })
})

//修改特定費用支出的路由
router.put('/:id', (req, res) => {

})

//刪除特定費用支出的路由
router.delete('/:id', (req, res) => {

})

//匯出router模組
module.exports = router