const videoModel = require('../models/videos.js');
const initVideos = require('../models/data/init_videos');


/**
 *
 * @description :: Server-side logic for managing videos.
 */
 module.exports = {

    /**
     * speakerController.list()
     */
    list: function(req, res) {
        console.log('inside controller')
        videoModel.find(function(err, videos){
            console.log('asdfa')
            if(err) {
                return res.json(500, {
                    message: 'Error getting video.'
                });
            }
            // create videos if none exist
            console.log(videos.length)
            if(videos.length === 0){
                videoModel.collection.insert(initVideos, {}, (err,updatedVideos)=>{
                    if(err) {
                        return res.json(500, {
                            message: 'Error getting speaker.'
                        });
                    }
                    return  res.json(updatedVideos.ops);
                })
            }else{
                return res.json(videos);
            }
        });
    },

    /**
     * speakerController.show()
     */
    show: function(req, res) {
        var id = req.params.id;
        videoModel.findOne({_id: id}, function(err, video){
            if(err) {
                return res.json(500, {
                    message: 'Error getting speaker.'
                });
            }
            if(!video) {
                return res.json(404, {
                    message: 'No such speaker'
                });
            }
            return res.json(video);
        });
    },

    /**
     * speakerController.create()
     */
    create: function(req, res) {
        var video = new videoModel({
			   "title": req.body.title,
            //   "publishedDate": req.body.publishedDate,
              "description": req.body.description,
              "coverImage": req.body.coverImage,
              "sortOrder": req.body.sortOrder
        });

        video.save(function(err, video){
            if(err) {
                return res.json(500, {
                    message: 'Error saving speaker',
                    error: err
                });
            }
            return res.json({
                message: 'saved',
                _id: video._id
            });
        });
    },

    /**
     * speakerController.update()
     */
    update: function(req, res) {
        var id = req.params.id;
        videoModel.findOne({_id: id}, function(err, video){
            if(err) {
                return res.json(500, {
                    message: 'Error saving video',
                    error: err
                });
            }
            if(!video) {
                return res.json(404, {
                    message: 'No such video'
                });
            }

            video.title =  req.body.title ? req.body.title : video.lastName;
			video.publishedDate =  req.body.publishedDate ? req.body.publishedDate : speaker.publishedDate;
			video.description =  req.body.description ? req.body.description : speaker.description;
			video.sortOrder =   req.body.sortOrder ? req.body.sortOrder : speaker.sortOrder;
		
			
            video.save(function(err, video){
                if(err) {
                    return res.json(500, {
                        message: 'Error getting speaker.'
                    });
                }
                if(!video) {
                    return res.json(404, {
                        message: 'No such speaker'
                    });
                }
                return res.json(video);
            });
        });
    },

    /**
     * speakerController.remove()
     */
    remove: function(req, res) {
        var id = req.params.id;
        videoModel.findByIdAndRemove(id, function(err, video){
            if(err) {
                return res.json(500, {
                    message: 'Error getting speaker.'
                });
            }
            return res.json(video);
        });
    }
};

