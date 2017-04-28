import { Component, OnInit } from '@angular/core';
import { DialogService } from "ng2-bootstrap-modal";
import { EditVideoModalComponent } from '../edit-video-modal/edit-video-modal.component';


import { VideoService } from '../video.service';

@Component({
  selector: 'list-videos',
  templateUrl: './list-videos.component.html',
  styleUrls: ['./list-videos.component.css']
})

export class ListVideosComponent implements OnInit {

  constructor(public videoService: VideoService, public dialogService:DialogService) { }

  ngOnInit() {
    this.loadVideos();
  }

  loadVideos() {
    this.videoService.getVideos()
      .then(data => {
        this.videoService.videos = data;
      });
  }

  selectVideo(vid) {
    let disposable = this.dialogService.addDialog(EditVideoModalComponent, {
        editType: 'edit',
        selectedVideo: vid
      })
      .subscribe((data)=> {
        //We get dialog result
        if (data) {
          this.loadVideos();
        }
        else {
        }
      });
  }

  showConfirm() {
    let disposable = this.dialogService.addDialog(EditVideoModalComponent, {
        editType: 'add',
        selectedVideo: null
      })
      .subscribe((data)=> {
        //We get dialog result
        if (data) {
          this.loadVideos();
        }
        else {
        }
      });
  }

  moveVideoUp(video) {
    this.videoService.moveVideoUp(video)
      .then(data => {
        this.loadVideos();
      })
  }

  moveVideoDown(video) {
    this.videoService.moveVideoDown(video)
      .then(data => {
        this.loadVideos();
      })
  }



  deleteVideo(selectedVideo) {
    console.log("Deleting video" + selectedVideo)
    this.videoService.deleteVideo(selectedVideo)
      .then(data => {
        this.loadVideos();
      })
  }


}
