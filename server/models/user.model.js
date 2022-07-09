const mongoose = require("mongoose")
const { Schema, model } = mongoose

const usersSchema = new Schema({
    email: {type: String, unique: true, required: true},
    password:  {type: String, required: true},
    isActivated: {type: Boolean, default: false},
})

module.exports = model("Users", usersSchema)