const express = require('express');
const ejs = require('ejs');
const app = express();
const cookieParser = require('cookie-parser');
const port = 8000;

const db = require('./config/mongoose');

const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');

const expressLayouts = require('express-ejs-layouts');

const MongoStore = require('connect-mongo');

//sass or scss
const sassMiddleware = require('node-sass-middleware');
const flash = require('connect-flash');
const customFlashMiddleware = require('./models/middleware');

app.use(sassMiddleware({
    src: './assets/scss',
    dest: './assets/css',
    debug: true,
    outputStyle: 'extended',
    prefix: '/css'
}));

app.use(express.static('./assets'));
app.use(expressLayouts);
//extract styles and script from the sub-pages into the style
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);


app.use(express.urlencoded());
app.use(cookieParser());


app.set('view engine','ejs');
app.set('views','./views');

//Mongo store is used to store the cookie session into the database
app.use(session({
   name: 'codial',
   //TODO change the secret before deployment in production mode
   secret: 'blahsomething',
   //secret is the key for encryption
   saveUninitialized: false,
   resave: false,
   cookie: {
       maxAge : (1000*60*100)
   },
   store : new MongoStore(
       {
           mongoUrl : 'mongodb://localhost/user_database',
           mongooseConnection: db,
           autoRemove: 'disabled'
       },
       function(err){
           console.log(err || 'connect-mongodb setup ok');
       }
   )
}));

//passport is also a middleware
app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);

app.use(flash()); 
app.use(customFlashMiddleware.setFlash);



//use express router
//This will redirect every route request to the index.js in the routs folder, which is the entry point for every route
app.use('/',require('./routes'));

app.listen(port,(err)=>{
    if(err)
    console.log(`Unable to hear to the port number ${port}`);
    else
    console.log(`server is up and running on the port number ${port}`);
});

