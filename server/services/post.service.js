const postModel = require("../models/post.model")
const PostDto = require('../dtos/post.dto')
const UserDto = require("../dtos/user.dto")
const ApiError = require("../exceprions/api.error");

const UserService = require("./user.service")

class PostService {
    async create(author, title, body) {
        
        const userData = await UserService.getById(author)
        console.log('!!!!!!!!!!!!!!!!!!', userData)
        const post = await postModel.create({
            author,
            title,
            body,
        })

        const postPopulate = await post.populate("author").execPopulate()

        const postDto = this.postDtoFromPopulate(postPopulate)

        return postDto

    }

    async edit(postId, userId, title, body) {

        const postData = await postModel.findById(postId)

        if (postData.author.toString() === userId) {
            console.log("ok")
        }

        if (title.length > 0) {
            postData.title = title
        }

        if (body.length > 0) {
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
            throw ApiError.BadRequest("[DELETE OPERATION] - Post not found")
        }

        const postDto = this.postDtoFromPopulate(postData)

        return postDto
    }

    async getOne(id) {

        try {
            const post = await postModel.findById(id).populate("author")

            const postDto = this.postDtoFromPopulate(post)

            return postDto
        } catch (e) {
            throw ApiError.BadRequest("[GET ONE OPERATION]", "Post not found")
        }


    }

    async getAllPosts() {
        const posts = await postModel.find().populate("author")

        const postsDto = posts.map(post => this.postDtoFromPopulate(post))

        return postsDto
    }

    // async getAllUserPosts(userId) {
    //     const posts = await postModel.find().where("author").equals(userId).populate("author")
    //     const postsDto = posts.map(post => this.postDtoFromPopulate(post))
    //
    //     return postsDto
    // }

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


    async getPosts(posts, currentPage, limit) {
        const countPosts = posts.length

        const pages = Math.floor(countPosts / limit)

        if (currentPage > pages) {
            if (currentPage - 1 === pages) {

                if (limit === 0 || limit > countPosts) {

                    const postsDto = await this.postsToDTO(posts)

                    return { nextPage: false, post: postsDto}

                }

                const pagesRemainder = countPosts - (pages*limit)
                const postsOnPage = posts.splice(countPosts-pagesRemainder)

                const postsDto = postsOnPage.map(post => this.postDtoFromPopulate(post))
                return { nextPage: false, post: postsDto}

            } else {
                throw ApiError.BadRequest("PAGE OUT OF RANGE")
            }
        } else {

            if (parseInt(limit) === 0 || limit > countPosts) {

                const postsDto = await this.postsToDTO(posts)

                return { nextPage: false, post: postsDto}

            }

            const postsOnPage = posts.splice((currentPage-1)*limit, limit)

            const postsDto = postsOnPage.map(post => this.postDtoFromPopulate(post))
            return { nextPage: true, post: postsDto}
        }
    }


    postDtoFromPopulate(postModel) {
        const postDto = new PostDto(postModel)
        const userDto = new UserDto(postModel.author)

        postDto.setAuthor(userDto)

        return postDto
    }
}

module.exports = new PostService()