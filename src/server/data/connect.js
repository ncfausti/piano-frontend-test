const mongoose = require('mongoose');
const Video = require('../models/videos.js');

if (process.ENV && process.ENV.dataStore) {
  mongoose.connect(process.ENV.dataStore);
} else {
  mongoose.connect('mongodb://localhost/dev');
}
