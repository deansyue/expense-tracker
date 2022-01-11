//引入模組
const mongoose = require('mongoose')
const Schema = mongoose.Schema

//設定Category的Schema
const CategorySchema = new Schema({
  id: {
    type: Number,
    required: true,
  },

  name: {
    type: String,
    required: true,
  },

  imgURL: {
    type: String,
  }
})

//匯出模組
module.exports = mongoose.model('Category', CategorySchema)