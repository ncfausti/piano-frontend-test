var mongoose = require('mongoose');
var Schema   = mongoose.Schema;
const timestamps = require('mongoose-timestamp');


var videoSchema = new Schema({
   "title": String,
   "description": String,
   "coverImage": String,
   "sortOrder": Number
});
mongoose.plugin(timestamps,{createdAt: 'publishedDate'});

module.exports = mongoose.model('video', videoSchema);


							

