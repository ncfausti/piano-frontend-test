const bodyParser = require('body-parser');
const express = require('express');
const app = express();

app.use(bodyParser.json());
app.use(express.static('public/dest')); 

app.use('/', videos);
app.listen(8080, function() {
  console.log('listening on 8080')
})