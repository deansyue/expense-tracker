if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const Category = require('../Category')

const db = require('../../config/mongoose')

const SEED_CATEGORY = [
  {
    name: '家居物業',
    imgURL: "https://fontawesome.com/icons/home?style=solid"
  },

  {
    name: '交通出行',
    imgURL: "https://fontawesome.com/icons/shuttle-van?style=solid"
  },

  {
    name: '休閒娛樂',
    imgURL: "https://fontawesome.com/icons/grin-beam?style=solid"
  },

  {
    name: '餐飲食品',
    imgURL: "https://fontawesome.com/icons/utensils?style=solid"
  },

  {
    name: '其他',
    imgURL: "https://fontawesome.com/icons/pen?style=solid"
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