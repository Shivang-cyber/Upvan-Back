const { Client } = require('../routes/client.model')
const { Product } = require('../routes/Product.model')

const getClient = async (req, reply) => {
  const client = await Client.find({ mail: req.params.id })
    .populate('in_cart.item liked.item purchased.item.item')
    .lean()
    .exec()

  reply.send({ client })
}
const getAllClient = async (req, reply) => {
  const client = await Client.find().populate('in_cart.item').lean().exec()
  reply.send({ client })
}
const addClient = async (req, reply) => {
  let a = await Client.find({ mail: req.body.mail }).lean().exec()
  if (a.length != 0) {
    reply.send('Already Exist')
    return
  }
  const client = await Client.create(req.body)
  reply.send({ client })
}

const updateOneClient = async (req, reply) => {
  const client = await Client.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  })
    .lean()
    .exec()
  reply.send({ client })
}

const addToCart = async (req, reply) => {
  const plant = await Product.find().lean().exec()
  const client = await Client.find({ mail: req.params.id })
    .populate('in_cart.item liked.item purchased.item.item')
    .lean()
    .exec()
  let C = client[0].in_cart
  if (req.query.part == 'I') {
    if (req.query.type == 'A') {
      let T = true
      for (let i = 0; i < C.length; i++) {
        if (C[i].item._id.toString() == req.query.item) {
          T = false
          break
        }
      }
      if (T == true) {
        let o = {}
        o['item'] = req.query.item
        o['count'] = 1
        C.push(o)
      }
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
          if (client[0].in_cart[i].count < 10) {
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
  const cl = await Client.findByIdAndUpdate(i, client[0], { new: true })
    .lean()
    .exec()

  reply.send({ cl })
}

const purchaseAll = async (req, reply) => {
  const client = await Client.find({ mail: req.params.id })
    .populate('in_cart.item liked.item purchased.item.item')
    .lean()
    .exec()
  if (client[0].in_cart == 0) {
    reply.send('Cart Empty')
    return
  }
  const pr = await Product.find().lean().exec()
  //order & delivery date
  let date = new Date()
  let Cd = new Date().toString().split(' ')
  date.setDate(date.getDate() + 3)
  date = date.toString().split(' ')
  //done
  let Price = 0
  client[0].in_cart.map((a) => {
    Price += a.item.price * a.count
    let b = pr.filter((x) => x._id.toString() == a.item._id)

    if (b[0].c < a.count) {
      reply.send(`Please reduce ${b[0].name}'s quantity`)
      return
    }
  })
  let T = true
  client[0].in_cart.forEach(async (a) => {
    for (let i = 0; i < pr.length; i++) {
      if (pr[i]._id.toString() == a.item._id) {
        if (pr[i].c >= a.count) {
          pr[i].c -= a.count
        } else {
          T = false
        }

        const p = await Product.findByIdAndUpdate(pr[i]._id.toString(), pr[i], {
          new: true,
        })
          .populate('in_cart.item liked.item purchased.item.item')
          .lean()
          .exec()
      }
    }
  })
  let O = {
    item: client[0].in_cart,
    price: Price,
    deliveryDate: `${date[1]} ${date[2]} ${date[3]}`,
    orderTime: `${Cd[1]} ${Cd[2]} ${Cd[3]} ${Cd[4]}`,
  }
  client[0].purchased.push(O)
  client[0].in_cart = []

  let i = client[0]._id
  i = i.toString()
  const cl = await Client.findByIdAndUpdate(i,client[0],{new:true}).lean().exec()

  if (T == true) {
    reply.send({ cl })
  } else {
    reply.send('please review your cart')
  }
}

module.exports = {
  getClient,
  addClient,
  getAllClient,
  updateOneClient,
  addToCart,
  purchaseAll,
}
