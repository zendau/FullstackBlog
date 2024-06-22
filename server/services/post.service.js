import {
  blockExtended,
  postFacet,
  postLookup,
  postsExtendedData,
  postsMatchFilter,
  postsRating,
  postsSort,
} from "../aggregation/pagination.builder.js"
import ApiError from "../exceptions/api.error.js"
import {
  CodeBlock,
  FileBlock,
  HeaderBlock,
  ListBlock,
  QuoteBlock,
  SliderBlock,
  SpaceBlock,
  TextBlock,
} from "../models/post.model.js"
import PostRepository from "../repositories/post.repository.js"
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
      this.handleError(e, "Unexpected error when creating an article")
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
      this.handleError(e, "Unexpected error when editing an article")
    }
  }

  async insert(type, author, { postData, fileId, postId }) {
    try {
      const tagsList = postData.tags.split(",")

      const blocksData = postData.blocks ? JSON.parse(postData.blocks) : []

      const postBlocks = this.createBlocks(blocksData)

      const preparePostData = this.preparePostData(
        postData,
        tagsList,
        postBlocks,
      )

      let post

      if (type === "create") {
        preparePostData.author = author
        preparePostData.file = fileId

        post = await PostRepository.create(preparePostData)
      } else if (type === "edit") {
        post = await PostRepository.findByIdAndUpdate(postId, preparePostData)
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
      this.handleInsertError(e)
    }
  }

  createBlocks(blocksData) {
    return blocksData.map((blockData) => {
      switch (blockData.type) {
        case "header": {
          const tempBlock = new HeaderBlock({
            type: "header",
            content: blockData.content,
          })

          return tempBlock
        }
        case "text": {
          const tempBlock = new TextBlock({
            type: "text",
            content: blockData.content,
          })

          return tempBlock
        }
        case "quoute": {
          const tempBlock = new QuoteBlock({
            type: "quote",
            content: blockData.content,
          })

          return tempBlock
        }
        case "space": {
          const tempBlock = new SpaceBlock({
            type: "space",
          })

          return tempBlock
        }
        case "code": {
          const tempBlock = new CodeBlock({
            type: "code",
            content: blockData.content,
          })

          return tempBlock
        }
        case "list": {
          const tempBlock = new ListBlock({
            type: "list",
            content: blockData.content,
          })

          return tempBlock
        }
        case "file": {
          const tempBlock = new FileBlock({
            type: "file",
            list: blockData.content,
          })

          return tempBlock
        }
        case "slider": {
          const tempBlock = new SliderBlock({
            type: "slider",
            list: blockData.content,
          })

          return tempBlock
        }
        default:
          throw new ApiError.InternalError(
            `unknown block type - ${blockData.type}`,
          )
      }
    })
  }

  preparePostData(postData, tagsList, postBlocks) {
    return {
      title: postData.title,
      preview: postData.preview,
      tags: tagsList,
      timeRead: postData.timeRead,
      blocks: postBlocks,
    }
  }

  handleInsertError(e, type) {
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

  handleError(e, defaultMessage) {
    if (e instanceof ApiError) {
      throw e
    } else {
      throw new ApiError.InternalError(defaultMessage)
    }
  }

  async delete(postId, userId) {
    try {
      const post = await this.isPostAuthor(userId, postId)
      post.deleteOne()
      await ReactionService.deletePostReactions(postId)
    } catch (e) {
      if (e instanceof ApiError) {
        throw e
      } else {
        throw new ApiError.InternalError(
          "Unexpected error when creating an article",
        )
      }
    }

    return true
  }

  async isPostExist(postId) {
    const post = await PostRepository.findById(postId)

    if (!post) {
      throw ApiError.HttpException(`Article with id '${postId}' not found`)
    }

    return post
  }

  async getOne(postId, ip) {
    const filter = postsMatchFilter(null, { postId })
    const postLookupData = postLookup()
    const rating = postsRating(true)
    const postExtended = postsExtendedData()
    const blocksExntended = blockExtended()

    const combineAggregate = [
      ...filter,
      ...postLookupData,
      ...rating,
      ...postExtended,
      ...blocksExntended,
    ]

    const resData = await PostRepository.aggregate(combineAggregate)

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

  async getPostsPagination(idList, limit, skip, sortType, filterType) {
    const filter = postsMatchFilter(idList, filterType)
    const postLookupData = postLookup()
    const rating = postsRating(true)
    const extended = postsExtendedData()
    const sort = postsSort(sortType)

    const facet = postFacet(skip, limit, sort)

    const combineAggregate = [
      ...filter,
      ...postLookupData,
      ...rating,
      ...extended,
      ...facet,
    ]

    const resData = await PostRepository.aggregate(combineAggregate)
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
