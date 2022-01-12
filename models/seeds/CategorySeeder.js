if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const Category = require('../Category')

const db = require('../../config/mongoose')

const SEED_CATEGORY = [
  {
    name: '家居物業',
    icon: "fas fa-home"
  },

  {
    name: '交通出行',
    icon: "fas fa-shuttle-van"
  },

  {
    name: '休閒娛樂',
    icon: "fas fa-grin-beam"
  },

  {
    name: '餐飲食品',
    icon: "fas fa-utensils"
  },

  {
    name: '其他',
    icon: "fas fa-pen"
  },
]

db.once('open', () => {
  Promise.all(Array.from(SEED_CATEGORY, seed_category => {
    return Category.create(seed_category)
  }))
    .then(() => {
      console.log('data is created!')
      process.exit()
    })

})