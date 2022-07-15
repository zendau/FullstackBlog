/**
 * @swagger
 * components:
 *   DTOs:
 *     User:
 *       type: object
 *       properties:
 *         id:
 *           type: ObjectId
 *           description: ObjectId of user
 *         email:
 *           type: string
 *           description: User's email
 *         isActivated:
 *           type: boolean
 *           description: isActivated user status
 *       example:
 *         id: 62c7234d9f3f1739381f93c4
 *         email: root@admin.com
 *         isActivated: false
 */

 module.exports = class ReactionDto {
  like
  dislike
  isLiked

  constructor(model) {
    this.like = model.like
    this.dislike = model.dislike
    this.isLiked = model.user[0].isLiked
  }
}