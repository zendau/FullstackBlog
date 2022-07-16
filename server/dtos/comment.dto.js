/**
 * @swagger
 * components:
 *   DTOs:
 *     User:
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
 *         email: 62c7234d9f3f1739381f93c4
 *         isActivated: 'test message'
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