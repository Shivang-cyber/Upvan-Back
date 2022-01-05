const PORT = process.env.PORT || 3001

const fastify = require('fastify')({ logger: true })

fastify.register(require('point-of-view'), {
  engine: {
    ejs: require('ejs'),
  },
})

fastify.get('/', (req, reply) => {
  reply.view('/index.ejs', { text: 'texdat' })
})

fastify.get('/a', async (request, reply) => {
  return { hello: 'world' }
})
fastify.register(require('./src/controllers/Product.controller'))

fastify.listen(PORT, '0.0.0.0', (err) => {
  if (err) throw err
  console.log(`server listening on ${fastify.server.address().port}`)
})
