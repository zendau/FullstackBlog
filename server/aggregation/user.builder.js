import mongoose from "mongoose"

import { rating } from "./post.builder.js"

function lookup() {
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

export function idFilter(id) {
  return [
    {
      $match: {
        _id: {
          $eq: mongoose.Types.ObjectId(id),
        },
      },
    },
  ]
}

export function listFilter(idList, filter) {
  const matchData = {}

  const objectIdList = Array.isArray(idList)
    ? idList.map((id) => mongoose.Types.ObjectId(id))
    : []

  // Выборка по подстроке
  if (filter.substring) {
    const regex = new RegExp(filter.substring, "i")

    matchData.email = {
      $regex: regex,
    }
  }

  if (objectIdList.length > 0) {
    // Исключения записей которые уже были получины
    matchData._id = {
      $nin: objectIdList,
    }
  }

  return [
    {
      $match: {
        ...matchData,
      },
    },
  ]
}

export function extended(withAdminData) {
  return [
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
        ...(withAdminData && {
          roles: "$user.roles",
          isActivated: "$user.isActivated",
        }),
      },
    },
  ]
}

export function facetData(skip, limit) {
  const limitData = { $limit: limit }
  const skipData = { $skip: skip }

  const facetAgrs = []

  if (skip) {
    facetAgrs.push(skipData)
  }
  if (limit >= 0) {
    facetAgrs.push(limitData)
  }

  const facet = [
    {
      $facet: {
        list: [
          {
            $sort: {
              id: -1,
            },
          },
          ...facetAgrs,
        ],
        total: [
          {
            $group: {
              _id: null,
              count: {
                $sum: 1,
              },
            },
          },
          {
            $project: {
              _id: 0,
              count: 1,
            },
          },
        ],
      },
    },
    {
      $unwind: "$total",
    },
    {
      $project: {
        list: 1,
        total: "$total.count",
      },
    },
  ]

  return facet
}
