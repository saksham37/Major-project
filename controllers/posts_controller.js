const Post = require('../models/post');
const Comment = require('../models/comment');
module.exports.create = async function(req, res){
    let post = await Post.create({
        content: req.body.content,
        user: req.user._id
    });

        return res.redirect('back');
}
//Deleting a post in the database
module.exports.destroy = async function(req,res){
      //Post ki id se dhundo post ko
      try{
        console.log("delete post controller called ");
        console.log(req.params);
        console.log(req.user.id);
        let post = await Post.findById(req.params.id);
  
            if(post.user==req.user.id){
                console.log("id's matched !!");
               post.remove();//automatic function provided by mongoose to delete a document
               //Now we need to delete all the comments of this particular post
               await Comment.deleteMany({post:req.params.id});
  
                    res.redirect('back');
            }
      }catch(err){
         if(err){
             console.log("Error in posts controller -> destroy function",err);
             return;
         }
      }
     
}