//引入模組
const mongoose = require('mongoose')
const Schema = mongoose.Schema

//設定Category的Schema
const CategorySchema = new Schema({
  name: {
    type: String,
    required: true,
  },

  icon: {
    type: String,
  },

  createAt: {
    type: Date,
    default: Date.now
  },
})

//匯出模組
module.exports = mongoose.model('Category', CategorySchema)