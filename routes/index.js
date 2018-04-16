var express = require('express');
var router = express.Router();
var mongodb = require('mongodb');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Home' });
});

router.get('/newuser', function(req, res, next) {
  res.render('newuser', { title: 'Add User' });
});

router.post('/adduser', function(req, res) {
  var MongoClient = mongodb.MongoClient;

  var url = 'mongodb://localhost:27017/mongoapp';

  MongoClient.connect(url, function(err, db) {
    if(err) {
      console.log('unable to connect');
    }
    else {
      console.log('connected to server');
      var collection = db.collection('users');
      var newUser = {name: req.body.name, age: req.body.age, email: req.body.email};
      collection.insert([newUser], function(err, result) {
        if(err) {
          console.log(err);
        }
        else {
          res.redirect("/users");
        }
        db.close();
      })
    }
  });
});

router.get('/users', function(req, res) {
  var MongoClient = mongodb.MongoClient;

  var url = 'mongodb://localhost:27017/mongoapp';

  MongoClient.connect(url, function(err, db) {
    if(err) {
      console.log('unable to connect');
    }
    else {
      console.log('connection established');
      var collection = db.collection('users');
      collection.find({}).toArray(function(err, result) {
        if(err) {
          res.send(err);
        }
        else if(result.length) {
          res.render('userlist', {
            "userlist": result,
            title: "All Users"
          });
        }
        else {
          res.send('No users found');
        }

        db.close();
      })
    }
  })
});

router.get('/newuser', function(req, res) {
  res.render('newuser', {title: 'Add User'});
});

module.exports = router;
