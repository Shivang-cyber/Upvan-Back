const { Client } = require('../routes/client.model')
const { Product } = require('../routes/Product.model')

const getClient = async (req, reply) => {
  const client = await Client.find({ mail: req.params.id })
    .populate('in_cart.item liked.item purchased.item')
    .lean()
    .exec()

  reply.send({ client })
}
const getAllClient = async (req, reply) => {
  const client = await Client.find().populate('in_cart.item').lean().exec()

  reply.send({ client })
}
const addClient = async (req, reply) => {
  const client = await Client.create(req.body)
  reply.send({ client })
}

const updateOneClient = async (req, reply) => {
  const client = await Client.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  })
    .lean()
    .exec()
  console.log(req.body)
  reply.send({ client })
}

const addToCart = async (req, reply) => {
  const plant = await Product.find().lean().exec()
  const client = await Client.find({ mail: req.params.id })
    .populate('in_cart.item liked.item purchased.item')
    .lean()
    .exec()
  let C = client[0].in_cart
  if (req.query.part == 'I') {
    if (req.query.type == 'A') {
      for (let i = 0; i < C.length; i++) {
        if (C[i].item._id.toString() == req.query.item) {
          client[0].in_cart.splice(i, 1)
          break
        }
      }
      let o = {}
      o['item'] = req.query.item
      o['count'] = 1
      C.push(o)
    } else if (req.query.type == 'D') {
      for (let i = 0; i < C.length; i++) {
        if (C[i].item._id.toString() == req.query.item) {
          client[0].in_cart.splice(i, 1)
          break
        }
      }
    } else if (req.query.type == 'P') {
      for (let i = 0; i < C.length; i++) {
        if (C[i].item._id.toString() == req.query.item) {
          if (client[0].in_cart[i].count < 11) {
            client[0].in_cart[i].count++
          }
          break
        }
      }
    } else if (req.query.type == 'M') {
      for (let i = 0; i < C.length; i++) {
        if (C[i].item._id.toString() == req.query.item) {
          if (client[0].in_cart[i].count != 1) {
            client[0].in_cart[i].count--
          }
          break
        }
      }
    }
  } else if (req.query.part == 'L') {
    let L = client[0].liked
    if (req.query.type == 'A') {
      for (let i = 0; i < L.length; i++) {
        if (L[i].item._id.toString() == req.query.item) {
          client[0].liked.splice(i, 1)
          break
        }
      }
      let o = { item: req.query.item }
      L.push(o)
    } else if (req.query.type == 'D') {
      for (let i = 0; i < L.length; i++) {
        if (L[i].item._id.toString() == req.query.item) {
          client[0].liked.splice(i, 1)
          break
        }
      }
    }
  }

  let i = client[0]._id
  i = i.toString()
  console.log(plant)
  const cl = await Client.findByIdAndUpdate(i, client[0], { new: true })
    .lean()
    .exec()

  reply.send({ cl })
}

const purchaseAll = async (req, reply) => {
  const client = await Client.find({ mail: req.params.id })
    .populate('in_cart.item liked.item purchased.item')
    .lean()
    .exec()

  let date = new Date()
  let Cd = new Date().toString().split(' ')
  date.setDate(date.getDate() + 3)
  date = date.toString().split(' ')
  let Price = 0
  client[0].in_cart.map((a) => {
    Price += a.item.price * a.count
  })

  let O = {
    item: client[0].in_cart,
    price: Price,
    deliveryDate: `${date[1]} ${date[2]} ${date[3]}`,
    orderTime: `${Cd[1]} ${Cd[2]} ${Cd[3]} ${Cd[4]}`,
  }
  client[0].purchased.push(O)
  console.log(client[0].purchased[0].item)
  client[0].in_cart = []

  let i = client[0]._id
  i = i.toString()
  const cl = await Client.findByIdAndUpdate(i, client[0], { new: true })
    .populate('in_cart.item liked.item purchased.item.item')
    .lean()
    .exec()

  reply.send({ cl })
}

module.exports = {
  getClient,
  addClient,
  getAllClient,
  updateOneClient,
  addToCart,
  purchaseAll,
}
