//引入模組
const express = require('express')

const router = express.Router()

//新增費用支出，開啟表單頁面的路由
router.get('/new', (req, res) => {
  return res.render('new')
})

//新增費用支出的路由
router.post('/new', (req, res) => {

})

//顯示費用支出詳細資料的路由
router.get('/:id', (req, res) => {
  res.render('detail')
})

//修改特定費用支出，開啟修改頁面的路由
router.get('/:id/edit', (req, res) => {
  res.render('edit')
})

//修改特定費用支出的路由
router.put('/:id', (req, res) => {

})

//刪除特定費用支出的路由
router.delete('/:id', (req, res) => {

})

//匯出router模組
module.exports = router