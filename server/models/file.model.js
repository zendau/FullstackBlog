const {Schema, model} = require('mongoose');

/**
 * @swagger
 * components:
 *   schemas:
 *     File:
 *       type: object
 *       required:
 *         - fileName
 *         - size
 *         - mimetype
 *       properties:
 *         fileName:
 *           type: string
 *           description: Name of uploaded file
 *         size:
 *           type: number
 *           description: Size of uploaded file
 *         mimetype:
 *           type: string
 *           description: Mimetype of uploaded file
 *       example:
 *         fileName: 66c3deb6-5f18-435f-b80e-360ff366dd1d.png
 *         size: 1303362
 *         mimetype: image/png
 */

const FileSchema = new Schema({
    fileName: { type: String, required: true },
    size: { type: Number, required: true },
    mimetype: { type: String, required: true }
})

module.exports = model("Files", FileSchema)