const {Schema, model} = require('mongoose');

const PostSchema = new Schema({
    author: {type: Schema.Types.ObjectId, ref: 'Users'},
    file: {type: Schema.Types.ObjectId, ref: 'Files'},
    title: {type: String, required: true, },
    body: {type: String, required: true},
    createdDate: {type: Date, required: true, default: Date.now},
})

module.exports = model("Posts", PostSchema)