const Post = require('../models/post');
const Comment = require('../models/comment');
module.exports.create = function(req, res){
    Post.create({
        content: req.body.content,
        user: req.user._id
    }, function(err, post){
        if(err){console.log('error in creating a post'); return;}

        return res.redirect('back');
    });
}
//Deleting a post in the database
module.exports.destroy = function(req,res){
      //Post ki id se dhundo post ko
      console.log("delete post controller called ");
      console.log(req.params);
      console.log(req.user.id);
      Post.findById(req.params.id,function(err,post){
          if(err){console.log("Error in finding the post in the database"); return;}
            console.log("found the post");
          //.id means converting the objectId into string
          console.log(post.id);
          if(post.user==req.user.id){
              console.log("id's matched !!");
             post.remove();//automatic function provided by mongoose to delete a document
             //Now we need to delete all the comments of this particular post
              Comment.deleteMany({post:req.params.id},(err)=>{
                  res.redirect('back');
              });
          }
      })
}