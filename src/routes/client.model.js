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
          ref: 'Product',
          required: false,
        },
        count: { type: String, required: true },
      },
    ],
    liked: [
      {
        item: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Product',
          required: false,
        },
      },
    ],
    purchased: [
      {
        item: [
          {
            item: {
              type: mongoose.Schema.Types.ObjectId,
              ref: 'Product',
              required: false,
            },
          },
        ],
        price: { type: String, required: false },
        deliveryDate: { type: String, required: false },
        orderTime: { type: String, required: false },
      },
    ],
  },
  {
    versionKey: false,
    timestamps: true,
  }
)

const Client = mongooseConnection.model('client', clientSchema)

module.exports = { Client }
