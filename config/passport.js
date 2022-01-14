const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcryptjs')

const User = require('../models/User')

//匯出模組
module.exports = app => {
  //初始化passport模組
  app.use(passport.initialize())
  app.use(passport.session())

  //設定本地登入策略
  passport.use(new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
    User.findOne({ email })
      .then(user => {
        //沒查詢到資料， 回傳訊息
        if (!user) return done(null, false, { message: 'Email沒有被註冊!，請重新輸入!' })

        //找到使用者， 先使用bcrypt的compare函式將輸入的密碼與資料庫密碼做比對
        return bcrypt
          .compare(password, user.password)
          .then(isMatch => {
            //若密碼輸入錯誤，回傳訊息
            if (!isMatch) return done(null, false, { message: 'Email或密碼錯誤，請重新輸入!' })

            //密碼輸入正確，執行下一步驟
            return done(null, user)
          })
      })
      .catch(err => done(err, false))
  }))

  //設定序列化與反序列化
  passport.serializeUser((user, done) => {
    done(null, user.id)
  })

  passport.deserializeUser((id, done) => {
    User.findById(id)
      .lean()
      .then(user => done(null, user))
      .catch(err => done(err, false))
  })
}