const mongooseConnection = require('../config/db')
const mongoose = require('mongoose')

const clientSchema = mongoose.Schema({
  mail: { type: String, required: true },
  details: {
    name: { type: String, required: true },
    mob: { type: String, required: true },
    address: { type: String, required: true },
  },
  in_cart: [{ type: String, required: false }],
  liked: [{ type: String, required: false }],
  purchased: [{ type: String, required: false }],
})

const Client = mongooseConnection.model('client', clientSchema)

module.exports = { Client }
