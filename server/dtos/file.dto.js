/**
 * @swagger
 * components:
 *   DTOs:
 *     File:
 *       type: object
 *       properties:
 *         id:
 *           type: ObjectId
 *           description: ObjectId of uploaded file
 *         fileName:
 *           type: string
 *           description: Name of uploaded file
 *         mimetype:
 *           type: string
 *           description: Mimetype of uploaded file
 *       example:
 *         id: 62c7234d9f3f1739381f93c4
 *         fileName: 66c3deb6-5f18-435f-b80e-360ff366dd1d.png
 *         mimetype: image/png
 */

module.exports = class FileDto {
  id
  fileName
  mimetype


  constructor(model) {
    this.id = model._id
    this.fileName = model.fileName
    this.mimetype = model.mimetype
  }
}