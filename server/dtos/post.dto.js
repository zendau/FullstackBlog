/**
 * @swagger
 * components:
 *   DTOs:
 *     Post:
 *       type: object
 *       properties:
 *         id:
 *           type: ObjectId
 *           description: ObjectId of created post
 *         author:
 *           type: ObjectId
 *           description: ref Users collection
 *         file:
 *           type: ObjectId
 *           description: ref Files collection
 *         title:
 *           type: string
 *           description: Title of created blog
 *         body:
 *           type: string
 *           description: Text body of created blog
 *         date:
 *           type: Date
 *           description: Data when blog was created
 *       example:
 *         id: 62c7234d9f3f1739381f93c4
 *         author: 62c7234d9f3f1739381f93c4
 *         file: 62c811ea89c1ae26b06fd9c3
 *         title: test
 *         body: blog content
 *         date: Fri Jul 08 2022 11:15:54 GMT+0000 (Coordinated Universal Time)
 */

module.exports = class PostDto {
    author;
    title;
    body;
    date;
    file;

    constructor(model) {
        this.id = model._id;
        this.title = model.title;
        this.body = model.body;
        this.date = model.createdDate;
    }

    setAuthor(author) {
        this.author = author
    }

    setImage(file) {
        this.file = file
    }
}