const {Schema, model} = require('mongoose');

const FileSchema = new Schema({
    fileName: {type: String, required: true},
    size: {type: Number, required: true},
    mimetype: {type: String, required: true}
})

module.exports = model("Files", FileSchema)