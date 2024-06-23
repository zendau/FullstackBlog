import FileModel from "../models/file.model.js"

class FileRepository {
  async create(data) {
    return FileModel.create(data)
  }

  async findById(fileId) {
    return FileModel.findById(fileId)
  }

  async findByIdAndDelete(fileId) {
    return FileModel.findByIdAndDelete(fileId)
  }
}

export default new FileRepository()
