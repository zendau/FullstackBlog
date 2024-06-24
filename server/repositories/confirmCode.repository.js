import confirmCodeModel from "../models/confirmCode.model.js"

class FileRepository {
  async create(data) {
    return confirmCodeModel.create(data)
  }

  async findOne(condition) {
    return confirmCodeModel.findById(condition)
  }

  async deleteOne(condition) {
    return confirmCodeModel.deleteOne(condition)
  }
}

export default new FileRepository()
