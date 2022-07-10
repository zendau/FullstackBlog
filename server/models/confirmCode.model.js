const {Schema, model} = require('mongoose');

/**
 * @swagger
 * components:
 *   schemas:
 *     Confirmcodes:
 *       type: object
 *       required:
 *         - user
 *         - code
 *       properties:
 *         user:
 *           type: ObjectId
 *           description: ref Users collection
 *         code:
 *           type: string
 *           description: Confirm code genereted by uuid
 *       example:
 *         user: 62c7234d9f3f1739381f93c4
 *         code: d88889bd-8466-47e8-8dfe-63947ba92f3a
 */

const ConfirmCodeSchema = new Schema({
    user: {type: Schema.Types.ObjectId, ref: 'Users', required: true},
    code: {type: String, required: true},
})

module.exports = model("ConfirmCode", ConfirmCodeSchema)