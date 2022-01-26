//const { v4: uuidv4 } = require('uuid')
const { Product } = require('../routes/Product.model')
const { Comment } = require('../routes/comment.model')

const getAllProduct = async (req, reply) => {
  const product = await Product.find().lean().exec()
  const comment = await Comment.find()
    .populate('author', 'mail details.name')
    .lean()
    .exec()
  product.map((a) => {
    let c = comment.filter((b) => b.product.toString() == a._id.toString())
    a.reviews = c
  })
  reply.send({ product })
}

const updateProducts = async (req, reply) => {
  const products = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  })
    .lean()
    .exec()
  reply.send({ products })
}

const getProducts = async (req, reply) => {
  const comment = await Comment.find({ product: { $all: req.params.id } })
    .populate('author')
    .lean()
    .exec()
  const product = await Product.findById(req.params.id).lean().exec()
  product.reviews = comment
  reply.send({ product })
}
const addProducts = async (req, reply) => {
  const product = await Product.create(req.body)
  reply.send({ product })
}

module.exports = { getProducts, addProducts, getAllProduct, updateProducts }
