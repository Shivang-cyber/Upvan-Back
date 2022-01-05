// const { getProducts } = require('../controllers/Product.controller')
const mongooseConnection = require('../config/db')
const mongoose = require('mongoose')

const productSchema = mongoose.Schema({
  name: { type: String, required: true },
  tag: [{ type: String, required: true }],
  size: { type: String },
})
const Product = mongooseConnection.model('Product', productSchema)

module.exports = { Product }
