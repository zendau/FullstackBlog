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

export default class ReactionDto {
  constructor(model) {
    this.counterLikes = model.counterLikes
    this.counterDislikes = model.counterDislikes
    this.isLiked = model.user[0]?.isLiked
  }
}
