const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/user_database');
const db = mongoose.connection;
//the connnection between the ODM - Mongoose and the mongdb is our db

db.on('error',console.error.bind('console','Error connectiong to the databse'));

db.once('open',()=>{
    console.log("Successfully Connected to the Database");
})


module.exports = db;