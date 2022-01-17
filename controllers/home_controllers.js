const Post = require('../models/post');

module.exports.home = function(req, res){
    
    // Post.find({},(err,posts)=>{
    //     if(err){console.log("Unable to load the posts from the database "); return;}
    //     return res.render('home',{
    //         title:"Home",
    //         posts
    //     });
    // })
    
    //Pre-population means, if there is any referenced object in the document, all its information will be loaded for every document
    //After pre-population the post.user contains the entire info about the user instead of just the referenced object Id
    Post.find({}).populate('user').exec((err,posts)=>{
        if(err){console.log("unable to load posts from the database"); return;}
        return res.render('home',{
            title: "Home",
            posts
        });
    })
    
    // return res.render('home', {
    //     title: "Home"
    // });
}

// module.exports.actionName = function(req, res){}