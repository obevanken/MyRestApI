var Articles= require ("../models/articles");
var ObjectID = require('mongodb').ObjectID;



exports.create = function(req, res){
  var article = {
    head: req.body.head,
    text: req.body.text,
    username: req.user.username,
    comments: []
  }
  Articles.create(article, function(err, result){
    if (err){
      console.log(err);
      return res.sendStatus(500);
    }
    res.redirect("articles/" + article._id);
   console.log(article);
 })
}

exports.deleteCom = function(req, res, done){
  Articles.findByID(req.params.id, function(err, doc) {
      if (err) {
        console.log(err);
        return res.sendStatus(500);
      }
      console.log(req.body.id);
      for (var i = 0; i < doc.comments.length; i++) {
        if(doc.comments[i].id == req.body.id ){
          console.log(doc.comments[i]);
          doc.comments.splice(i, 1);
        }
      }
      Articles.update(req.params.id,  doc  , function(err, result){
        if (err) {
          console.log(err);
          return res.sendStatus(500);
        }
        console.log(doc);
          done();
            res.redirect('../articles/' + req.params.id);
      })
})
}

exports.all = function(req, res) {
  Articles.all(function(err, docs) {
    if (err) {
      console.log(err);
      return res.sendStatus(500);
    }
     console.log(docs);
     res.render("allArticles",{
       docs: docs,
       username: req.user.username
     });
  })
}

exports.findByAuthor = function(req, res){
  Articles.findByAuthor(req.params.author, function(err, docs){
    if(err){
      console.log(err);
      return res.sendStatus(500);
    }
    console.log(docs.length);
    if(docs.length == 0 ){
      res.send('Статей не найдено');
    } else {
    res.render('user',{
      docs: docs,
      username: req.user.username
    })};
  })
}

exports.findByID = function(req, res) {
  Articles.findByID(req.params.id, function(err, doc) {
      if (err) {
        console.log(err);
        return res.sendStatus(500);
      }
      console.log(doc);
      if (req.user.username == doc.username) {
        res.render('userArticle', {
          doc:doc,
          id: doc._id,
          username: doc.username,
          head: doc.head,
          text: doc.text,
          user: req.user.username
        })
      } else {
        res.render('article', {
          doc:doc,
          head: doc.head,
          id: doc._id,
          text: doc.text,
          username: doc.username,
          user: req.user.username
        })
      }
  })
}

exports.findForUpd = function(req, res) {
    Articles.findByID(req.params.id, function(err, doc) {
        if (err) {
          console.log(err);
          return res.sendStatus(500);
        }
        res.render('updateArticle', {
          id: doc._id,
          head: doc.head,
          text: doc.text
        })
    })}


exports.update = function(req, res){
    console.log(ObjectID(req.params.id));
  Articles.update(  req.params.id  , { $set: {head: req.body.head , text: req.body.text }}, function(err, result){
    if(err){
      console.log(err);
      res.sendStatus(500);
    }
    console.log();
    res.redirect('/articles/' + req.params.id);
  })
}

exports.updateCom = function(req,res){

  comment = {
    id: ObjectID(),
    articleID: req.params.id,
    textCommen: req.body.comm,
    username: req.user.username
  }
  Articles.update(req.params.id,{
         $push: {
        comments: comment
       }
      }, function(err, result) {
        if (err) {
          console.log(err);
          res.sendStatus(500);
        }
        console.log(comment);
    res.redirect("/articles/" + req.params.id);
  } )
}




exports.delete = function (req, res){
  Articles.delete( req.params.id , function(err, result){
    if(err){
      console.log(err);
      res.sendStatus(500);
    }
    res.redirect('/articles');
  })
}

exports.AddArticle = function(req, res){
  res.render('Postarticle');
}
