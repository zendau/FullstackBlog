import mongoose from "mongoose"

import FileDTO from "../dtos/file.dto.js"
import PostDTO from "../dtos/post.dto.js"
import UserDTO from "../dtos/user.dto.js"
import ApiError from "../exceprions/api.error.js"
import postModel from "../models/post.model.js"
import FileService from "./file.service.js"
import ReactionService from "./reaction.service.js"
import TagService from "./tag.service.js"
import UserPostReadService from "./userPostRead.service.js"

class PostService {
  async create(author, postData, file) {
    const fileData = await FileService.create(file)
    const tagsList = await TagService.insertTags(postData.tags)

    const post = await postModel.create({
      author,
      title: postData.title,
      body: postData.body,
      tags: tagsList,
      timeRead: postData.timeRead,
      file: fileData.id,
    })

    const postPopulate = await post
      .populate("author")
      .populate("file")
      .populate("tags")
      .execPopulate()

    const postDTO = await this.getExtendedPostDTO(postPopulate, author)
    return postDTO
  }

  async edit(postId, userId, title, body, newFile) {
    const postData = await this.postExist(postId)
    this.checkPostAuthor(userId, postData.author.id)

    if (newFile !== undefined) {
      await FileService.update(postData.file, newFile)
    }

    if (title !== undefined) {
      postData.title = title
    }

    if (body !== undefined) {
      postData.body = body
    }

    const post = await postData.save()
    const postPopulate = await post.populate("author").execPopulate()
    const postDTO = await this.getExtendedPostDTO(postPopulate)
    return postDTO
  }

  async delete(postId, userId) {
    const postData = await this.postExist(postId)
    this.checkPostAuthor(userId, postData.author.id)

    postData.deleteOne()
    await ReactionService.deletePostReactions(postId)

    return true
  }

  async postExist(postId) {
    const post = await postModel
      .findById(postId)
      .populate("author")
      .populate("file")

    if (post === null) {
      throw ApiError.HttpException(`Post with id ${postId} not found`)
    }

    return post
  }

  async getOne(postId, ip) {
    const filter = this.postsMatchFilter(null, { postId })
    const postLookup = this.postLookup()
    const rating = this.postsRating(true)
    const extended = this.postsExtendedData()

    const combineAggregate = [...filter, ...postLookup, ...rating, ...extended]

    const resData = await postModel.aggregate(combineAggregate)

    UserPostReadService.incCounter(postId, ip)

    return resData[0]
  }

  checkPostAuthor(userId, postAuthor) {
    if (postAuthor.toString() !== userId) {
      throw ApiError.HttpException(
        `User with id ${userId} not author this post`,
      )
    }
  }

  async getExtendedPostDTO(postModelData, userId) {
    const postDTO = new PostDTO(postModelData)
    const userDTO = new UserDTO(postModelData.author)
    const fileDTO = new FileDTO(postModelData.file)

    postDTO.setAuthor(userDTO)
    postDTO.setImage(fileDTO)

    const reactionData = await ReactionService.getReactionsCount(
      postDTO.id,
      userId,
    )
    postDTO.setLikes(reactionData)

    return postDTO
  }

  async postReaction(postId, userId, isLiked) {
    const reactionStatus = await ReactionService.setReaction(
      postId,
      userId,
      isLiked,
    )

    if (!reactionStatus && isLiked !== "null") {
      await this.postExist(postId)
      await ReactionService.add(postId, userId, isLiked)
    }

    return true
  }

  postLookup() {
    return [
      {
        $lookup: {
          from: "comments",
          localField: "_id",
          foreignField: "post",
          as: "comments",
        },
      },
      {
        $lookup: {
          from: "userpostreads",
          localField: "_id",
          foreignField: "post",
          as: "postreads",
        },
      },
      {
        $lookup: {
          from: "reactions",
          localField: "_id",
          foreignField: "post",
          as: "react",
        },
      },
    ]
  }

  postsRating(withCounters) {
    return [
      {
        $project: {
          _id: 1,
          comments: {
            $size: "$comments",
          },
          counterReads: {
            $size: "$postreads",
          },
          react: "$react",
        },
      },
      {
        $unwind: {
          path: "$react",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $group: {
          _id: "$_id",
          counterLikes: {
            $sum: {
              $cond: {
                if: {
                  $eq: ["$react.isLiked", true],
                },
                then: 1,
                else: 0,
              },
            },
          },
          counterDislikes: {
            $sum: {
              $cond: {
                if: {
                  $eq: ["$react.isLiked", false],
                },
                then: 1,
                else: 0,
              },
            },
          },
          counterComments: {
            $first: "$comments",
          },
          counterReads: {
            $first: "$counterReads",
          },
        },
      },
      {
        $project: {
          rating: {
            $sum: [
              {
                $multiply: ["$counterLikes", 2],
              },
              {
                $multiply: ["$counterDislikes", -1],
              },
              {
                $multiply: ["$counterComments", 3],
              },
              {
                $multiply: ["$counterReads", 0.1],
              },
            ],
          },
          ...(withCounters && {
            counterReads: 1,
            counterComments: 1,
            counterLikes: 1,
            counterDislikes: 1,
          }),
        },
      },
    ]
  }

  postsMatchFilter(idList, filter) {
    const matchData = {}

    const objectIdList = Array.isArray(idList)
      ? idList.map((id) => mongoose.Types.ObjectId(id))
      : []

    // Выборка постов конкретного пользователя
    if (filter?.authorId) {
      matchData.author = {
        $eq: mongoose.Types.ObjectId(filter.authorId),
      }
    }

    // Выборка постов по конкретному тегу
    if (filter?.tag) {
      matchData.tags = {
        $elemMatch: { $eq: filter.tag },
      }
    }

    // Выборка постов по подстроке
    if (filter.substring) {
      const regex = new RegExp(filter.substring, "i")

      matchData.title = {
        $regex: regex,
      }
    }

    // Получение поста по айди
    if (filter.postId) {
      matchData._id = {
        $eq: mongoose.Types.ObjectId(filter.postId),
      }
    }

    if (objectIdList.length > 0) {
      // Исключения постов которые уже были получины
      matchData._id = {
        $nin: objectIdList,
      }
    }

    return [
      {
        $match: {
          ...matchData,
        },
      },
    ]
  }

  postsExtendedData() {
    return [
      {
        $lookup: {
          from: "posts",
          localField: "_id",
          foreignField: "_id",
          as: "post",
        },
      },
      {
        $unwind: "$post",
      },
      {
        $lookup: {
          from: "files",
          localField: "post.file",
          foreignField: "_id",
          as: "file",
        },
      },
      {
        $unwind: "$file",
      },
      {
        $lookup: {
          from: "users",
          localField: "post.author",
          foreignField: "_id",
          as: "author",
        },
      },
      {
        $unwind: "$author",
      },
      {
        $project: {
          _id: 0,
          id: "$_id",
          body: {
            $substr: ["$post.body", 0, 10],
          },
          tags: "$post.tags",
          author: {
            id: "$author._id",
            email: 1,
          },
          title: "$post.title",
          timeRead: "$post.timeRead",
          file: {
            id: "$file._id",
            fileName: 1,
            size: 1,
            mimetype: 1,
          },
          createdDate: "$post.createdDate",
          rating: {
            $sum: [
              {
                $multiply: ["$counterLikes", 2],
              },
              {
                $multiply: ["$counterDislikes", -1],
              },
              {
                $multiply: ["$counterComments", 3],
              },
              {
                $multiply: ["$counterReads", 0.1],
              },
            ],
          },
          counterReads: 1,
          counterComments: 1,
          counterLikes: 1,
          counterDislikes: 1,
        },
      },
    ]
  }

  postsSort(filter) {
    const sort = {}

    switch (filter) {
      case "byCreatedDate":
        sort.createdDate = -1
        break

      case "byRating":
      default:
        sort.rating = -1
        break
    }

    return [
      {
        $sort: sort,
      },
    ]
  }

  postFacet(skip, limit, sort) {
    const postsLimit = { $limit: limit }
    const postsSkip = { $skip: skip }

    const facetPosts = []

    if (skip) {
      facetPosts.push(postsSkip)
    }
    if (limit >= 0) {
      facetPosts.push(postsLimit)
    }

    const facet = [
      {
        $facet: {
          posts: [...sort, ...facetPosts],
          total: [
            {
              $group: {
                _id: null,
                count: {
                  $sum: 1,
                },
              },
            },
            {
              $project: {
                _id: 0,
                count: 1,
              },
            },
          ],
        },
      },
      {
        $unwind: "$total",
      },
      {
        $project: {
          posts: 1,
          total: "$total.count",
        },
      },
    ]

    return facet
  }

  async getPostsPagination(idList, limit, skip, sortType, filterType) {
    const filter = this.postsMatchFilter(idList, filterType)
    const postLookup = this.postLookup()
    const rating = this.postsRating(true)
    const extended = this.postsExtendedData()
    const sort = this.postsSort(sortType)

    const facet = this.postFacet(skip, limit, sort)

    const combineAggregate = [
      ...filter,
      ...postLookup,
      ...rating,
      ...extended,
      ...facet,
    ]

    const resData = await postModel.aggregate(combineAggregate)
    if (!resData[0]) return [{ posts: [], hasMore: false, total: 0 }]

    if (resData[0].posts.length === limit) {
      resData[0].hasMore = true
    } else {
      resData[0].hasMore = false
    }

    return resData
  }
}

export default new PostService()
