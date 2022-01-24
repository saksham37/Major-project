const Post = require('../models/post');
const Comment = require('../models/comment');
module.exports.create = async function(req, res){
    console.log(req.body);
    let post = await Post.create({
        content: req.body.content,
        user: req.user._id
    });
    let newPost = await Post.findById(post.id)
    .populate('user');

        console.log("user's name is ",newPost.user.name);
        if(req.xhr){
            //if request is an xhr request
            return res.status(200).json({
                data: {
                    post: newPost
                },
                message: "Post Created"
            });
        }

   

    req.flash('success',"Post Created Successfully");

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

               if(req.xhr){
                   return res.status(200).json({
                       data: {
                           post_id: req.params.id //this will be sent as response back to the jquery request
                       },
                       message: "Post deleted"

                   });
               }
               req.flash('success','Post Deleted Successfully');
                    res.redirect('back');
            }
      }catch(err){
         if(err){
             console.log("Error in posts controller -> destroy function",err);
             req.flash('error',err);
             return;
         }
      }
     
}