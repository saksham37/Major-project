//here we'll be creating all the actions of the controller
module.exports.home = function(req,res){
    res.render('home',{
        title:"Home"
    });
}