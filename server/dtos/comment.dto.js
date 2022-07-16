/**
 * @swagger
 * components:
 *   DTOs:
 *     Comment:
 *       type: object
 *       properties:
 *         id:
 *           type: ObjectId
 *           description: ObjectId of comment
 *         user:
 *           type: ObjectId
 *           description: ObjectId user's ref
 *         message:
 *           type: string
 *           description: message of comment
 *       example:
 *         id: 62c7234d9f3f1739381f93c4
 *         user: 62c7234d9f3f1739381f93c4
 *         message: 'test message'
 */

 module.exports = class CommentDTO {
  id
  user
  message

  constructor(model) {
    this.id = model._id
    this.user = model.user
    this.message = model.message
  }
}