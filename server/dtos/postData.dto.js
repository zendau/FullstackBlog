/**
 * @swagger
 * components:
 *   DTOs:
 *     postData:
 *       type: object
 *       properties:
 *         id:
 *           type: ObjectId
 *           description: user's ObjectId
 *         email:
 *           type: string
 *           description: user's email
 *         rating:
 *           type: array
 *           items: [likesPercent, dislikesPercent]
 *           description: access JWT
 *         comments:
 *          type: array
 *          items:
 *            id: ObjectId
 *            message: string
 *            postId: ObjectId
 *            postTitle: string
 *         reactions:
 *          type: array
 *          items:
 *           id: ObjectId
 *           isLiked: boolean
 *           postId: ObjectId       
 *           postTitle: string
 *       example:
 *         email: root@gmail.com
 *         id: 62c7234d9f3f1739381f93c4
 *         rating:
 *          type: array
 *          items: [4, 6]
 *         comments:
 *          type: array
 *          items:
 *            id: 62e1906c838cfe163ca4c42f
 *            message: test
 *            postId: 62d717847a2c15105c1a20d6
 *            postTitle: title
 *         reactions:
 *          type: array
 *          items:
 *            id: 62e1906c838cfe163ca4c42f
 *            isLiked: true
 *            postTitle: title
 *            postId: 62d717847a2c15105c1a20d6
 */


module.exports = class PostDataDTO {
  id
  email
  rating
  reactions
  comments

  constructor(model) {
    this.id = model.id
    this.email = model.email
    this.rating = model.rating
    this.reactions = model.reactions.map(reaction => new PostReactions(reaction)) 
    this.comments = model.comments.map(cooment => new PostComments(cooment)) 
  }
}


class PostReactions {

  id
  isLiked
  postId
  postTitle

  constructor(model) {
    this.id = model.id
    this.isLiked = model.isLiked
    this.postId = model.postId[0]
    this.postTitle = model.postTitle[0]
  }
}

class PostComments {

  id
  message
  postId
  postTitle

  constructor(model) {
    this.id = model.id
    this.message = model.message
    this.postId = model.postId[0]
    this.postTitle = model.postTitle[0]
  }

}