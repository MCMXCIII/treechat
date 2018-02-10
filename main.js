const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const http = require('http');
const cookieParser = require('cookie-parser');
const validator = require('express-validator');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const mongoose = require('mongoose');
const flash = require('flash');
const passport = require('passport');


const container = require('./container');

container.resolve(function(user){

    mongoose.Promise = global.Promise;
    mongoose.connect('mongodb://localhost/treehousechat', {useMongoClient:true});

     const app = SetupExpress();
     function SetupExpress(){
       const app = express();
       const server = http.createServer(app);
       server.listen(3000,function(){
         console.log('Listening on port 3000');
         });
         CongifureExpress(app);

         //Setup Router
         const router = require('express-promise-router')();
         user.SetRouting(router);

         app.use(router);
     }

     function CongifureExpress(app){
       app.use(express.static('public'));
       app.use(cookieParser());
       app.set('view engine', 'ejs');
       app.use(bodyParser.json());
       app.use(bodyParser.urlencoded({extended:true}));

       app.use(validator());
       app.use(session({
         secret:'12345',
         resave: true,
         saveInitialized: true,
         store: new MongoStore({mongooseConnection: mongoose.connetion})
       }))

       app.use(flash());

       app.use(passport.initalize());
     }

});
