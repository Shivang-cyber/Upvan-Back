const { v4: uuidv4 } = require('uuid')
const {Product} = require("../routes/Product.model")

const getProducts = async (req, reply) => {
  const product = await Product.find().lean().exec()
  reply.send({ product })
}

function productRoutes(fastify,options,done) {
 fastify.get("/pro",getProducts)
 done()
}
module.exports = productRoutes