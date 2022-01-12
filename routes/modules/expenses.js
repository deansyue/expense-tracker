//引入模組
const express = require('express')

const Category = require('../../models/Category')

const router = express.Router()

//新增費用支出，開啟表單頁面的路由
router.get('/new', (req, res) => {
  //查詢出全部的種類並在渲染new頁面時，動態產生類別下拉選項
  Category.find({}, { name: 1 })
    .lean()
    .then((categories) => {
      return res.render('new', { categories })
    })

})

//新增費用支出的路由
router.post('/', (req, res) => {

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