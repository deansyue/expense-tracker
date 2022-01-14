//引入模組
const express = require('express')
const passport = require('passport')
const bcrypt = require('bcryptjs')

const User = require('../../models/User')

const router = express.Router()

//開啟註冊表單路由
router.get('/register', (req, res) => {
  res.render('register')
})

//註冊使用者路由
router.post('/register', (req, res) => {
  //取得註冊表單資料
  const { name, email, password, confirm_password } = req.body
  const errors = []

  //有必輸入欄位沒有輸入，傳回錯誤訊息
  if (!name || !email || !password || !confirm_password) {
    errors.push({ message: '*為必輸入欄位，請重新輸入!' })
  }

  //password與confirm_password輸入不一致時
  if (password !== confirm_password) {
    errors.push({ message: 'password與confirm_password不一致，請重新輸入!' })
  }

  if (errors.length) {
    return res.render('register', { errors, name, email })
  }

  //若必輸入欄位皆輸入且 密碼確認一致
  User.findOne({ email })
    .then(user => {
      //查已有註冊的使用者，回傳錯誤訊息
      if (user) {
        errors.push({ message: '該Email已被註冊，請重新輸入!' })
        return res.render('register', { errors, name, email })
      }

      //無已註冊使用者，使用bcrypt加嚴密碼
      bcrypt
        .genSalt(10)
        .then(salt => bcrypt.hash(password, salt))
        .then(hash => {
          //在資料庫新增資料
          User.create({
            name,
            email,
            password: hash
          })
            .catch(err => console.log(err))
        })
        //重新導向首面
        .then(() => res.redirect('/'))
        .catch(err => console.log(err))
    })
})

//開啟登入表單路由
router.get('/login', (req, res) => {
  res.render('login')
})

//使用者登入路由
router.post('/login', passport.authenticate('local', {
  //使用passport驗証方法，設置驗証正確與錯誤時指向的路由
  successRedirect: '/',
  failureRedirect: '/users/login'
}))

//使用者登出路由
router.get('/logout', (req, res) => {
  //清除session
  req.logout()
  req.flash('success_meg', '已成功登出!')
  //重新指向登入路由
  res.redirect('/users/login')
})

//匯出模組
module.exports = router