const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema({
    body: {
        type: String,
        required: true
    },
    title: {
        type:String,
        required: true
    },
    username: {
        type: String,
    },
    createdAt: {
        type: String, 
        required: true
    },
    postedBy: {
      type: String,
    },
    imgUrl: {
        type: String
    },
    tags: {type: Array},
    likes: {type: Array}
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;