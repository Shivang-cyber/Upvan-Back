const { Comment } = require('../routes/comment.model')

const addComment = async (req, reply) => {
  const comment = await Comment.create(req.body)
  reply.send({ comment })
}

const getAllComment = async (req, reply) => {
  const comment = await Comment.find()
    .populate({ path: 'author', select: 'mail details.name' })
    .lean()
    .exec()
  reply.send({ comment })
}

const updateOneComment = async (req, reply) => {
  const comment = await Comment.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  })
    .lean()
    .exec()
  reply.send({ comment })
}

const deleteOneComment = async (req, reply) => {
  const comment = await Comment.findByIdAndDelete(req.params.id).lean().exec()
  reply.send({ comment })
}

module.exports = { getAllComment, addComment, updateOneComment,deleteOneComment }
