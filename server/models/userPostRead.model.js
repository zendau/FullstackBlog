const { Schema, model } = require("mongoose");

/**
 * @swagger
 * components:
 *   schemas:
 *     Post:
 *       type: object
 *       required:
 *         - post
 *         - ip
 *       properties:
 *         post:
 *           type: ObjectId
 *           description: ref Posts collection
 *         ip:
 *           type: String
 *           description: ip of the person who read the post
 *       example:
 *         post: 62c7234d9f3f1739381f93c4
 *         ip: 192.168.0.1
 */

const UserPostReadSchema = new Schema({
  post: { type: Schema.Types.ObjectId, ref: "Posts", required: true },
  ip: { type: String, required: true },
});

module.exports = model("UserPostRead", UserPostReadSchema);
