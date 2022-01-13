const Post = require('../models/post');

module.exports.create = (req,res)=>{
    Post.create({
        content: req.body.content,
        user: req.user._id
    },function(err,post){
        if(err){console.log("Error in saving the Post into the Databse"); return;}
        res.redirect('back');
    });

}