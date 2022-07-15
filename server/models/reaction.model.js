const { Schema, model } = require('mongoose')

/**
 * @swagger
 * components:
 *   schemas:
 *     Reaction:
 *       type: object
 *       required:
 *         - post
 *         - user
 *         - isLiked
 *       properties:
 *         post:
 *           type: ObjectId
 *           description: ref Posts collection.
 *         user:
 *           type: ObjectId
 *           description: ref Users collection.
 *         isLiked:
 *           type: boolean
 *           description: Boolean value.
 *       example:
 *         post: 62c7234d9f3f1739381f93c4
 *         like: 0
 *         dislike: 0
 */

const ReactionSchema = new Schema({
  post: { type: Schema.Types.ObjectId, ref: 'Posts', required: true },
  user: { type: Schema.Types.ObjectId, ref: 'Users', required: true },
  isLiked: { type: Schema.Types.Boolean, require: true}
})

module.exports = model("Reactions", ReactionSchema)


