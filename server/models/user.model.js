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
 *       example:
 *         email: root@admin.com
 *         password: $2b$04$FPJx.VoYTe7hTzxiZYmRcO.kIRAklmHfsMvjLdR0RI0UX7w4yS2im
 *         isActivated: false
 */


const usersSchema = new Schema({
    email: {type: String, unique: true, required: true},
    password:  {type: String, required: true},
    isActivated: {type: Boolean, default: false},
})

module.exports = model("Users", usersSchema)