const express = require('express');
const router = express.Router();

const passport = require('passport');

const usersController = require('../controllers/users_controller');

//we should only render the profile page when the user is signed-in
router.get('/profile',passport.checkAuthentication,usersController.profile);

router.get('/posts',usersController.posts);

router.get('/sign-in',usersController.signIn);

router.get('/sign-up',usersController.signUp);

router.get('/sign-out',usersController.destroySession);

module.exports = router;

