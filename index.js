const express = require('express');
const app = express();
const port = 8000;

app.listen(port,(err)=>{
    if(err)
    console.log(`Unable to hear to the port number ${port}`);
    else
    console.log(`server is up and running on the port number ${port}`);
});