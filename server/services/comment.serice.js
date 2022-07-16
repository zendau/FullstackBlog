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

    const inseredCommentDTO = new CommentDTO(inseredComment)
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
      $set: { message: newMessage }
    })

    if (res === null) {
      throw ApiError.HttpException(`Comment id ${commentId} is not found. Or User with id ${userId} is not author of this post`)
    }
    return true
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
    return true
  }

  async getList(postId) {
    const commentList = await commentModel.find({post: postId})
    const commentListDTO = commentList.map(comment => new CommentDTO(comment))
    return commentListDTO
  }
}

module.exports = new CommentService()