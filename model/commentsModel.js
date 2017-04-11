'use strict';

// import dependencies
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Instantiate new mongoose.schema.  The schema takes an object that shows the shape of the db entries.
var CommentsSchema = new Schema({
  author: String,
  text: String,
});

// Export this module to use in server.js
module.exports = mongoose.model('Comment', CommentsSchema);