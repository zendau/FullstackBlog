/**
 * @swagger
 * components:
 *   DTOs:
 *     Reaction:
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
 *         like: 2
 *         dislike: 1
 *         isLiked: false
 */

 module.exports = class ReactionDto {
  like
  dislike
  isLiked

  constructor(model) {
    this.like = model.like
    this.dislike = model.dislike
    this.isLiked = model.user[0]?.isLiked
  }
}