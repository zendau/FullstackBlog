const commentModel = require("../models/comment.model")
const ApiError = require("../exceprions/api.error")
const { ObjectId } = require('mongodb');
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
      { new: true })

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

  async usersComments(userId) {
    const commentList = await commentModel.aggregate([
      {
        "$match": {
          "user": ObjectId(userId)
        },

      },
      { $lookup: { from: 'posts', localField: 'post', foreignField: '_id', as: 'post' } },
      {
        $project: {
          _id: 0,
          id: "$_id",
          "postTitle": "$post.title",
          "postId": "$post._id",
          "message": 1,

        }
      }
    ])
    return commentList
  }

  async getList(postId) {
    const commentList = await commentModel.find({ post: postId }).populate("user")


    const commentListDTO = commentList.map(comment => new CommentDTO(comment))
    return commentListDTO
  }
}

module.exports = new CommentService()