const express = require('express');
const app = express();
const port = 8000;

//use express router
//This will redirect every route request to the index.js in the rounts folder, which is the entry point for every route
app.use('/',require('./routes'));


app.listen(port,(err)=>{
    if(err)
    console.log(`Unable to hear to the port number ${port}`);
    else
    console.log(`server is up and running on the port number ${port}`);
});

