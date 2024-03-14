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

const PostSchema = new Schema({
  author: { type: Schema.Types.ObjectId, ref: "Users", required: true },
  file: { type: Schema.Types.ObjectId, ref: "Files", required: true },
  tags: [
    {
      type: Schema.Types.ObjectId,
      ref: "Tags",
    },
  ],
  title: { type: String, required: true },
  body: { type: String, required: true },
  timeRead: { type: Number, required: true },
  readCount: { type: Number, default: 0 },
  createdDate: { type: Date, required: true, default: Date.now },
})

export default model("Posts", PostSchema)

// db.posts.aggregate([
//   {
//     $lookup: {
//       from: "files",
//       localField: "file",
//       foreignField: "_id",
//       as: "file",
//     },
//   },
//   { $unwind: "$file" },
//   {
//     $lookup: {
//       from: "comments",
//       localField: "_id",
//       foreignField: "post",
//       as: "comments",
//     },
//   },
// ]);

// db.posts.aggregate([
//   {
//     $lookup: {
//       from: "comments",
//       localField: "_id",
//       foreignField: "post",
//       as: "comments",
//     },
//   },
//   {
//     $project: {
//       _id: 1,
//       comments: { $size: "$comments" },
//       reactions: 1,
//       readCount: 1,
//     },
//   },
//   {
//     $lookup: {
//       from: "reactions",
//       localField: "_id",
//       foreignField: "post",
//       as: "react",
//     },
//   },
//   { $unwind: "$react" },
//   {
//     $group: {
//       _id: "$_id",
//       counteLikes: {
//         $sum: {
//           $cond: { if: { $eq: ["$react.isLiked", true] }, then: 1, else: 0 },
//         },
//       },
//       counteDislikes: {
//         $sum: {
//           $cond: { if: { $eq: ["$react.isLiked", true] }, then: 0, else: 1 },
//         },
//       },
//       count: { $first: "$comments" },
//       isRead: { $first: "$readCount" },
//     },
//   },
// ]);

// db.comments.insertOne({
//   edited: false,
//   user: ObjectId("65359615a8373538cc200cb2"),
//   post: ObjectId("65350b22487b573f186fbace"),
//   message: "two comments",
// });

// db.posts.aggregate([
//   {
//     $lookup: {
//       from: "tags",
//       localField: "tags",
//       foreignField: "_id",
//       as: "tags",
//     },
//   },
//   {
//     $lookup: {
//       from: "users",
//       localField: "author",
//       foreignField: "_id",
//       as: "author",
//     },
//   },
//   { $unwind: "$author" },
//   {
//     $lookup: {
//       from: "files",
//       localField: "file",
//       foreignField: "_id",
//       as: "file",
//     },
//   },
//   { $unwind: "$file" },
//   {
//     $lookup: {
//       from: "comments",
//       localField: "_id",
//       foreignField: "post",
//       as: "comments",
//     },
//   },
//   {
//     $lookup: {
//       from: "reactions",
//       localField: "_id",
//       foreignField: "post",
//       as: "reactions",
//     },
//   },
//   { $unwind: "$reactions" },
//   {
//     $project: {
//       _id: 1,
//       comments: { $size: "$comments" },
//       reactions: 1,
//       readCount: 1,
//     },
//   },
//   {
//     $group: {
//       _id: "$_id",
//       counterLikes: {
//         $sum: {
//           $cond: { if: { $eq: ["$react.isLiked", true] }, then: 1, else: 0 },
//         },
//       },
//       counterDislikes: {
//         $sum: {
//           $cond: { if: { $eq: ["$react.isLiked", true] }, then: 0, else: 1 },
//         },
//       },
//       counterComments: { $first: "$comments" },
//       counterReads: { $first: "$readCount" },
//     },
//   },
//   {
//     $project: {
//       _id: 0,
//       id: "$_id",
//       readCount: 1,
//       comments: { $size: "$comments" },
//       reactions: 1,
//       author: {
//         id: "$author._id",
//         email: 1,
//       },
//       title: 1,
//       body: {
//         $substr: ["$body", 0, 10],
//       },
//       timeRead: 1,
//       file: {
//         id: "$file._id",
//         fileName: 1,
//         size: 1,
//         mimetype: 1,
//       },
//       createdDate: 1,
//       tags: {
//         $map: {
//           input: "$tags",
//           as: "tag",
//           in: "$$tag.title",
//         },
//       },
//     },
//   },
// ]);

// db.posts.aggregate([
//   {
//     $lookup: {
//       from: "comments",
//       localField: "_id",
//       foreignField: "post",
//       as: "comments",
//     },
//   },
//   {
//     $lookup: {
//       from: "tags",
//       localField: "tags",
//       foreignField: "_id",
//       as: "tag",
//     },
//   },
//   {
//     $project: {
//       _id: 1,
//       comments: { $size: "$comments" },
//       reactions: 1,
//       readCount: 1,
//     },
//   },
//   {
//     $lookup: {
//       from: "reactions",
//       localField: "_id",
//       foreignField: "post",
//       as: "react",
//     },
//   },
//   { $unwind: "$react" },
//   {
//     $group: {
//       _id: "$_id",
//       counterLikes: {
//         $sum: {
//           $cond: { if: { $eq: ["$react.isLiked", true] }, then: 1, else: 0 },
//         },
//       },
//       counterDislikes: {
//         $sum: {
//           $cond: { if: { $eq: ["$react.isLiked", true] }, then: 0, else: 1 },
//         },
//       },
//       counterComments: { $first: "$comments" },
//       counterReads: { $first: "$readCount" },
//     },
//   },
//   {
//     $sort: { rating: -1 }, // Сортировка по убыванию рейтинга
//   },
//   //
// ]);

// /

// db.posts.aggregate([
//   {
//     $lookup: {
//       from: "comments",
//       localField: "_id",
//       foreignField: "post",
//       as: "comments",
//     },
//   },
//   {
//     $project: {
//       _id: 1,
//       comments: { $size: "$comments" },
//       readCount: 1,
//     },
//   },
//   {
//     $lookup: {
//       from: "reactions",
//       localField: "_id",
//       foreignField: "post",
//       as: "react",
//     },
//   },
//   { $unwind: "$react" },
//   {
//     $group: {
//       _id: "$_id",
//       counterLikes: {
//         $sum: {
//           $cond: { if: { $eq: ["$react.isLiked", true] }, then: 1, else: 0 },
//         },
//       },
//       counterDislikes: {
//         $sum: {
//           $cond: { if: { $eq: ["$react.isLiked", true] }, then: 0, else: 1 },
//         },
//       },
//       counterComments: { $first: "$comments" },
//       counterReads: { $first: "$readCount" },
//     },
//   },
//   //
// {
//   $lookup: {
//     from: "posts",
//     localField: "_id",
//     foreignField: "_id",
//     as: "post",
//   },
// },
// { $unwind: "$post" },
// {
//   $lookup: {
//     from: "files",
//     localField: "post.file",
//     foreignField: "_id",
//     as: "file",
//   },
// },
// { $unwind: "$file" },
// {
//   $lookup: {
//     from: "users",
//     localField: "post.author",
//     foreignField: "_id",
//     as: "author",
//   },
// },
// { $unwind: "$author" },
// {
//   $lookup: {
//     from: "tags",
//     localField: "post.tags",
//     foreignField: "_id",
//     as: "tags",
//   },
// },
// {
//   $project: {
//     _id: 0,
//     id: "$_id",
//     body: { $substr: ["$post.body", 0, 10] },
//     tags: {
//       $map: {
//         input: "$tags",
//         as: "tag",
//         in: "$$tag.title",
//       },
//     },
//     author: {
//       id: "$author._id",
//       email: 1,
//     },
//     title: "$post.title",
//     timeRead: "$post.timeRead",
//     file: {
//       id: "$file._id",
//       fileName: 1,
//       size: 1,
//       mimetype: 1,
//     },
//     createdDate: "$post.createdDate",
//     rating: {
//       $sum: [
//         { $multiply: ["$counterLikes", 2] },
//         { $multiply: ["$counterDislikes", -1] },
//         { $multiply: ["$counterComments", 3] },
//         { $multiply: ["$counterReads", 0.1] },
//       ],
//     },
//     counterReads: 1,
//     counterComments: 1,
//     counterLikes: 1,
//     counterDislikes: 1,
//   },
// },
// //
// // { $sort: { rating: -1 } /* Сортировка по убыванию рейтинга*/ },
// { $sort: { createdDate: -1 } /* Сортировка по дате*/ },
// ]);

// db.tags.aggregate([
//   {
//     $match: {
//       title: "news",
//     },
//   },
//   {
//     $project: {
//       _id: 1,
//     },
//   },
//   {
//     $lookup: {
//       from: "posts",
//       localField: "_id",
//       foreignField: "tags",
//       as: "post",
//     },
//   },
//   {
//     $unwind: '$post'
//   },
//   {
//     $project: {
//       _id: '$post._id',
//       readCount: '$post.readCount'
//     }
//   },
//   //
//   {
//     $lookup: {
//       from: "comments",
//       localField: "_id",
//       foreignField: "post",
//       as: "comments",
//     },
//   },
//   {
//     $project: {
//       _id: 1,
//       comments: { $size: "$comments" },
//       readCount: 1,
//     },
//   },
//   {
//     $lookup: {
//       from: "reactions",
//       localField: "_id",
//       foreignField: "post",
//       as: "react",
//     },
//   },
//   { $unwind: "$react" },
//   {
//     $group: {
//       _id: "$_id",
//       counterLikes: {
//         $sum: {
//           $cond: { if: { $eq: ["$react.isLiked", true] }, then: 1, else: 0 },
//         },
//       },
//       counterDislikes: {
//         $sum: {
//           $cond: { if: { $eq: ["$react.isLiked", true] }, then: 0, else: 1 },
//         },
//       },
//       counterComments: { $first: "$comments" },
//       counterReads: { $first: "$readCount" },
//     },
//   },
//   //
//   {
//     $lookup: {
//       from: "posts",
//       localField: "_id",
//       foreignField: "_id",
//       as: "post",
//     },
//   },
//   { $unwind: "$post" },
//   {
//     $lookup: {
//       from: "files",
//       localField: "post.file",
//       foreignField: "_id",
//       as: "file",
//     },
//   },
//   { $unwind: "$file" },
//   {
//     $lookup: {
//       from: "users",
//       localField: "post.author",
//       foreignField: "_id",
//       as: "author",
//     },
//   },
//   { $unwind: "$author" },
//   {
//     $lookup: {
//       from: "tags",
//       localField: "post.tags",
//       foreignField: "_id",
//       as: "tags",
//     },
//   },
//   {
//     $project: {
//       _id: 0,
//       id: "$_id",
//       body: { $substr: ["$post.body", 0, 10] },
//       tags: {
//         $map: {
//           input: "$tags",
//           as: "tag",
//           in: "$$tag.title",
//         },
//       },
//       author: {
//         id: "$author._id",
//         email: 1,
//       },
//       title: "$post.title",
//       timeRead: "$post.timeRead",
//       file: {
//         id: "$file._id",
//         fileName: 1,
//         size: 1,
//         mimetype: 1,
//       },
//       createdDate: "$post.createdDate",
//       rating: {
//         $sum: [
//           { $multiply: ["$counterLikes", 2] },
//           { $multiply: ["$counterDislikes", -1] },
//           { $multiply: ["$counterComments", 3] },
//           { $multiply: ["$counterReads", 0.1] },
//         ],
//       },
//       counterReads: 1,
//       counterComments: 1,
//       counterLikes: 1,
//       counterDislikes: 1,
//     },
//   },

//   { $sort: { rating: -1 } /* Сортировка по убыванию рейтинга*/ },
//   // { $sort: { createdDate: -1 } /* Сортировка по дате*/ },
// ]);
