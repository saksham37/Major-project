const mongoose = require('mongoose');


const postSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true
    },
    user: {
        type:  mongoose.Schema.Types.ObjectId,
        ref: 'User'

    },
    //In the Post's schema we'll also be storing all the id's of the comments made on every post
    comments: [
          {
              type: mongoose.Schema.Types.ObjectId,
              ref: 'Comment'
          }
    ]
},{
    timestamps: true
});

const Post = mongoose.model('Post', postSchema);
module.exports = Post;