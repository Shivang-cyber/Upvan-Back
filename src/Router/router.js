const fp = require('fastify-plugin')
const path = require('path')
const {
  getProducts,
  addProducts,
} = require('../controllers/Product.controller')

const { getClient, addClient } = require('../controllers/client.controller')

module.exports = fp(function productRoutes(fastify, options, done) {
  fastify.get('/pr', getProducts)
  fastify.post('/pr', addProducts)
  fastify.get('/cl/:id', getClient)
  fastify.post('/cl', addClient)
  done()
})