const PostService = require("../services/post.service")

class PostController {

    async create(req, res, next) {
        try {
            const {author, title, body} = req.body
            const data = await PostService.create(author, title, body)
            res.json(data)


        } catch (e) {
            next(e)
        }
    }

    async edit(req, res, next) {
        try {

            const {postId, userId, title, body} = req.body

            const data = await PostService.edit(postId, userId, title, body)

            res.json(data)

        } catch (e) {
            next(e)
        }
    }

    async delete(req, res, next) {
        try {

            const data = await PostService.delete(req.params.id)

            res.json(data)
        } catch (e) {
            next(e)
        }
    }

    async getOne(req, res, next) {
        try {
            const data = await PostService.getOne(req.params.id)

            res.json(data)
        } catch (e) {
            next(e)
        }
    }

    async getUserPosts(req, res, next) {
        try {
            const {currentPage, limit, userId} = req.query
            const data = await PostService.getLimitUserPosts(currentPage, limit, userId)
            res.json(data)

        } catch (e) {
            next(e)
        }
    }

    async getAllPosts(req, res, next) {
        try {
            const data = await PostService.getAllPosts()
            res.json(data)
        } catch (e) {
            next(e)
        }
    }

    async getLimitPosts(req, res, next) {
        try {
            const {currentPage, limit} = req.query
            const data = await PostService.getLimitPosts(currentPage, limit)

            res.json(data)

        } catch (e) {
            next(e)
        }
    }
}

module.exports = new PostController()