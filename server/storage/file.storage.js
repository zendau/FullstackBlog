import fs from "fs/promises"

import { ERROR_FILE } from "../constants/error.messages.js"
import ApiError from "../exceptions/api.error.js"

class FileStorage {
  constructor(storagePath) {
    this.storagePath = storagePath
  }

  removeFile(fileName) {
    try {
      fs.unlink(`${this.storagePath}/${fileName}`)
    } catch (err) {
      if (err.code === "ENOENT") {
        throw ApiError.PageNotFoundError(ERROR_FILE.NOT_FOUND(fileName))
      } else {
        throw ApiError.ForbiddenError()
      }
    }
  }
}

export default FileStorage
