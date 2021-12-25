//here we'll be creating all the actions of the controller
module.exports.home = function(req,res){
    console.log(req.cookies);
    //We can change the value of the cookie before passing on the response
    res.cookie('user_id',23);
    res.render('home',{
        title:"Home"
    });
}