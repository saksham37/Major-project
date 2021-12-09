//Everytime i create a controller function , it needs a router to be accessed
module.exports.profile = function(req,res){
    res.send('<h1>User Profile</h1>');
}

module.exports.posts = function(req,res){
    res.send('<h1>Users Posts </h1>');
}