//This will serve as the route mapper
const express = require('express');
//Everytime i require express, it will not create a new instance for express, it will use an existing instance


const router = express.Router();

const homeController = require('../controllers/home_controllers');

console.log('router loaded');

router.get('/',homeController.home);

router.use('/users',require('./users'));

//for any further routes,access from here
//router.use('/routeName',require('./routerfile'));

module.exports = router;