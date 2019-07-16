const express = require('express');
const router = express.Router();
const UserModel = require("../models/user")
const adminRouter = require('./admin');

router.get('/', (req, res) => {
  if(req.session.authenticated){
    res.locals.title = 'Nordic-shop';
    res.locals.authenticated = req.session.authenticated;
    res.render('index');
  }else{
    res.render('login')
  }
});


router.post('/login', (req, res) => {
  const { username, password } = req.body;
  UserModel.findOne({ username })
    .exec()
    .then(user => {
      if (user && username === user.username && password === user.password) {
        req.session.authenticated = true;
        req.session.name = username
        req.session.avatar = user.avatar
      }
 
      res.redirect('/');
    })
    .catch(() => {
      res.redirect('/');
    });
});

/*
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express Shop' });
});*/


module.exports = router;
