import { ERROR_FILE } from "../constants/error.messages.js"
import FileDTO from "../dtos/file.dto.js"
import ApiError from "../exceptions/api.error.js"
import FileRepository from "../repositories/file.repository.js"
import FileStorage from "../storage/file.storage.js"

class FileService {
  constructor() {
    this.fileStorage = new FileStorage(process.env.FILE_FOULDER)
  }

  async upload(files, author) {
    const createPromiseFiles = files.map((file) => {
      return FileRepository.create({
        fileName: file.filename,
        size: file.size,
        mimetype: file.mimetype,
        author,
      })
    })

    const createdFiles = await Promise.all(createPromiseFiles)

    return createdFiles.map((file) => new FileDTO(file))
  }

  async getById(fileId) {
    const file = await FileRepository.findById(fileId)

    if (file === null) {
      throw ApiError.HttpException(ERROR_FILE.NOT_FOUND_BY_ID(fileId))
    }

    const fileDTO = new FileDTO(file)
    return fileDTO
  }

  async update(fileId, newFile) {
    const file = await FileRepository.findById(fileId)

    if (file === null) {
      throw ApiError.HttpException(ERROR_FILE.NOT_FOUND_BY_ID(fileId))
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

  async delete(fileId) {
    const DeleteStatus = await FileRepository.findByIdAndDelete(fileId)
    if (DeleteStatus === null) {
      throw ApiError.HttpException(ERROR_FILE.NOT_FOUND_BY_ID(fileId))
    }

    this.fileStorage.removeFile(DeleteStatus.fileName)

    return true
  }
}

export default new FileService()
