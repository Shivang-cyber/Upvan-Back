// const { getProducts } = require('../controllers/Product.controller')
const mongooseConnection = require('../config/db')
const mongoose = require('mongoose')

const productSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    tag: [{ type: String, required: true }],
    size: { type: String, required: true },
    price: { type: String, required: true },
    images: [{ type: String, required: true }],
    ratings: { type: Number, required: false },
    reviews: [{ type: String, required: false }],
  },
  {
    versionKey: false,
    timestamps: true,
  }
)
const Product = mongooseConnection.model('Product', productSchema)

module.exports = { Product }
