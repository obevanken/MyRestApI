var db = require('../db');
var ObjectID = require('mongodb').ObjectID;

exports.all = function(cb){
  db.get().collection('users').find({}).toArray(function(err, docs){
    cb(err, docs);
  })
}

exports.create = function(user, cb){
  db.get().collection('users').insert(user, function (err, result) {
    cb(err, result);
  })
}

exports.delete = function (id, cb){
  db.get().collection('user').deleteOne( {_id: ObjectID(id) } , function(err, result){
      cb(err, result);
    })
 }

 exports.findByID = function (id, cb){
   db.get().collection('user').findOne({ _id: ObjectID(id)} , function(err, result){
     cb(err, result);
   })
 }
