var express = require('express');
var router = express.Router();
var articlesController = require("./controllers/articles")
var users = require("./controllers/users");
var modUsers = require("./models/users");
var db = require("./db");


var isAuthenticated = function (req, res, next) {
  if (req.isAuthenticated())
    return next();
  res.redirect('/login');
}


module.exports = function(passport){
  router.post('/signout', function(req, res) {
    req.logout();
    res.redirect('/login');
  });

  router.post('/register', passport.authenticate('register', { successRedirect: '/login',
                                     failureRedirect: '/register',
                                     failureFlash: true })
  );

  router.post('/login',passport.authenticate('login', { successRedirect: '/articles',
                                       failureRedirect: '/login',
                                       failureFlash: true }));
  router.get('/', isAuthenticated ,function(req,res){
    res.redirect('/articles');
  })
  router.get('/user/:author',isAuthenticated, articlesController.findByAuthor);
  router.get('/articles/upd/:id',isAuthenticated, articlesController.findForUpd);
  router.put('/articles/upd/:id',isAuthenticated, articlesController.update);
  router.get('/register', users.register);
  router.get('/login', users.login);
  router.get('/addArticle',isAuthenticated, articlesController.AddArticle);
  router.post('/newArticle',isAuthenticated, articlesController.create);
  router.get('/articles/:id',isAuthenticated, articlesController.findByID);
  router.get('/articles',isAuthenticated, articlesController.all);
  router.put('/articles/:id',isAuthenticated,articlesController.updateCom );
  router.delete('/articles/:id', articlesController.delete);

  return router;
}
