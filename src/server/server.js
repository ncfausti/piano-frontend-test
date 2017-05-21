const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');
const path = require('path');

const app = express();
const videos = require('./controllers/videos');
const dataStore = require('./data/connect.js');

let port = process.env.port || 8080;
let router = express.Router();

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

dataStore.on;
app.options('*', cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));

router.get('/videos', (req, res) => {
  console.log('did this work');
  videos.index(req, res);
});

router.post('/videos', videos.create);
router.put('/videos/:id', (req, res) => {
  console.log(req.body);
  videos.update(req, res);
});
router.delete('/videos/:id', videos.delete);

app.use('/api', router);

app.listen(port, function () {
  console.log("Server started on port", port);
});
