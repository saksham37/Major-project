const Post = require('../models/post');
const User = require('../models/user');
module.exports.home = async function(req, res){
    
    // Post.find({},(err,posts)=>{
    //     if(err){console.log("Unable to load the posts from the database "); return;}
    //     return res.render('home',{
    //         title:"Home",
    //         posts
    //     });
    // })
    
    //Pre-population means, if there is any referenced object in the document, all its information will be loaded for every document
    //After pre-population the post.user contains the entire info about the user instead of just the referenced object Id
    try{
        let posts = await Post.find({})
        .sort('-createdAt')
        .populate('user')
        .populate({
            path: 'comments',
            populate: {
                path: 'user'
            }
        });
        let users = await User.find({});
        
        return res.render('home',{
            title: "Home",
            posts,
            all_users:users
        });
   }catch(err){
       if(err){console.log("Error in home controller funcion",err); return;}
   }
    // return res.render('home', {
    //     title: "Home"
    // });
}

// module.exports.actionName = function(req, res){}