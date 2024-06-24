import mongoose from "mongoose"

export function matchFilter(idList, filter) {
  const matchData = {}

  const objectIdList = Array.isArray(idList)
    ? idList.map((id) => mongoose.Types.ObjectId(id))
    : []

  // Выборка комментариев пользователя
  if (filter?.authorId) {
    matchData.user = {
      $eq: mongoose.Types.ObjectId(filter.authorId),
    }
  }

  // Выборка комментариев поста
  if (filter?.postId) {
    matchData.post = {
      $eq: mongoose.Types.ObjectId(filter.postId),
    }
  }

  // Исключения постов которые уже были получины
  matchData._id = {
    $nin: objectIdList,
  }

  return [
    {
      $match: {
        ...matchData,
      },
    },
  ]
}

export function extendedData() {
  return [
    {
      $lookup: {
        from: "users",
        localField: "user",
        foreignField: "_id",
        as: "user",
      },
    },
    {
      $unwind: "$user",
    },
    {
      $lookup: {
        from: "posts",
        localField: "post",
        foreignField: "_id",
        as: "post",
      },
    },
    {
      $unwind: "$post",
    },
    {
      $project: {
        _id: 0,
        id: "$_id",
        edited: 1,
        user: {
          id: "$user._id",
          email: "$user.email",
          isActivated: "$user.isActivated",
          isBlocked: "$user.isBlocked",
        },
        post: {
          id: "$post._id",
          title: "$post.title",
        },
        message: 1,
        createdDate: 1,
      },
    },
  ]
}

export function sortFiler(filter) {
  const sort = {}

  switch (filter) {
    case "createdDate":
    default:
      sort.createdDate = -1
      break
  }

  return [
    {
      $sort: sort,
    },
  ]
}

export function facetData(skip, limit) {
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
        list: [{ $sort: { createdDate: -1 } }, ...facetPosts],
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

export function byUser(userId) {
  return [
    {
      $match: {
        user: mongoose.Types.ObjectId(userId),
      },
    },
    {
      $lookup: {
        from: "posts",
        localField: "post",
        foreignField: "_id",
        as: "post",
      },
    },
    {
      $project: {
        _id: 0,
        id: "$_id",
        postTitle: "$post.title",
        postId: "$post._id",
        message: 1,
      },
    },
  ]
}
