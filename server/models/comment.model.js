import mongoose from "mongoose"

const { Schema, model } = mongoose

/**
 * @swagger
 * components:
 *   schemas:
 *     Reaction:
 *       type: object
 *       required:
 *         - post
 *         - user
 *         - message
 *       properties:
 *         post:
 *           type: ObjectId
 *           description: ref Posts collection.
 *         user:
 *           type: ObjectId
 *           description: ref Users collection.
 *         message:
 *           type: string
 *           description: Comment message.
 *       example:
 *         post: 62c7234d9f3f1739381f93c4
 *         user: 62c7234d9f3f1739381f93c4
 *         message: 'test message'
 */

const CommentSchema = new Schema({
  post: { type: Schema.Types.ObjectId, ref: "Posts", required: true },
  user: { type: Schema.Types.ObjectId, ref: "Users", required: true },
  message: { type: Schema.Types.String, require: true },
  edited: { type: Schema.Types.Boolean, default: "false" },
  createdDate: { type: Date, default: Date.now },
})

export default model("Comments", CommentSchema)
