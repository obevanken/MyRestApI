var db = require('../db');
var LocalStrategy = require('passport-local').Strategy;

module.exports = function(passport){
     passport.use('login', new LocalStrategy({
    passReqToCallback : true
  },
    function(req, username, password, done) {
    db.get().collection('users').findOne({ username: req.body.username }, function(err, user) {
        if (err) { return done(err); }
        if (!user) {
          console.log("Incorrect username");
          return done(null, false, { message: 'Incorrect username.' });
        }
        if (!password) {
          return done(null, false, { message: 'Incorrect password.' });
        }

        return done(null, user, console.log(user.username));

      });
    }
  ));
}
