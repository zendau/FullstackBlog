import mongoose from "mongoose"

import { rating } from "./post.builder.js"

export function lookup() {
  return [
    {
      $lookup: {
        from: "posts",
        localField: "_id",
        foreignField: "author",
        as: "posts",
      },
    },
    {
      $lookup: {
        from: "comments",
        localField: "posts._id",
        foreignField: "post",
        as: "comments",
      },
    },
    {
      $lookup: {
        from: "userpostreads",
        localField: "posts._id",
        foreignField: "post",
        as: "postreads",
      },
    },
    {
      $lookup: {
        from: "reactions",
        localField: "posts._id",
        foreignField: "post",
        as: "react",
      },
    },
  ]
}

export function combine(id) {
  return [
    {
      $match: {
        _id: {
          $eq: mongoose.Types.ObjectId(id),
        },
      },
    },
    ...lookup(),
    ...rating(true),
    {
      $lookup: {
        from: "users",
        localField: "_id",
        foreignField: "_id",
        as: "user",
      },
    },
    {
      $unwind: {
        path: "$user",
      },
    },
    {
      $lookup: {
        from: "reactions",
        localField: "_id",
        foreignField: "user",
        as: "react",
      },
    },
    {
      $unwind: {
        path: "$react",
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $group: {
        _id: "$_id",
        counterLikes: {
          $sum: {
            $cond: {
              if: {
                $eq: ["$react.isLiked", true],
              },
              then: 1,
              else: 0,
            },
          },
        },
        counterDislikes: {
          $sum: {
            $cond: {
              if: {
                $eq: ["$react.isLiked", false],
              },
              then: 1,
              else: 0,
            },
          },
        },
        rating: {
          $first: "$rating",
        },
        user: {
          $first: "$user",
        },
      },
    },
    {
      $lookup: {
        from: "comments",
        localField: "_id",
        foreignField: "user",
        as: "comments",
      },
    },
    {
      $lookup: {
        from: "posts",
        localField: "_id",
        foreignField: "author",
        as: "posts",
      },
    },
    {
      $project: {
        rating: 1,
        id: "$user._id",
        _id: 0,
        isBlocked: "$user.isBlocked",
        email: "$user.email",
        counterLikes: 1,
        counterDislikes: 1,
        counterPosts: { $size: "$posts" },
        counterComments: { $size: "$comments" },
      },
    },
  ]
}
