import mongoose from "mongoose"

import CommentDTO from "../dtos/comment.dto.js"
import ApiError from "../exceprions/api.error.js"
import commentModel from "../models/comment.model.js"
import PostService from "./post.service.js"

class CommentService {
  async create(user, post, message) {
    await PostService.postExist(post)

    const inseredComment = await commentModel.create({
      user,
      post,
      message,
    })

    const commentPopulate = await inseredComment
      .populate("user")
      .populate("post")
      .execPopulate()

    const commentDTO = new CommentDTO(commentPopulate)
    return commentDTO
  }

  async edit(commentId, userId, newMessage) {
    const res = await commentModel.findOneAndUpdate(
      {
        $and: [{ _id: commentId }, { user: userId }],
      },
      {
        $set: { message: newMessage, edited: true },
      },
      { new: true },
    )

    if (res === null) {
      throw ApiError.HttpException(
        `Comment id ${commentId} is not found. Or User with id ${userId} is not author of this post`,
      )
    }

    const commentPopulate = await res.populate("user").execPopulate()

    const commentDTO = new CommentDTO(commentPopulate)
    return commentDTO
  }

  async delete(commentId, userId) {
    const deleteStatus = await commentModel.findOneAndDelete({
      $and: [{ _id: commentId }, { user: userId }],
    })
    if (deleteStatus === null) {
      throw ApiError.HttpException(
        `Comment id ${commentId} is not found. Or User with id ${userId} is not author of this post`,
      )
    }
    const commentDTO = new CommentDTO(deleteStatus)
    return commentDTO
  }

  async usersComments(userId) {
    const commentList = await commentModel.aggregate([
      {
        $match: {
          user: mongoose.Types.ObjectId(userId),
        },
      },
      {
        $lookup: {
          from: "posts",
          localField: "post",
          foreignField: "_id",
          as: "post",
        },
      },
      {
        $project: {
          _id: 0,
          id: "$_id",
          postTitle: "$post.title",
          postId: "$post._id",
          message: 1,
        },
      },
    ])
    return commentList
  }

  async getList(postId) {
    const commentList = await commentModel
      .find({ post: postId })
      .populate("user")

    const commentListDTO = commentList.map((comment) => new CommentDTO(comment))
    return commentListDTO
  }

  commentsMatchFilter(idList, filter) {
    const matchData = {}

    const objectIdList = Array.isArray(idList)
      ? idList.map((id) => mongoose.Types.ObjectId(id))
      : []

    // Выборка комментариев пользователя
    if (filter?.user) {
      matchData.author = {
        $eq: mongoose.Types.ObjectId(filter.user),
      }
    }

    // Выборка комментариев поста
    if (filter?.post) {
      matchData.post = {
        $eq: mongoose.Types.ObjectId(filter.post),
      }
    }

    // Исключения постов которые уже были получины
    matchData._id = {
      $nin: objectIdList,
    }

    return [
      {
        $match: {
          ...matchData,
        },
      },
    ]
  }

  commentssExtendedData() {
    return [
      {
        $lookup: {
          from: "users",
          localField: "user",
          foreignField: "_id",
          as: "user",
        },
      },
      {
        $unwind: "$user",
      },
      {
        $lookup: {
          from: "posts",
          localField: "post",
          foreignField: "_id",
          as: "post",
        },
      },
      {
        $unwind: "$post",
      },
      {
        $project: {
          _id: 0,
          id: "$_id",
          edited: 1,
          user: {
            id: "$user._id",
            email: "$user.email",
            isActivated: "$user.isActivated",
            isBlocked: "$user.isBlocked",
          },
          post: {
            id: "$post._id",
            title: "$post.title",
          },
          message: 1,
          createdDate: 1,
        },
      },
    ]
  }

  commentsSort(filter) {
    const sort = {}

    switch (filter) {
      case "createdDate":
      default:
        sort.createdDate = -1
        break
    }

    return [
      {
        $sort: sort,
      },
    ]
  }

  async getCommentsPagination(idList, limit, skip, filterType) {
    const filter = this.commentsMatchFilter(idList, filterType)
    const extended = this.commentssExtendedData()

    const skipPrepare = { $skip: skip }
    const limitCount = { $limit: limit }

    const combineAggregate = [...filter, ...extended, skipPrepare, limitCount]

    const commens = await commentModel.aggregate(combineAggregate)

    if (!commens || commens.length === 0)
      return {
        list: [],
        hasMore: false,
      }

    if (commens.length === limit) {
      return {
        list: commens,
        hasMore: true,
      }
    }

    return {
      list: commens,
      hasMore: false,
    }
  }
}

export default new CommentService()
