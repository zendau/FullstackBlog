import mongoose from "mongoose"

const { Schema, model } = mongoose

/**
 * @swagger
 * components:
 *   schemas:
 *     Post:
 *       type: object
 *       required:
 *         - author
 *         - file
 *         - title
 *         - body
 *       properties:
 *         author:
 *           type: ObjectId
 *           description: ref Users collection
 *         file:
 *           type: ObjectId
 *           description: ref Files collection
 *         title:
 *           type: string
 *           description: Title of created blog
 *         body:
 *           type: string
 *           description: Text body of created blog
 *         createdDate:
 *           type: Date
 *           description: Data when blog was created
 *         timeRead:
 *           type: Number
 *           description: time of read post
 *         readCount:
 *           type: Number
 *           description: post's read counter
 *       example:
 *         author: 62c7234d9f3f1739381f93c4
 *         file: 62c811ea89c1ae26b06fd9c3
 *         title: test
 *         timeRead: 10
 *         readCount: 145
 *         body: blog content
 *         createdDate: Fri Jul 08 2022 11:15:54 GMT+0000 (Coordinated Universal Time)
 */

// Базовая схема для всех блоков
const blockSchema = new Schema(
  {
    type: { type: String, required: true },
  },
  { _id: false, discriminatorKey: "type" },
)

// Дискриминатор для блока заголовка
const headerBlockSchema = new Schema({
  content: { type: String, required: true },
})

// Дискриминатор для текстового блока
const textBlockSchema = new Schema({
  content: { type: String, required: true },
})

// Дискриминатор для цитатного блока
const quoteBlockSchema = new Schema({
  author: { type: String, required: true },
  content: { type: String, required: true },
})

// Пример нового типа блока
const mediaBlockSchema = new Schema({
  list: [{ type: Schema.Types.ObjectId, ref: "Files" }],
})

const PostSchema = new Schema({
  author: { type: Schema.Types.ObjectId, ref: "Users", required: true },
  file: { type: Schema.Types.ObjectId, ref: "Files", required: true },
  tags: { type: Array, required: true },
  title: { type: String, required: true },
  body: { type: String, required: true },
  timeRead: { type: Number, required: true },
  createdDate: { type: Date, required: true, default: Date.now },
  blocks: [blockSchema],
})

const Blocks = PostSchema.path("blocks")
const HeaderBlock = Blocks.discriminator("header", headerBlockSchema)
const TextBlock = Blocks.discriminator("text", textBlockSchema)
const QuoteBlock = Blocks.discriminator("quote", quoteBlockSchema)
const MediaBlock = Blocks.discriminator("media", mediaBlockSchema)

const PostModel = model("Posts", PostSchema)

export { PostModel, HeaderBlock, TextBlock, QuoteBlock, MediaBlock }
