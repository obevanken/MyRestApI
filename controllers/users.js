var Users= require ("../models/users");
var ObjectID = require('mongodb').ObjectID;

exports.login = function(req, res){
  res.render('login');
}

exports.register = function (req, res) {
  res.render('register');
}
