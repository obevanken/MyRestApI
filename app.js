var express = require('express');
var app = express();
var body_parser = require("body-parser");
var db = require("./db");
var methodOverride =  require ("method-override");
var passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy;
var expressSession = require('express-session');
var cookieParser = require('cookie-parser');
var flash=require('connect-flash');
var ObjectID = require('mongodb').ObjectID;
var login = require("./passport/login")(passport);
var register = require("./passport/register")(passport);



app.use(body_parser.json());
app.use(body_parser.urlencoded({extended: true}));
app.use(methodOverride(function (req, res) {
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    var method = req.body._method
    delete req.body._method
    return method
  }
}));
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(flash());
app.use(cookieParser());
app.use(expressSession({secret: 'mySecretKey',
    resave :  true ,
    saveUninitialized :  true }));
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function(user, done) {
  done(null, user._id);
});

passport.deserializeUser(function(id, done) {
  db.get().collection('users').findOne({_id: ObjectID(id)}, function(err, user) {
    done(err, user);
  });
});

var routes = require('./routes')(passport);
app.use('/', routes);

db.connect('mongodb://127.0.0.1/blog', function(err){
   if (err){
     return console.log(err);
   }
   app.listen(3000, function(){
     console.log("API start");
   })
})
