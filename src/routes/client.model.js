const mongooseConnection = require('../config/db')
const mongoose = require('mongoose')

const clientSchema = mongoose.Schema(
  {
    mail: { type: String, required: true },
    details: {
      name: { type: String, required: true },
      mob: { type: String, required: true },
      address: { type: String, required: true },
    },
    in_cart: [
      {
        item: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'client',
          required: false,
        },
        count: { type: String, required: true },
      },
    ],
    liked: [{ type: String, required: false }],
    purchased: [{ type: String, required: false }],
  },
  {
    versionKey: false,
    timestamps: true,
  }
)

const Client = mongooseConnection.model('client', clientSchema)

module.exports = { Client }
