const { localsName } = require('ejs');
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
module.exports.destroy = function(req,res){
    console.log("Comment deletion called ");
    // req must have the id of the deleted comment 
    //We need to delete the comment both front the 'Comment' and also from the array of comments from the post
    Comment.findById(req.params.id,(err,comment)=>{
        //the user of the comment found should match the current logged in user in locals.user
        if(comment.user==req.user.id){
            console.log("id of the post on which the comment was made ",comment.post);
            let postId = comment.post;
            Post.findByIdAndUpdate(postId, { $pull: { comments: req.params.id} });
               comment.remove(); //deleting the origin comment from the schema

        }
         return res.redirect('back');
    });
}