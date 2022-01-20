const { Client } = require('../routes/client.model')

const getClient = async (req, reply) => {
  const client = await Client.find({ mail: req.params.id })
    .populate({ path: 'in_cart', select: 'name' })
    .lean()
    .exec()
  console.log(req.params.id)
  reply.send({ client })
}
const getAllClient = async (req, reply) => {
  const client = await Client.find()
    .populate({ path: 'in_cart', select: 'name' })
    .lean()
    .exec()

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
  reply.send({ client })
}

module.exports = { getClient, addClient, getAllClient, updateOneClient }
