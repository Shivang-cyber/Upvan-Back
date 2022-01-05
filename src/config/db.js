const mongoose = require('mongoose')
require('dotenv').config()
// console.log(process.env);
const MONGODB_URL = process.env.MONGODB_URL
  // 'mongodb+srv://Manney:9026724930@ape.cyihp.mongodb.net/ProductsPlant?retryWrites=true&w=majority'

const mongooseConnection = mongoose.createConnection(MONGODB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

module.exports = mongooseConnection