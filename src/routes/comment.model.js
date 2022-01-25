const mongooseConnection = require('../config/db')
const mongoose = require('mongoose')
const commentSchema = mongoose.Schema(
  {
    title: { type: String, required: true },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'product',
      required: true,
    },
    body: { type: String, required: true },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'client',
      required: true,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
)

const Comment = mongooseConnection.model('comment', commentSchema)

module.exports = { Comment }
