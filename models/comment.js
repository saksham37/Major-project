//creating schema for comments
const mongoose = require('mongoose');
const Post = require('../models/post');
const commentSchema = new mongoose.Schema({
      content: {
          type: String,
          required: true
      },
      user:{
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User'
      },
      post: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Post'
      }
},{
    timestamps:true
});


const Comment = mongoose.model('Comment',commentSchema);
module.exports = Comment;