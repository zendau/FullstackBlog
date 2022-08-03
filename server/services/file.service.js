const fileModel = require("../models/file.model")

const ApiError = require("../exceprions/api.error")
const FileDTO = require("../dtos/file.dto")

const fs = require('fs')

class FileService {

  async create(file) {

    const fileInsered = await fileModel.create({
      fileName: file.filename,
      size: file.size,
      mimetype: file.mimetype
    })

    const fileDTO = new FileDTO(fileInsered)
    return fileDTO
  }

  async getById(fileId) {

    const file = await fileModel.findById(fileId)

    if (file === null) {
      throw ApiError.HttpException(`File id ${fileId} is not found`)
    }

    const fileDTO = new FileDTO(file)
    return fileDTO

  }

  async getList() {
    const files = await fileModel.find()

    const filesDTO = files.map(file => new FileDTO(file))
    return filesDTO
  }

  async update(fileId, newFile) {

    const file = await fileModel.findById(fileId)

    if (file === null) {
      throw ApiError.HttpException(`File id ${fileId} is not found`)
    }

    const oldFileName = file.fileName

    file.fileName = newFile.filename
    file.mimetype = newFile.mimetype
    file.size = newFile.size

    const updatedData = await file.save()
    const fileDTO = new FileDTO(updatedData)

    this.removeFromStorage(oldFileName)

    return fileDTO
  }

  removeFromStorage(filename) {
    fs.unlink(`${process.env.FILE_FOULDER}/${filename}`, (err) => {
      if (err && err.code == 'ENOENT') {
        console.error("File doesn't exist, won't remove it")
      } else if (err) {
        console.error('Error occurred while trying to remove file')
      }
    })
  }

  async delete(fileId) {

    const DeleteStatus = await fileModel.findByIdAndDelete(fileId)  
    if (DeleteStatus === null) {
      throw ApiError.HttpException(`File id ${fileId} is not found`)
    }

    this.removeFromStorage(DeleteStatus.fileName)

    return true
  }

}

module.exports = new FileService()