const passport = require('passport');

const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');


//Authentication by creating an instance of LocalStrategy
passport.use(new LocalStrategy({
    usernameField: 'email'
},
function(email,password,done){
    //done is a call back function which reports back to the passport
     User.findOne({email:email},function(err,user){
         if(err){console.log("Error in finding the user --> Passport"); return done(err); }
         if(!user || user.password!=password){
             console.log("Invalid Email-id/Password");
             return done(null,false);
         }
         return done(null,user);
     });
}));

//serialzing the user to decide which key is to be sent into the cookies
passport.serializeUser(function(user,done){
    return done(null,user.id);
});

//deserializing the user from the key in the cookies
passport.deserializeUser(function(id,done){
    User.findById(id,function(err,user){
        if(err){console.log("Error in finding the user while deserialising --> Passport"); return done(err);}
        return done(null, user);
    });
});

//check if the user is authenticated or not
//we will be using the following function as a middle ware
passport.checkAuthentication = function(req,res,next){
      if(req.isAuthenticated()){
          //if the user is signed in , then pass on to the next function(i.e the controller function)
          return next();
      }
      //if the user is not authenticated
      return res.redirect('/users/sign-in');
}

passport.setAuthenticatedUser = function(req,res,next){
    if(req.isAuthenticated()){
        //req.user contains the current signed in user from the cookies and we are sending the user to respose locals
        res.locals.user = req.user;
        //req.user is already handled by the 'passport'
    }
    return next();
}
module.exports = passport;