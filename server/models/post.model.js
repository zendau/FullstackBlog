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

const headerBlockSchema = new Schema({
  content: { type: String, required: true },
})

const textBlockSchema = new Schema({
  content: { type: String, required: true },
})

const quoteBlockSchema = new Schema({
  content: { type: Object, required: true },
})

const spaceBlockSchema = new Schema()

const codeBlockSchema = new Schema({
  content: { type: String, required: true },
})

const listBlockSchema = new Schema({
  content: { type: String, required: true },
})

const fileBlockSchema = new Schema({
  list: [{ type: Schema.Types.ObjectId, ref: "Files" }],
})

const sliderBlockSchema = new Schema({
  list: [{ type: Schema.Types.ObjectId, ref: "Files" }],
})

const PostSchema = new Schema({
  author: { type: Schema.Types.ObjectId, ref: "Users", required: true },
  file: { type: Schema.Types.ObjectId, ref: "Files", required: true },
  tags: { type: Array, required: true },
  title: { type: String, required: true },
  preview: { type: String, required: true },
  timeRead: { type: Number, required: true },
  createdDate: { type: Date, required: true, default: Date.now },
  blocks: [blockSchema],
})

const Blocks = PostSchema.path("blocks")
const HeaderBlock = Blocks.discriminator("header", headerBlockSchema)
const TextBlock = Blocks.discriminator("text", textBlockSchema)
const QuoteBlock = Blocks.discriminator("quote", quoteBlockSchema)
const SpaceBlock = Blocks.discriminator("space", spaceBlockSchema)
const CodeBlock = Blocks.discriminator("code", codeBlockSchema)
const ListBlock = Blocks.discriminator("list", listBlockSchema)
const FileBlock = Blocks.discriminator("file", fileBlockSchema)
const SliderBlock = Blocks.discriminator("slider", sliderBlockSchema)

const PostModel = model("Posts", PostSchema)

export {
  PostModel,
  HeaderBlock,
  TextBlock,
  QuoteBlock,
  SpaceBlock,
  CodeBlock,
  ListBlock,
  FileBlock,
  SliderBlock,
}
