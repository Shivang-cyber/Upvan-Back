const { v4: uuidv4 } = require('uuid')
const {Product} = require("../routes/Product.model")

const getProducts = async (req, reply) => {
  const product = await Product.find().lean().exec()
  reply.send({ product })
}
const addProducts = async (req,reply)=>{
 const product = await Product.create(req.body)
 reply.send({product})
}
function productRoutes(fastify,options,done) {
 fastify.get("/pro",getProducts)
 fastify.post("/pro",addProducts)
 done()
}
module.exports = productRoutes