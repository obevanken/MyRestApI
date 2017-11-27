var db = require('../db');
var LocalStrategy = require('passport-local').Strategy;

module.exports = function(passport) {
  passport.use('register', new LocalStrategy({
      passReqToCallback: true
    },
    function(req, username, password, done) {
      findOrCreateUser = function() {

        db.get().collection('users').findOne({
          username: req.body.username
        }, function(err, user) {
          if (err) {
            console.log('Error in SignUp: ' + err);
            return done(err);
          }
          if (user) {
            console.log('User already exists');
            return done(null, false,
              req.flash('message', 'User Already Exists'));
          } else {
            var user = {
              username: req.body.username,
              password: req.body.password
            }
            db.get().collection('users').insert(user, function(err, result) {
              if (err) {
                console.log(err);
              }
              console.log(user);
              return done(null, user);
            });
          }
        });
      };
      // Отложить исполнение findOrCreateUser и выполнить
      // метод на следующем этапе цикла события
      process.nextTick(findOrCreateUser);
    }
  ));
}
