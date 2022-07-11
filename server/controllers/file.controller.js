const FileService = require("../services/file.service")

class FileController {

  async add(req, res, next) {
    try {
      const schema = Joi.object({
        id: Joi.objectId().required()
      })
      const { error } = schema.validate(req.params)
      if (error) throw ApiError.HttpException(error.details[0].message)

      const file = req.file
      if (file === undefined) {
        throw ApiError.HttpException('file is required field and must be one of the types: png, jpg, jpeg')
      }

      const fileInsered = await FileService.create(file)

      res.json(fileInsered);
    } catch (e) {
      next(e)
    }
  }

  async update(req, res, next) {
    try {
      const schema = Joi.object({
        id: Joi.objectId().required()
      })
      const { error } = schema.validate(req.params)
      if (error) throw ApiError.HttpException(error.details[0].message)

      const file = req.file
      if (file === undefined) {
        throw ApiError.HttpException('file is required field and must be one of the types: png, jpg, jpeg')
      }

      const id = req.params.id
      const fileUpdated = await FileService.update(id, file)

      res.json(fileUpdated);
    } catch (e) {
      next(e)
    }
  }

  async delete(req, res, next) {
    try {
      const schema = Joi.object({
        id: Joi.objectId().required()
      })
      const { error } = schema.validate(req.params)
      if (error) throw ApiError.HttpException(error.details[0].message)

      const id = req.params.id
      const fileDeleted = await FileService.delete(id)

      res.json(fileDeleted);
    } catch (e) {
      next(e)
    }
  }

  async getOne(req, res, next) {
    try {
      const schema = Joi.object({
        id: Joi.objectId().required()
      })
      const { error } = schema.validate(req.params)
      if (error) throw ApiError.HttpException(error.details[0].message)

      const id = req.params.id
      const fileData = await FileService.getById(id)

      res.json(fileData);
    } catch (e) {
      next(e)
    }
  }


  async getList(req, res, next) {
    try {
      const filesData = await FileService.getList()

      res.json(filesData);
    } catch (e) {
      next(e)
    }
  }



  async download(req, res, next) {
    try {
      const schema = Joi.object({
        id: Joi.string().required()
      })
      const { error } = schema.validate(req.params)
      if (error) throw ApiError.HttpException(error.details[0].message)

      const id = req.params.id

      res.download(`files/${id}`)
    } catch (e) {
      next(e)
    }
  }

}

module.exports = new FileController()