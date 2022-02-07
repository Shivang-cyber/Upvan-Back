const PORT = process.env.PORT || 3001
require('dotenv').config()
const fastify = require('fastify')({ logger: true })
// const cors = require("cors")
const path = require('path')

fastify.register(require('fastify-cors'), {
  // put your options here
  origin: '*',
  methods: ['POST','GET'],
})

fastify.register(require('point-of-view'), {
  engine: {
    ejs: require('ejs'),
  },
})

fastify.get('/', (req, reply) => {
  reply.view('/index.ejs', { text: 'texdat' })
})


fastify.register(require('fastify-static'), {
  root: path.join(__dirname, 'src'),
  wildcard: false,
})
fastify.register(require('./src/Router/router'))

fastify.listen(PORT, '0.0.0.0', (err) => {
  if (err) throw err
  console.log(`server listening on ${fastify.server.address().port}`)
})
