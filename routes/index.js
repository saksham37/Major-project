//This will serve as the route mapper
const express = require('express');
//Everytime i require express, it will not create a new instance for express, it will use an existing instance

const User = require('../models/user');
const router = express.Router();

const homeController = require('../controllers/home_controllers');
const usersController = require('../controllers/users_controller');
const passport = require('passport');

console.log('router loaded');

router.get('/',homeController.home);

router.use('/users',require('./users'));
router.use('/post',require('./posts'));


router.post('/create',function(req,res){
    console.log("/n/n/n Working Till Now /n/n/n/n");
    if(req.body.password!=req.body.confirm_password){
      res.redirect('back');
    }
    User.findOne({email:req.body.email},(err,user)=>{
          if(err){console.log("Error in finding the already existing user in the datbase"); return;}
          if(!user){
            User.create(req.body,function(err,user){
                if(err){console.log("Error in creating a document inside the collection of the database"); return;}
                res.redirect('/users/sign-in');       
            });
          }
          else{
              res.redirect('back');
          }

    });
   
    
});
//use passport as a middleware to authenticate
router.post('/create-session',passport.authenticate(
  'local',
  {failureRedirect: "/users/sign-in"}
  ),usersController.createSession);

//for any further routes,access from here
//router.use('/routeName',require('./routerfile'));

module.exports = router;