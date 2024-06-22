export const ERROR_POST = {
  UNKNOWN_BLOCK_TYPE: (type) => `unknown block type - ${type}`,
  INTERNAL_ERROR: "Internal server error",
  FILE_SAVE_ERROR: "Errors when saving the article file",
  UNKNOWN_OPERATION_TYPE: "unknown article operation type",
  POST_CREATION_ERROR: "Unexpected error when creating an article",
  POST_UPDATE_ERROR: "Unexpected error when updating an article",
  POST_DELETE_ERROR: "Unexpected error when deleting an article",
  ARTICLE_NOT_FOUND: (postId) => `Article with id '${postId}' not found`,
  NOT_AUTHOR: (userId) =>
    `User with id ${userId} is not the author of this post`,
}

export const ERROR_FILE = {}
