const { localsName } = require('ejs');
const Comment = require('../models/comment');
const Post = require('../models/post');

module.exports.create = async function(req,res){
    console.log("Comments Controller called ",req.body);
    // console.log(req);
    try{
        let post = await Post.findById(req.body.post);
        if(post){
            let comment = await Comment.create({
                content:req.body.content,
                post: req.body.post,
                user: req.user._id
            });
            console.log("line 16");
            await post.comments.push(comment); //--> this the functionality given by mongoose
                //Whenever i am making changes to some collection/document we need to save changes
                post.save();

            await comment.populate('user');
            
            if(req.xhr){
                return res.status(200).json({
                    data:{
                        comment:comment
                    },
                    message: "Comment created succesfully"
                });
            }
            req.flash('success','Comment Created Successfully');
                res.redirect('/');
        }
    }catch(err){
        if(err){
            console.log("Error in comments controller -> create function",err);
            req.flash('error',err);
             return;
        }
    }
   
}
module.exports.destroy = async function(req,res){
    try{
        console.log("Comment deletion called ");
        // req must have the id of the deleted comment 
        //We need to delete the comment both front the 'Comment' and also from the array of comments from the post
        let comment = await Comment.findById(req.params.id);      //the user of the comment found should match the current logged in user in locals.user
            if(comment.user==req.user.id){
                console.log("id of the post on which the comment was made ",comment.post);
                let postId = comment.post;
                await Post.findByIdAndUpdate(postId, { $pull: { comments: req.params.id} });
                   comment.remove(); //deleting the origin comment from the schema

                   if(req.xhr){
                       return res.status(200).json({
                           data: req.params.id,
                           message: "Comment deleted successfully"
                       });
                    }
                req.flash('success','Comment Deleted Successfully');
            }
             return res.redirect('back');
    }catch(err){
        if(err){
            console.log("Error in comments controller ",err);
            req.flash('error',err);
             return ;
        }
    }
   
}