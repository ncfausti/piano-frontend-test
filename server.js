require('./db/connect');
const bodyParser = require('body-parser');
const express = require('express');
const videos = require('./routes/videos');
const app = express();

app.use(bodyParser.json());
app.use('/public', express.static('public')); 

app.use('/', videos);
app.listen(8080, function() {
  console.log('listening on 8080')
})