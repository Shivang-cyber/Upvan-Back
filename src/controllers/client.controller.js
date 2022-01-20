const { Client } = require('../routes/client.model')

const getClient = async (req, reply) => {
  const client = await Client.find({ mail: req.params.id }).lean().exec()
  console.log(req.params.id)
  reply.send({ client })
}
const addClient = async (req, reply) => {
  const client = await Client.create(req.body)
  reply.send({ client })
}

module.exports = { getClient, addClient }
