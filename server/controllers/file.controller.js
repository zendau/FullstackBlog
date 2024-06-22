import Joi from "joi"

import ApiError from "../exceptions/api.error.js"
import FileService from "../services/file.service.js"

class FileController {
  async upload(req, res, next) {
    try {
      const { id: authorId, isActivated } = req.user.payload

      if (!isActivated) {
        throw ApiError.HttpException(
          "For this action you need to activate your account",
        )
      }

      const { files } = req
      if (!files || files.length === 0) {
        throw ApiError.HttpException(
          "The presence of files for download is mandatory",
        )
      }

      const fileInsered = await FileService.upload(files, authorId)
      res.json(fileInsered)
    } catch (e) {
      next(e)
    }
  }

  async update(req, res, next) {
    try {
      const { id: authorId, isActivated } = req.user.payload

      if (!isActivated) {
        throw ApiError.HttpException(
          "For this action you need to activate your account",
        )
      }

      const schema = Joi.object({
        id: Joi.objectId().required(),
      })
      const { error } = schema.validate(req.params)
      if (error) throw ApiError.HttpException(error.details[0].message)

      const { file } = req
      if (file === undefined) {
        throw ApiError.HttpException(
          "file is required field and must be one of the types: png, jpg, jpeg",
        )
      }

      const { id } = req.params
      const fileUpdated = await FileService.update(id, file, authorId)

      res.json(fileUpdated)
    } catch (e) {
      next(e)
    }
  }

  async delete(req, res, next) {
    try {
      const schema = Joi.object({
        id: Joi.objectId().required(),
      })
      const { error } = schema.validate(req.params)
      if (error) throw ApiError.HttpException(error.details[0].message)

      const { id } = req.params
      const fileDeleted = await FileService.delete(id)

      res.json(fileDeleted)
    } catch (e) {
      next(e)
    }
  }

  async getOne(req, res, next) {
    try {
      const schema = Joi.object({
        id: Joi.objectId().required(),
      })
      const { error } = schema.validate(req.params)
      if (error) throw ApiError.HttpException(error.details[0].message)

      const { id } = req.params
      const fileData = await FileService.getById(id)

      res.json(fileData)
    } catch (e) {
      next(e)
    }
  }

  async download(req, res, next) {
    try {
      const schema = Joi.object({
        id: Joi.string().required(),
      })
      const { error } = schema.validate(req.params)
      if (error) throw ApiError.HttpException(error.details[0].message)

      const { id } = req.params
      res.download(`${process.env.FILE_FOULDER}/${id}`)
    } catch (e) {
      next(e)
    }
  }
}

export default new FileController()
