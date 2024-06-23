import fs from "fs/promises"

import { ERROR_FILE } from "../constants/error.messages"
import ApiError from "../exceptions/api.error"

class FileStorage {
  constructor(storagePath) {
    this.storagePath = storagePath
  }

  removeFile(fileName) {
    try {
      fs.unlink(`${this.storagePath}/${fileName}`)
    } catch (err) {
      if (err.code === "ENOENT") {
        throw new ApiError.PageNotFoundError(ERROR_FILE.NOT_FOUND(fileName))
      } else {
        throw new ApiError.ForbiddenError()
      }
    }
  }
}

export default FileStorage
