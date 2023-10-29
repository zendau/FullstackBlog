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
 *         reaction:
 *           $ref: '#/components/DTOs/Reaction'
 *           description: Comments of post
 *         comment:
 *           $ref: '#/components/DTOs/Comment'
 *           description: Comments of post
 *       example:
 *         id: 62c7234d9f3f1739381f93c4
 *         author: 62c7234d9f3f1739381f93c4
 *         file: 62c811ea89c1ae26b06fd9c3
 *         title: test
 *         body: blog content
 *         date: Fri Jul 08 2022 11:15:54 GMT+0000 (Coordinated Universal Time)
 *         reaction:
 *          like: 2
 *          dislike: 1
 *          isLiked: false
 *         commenst:
 *          type: array
 *          items:
 *           id: 62c7234d9f3f1739381f93c4
 *           user: 62c7234d9f3f1739381f93c4
 *           message: 'test message'
 */

module.exports = class PostDto {
  id;
  title;
  date;
  body;

  constructor(model) {
    this.id = model._id;
    this.title = model.title;
    this.date = model.createdDate;
    this.body = model.body;
  }

  setUserName(user) {
    this.author = {};
    this.author.email = user;
  }

  setAuthor(author) {
    this.author = author;
  }

  setImage(file) {
    this.file = file;
  }

  setReaction(reaction) {
    this.reaction = reaction;
  }

  setComments(comments) {
    this.comments = comments;
  }

  setTags(tagsList) {
    this.tags = tagsList;
  }
};
