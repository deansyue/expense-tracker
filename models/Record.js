//引入模組
const mongoose = require('mongoose')
const Schema = mongoose.Schema

//設定Record的Schema
const RecordSchema = new Schema({
  id: {
    type: Number,
    required: true,
  },

  name: {
    type: String,
    require: true,
  },

  date: {
    type: Date,
    required: true,
  },

  amount: {
    type: Number,
    required: true,
  },

  categoryId: {
    type: Number,
    ref: 'Category',
    index: true,
    required: true,
  },
})

//匯出模組
module.exports = mongoose.model('Record', RecordSchema)