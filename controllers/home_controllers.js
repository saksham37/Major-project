const Post = require('../models/post');
const User = require('../models/user');
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
    Post.find({}).populate('user')
    .populate({
        path: 'comments',
        populate: {
            path: 'user'
        }
    })
    .exec((err,posts)=>{
        if(err){console.log("unable to load posts from the database"); return;}
        //We need to pass all the users in the context to show them as freind list
        User.find({},(err,users)=>{
            if(err){console.log("Unable to access the users from the db ",err); return ;}
            return res.render('home',{
                title: "Home",
                posts,
                all_users:users
            });
        });
        //all the things passed in the context are accessible inside the locals in the views
       
    })
    
    // return res.render('home', {
    //     title: "Home"
    // });
}

// module.exports.actionName = function(req, res){}