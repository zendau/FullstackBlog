import mongoose from "mongoose"

import ApiError from "../exceprions/api.error.js"
import {
  CodeBlock,
  FileBlock,
  HeaderBlock,
  ListBlock,
  PostModel,
  QuoteBlock,
  SliderBlock,
  SpaceBlock,
  TextBlock,
} from "../models/post.model.js"
import FileService from "./file.service.js"
import ReactionService from "./reaction.service.js"
import UserPostReadService from "./userPostRead.service.js"

class PostService {
  async create(author, postData, file) {
    try {
      const fileData = await FileService.upload([file], author)
      const fileId = fileData[0].id

      if (!fileId) {
        throw new ApiError.InternalError("Errors when saving the article file")
      }

      const createdPostData = await this.insert("create", author, {
        postData,
        fileId,
      })

      return createdPostData
    } catch (e) {
      if (e instanceof ApiError) {
        throw e
      } else {
        throw new ApiError.InternalError(
          "Unexpected error when creating an article",
        )
      }
    }
  }

  async insert(type, author, { postData, fileId, postId }) {
    try {
      const tagsList = postData.tags.split(",")

      const postBlocks = []

      const blocksData = postData.blocks ? JSON.parse(postData.blocks) : []

      blocksData.forEach((blockData) => {
        switch (blockData.type) {
          case "header": {
            const tempBlock = new HeaderBlock({
              type: "header",
              content: blockData.content,
            })

            postBlocks.push(tempBlock)

            break
          }
          case "text": {
            const tempBlock = new TextBlock({
              type: "text",
              content: blockData.content,
            })

            postBlocks.push(tempBlock)

            break
          }
          case "quoute": {
            const tempBlock = new QuoteBlock({
              type: "quote",
              content: blockData.content,
            })

            postBlocks.push(tempBlock)

            break
          }
          case "space": {
            const tempBlock = new SpaceBlock({
              type: "space",
            })

            postBlocks.push(tempBlock)

            break
          }
          case "code": {
            const tempBlock = new CodeBlock({
              type: "code",
              content: blockData.content,
            })

            postBlocks.push(tempBlock)

            break
          }
          case "list": {
            const tempBlock = new ListBlock({
              type: "list",
              content: blockData.content,
            })

            postBlocks.push(tempBlock)

            break
          }
          case "file": {
            const tempBlock = new FileBlock({
              type: "file",
              list: blockData.content,
            })

            postBlocks.push(tempBlock)

            break
          }
          case "slider": {
            const tempBlock = new SliderBlock({
              type: "slider",
              list: blockData.content,
            })

            postBlocks.push(tempBlock)

            break
          }
          default:
            break
        }
      })

      const preparePostData = {
        title: postData.title,
        preview: postData.preview,
        tags: tagsList,
        timeRead: postData.timeRead,
        blocks: postBlocks,
      }

      let post

      if (type === "create") {
        preparePostData.author = author
        preparePostData.file = fileId

        post = await PostModel.create(preparePostData)
      } else if (type === "edit") {
        post = await PostModel.findByIdAndUpdate(postId, preparePostData)
      } else {
        throw new ApiError.InternalError("unknown article operation type")
      }

      const createdPostData = await this.getOne(post._id, null)

      if (!createdPostData) {
        throw new ApiError.InternalError(
          "An error occurred while receiving the extended data of the post",
        )
      }

      return createdPostData
    } catch (e) {
      if (e instanceof ApiError) {
        throw e
      } else if (type === "create") {
        throw new ApiError.InternalError("Error saving the article")
      } else if (type === "edit") {
        throw new ApiError.InternalError("Error updating the article")
      } else {
        throw new ApiError.UnexpectedError()
      }
    }
  }

  async edit(author, postData, file) {
    try {
      const post = await this.isPostAuthor(author, postData.id)

      if (file) {
        await FileService.update(post.file, file)
      }

      const updatedPostData = await this.insert("edit", author, {
        postData,
        file: post.file,
        postId: postData.id,
      })

      return updatedPostData
    } catch (e) {
      if (e instanceof ApiError) {
        throw e
      } else {
        throw new ApiError.InternalError(
          "Unexpected error when creating an article",
        )
      }
    }
  }

  async delete(postId, userId) {
    const postData = await this.postExist(postId)
    this.checkPostAuthor(userId, postData.author.id)

    postData.deleteOne()
    await ReactionService.deletePostReactions(postId)

    return true
  }

  async isPostExist(postId) {
    const post = await PostModel.findById(postId)

    if (!post) {
      throw ApiError.HttpException(`Article with id '${postId}' not found`)
    }

    return post
  }

  async getOne(postId, ip) {
    const filter = this.postsMatchFilter(null, { postId })
    const postLookup = this.postLookup()
    const rating = this.postsRating(true)
    const postExtended = this.postsExtendedData()
    const blocksExntended = this.blockExtended()

    const combineAggregate = [
      ...filter,
      ...postLookup,
      ...rating,
      ...postExtended,
      ...blocksExntended,
    ]

    const resData = await PostModel.aggregate(combineAggregate)

    if (ip) {
      UserPostReadService.incCounter(postId, ip)
    }

    return resData[0]
  }

  async isPostAuthor(userId, postId) {
    const post = await this.isPostExist(postId)

    if (!post.author.equals(userId)) {
      throw ApiError.HttpException(
        `User with id ${userId} not author this post`,
      )
    }

    return post
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
          preview: "$post.preview",
          tags: "$post.tags",
          author: {
            id: "$author._id",
            email: 1,
          },
          title: "$post.title",
          blocks: "$post.blocks",
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

  blockExtended() {
    return [
      {
        $unwind: "$blocks",
      },
      {
        $lookup: {
          from: "files",
          localField: "blocks.list",
          foreignField: "_id",
          as: "blocks.list",
        },
      },
      {
        $addFields: {
          blocks: {
            _id: "$$REMOVE",
            list: {
              $map: {
                input: "$blocks.list",
                as: "item",
                in: {
                  id: "$$item._id",
                  fileName: "$$item.fileName",
                  size: "$$item.size",
                  mimetype: "$$item.mimetype",
                },
              },
            },
          },
        },
      },
      {
        $addFields: {
          blocks: {
            list: {
              $cond: {
                if: {
                  $eq: ["$blocks.list", []],
                },
                then: "$$REMOVE",
                else: "$blocks.list",
              },
            },
          },
        },
      },
      {
        $set: {
          blocks: {
            $cond: {
              if: {
                $and: [
                  {
                    $not: ["$blocks.content"],
                  },
                  "$blocks.list",
                ],
              },
              then: {
                $mergeObjects: [
                  "$blocks",
                  {
                    content: "$blocks.list",
                  },
                ],
              },
              else: "$blocks",
            },
          },
        },
      },
      {
        $unset: "blocks.list",
      },
      {
        $group: {
          _id: "$id",
          doc: {
            $first: "$$ROOT",
          },
          blocks: {
            $push: "$blocks",
          },
        },
      },
      {
        $replaceRoot: {
          newRoot: {
            $mergeObjects: ["$doc", "$$ROOT"],
          },
        },
      },
      {
        $project: {
          _id: 0,
          doc: 0,
        },
      },
      // {
      //   $project: {
      //     id: "$_id",
      //     blocks: 1,
      //     tags: "$doc.tags",
      //     author: "$doc.author",
      //     title: "$doc.title",
      //     body: "$doc.body",
      //     timeRead: "$doc.timeRead",
      //     createdDate: "$doc.createdDate",
      //     test: "$doc",
      //   },
      // },
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

    const resData = await PostModel.aggregate(combineAggregate)
    if (!resData[0]) return [{ posts: [], hasMore: false, total: 0 }]

    if (resData[0].posts.length === limit) {
      resData[0].hasMore = true
    } else {
      resData[0].hasMore = false
    }

    return resData[0]
  }
}

export default new PostService()
