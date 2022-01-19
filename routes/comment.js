const express = require('express');
const router = express.Router();
const passport = require('../config/passport-local-strategy');
//controller bulao and route banao
console.log("Comments router loaded");
const commentController = require('../controllers/comments_controller');

router.post('/create',passport.checkAuthentication,commentController.create);
router.get('/destroy/:id',passport.checkAuthentication,commentController.destroy);

module.exports = router;