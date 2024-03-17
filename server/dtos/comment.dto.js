import UserDTO from "./user.dto.js"

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
 *         message:
 *           type: string
 *           description: message of comment
 *         edited:
 *           type: boolean
 *           description: edited status
 *         createdDate:
 *           type: date
 *           description: date of create post's comment
 *         user:
 *           $ref: '#/components/DTOs/User'
 *           description: author of post
 *         post:
 *           type: object
 *           required:
 *            - id
 *            - title
 *           properties:
 *            id:
 *              type: ObjectId
 *            title:
 *              type: string
 *       example:
 *         id: 62c7234d9f3f1739381f93c4
 *         message: 'test message'
 *         edited: false
 *         createdDate: 2023-12-07T08:28:58.165Z
 *         post:
 *          id: 654bfde3551c1975e9697aab,
 *          title: test22
 *         user:
 *          id: 62c7234d9f3f1739381f93c4
 *          email: root@admin.com
 *          isActivated: false
 */

export default class CommentDTO {
  constructor(model) {
    this.id = model._id
    this.message = model.message
    this.edited = model.edited
    this.createdDate = model.createdDate

    if (model.user) {
      this.setUser(model.user)
    }

    if (model.post) {
      this.setPostData(model.post)
    }
  }

  setPostData(post) {
    const postData = {}

    postData.id = post._id
    postData.title = post.title

    this.post = postData
  }

  setUser(user) {
    this.user = new UserDTO(user)
  }
}
