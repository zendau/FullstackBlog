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

export const ERROR_FILE = {
  NOT_FOUND: (file) => `File '${file}' not found`,
  NOT_FOUND_BY_ID: (fileId) => `File with id '${fileId}' not found`,
}

export const ERROR_TAG = {
  INSERT: "Error adding tags",
  REMOVE: "Error when deleting tag",
}

export const ERROR_NODEMAILER = {
  SEND: "An error occurred while sending the email",
}

export const ERROR_CONFIRM_CODE = {
  CREATE:
    "Error generating confirmation token. Please check the entered data and try again.",
  WRONG: "Wrong confirm code",
  NOT_FOUND: "Confirm code was not found",
}

export const ERROR_COMMENT = {
  NOT_FOUND: (commentId, userId) =>
    `Comment id ${commentId} is not found. Or User with id ${userId} is not author of this post`,
}

export const ERROR_ADMIN = {
  ROLE_NOT_FOUND: (role) => `Role "${role}" not found`,
  USER_NOT_FOUND: (userId) => `UserId "${userId}" not found`,
}

export const ERROR_USER = {
  BAD_CREDENTIALS: "Bad credentials",
  NOT_FOUND_BY_ID: (userId) => `User id '${userId}' is not found`,
  NOT_FOUND_BY_EMAIL: (email) => `Not found user with email - ${email}`,
  EMAIL_EXISTS: (email) => `user with email - ${email} is already registered`,
}
