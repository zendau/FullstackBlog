const postModel = require("../models/post.model")
const PostDTO = require("../dtos/post.dto")
const UserDTO = require("../dtos/user.dto")
const FileDTO = require("../dtos/file.dto")
const ApiError = require("../exceprions/api.error")

const FileService = require("./file.service")
const TagService = require("./tag.service")
const ReactionService = require("./reaction.service")
const CommentService = require("./comment.service")
const UserPostReadService = require("./userPostRead.service")

const { ObjectId } = require("mongodb")

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
      .populate("tags")

    if (post === null) {
      throw ApiError.HttpException(`Post with id ${postId} not found`)
    }

    return post
  }

  async getUserPostData(userId) {
    const posts = await postModel.find().where("author").equals(userId)
    const postsId = posts.map((post) => ObjectId(post._id))

    const comments = await CommentService.usersComments(userId)
    const userRating = await ReactionService.getUserRating(postsId)
    const reactions = await ReactionService.getPersonalLikes(userId)

    return { userRating, comments, reactions }
  }

  async getOne(postId, userId, ip) {
    const post = await this.postExist(postId)
    const postDTO = await this.getExtendedPostDTO(post, userId)

    const checkStatus = await UserPostReadService.chechIsReadStatus(postId, ip)

    if (checkStatus) {
      UserPostReadService.setIsReadStatus(postId, ip)
    }

    return postDTO
  }

  async searchBySubstring(substring) {
    const posts = await postModel
      .find({
        title: { $regex: substring },
      })
      .populate("author")

    const postsDTO = posts.map((post) => this.createPostListDTO(post))
    return postsDTO
  }

  async getAllPosts() {
    const posts = await postModel.find().populate("author")
    const postsDTO = posts.map((post) => this.createPostListDTO(post))
    return postsDTO
  }

  async getLimitPosts(currentPage, limit) {
    const postsData = await this.getPosts({}, currentPage, limit)
    return postsData
  }

  async getLimitUserPosts(currentPage, limit, userId) {
    const postsData = await this.getPosts(
      {
        author: userId,
      },
      currentPage,
      limit,
    )
    return postsData
  }

  async getPosts(filter, currentPage, limit) {
    const posts = await postModel
      .find(filter)
      .skip((currentPage - 1) * limit)
      .limit(parseInt(limit))
      .populate("author")

    const postsDTO = posts.map((post) => this.createPostListDTO(post))

    let nextPage = null

    if (postsDTO.length == limit) {
      nextPage = true
    } else {
      nextPage = false
    }

    return { nextPage, posts: postsDTO }
  }

  checkPostAuthor(userId, postAuthor) {
    if (postAuthor.toString() !== userId) {
      throw ApiError.HttpException(
        `User with id ${userId} not author this post`,
      )
    }
  }

  createPostListDTO(postModel) {
    const postDTO = new PostDTO(postModel)
    postDTO.setUserName(postModel.author.email)
    return postDTO
  }

  async getExtendedPostDTO(postModel, userId) {
    const postDTO = new PostDTO(postModel)
    const userDTO = new UserDTO(postModel.author)
    const fileDTO = new FileDTO(postModel.file)

    const tagsList = postModel.tags.map((tag) => tag.title)

    postDTO.setAuthor(userDTO)
    postDTO.setImage(fileDTO)
    postDTO.setTags(tagsList)

    const reactionData = await ReactionService.getReactionsCount(
      postDTO.id,
      userId,
    )
    postDTO.setLikes(reactionData)

    const commentsData = await CommentService.getList(postDTO.id)
    postDTO.setComments(commentsData)

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

  async addPostComment(userId, postId, message) {
    await this.postExist(postId)

    const inseredCommentDTO = await CommentService.create(
      userId,
      postId,
      message,
    )
    return inseredCommentDTO
  }

  postsRating(withCounters) {
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
        $project: {
          _id: 1,
          comments: {
            $size: "$comments",
          },
          readCount: 1,
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
            $first: "$readCount",
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
      ? idList.map((id) => ObjectId(id))
      : []

    // Выборка постов конкретного пользователя
    if (filter?.authorId) {
      matchData.author = {
        $eq: ObjectId(filter.authorId),
      }
    }

    // Выборка постов по конкретному тегу
    if (filter?.tag) {
      matchData.tags = {
        $elemMatch: { $eq: ObjectId(filter.tag) },
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
        $lookup: {
          from: "tags",
          localField: "post.tags",
          foreignField: "_id",
          as: "tags",
        },
      },
      {
        $project: {
          _id: 0,
          id: "$_id",
          body: {
            $substr: ["$post.body", 0, 10],
          },
          tags: {
            $map: {
              input: "$tags",
              as: "tag",
              in: "$$tag.title",
            },
          },
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

  async getPostsPagination(idList, limit, sortType, filterType) {
    const filter = this.postsMatchFilter(idList, filterType)
    const rating = this.postsRating(true)
    const extended = this.postsExtendedData()
    const sort = this.postsSort(sortType)

    const postsLimit = { $limit: limit }

    const combineAggregate = [
      ...filter,
      ...rating,
      ...extended,
      ...sort,
      postsLimit,
    ]

    const posts = await postModel.aggregate(combineAggregate)

    return posts
  }
}

module.exports = new PostService()
