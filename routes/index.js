//This will serve as the route mapper
const express = require('express');
//Everytime i require express, it will not create a new instance for express, it will use an existing instance


const router = express.Router();

const homeController = require('../controllers/home_controllers');

console.log('router loaded');

router.get('/',homeController.home);
module.exports = router;