import mongoose from "mongoose"
const { Schema, model } = mongoose

/**
 * @swagger
 * components:
 *   schemas:
 *     Tag:
 *       type: object
 *       required:
 *         - title
 *       properties:
 *         title:
 *           type: string
 *           description: news
 *       example:
 *         title: 'news'
 */

const TagSchema = new Schema({
  title: { type: Schema.Types.String, require: true, unique: true },
})

export default model("Tags", TagSchema)
