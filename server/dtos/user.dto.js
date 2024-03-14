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
 *         isBlocked:
 *           type: boolean
 *           description: isBlocked user status
 *         roles:
 *           type: array
 *           items:
 *             properties:
 *              admin:
 *               type: string
 *              user:
 *               type: string
 *       example:
 *         id: 62c7234d9f3f1739381f93c4
 *         email: root@admin.com
 *         isActivated: false
 */

export default class UserDto {
  constructor(model) {
    this.email = model.email
    this.id = model._id
    this.isActivated = model.isActivated
    this.roles = model.roles
    this.isBlocked = model.isBlocked
  }
}
