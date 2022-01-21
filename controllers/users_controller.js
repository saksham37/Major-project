const User = require('../models/user');


module.exports.profile = function(req, res){
    User.findById(req.params.id,(err,user)=>{
        return res.render('user_profile', {
            title: 'User Profile',
            profile_user: user
        });
    });
   
}

module.exports.update = function(req,res){
    if(req.user.id==req.params.id){
        User.findByIdAndUpdate(req.user.id,{name: req.body.name,email: req.body.email},(err,user)=>{
            if(err){console.log("error in updating the user in the database",err); return;}
            return res.redirect('back');
        })
    }else{
        return res.status(401).send('Unauthorized');
    }
}

// render the sign up page
module.exports.signUp = function(req, res){
    if (req.isAuthenticated()){
        return res.redirect('/');
    }


    return res.render('sign_up_page', {
        title: "Codeial | Sign Up"
    })
}


// render the sign in page
module.exports.signIn = function(req, res){

    if (req.isAuthenticated()){
        return res.redirect('/');
    }
    return res.render('sign_in_page', {
        title: "Codeial | Sign In"
    })
}

// get the sign up data
module.exports.create = async function(req, res){
    if (req.body.password != req.body.confirm_password){
        return res.redirect('back');
    }
    try{
        let user = await User.findOne({email: req.body.email}); 
        // await ka matlab jab tak ye wala function poori tarah execute nahi ho jaata, aage nhi badhna
    
            if (!user){
                User.create(req.body, function(err, user){
                    if(err){console.log('error in creating user while signing up'); return}
    
                    return res.redirect('/users/sign-in');
                })
            }else{
                return res.redirect('back');
            }
    }catch(err){
         if(err){console.log("Error in the user's controller-- create ",err); return;}
    }
   
}


// sign in and create a session for the user
module.exports.createSession = function(req, res){
    return res.render('user_profile',{
        title: "User|Profile",
       profile_user:req.user
    });
}

module.exports.destroySession = function(req, res){
    req.logout();

    return res.redirect('/');
}