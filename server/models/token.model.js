const { Schema, model } = require('mongoose');

/**
 * @swagger
 * components:
 *   schemas:
 *     Tokens:
 *       type: object
 *       required:
 *         - user
 *         - refreshToken
 *       properties:
 *         user:
 *           type: ObjectId
 *           description: ref Users collection
 *         refreshToken:
 *           type: string
 *           description: JWT refresh
 *       example:
 *         user: 62c7234d9f3f1739381f93c4
 *         code: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjp7ImVtYWlsIjoidXNlckBnbWFpbC5jb20iLCJpZCI6IjYyYzcyMzRkOWYzZjE3MzkzODFmOTNjNCIsImlzQWN0aXZhdGVkIjpmYWxzZX0sImlhdCI6MTY1NzIxNzg2OSwiZXhwIjoxNjU5ODA5ODY5fQ.xRqrM7vzmkCjX1UTqLn2pYyL6LAr6dmfqd_3Kmo_FSM
 */

const TokenSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'Users' },
  refreshToken: { type: String, required: true },
})

module.exports = model("Tokens", TokenSchema)