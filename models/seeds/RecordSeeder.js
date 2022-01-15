//匯入模組
const Record = require('../Record')
const User = require('../User')
const Category = require('../Category')
const bcrypt = require('bcryptjs')

//匯入種子資料json檔
const SEED_USERS = require('./user.json').results
const SEED_RECORDS = require('./record.json').results

//若非正式上線模式，資料庫連接使用本地環境變數
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}


const db = require('../../config/mongoose')

//啟動資料庫
db.once('open', () => {
  //先查詢先前建立的種類資料
  Category.find()
    .lean()
    .then(categories => {
      //SEED_RECORDS每筆與category比對，回傳記錄於SEED_RECORDS.category對照的id
      SEED_RECORDS.forEach(record => {
        record.categoryId = categories.find(category => category.name === record.category)._id
      })

      Promise.all(Array.from(SEED_USERS, seedUser => {
        //取得seed_user的資料
        const { email, name, password } = seedUser

        //加嚴使用者密碼，並新增user資料庫資料
        return bcrypt
          .genSalt(10)
          .then(salt => bcrypt.hash(password, salt))
          .then(hash => User.create({
            name,
            email,
            password: hash
          }))
          .then(userData => {
            //取得先前建立的使用者id
            const userId = userData._id
            let records = []
            //將SEED_USER記錄的對應record，新增userId資料
            seedUser.record.forEach(index => {
              SEED_RECORDS[index].userId = userId
              records.push(SEED_RECORDS[index])
            })
            //新增record資料庫資料
            return Record.create(records)
          })
      }))
        .then(() => {
          console.log('User & Record data is created')
          process.exit()
        })
    })
})