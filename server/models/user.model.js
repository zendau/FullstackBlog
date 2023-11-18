const mongoose = require("mongoose")
const { Schema, model } = mongoose

/**
 * @swagger
 * components:
 *   schemas:
 *     Users:
 *       type: object
 *       required:
 *         - email
 *         - password
 *         - isActivated
 *         - roles
 *       properties:
 *         email:
 *           type: string
 *           description: User's email
 *         password:
 *           type: number
 *           description: User's hashed password
 *         isActivated:
 *           type: boolean
 *           description: isActivated user status
 *         roles:
 *           type: array
 *           description: array of user's roles
 *       example:
 *         email: root@admin.com
 *         password: $2b$04$FPJx.VoYTe7hTzxiZYmRcO.kIRAklmHfsMvjLdR0RI0UX7w4yS2im
 *         isActivated: false
 *         roles: ['user']
 */

const usersSchema = new Schema({
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  isActivated: { type: Boolean, default: false },
  isBlocked: { type: Boolean, default: false },
  roles: {
    type: [String],
    enum: ["user", "admin"],
    default: ["user"],
  },
})

module.exports = model("Users", usersSchema)
