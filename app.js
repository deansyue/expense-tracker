//引入模組
const express = require('express')
const exphbs = require('express-handlebars').engine

//環境非為正式上線，使用.env變數
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const app = express()
const router = require('./routes')

//宣告變數
const PORT = process.env.PORT

//引用mongoose模組，啟動mongodb
require('./config/mongoose')

//設定網面handlebars相關設定
app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

//導入路由相關模組
app.use(router)

//監聽伺服器
app.listen(PORT, () => {
  console.log(`Express is running on http://localhost:${PORT}`)
})
