const express = require('express');
const router = express.Router();
const multipart = require('connect-multiparty');
const videoController = require('../controllers/videos');

const multipartMiddleware = multipart();
const config = require('../config');

router.get('/', function(req, res) {
    // videoController.list(req, res);
    return res.sendFile(config.global_path+'/public/home.html')
});

/*
 * GET
 */
router.get('/videos', function(req, res) {
    console.log(videoController)
    videoController.list(req, res);
});

/*
 * POST
 */
router.post('/videos', function(req, res) {
    console.log(videoController)
    videoController.create(req, res);
});
/*
 * PUT
 */
router.put('/videos/:id', function(req, res) {
    console.log(videoController)
    videoController.update(req, res);
});
/*
 * DELETE
 */
router.delete('/videos/:id', function(req, res) {
    console.log(videoController)
    videoController.remove(req, res);
});

module.exports = router;