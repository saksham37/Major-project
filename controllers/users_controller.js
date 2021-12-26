//Everytime i create a controller function , it needs a router to be accessed
module.exports.profile = function(req,res){
    res.send('<h1>User Profile</h1>');
}

module.exports.posts = function(req,res){
    res.send('<h1>Users Posts </h1>');
}

module.exports.signIn = function(req,res){
    res.render('sign_in_page',{
        title: 'Codial | Sign In'
    });
}
module.exports.signUp = function(req,res){
    res.render('sign_up_page',{
        title: 'Codial | Sign Up'
    })
}

module.exports.createSession = function(req,res){
    console.log("Working till createSession ");
    return res.redirect('/users/profile');
}