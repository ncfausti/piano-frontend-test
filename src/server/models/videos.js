const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let videoModel = new Schema({
  'title': String,
  'description': String,
  'coverImage': String,
  'sortOrder': Number,
});

module.exports = mongoose.model('video', videoModel);
