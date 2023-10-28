const { Schema, model } = require("mongoose");

/**
 * @swagger
 * components:
 *   schemas:
 *     Tag:
 *       type: object
 *       required:
 *         - title
 *       properties:
 *         title:
 *           type: string
 *           description: news
 *       example:
 *         title: 'news'
 */

const TagSchema = new Schema({
  title: { type: Schema.Types.String, require: true },
});

module.exports = model("Tags", TagSchema);
