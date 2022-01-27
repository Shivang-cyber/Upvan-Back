// const { getProducts } = require('../controllers/Product.controller')
const mongooseConnection = require('../config/db')
const mongoose = require('mongoose')

const productSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    tag: [{ type: String, required: true }],
    family: { type: String, required: true },
    size: { type: String, required: true },
    price: { type: String, required: true },
    images: [{ type: String, required: true }],
    ratings: { type: Number, required: false },
    reviews: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'comment',
        required: false,
      },
    ],
    c: { type: Number, required: true },
  },
  {
    versionKey: false,
    timestamps: true,
  }
)
const Product = mongooseConnection.model('Product', productSchema)

module.exports = { Product }
