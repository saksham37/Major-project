const Comment = require('../models/comment');
const Post = require('../models/post');

module.exports.create = function(req,res){
    console.log("Comments Controller called ");
    Post.findById(req.body.post,function(err,post){
        if(post){
            Comment.create({
                content:req.body.content,
                post: req.body.post,
                user: req.user._id
            },function(err,comment){
                //handle error
                if(err){console.log("error in creating comment in the database"); return;}
                post.comments.push(comment); //--> this the functionality given by mongoose
                //Whenever i am making changes to some collection/document we need to save changes
                post.save();
                res.redirect('/');
            });
        }
    })
}