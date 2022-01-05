const mongoose = require('mongoose')

const MONGODB_URL =
  'mongodb+srv://Manney:9026724930@ape.cyihp.mongodb.net/Index?retryWrites=true&w=majority'

const mongooseConnection = mongoose.createConnection(MONGODB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

module.exports = mongooseConnection