const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema({
    body: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    postId: {
        type: String,
        ref: 'posts',
        require: true
    },
    createdAt: {
        type: String
    },
    postedBy: {
        type: String,
        ref: 'users'
    }

});

const Comments = mongoose.model('comments', commentSchema);

module.exports = Comments;