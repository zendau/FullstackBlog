import {
  blockExtended,
  extendedData,
  facetData,
  lookup,
  matchFilter,
  rating,
  sortData,
} from "../aggregation/post.builder.js"
import { ERROR_POST } from "../constants/error.messages.js"
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
import CommentService from "./comment.service.js"
import FileService from "./file.service.js"
import ReactionService from "./reaction.service.js"
import UserPostReadService from "./userPostRead.service.js"

class PostService {
  async create(author, postData, file) {
    try {
      const fileData = await FileService.upload([file], author)
      const fileId = fileData[0].id

      if (!fileId) {
        throw ApiError.InternalError(ERROR_POST.FILE_SAVE_ERROR)
      }

      const createdPostData = await this.insert("create", author, {
        postData,
        fileId,
      })

      return createdPostData
    } catch (e) {
      this.handleError(e, ERROR_POST.POST_CREATION_ERROR)
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
      this.handleError(e, ERROR_POST.POST_UPDATE_ERROR)
    }
  }

  async insert(type, author, { postData, fileId, postId }) {
    try {
      const tagsList = postData.tags ? postData.tags.split(",") : null

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
        throw ApiError.InternalError(ERROR_POST.UNKNOWN_OPERATION_TYPE)
      }

      const createdPostData = await this.getOne(post._id, null)

      if (!createdPostData) {
        throw ApiError.InternalError(ERROR_POST.ARTICLE_NOT_FOUND(post._id))
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
          throw ApiError.InternalError(
            ERROR_POST.UNKNOWN_BLOCK_TYPE(blockData.type),
          )
      }
    })
  }

  preparePostData(postData, tagsList, postBlocks) {
    return {
      title: postData.title,
      preview: postData.preview,
      ...(tagsList && { tags: tagsList }),
      timeRead: postData.timeRead,
      blocks: postBlocks,
    }
  }

  handleInsertError(e, type) {
    if (e instanceof ApiError) {
      throw e
    } else if (type === "create") {
      throw ApiError.InternalError(ERROR_POST.POST_CREATION_ERROR)
    } else if (type === "edit") {
      throw ApiError.InternalError(ERROR_POST.POST_UPDATE_ERROR)
    } else {
      throw ApiError.UnexpectedError()
    }
  }

  handleError(e, defaultMessage) {
    if (e instanceof ApiError) {
      throw e
    } else {
      throw ApiError.InternalError(defaultMessage)
    }
  }

  async delete(postId, userId) {
    try {
      const post = await this.isPostAuthor(userId, postId)
      post.deleteOne()

      FileService.delete(post.file)
      ReactionService.deletePostReactions(postId)
      UserPostReadService.deleteManyByPost(postId)
      CommentService.deleteManyByPost(postId)
    } catch (e) {
      if (e instanceof ApiError) {
        throw e
      } else {
        throw ApiError.InternalError(ERROR_POST.POST_DELETE_ERROR)
      }
    }

    return true
  }

  async isPostExist(postId) {
    const post = await PostRepository.findById(postId)

    if (!post) {
      throw ApiError.HttpException(ERROR_POST.ARTICLE_NOT_FOUND(postId))
    }

    return post
  }

  async getOne(postId, ip) {
    const filter = matchFilter(null, { postId })
    const postLookupData = lookup()
    const ratingData = rating(true)
    const postExtended = extendedData()
    const blocksExntended = blockExtended()

    const combineAggregate = [
      ...filter,
      ...postLookupData,
      ...ratingData,
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
      throw ApiError.HttpException(ERROR_POST.NOT_AUTHOR(userId))
    }

    return post
  }

  async getPostsPagination(idList, limit, skip, sortType, filterType) {
    const filter = matchFilter(idList, filterType)
    const postLookupData = lookup()
    const ratingData = rating(true)
    const extended = extendedData()
    const sort = sortData(sortType)

    const facet = facetData(skip, limit, sort)

    const combineAggregate = [
      ...filter,
      ...postLookupData,
      ...ratingData,
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
