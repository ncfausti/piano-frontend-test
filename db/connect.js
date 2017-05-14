var mongoose = require('mongoose');
var env = require('../environment');
var config = require('./config');
console.log('connection file')
if(env!== "production"){
    console.log('not production');
    mongoose.connect(config[env].url);
}else{
    mongoose.connect(process.env['PROD_MONGODB'])
}