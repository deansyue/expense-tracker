const mongoose = require('mongoose')

const MONGODB_URI = process.env.MONGODB_URI

//設定mongodb連線
mongoose.connect(MONGODB_URI)

//取得連線狀態
const db = mongoose.connection

//連線失敗時
db.on('error', () => {
  console.log('mongoose connect error!')
})

//連線成功時
db.once('open', () => {
  console.log('mongodb connected!')
})

//匯出模組
module.exports = db