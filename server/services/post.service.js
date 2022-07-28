const postModel = require('../models/post.model')
const PostDto = require('../dtos/post.dto')
const UserDto = require('../dtos/user.dto')
const ApiError = require('../exceprions/api.error')

const UserService = require('./user.service')
const FileService = require('./file.service')
const ReactionService = require('./reaction.service')
const CommentService = require('./comment.serice')

const FileDto = require("../dtos/file.dto")

class PostService {
  async create(author, title, body, file) {

    await UserService.getById(author)
    const fileData = await FileService.create(file)

    const post = await postModel.create({
      author,
      title,
      body,
      file: fileData.id
    })

    const postPopulate = await post
      .populate("author")
      .populate("file")
      .execPopulate()

    const postDto = this.postDtoFromPopulate(postPopulate)
    return postDto
  }

  async edit(postId, userId, title, body, newFile) {

    const postData = await postModel.findById(postId)

    if (postData === null) {
      throw ApiError.HttpException(`Post with id ${postId} not found`)
    }

    if (postData.author.toString() !== userId) {
      throw ApiError.HttpException(`User with id ${userId} not author this post`)
    }
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
    const postDto = this.postDtoFromPopulate(postPopulate)
    return postDto
  }

  async delete(id) {
    const postData = await postModel.findByIdAndDelete(id)

    if (postData === null) {
      throw ApiError.HttpException(`Post with id ${id} not found`)
    }

    const postDto = this.postDtoFromPopulate(postData)
    return postDto
  }

  async postExist(postId) {
    const post = await postModel.findById(postId).populate("author").populate('file')

    if (post === null) {
      throw ApiError.HttpException(`Post with id ${postId} not found`)
    }
    
    return post
  }


  async getOne(postId, userId) {
    debugger
    const post = await this.postExist(postId)
    const postDto = this.postDtoFromPopulate(post)

    const reactionData = await ReactionService.getReactionsCount(postId, userId)
    postDto.setReaction(reactionData)

    const commentsData = await CommentService.getList(postId)
    postDto.setComments(commentsData)

    return postDto
  }

  async getAllPosts() {
    const posts = await postModel.find().populate("author")
    const postsDto = posts.map(post => this.postDtoFromPopulate(post))
    return postsDto
  }

  postsToDTO(posts) {
    const postsDto = posts.map(post => this.postDtoFromPopulate(post))
    return postsDto
  }

  async getLimitPosts(currentPage, limit) {
    const posts = await postModel.find().populate("author")
    return this.getPosts(posts, currentPage, limit)
  }


  async getLimitUserPosts(currentPage, limit, userId) {
    const posts = await postModel.find().where("author").equals(userId).populate("author")
    return this.getPosts(posts, currentPage, limit)
  }

  async searchBySubstring(substring) {
    console.log('test', substring)
    const posts = await postModel.find({
      title: {$regex: substring}
    }).populate('author')

    const postsDto = posts.map(post => this.postDtoFromPopulate(post))
    return postsDto
  }

  async getPosts(posts, currentPage, limit) {
    const countPosts = posts.length

    const pages = Math.floor(countPosts / limit)

    if (currentPage > pages) {
      if (currentPage - 1 === pages) {

        if (limit === 0 || limit > countPosts) {

          const postsDto = await this.postsToDTO(posts)

          return { nextPage: false, post: postsDto }

        }

        const pagesRemainder = countPosts - (pages * limit)
        const postsOnPage = posts.splice(countPosts - pagesRemainder)

        const postsDto = postsOnPage.map(post => this.postDtoFromPopulate(post))
        return { nextPage: false, post: postsDto }

      } else {
        throw ApiError.PageNotFoundError("page out of range")
      }
    } else {

      if (parseInt(limit) === 0 || limit > countPosts) {

        const postsDto = await this.postsToDTO(posts)

        return { nextPage: false, post: postsDto }

      }

      const postsOnPage = posts.splice((currentPage - 1) * limit, limit)

      const postsDto = postsOnPage.map(post => this.postDtoFromPopulate(post))
      return { nextPage: true, post: postsDto }
    }
  }

  postDtoFromPopulate(postModel) {
    const postDto = new PostDto(postModel)
    const userDto = new UserDto(postModel.author)
    const fileDto = new FileDto(postModel.file)
    postDto.setAuthor(userDto)
    postDto.setImage(fileDto)
    return postDto
  }

  async postReaction(postId, userId, isLiked) {
    const reactionStatus = await ReactionService.setReaction(postId, userId, isLiked)

    if (!reactionStatus) {
      await this.postExist(postId)
      await ReactionService.add(postId, userId, isLiked)
    }

    return true
  }

  async addPostComment(userId, postId, message) {
    await this.postExist(postId)

    const inseredCommentDTO = await CommentService.create(userId, postId, message)
    return inseredCommentDTO
  }

}

module.exports = new PostService()