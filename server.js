'use strict';

// import dependencies
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var Comment = require('./model/commentsModel');
var secrets = require('./secrets');

// create instances
var app = express();
var router = express.Router();

// Predetermined port number or default of 3001
var port =  3001;

// db config
mongoose.connect(secrets);

// Configure the API to use bodyParser and look for JSON data in the request body
app.use (bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// To prevent errors from Cross Origin Resource Sharing, set the headers to allow CORS w/ middleware
app.use (function (req, res, next) {
  res.setHeader ('Access-Control-Allow-Origin', '*');
  res.setHeader ('Access-Control-Allow-Credentials', 'true');
  res.setHeader ('Access-Control-Allow-Methods', 'GET, HEAD, OPTIONS, POST, PUT, DELETE');
  res.setHeader ('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin, Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');

  // Remove caching to get most recent comments
  res.setHeader ('Cache-Control', 'no-cache');
  next();
});

// Set the router path & initialize the API
router.get('/', function (req, res) {
  res.json ({ message: 'API Initialized'});
});

// Adding the /comments route to /api router
router.route('/comments')
  // Get all comments from the database
  .get (function (req, res) {
    // looks at the Comment Schema
    Comment.find(function (err, comments) {
      if (err) {
        res.send (err);
      }
      // Responds with a json object of database comments
      res.json (comments)
    });
  })
  // Post new comment to the database
  .post (function (req, res) {
    var comment = new Comment();
    // body parser allows the usage of req.body
    comment.author = req.body.author;
    comment.text = req.body.text;

    comment.save (function (err) {
      if (err) {
        res.send (err);
      }
      res.json ({ message: 'Comment successfully added!'});
    })
  });

router.route ('/comments/:comment_id')
  /*
  Put method updates the comment based on the ID passed to the route
   */
  .put (function (req, res) {
    Comment.findById (req.params.comment_id, function (err, comment) {
      if (err) {
        res.send (err);
      }
      // Setting the new author and text to whatever was changed. If nothing was changed, don't alter the field
      (req.body.author) ? comment.author = req.body.author : null;
      (req.body.text) ? comment.text = req.body.text : null;

      // Save comment
      comment.save (function (err) {
        if (err) {
          res.send (err);
        }
        res.json ({ message: 'Comment has been updated' });
      });
    });
  })
  // Delete a comment from db
  .delete (function (req, res) {
    // Selects the comment by its ID and removes it.
    Comment.remove ({ _id: req.params.comment_id }, function (err, comment) {
      if (err) {
        res.send (err);
      }
      res.json ({ message: 'Comment has been deleted', })
    })
  });

// Use the router configuration when /api is called
app.use ('/api', router);

// Starts the server and listens for requests
app.listen (port, function () {
  console.log(`api running on port ${port}`);
});
