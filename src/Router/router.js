const fp = require('fastify-plugin')
const path = require('path')
const {
  getProducts,
  addProducts,
  getAllProduct,
  updateProducts,
} = require('../controllers/Product.controller')

const {
  getClient,
  addClient,
  getAllClient,
  updateOneClient,
  addToCart,
  purchaseAll,
} = require('../controllers/client.controller')
const {
  getAllComment,
  addComment,
  updateOneComment,
  deleteOneComment,
} = require('../controllers/comment.controller')
// const { default: fastifyStatic } = require('fastify-static')
module.exports = fp(function productRoutes(fastify, options, done) {
  fastify.get('/pr/:id', getProducts)
  fastify.post('/pr', addProducts)
  fastify.get('/pr/A', getAllProduct)
  fastify.patch('/pr/:id', updateProducts)

  fastify.get('/cl/:id', getClient)
  fastify.get('/cl/A', getAllClient)
  fastify.post('/cl', addClient)
  fastify.patch('/cl/:id', updateOneClient)
  fastify.get('/cla/:id', addToCart)
  fastify.get('/pur/:id', purchaseAll)
  fastify.get('/co', getAllComment)
  fastify.post('/co', addComment)
  fastify.patch('/co/:id', updateOneComment)
  fastify.delete('/co/:id', deleteOneComment)
  done()
})
