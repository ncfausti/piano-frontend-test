const mongoose = require('mongoose');
const Video = require('../models/videos.js');
const seedData = require('../data/seedData.json');


mongoose.Promise = require('bluebird');

module.exports = {
  index(req, res) {
    Video.find().sort([['sortOrder', 1]]).then((videos) => {
      if (videos.length === 0) {
          Video.collection.insert(seedData, {}, (err, videoInsert) => {
            if (err) {
              return res.status(500).json({
                message: 'Error, unable to load seed data'
              });
            } else {
              return res.json(videoInsert.ops);
            }
          });
      } else {
        return res.json(videos);
      }
    }).catch((err) => {
      throw new Error(err);
    });
  },

  create(req,res) {
    console.log(req.body);
    let newVideo = new Video({
      title: req.body.title,
      description: req.body.description,
      coverImage: req.body.coverImage,
      sortOrder: req.body.sortOrder,
      publishDate: Date.now()
    });

    newVideo.save((err, newVideo) => {
      if (err) {
        return res.status(500).json({
          message: 'Unable to save new video',
          error: err,
        });
      }
      return res.json({
        message: 'New video saved',
        _id: newVideo._id,
        video: newVideo,
      });
    });
  },
  update(req, res) {
    var id = req.params.id;

    Video.findOne({_id: id}, (err, video) => {
      if (err || !video) {
        return res.status(500).json({
          message: 'Error saving video',
          error: err
        });
      }

      if (req.body) {
        video.title =  req.body.title || video.title;
        video.publishedDate =  req.body.publishedDate || video.publishedDate;
        video.description =  req.body.description || video.description;
        video.sortOrder =   req.body.sortOrder || video.sortOrder;
      }

      video.save(err, video => {
        if (err) {
          return res.status(500).json({
            message: 'Error updating video'
          });
        }
        if (!video) {
          return res.status(404).json({
            message: 'Video does not exist, please try again'
          });
        }
        return res.json(video);
      });
    });
  },
  delete(req, res) {
    let id = req.params.id;
    console.log(id);
    Video.findByIdAndRemove(id, (err, video) => {
      if (err) {
        return res.status(500).json({
          message: 'Unable to find video',
          error: err,
        });
      }
      return res.json(video);
    });
  }
}
