//引入模組
const { type } = require('express/lib/response')
const mongoose = require('mongoose')
const Schema = mongoose.Schema

//設定Record的Schema
const RecordSchema = new Schema({

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

  createAt: {
    type: Date,
    default: Date.now
  },

  categoryId: {
    type: Schema.Types.ObjectId,
    ref: 'Category',
    index: true,
    required: true,
  },
})

//匯出模組
module.exports = mongoose.model('Record', RecordSchema)