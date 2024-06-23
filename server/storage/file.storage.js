import fs from "fs/promises"

import ApiError from "../exceptions/api.error"

class FileStorage {
  constructor(storagePath) {
    this.storagePath = storagePath
  }

  removeFile(filename) {
    try {
      fs.unlink(`${this.storagePath}/${filename}`)
    } catch (err) {
      if (err.code === "ENOENT") {
        throw new ApiError.PageNotFoundError("File not found")
      } else {
        throw new ApiError.ForbiddenError()
      }
    }
  }
}

export default FileStorage
