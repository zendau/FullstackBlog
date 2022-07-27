const UserDTO = require("../dtos/user.dto")

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
 *           $ref: '#/components/DTOs/User'
 *           description: author of post
 *         message:
 *           type: string
 *           description: message of comment
 *       example:
 *         id: 62c7234d9f3f1739381f93c4
 *         user: 
 *          id: 62c7234d9f3f1739381f93c4
 *          email: root@admin.com
 *          isActivated: false
 *         message: 'test message'
 */

 module.exports = class CommentDTO {
  id
  user
  message
  edited
  user 

  constructor(model) {
    this.id = model._id
    this.message = model.message
    this.edited = model.edited

    if (model.user) {
      this.setUser(model.user)
    }

    
  }

  setUser(user) {
    this.user = new UserDTO(user)
  }
}