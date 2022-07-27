const commentModel = require("../models/comment.model")
const ApiError = require("../exceprions/api.error")

const CommentDTO = require("../dtos/comment.dto")

class CommentService {
  async create(user, post, message) {

    const inseredComment = await commentModel.create({
      user,
      post,
      message,
    })

    const commentPopulate = await inseredComment
    .populate("user")
    .execPopulate()

    const inseredCommentDTO = new CommentDTO(commentPopulate)
    return inseredCommentDTO
  }

  async edit(commentId, userId, newMessage) {
    const res = await commentModel.findOneAndUpdate({
      $and: [
        { _id: commentId },
        { user: userId }
      ]
    },
    {
      $set: { message: newMessage, edited: true },
    },
    { new: true  })

    if (res === null) {
      throw ApiError.HttpException(`Comment id ${commentId} is not found. Or User with id ${userId} is not author of this post`)
    }

    const commentPopulate = await res
    .populate("user")
    .execPopulate()

    const editCommentDTO = new CommentDTO(commentPopulate)
    return editCommentDTO
  }

  async delete(commentId, userId) {
    const DeleteStatus = await commentModel.findOneAndDelete({
      $and: [
        { _id: commentId },
        { user: userId }
      ]
    })  
    if (DeleteStatus === null) {
      throw ApiError.HttpException(`Comment id ${commentId} is not found. Or User with id ${userId} is not author of this post`)
    }
    const deleteCommentDTO = new CommentDTO(DeleteStatus)
    return deleteCommentDTO
  }

  async getList(postId) {
    const commentList = await commentModel.find({post: postId}).populate("user")
    const commentListDTO = commentList.map(comment => new CommentDTO(comment))
    return commentListDTO
  }
}

module.exports = new CommentService()