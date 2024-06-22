import mongoose from "mongoose"

export function postLookup() {
  return [
    {
      $lookup: {
        from: "comments",
        localField: "_id",
        foreignField: "post",
        as: "comments",
      },
    },
    {
      $lookup: {
        from: "userpostreads",
        localField: "_id",
        foreignField: "post",
        as: "postreads",
      },
    },
    {
      $lookup: {
        from: "reactions",
        localField: "_id",
        foreignField: "post",
        as: "react",
      },
    },
  ]
}

export function postsRating(withCounters) {
  return [
    {
      $project: {
        _id: 1,
        comments: {
          $size: "$comments",
        },
        counterReads: {
          $size: "$postreads",
        },
        react: "$react",
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
        counterComments: {
          $first: "$comments",
        },
        counterReads: {
          $first: "$counterReads",
        },
      },
    },
    {
      $project: {
        rating: {
          $sum: [
            {
              $multiply: ["$counterLikes", 2],
            },
            {
              $multiply: ["$counterDislikes", -1],
            },
            {
              $multiply: ["$counterComments", 3],
            },
            {
              $multiply: ["$counterReads", 0.1],
            },
          ],
        },
        ...(withCounters && {
          counterReads: 1,
          counterComments: 1,
          counterLikes: 1,
          counterDislikes: 1,
        }),
      },
    },
  ]
}

export function postsMatchFilter(idList, filter) {
  const matchData = {}

  const objectIdList = Array.isArray(idList)
    ? idList.map((id) => mongoose.Types.ObjectId(id))
    : []

  // Выборка постов конкретного пользователя
  if (filter?.authorId) {
    matchData.author = {
      $eq: mongoose.Types.ObjectId(filter.authorId),
    }
  }

  // Выборка постов по конкретному тегу
  if (filter?.tag) {
    matchData.tags = {
      $elemMatch: { $eq: filter.tag },
    }
  }

  // Выборка постов по подстроке
  if (filter.substring) {
    const regex = new RegExp(filter.substring, "i")

    matchData.title = {
      $regex: regex,
    }
  }

  // Получение поста по айди
  if (filter.postId) {
    matchData._id = {
      $eq: mongoose.Types.ObjectId(filter.postId),
    }
  }

  if (objectIdList.length > 0) {
    // Исключения постов которые уже были получины
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

export function postsExtendedData() {
  return [
    {
      $lookup: {
        from: "posts",
        localField: "_id",
        foreignField: "_id",
        as: "post",
      },
    },
    {
      $unwind: "$post",
    },
    {
      $lookup: {
        from: "files",
        localField: "post.file",
        foreignField: "_id",
        as: "file",
      },
    },
    {
      $unwind: "$file",
    },
    {
      $lookup: {
        from: "users",
        localField: "post.author",
        foreignField: "_id",
        as: "author",
      },
    },
    {
      $unwind: "$author",
    },
    {
      $project: {
        _id: 0,
        id: "$_id",
        preview: "$post.preview",
        tags: "$post.tags",
        author: {
          id: "$author._id",
          email: 1,
        },
        title: "$post.title",
        blocks: "$post.blocks",
        timeRead: "$post.timeRead",
        file: {
          id: "$file._id",
          fileName: 1,
          size: 1,
          mimetype: 1,
        },
        createdDate: "$post.createdDate",
        rating: {
          $sum: [
            {
              $multiply: ["$counterLikes", 2],
            },
            {
              $multiply: ["$counterDislikes", -1],
            },
            {
              $multiply: ["$counterComments", 3],
            },
            {
              $multiply: ["$counterReads", 0.1],
            },
          ],
        },

        counterReads: 1,
        counterComments: 1,
        counterLikes: 1,
        counterDislikes: 1,
      },
    },
  ]
}

export function postsSort(filter) {
  const sort = {}

  switch (filter) {
    case "byCreatedDate":
      sort.createdDate = -1
      break

    case "byRating":
    default:
      sort.rating = -1
      break
  }

  return [
    {
      $sort: sort,
    },
  ]
}

export function blockExtended() {
  return [
    {
      $unwind: "$blocks",
    },
    {
      $lookup: {
        from: "files",
        localField: "blocks.list",
        foreignField: "_id",
        as: "blocks.list",
      },
    },
    {
      $addFields: {
        blocks: {
          _id: "$$REMOVE",
          list: {
            $map: {
              input: "$blocks.list",
              as: "item",
              in: {
                id: "$$item._id",
                fileName: "$$item.fileName",
                size: "$$item.size",
                mimetype: "$$item.mimetype",
              },
            },
          },
        },
      },
    },
    {
      $addFields: {
        blocks: {
          list: {
            $cond: {
              if: {
                $eq: ["$blocks.list", []],
              },
              then: "$$REMOVE",
              else: "$blocks.list",
            },
          },
        },
      },
    },
    {
      $set: {
        blocks: {
          $cond: {
            if: {
              $and: [
                {
                  $not: ["$blocks.content"],
                },
                "$blocks.list",
              ],
            },
            then: {
              $mergeObjects: [
                "$blocks",
                {
                  content: "$blocks.list",
                },
              ],
            },
            else: "$blocks",
          },
        },
      },
    },
    {
      $unset: "blocks.list",
    },
    {
      $group: {
        _id: "$id",
        doc: {
          $first: "$$ROOT",
        },
        blocks: {
          $push: "$blocks",
        },
      },
    },
    {
      $replaceRoot: {
        newRoot: {
          $mergeObjects: ["$doc", "$$ROOT"],
        },
      },
    },
    {
      $project: {
        _id: 0,
        doc: 0,
      },
    },
    // {
    //   $project: {
    //     id: "$_id",
    //     blocks: 1,
    //     tags: "$doc.tags",
    //     author: "$doc.author",
    //     title: "$doc.title",
    //     body: "$doc.body",
    //     timeRead: "$doc.timeRead",
    //     createdDate: "$doc.createdDate",
    //     test: "$doc",
    //   },
    // },
  ]
}

export function postFacet(skip, limit, sort) {
  const postsLimit = { $limit: limit }
  const postsSkip = { $skip: skip }

  const facetPosts = []

  if (skip) {
    facetPosts.push(postsSkip)
  }
  if (limit >= 0) {
    facetPosts.push(postsLimit)
  }

  const facet = [
    {
      $facet: {
        posts: [...sort, ...facetPosts],
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
        posts: 1,
        total: "$total.count",
      },
    },
  ]

  return facet
}
