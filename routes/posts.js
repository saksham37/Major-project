const express = require('express');
const router = express.Router();
const passport = require('../config/passport-local-strategy');

const postsController = require('../controllers/posts_controller');

router.post('/create',passport.checkAuthentication, postsController.create);

//user should be logged in to delete a post, that is the reason why we have added authentication here
router.get('/destroy/:id',passport.checkAuthentication, postsController.destroy);
//we will create a button for deletion of a post which will map to this router, giving us the id of the past to be deleted in the query params

module.exports = router;