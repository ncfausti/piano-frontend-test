var mongoose = require('mongoose');

var VideoSchema = new mongoose.Schema({
  title : String,
  publishedDate: String,
  description: String,
  coverImage: String,
  sortOrder: Number
});


//ListSchema.methods.upvote = function(cb) {
//  this.upvotes += 1;
//  this.save(cb);
//};


mongoose.model('Video', VideoSchema);