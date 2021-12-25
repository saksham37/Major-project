const express = require('express');
const ejs = require('ejs');
const app = express();
const cookieParser = require('cookie-parser');
const port = 8000;

const db = require('./config/mongoose');

const expressLayouts = require('express-ejs-layouts');
app.use(expressLayouts);
app.use(express.urlencoded());
app.use(cookieParser());
//use express router
//This will redirect every route request to the index.js in the routs folder, which is the entry point for every route
app.use('/',require('./routes'));

app.set('view engine','ejs');
app.set('views','./views');

app.listen(port,(err)=>{
    if(err)
    console.log(`Unable to hear to the port number ${port}`);
    else
    console.log(`server is up and running on the port number ${port}`);
});

