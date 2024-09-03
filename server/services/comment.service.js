import {
  byUser,
  extendedData,
  facetData,
  matchFilter,
} from "../aggregation/comment.builder.js"
import { ERROR_COMMENT } from "../constants/error.messages.js"
import CommentDTO from "../dtos/comment.dto.js"
import ApiError from "../exceptions/api.error.js"
import CommentRepository from "../repositories/comment.repository.js"

class CommentService {
  async create(user, post, message) {
    const inseredComment = await CommentRepository.create({
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
    const res = await CommentRepository.findOneAndUpdate(
      {
        $and: [{ _id: commentId }, { user: userId }],
      },
      {
        $set: { message: newMessage, edited: true },
      },
      { new: true },
    )

    if (res === null) {
      throw ApiError.HttpException(ERROR_COMMENT.NOT_FOUND(commentId, userId))
    }

    const commentPopulate = await res.populate("user").execPopulate()

    const commentDTO = new CommentDTO(commentPopulate)
    return commentDTO
  }

  async delete(commentId, userId) {
    const deleteStatus = await CommentRepository.findOneAndDelete({
      $and: [{ _id: commentId }, { user: userId }],
    })
    if (deleteStatus === null) {
      throw ApiError.HttpException(ERROR_COMMENT.NOT_FOUND(commentId, userId))
    }
    const commentDTO = new CommentDTO(deleteStatus)
    return commentDTO
  }

  async deleteManyByPost(postId) {
    await CommentRepository.deleteMany({ post: postId })
  }

  async usersComments(userId) {
    const commentList = await CommentRepository.aggregate(byUser(userId))
    return commentList
  }

  async getCommentsPagination(idList, limit, skip, filterType) {
    const filter = matchFilter(idList, filterType)
    const extended = extendedData()
    const facet = facetData(skip, limit)

    const combineAggregate = [...filter, ...extended, ...facet]

    const commens = await CommentRepository.aggregate(combineAggregate)

    if (!commens[0]) return [{ list: [], hasMore: false, total: 0 }]

    if (commens[0].list.length === limit) {
      commens[0].hasMore = true
    } else {
      commens[0].hasMore = false
    }

    return commens
  }
}

export default new CommentService()
