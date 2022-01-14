//引入模組
const express = require('express')
const passport = require('passport')

const User = require('../../models/User')

const router = express.Router()

//開啟註冊表單路由
router.get('/register', (req, res) => {
  res.render('register')
})

//註冊使用者路由
router.post('/register', passport.authenticate('local', {
  //使用passport驗証方法，設置驗証正確與錯誤時指向的路由
  successRedirect: '/',
  failureRedirect: '/users/login'
}))

//開啟登入表單路由
router.get('/login', (req, res) => {
  res.render('login')
})

//使用者登入路由
router.post('/login', (req, res) => {

})

//使用者登出路由
router.get('/logout', (req, res) => {
  //清除session
  req.logout()
  //重新指向登入路由
  res.redirect('/users/login')
})

//匯出模組
module.exports = router