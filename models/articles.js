var db = require('../db');
var ObjectID = require('mongodb').ObjectID;

exports.all = function(cb){
  db.get().collection('articles').find({}).toArray(function(err, docs){
    cb(err, docs);
  })
}

exports.create = function(article, cb){
  db.get().collection('articles').insert(article, function (err, result) {
    cb(err, result);
  })
}

exports.delete = function (id, cb){
  db.get().collection('articles').deleteOne( {_id: ObjectID(id) } , function(err, result){
      cb(err, result);
    })
 }

 exports.findByID = function (id, cb){
   db.get().collection('articles').findOne({ _id: ObjectID(id)} , function(err, result){
     cb(err, result);
   })
 }

 exports.findByAuthor = function (name, cb){
   db.get().collection('articles').find({ username: name}).toArray(function(err, result){
     cb(err, result);
   })
 }


 exports.update = function (id, newData, cb){
   db.get().collection('articles').updateOne({ _id: ObjectID(id) }, newData, function(err, result){
     cb(err,result);
   })
 }
