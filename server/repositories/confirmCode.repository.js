import confirmCodeModel from "../models/confirmCode.model.js"

class ConfirmCodeRepository {
  async create(data) {
    return confirmCodeModel.create(data)
  }

  async findOne(condition) {
    return confirmCodeModel.findOne(condition)
  }

  async deleteOne(condition) {
    return confirmCodeModel.deleteOne(condition)
  }
}

export default new ConfirmCodeRepository()
