import { Component, OnInit } from '@angular/core';
import {Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { DialogComponent, DialogService } from "ng2-bootstrap-modal";

import { Video } from "../video.object";
import { VideoService } from "../video.service";
import { YoutubeService } from "../youtube.service";

import 'rxjs/add/operator/debounceTime.js';


export interface ConfirmModel {
  editType:string;
  selectedVideo:Video;
}

@Component({
  //selector: 'edit-video-modal',
  templateUrl: './edit-video-modal.component.html',
  styleUrls: ['./edit-video-modal.component.css']
})

export class EditVideoModalComponent extends DialogComponent<ConfirmModel, Video> implements ConfirmModel, OnInit {
  private videoForm : FormGroup;
  editType:string;
  selectedVideo:Video;
  private editDate = false;
  testImage;

  //public minDate: Date = void 0;
  //public events: any[];
  //public tomorrow: Date;
  //public afterTomorrow: Date;
  //public dateDisabled: {date: Date, mode: string}[];
  //public formats: string[] = ['DD-MM-YYYY', 'YYYY/MM/DD', 'DD.MM.YYYY',
  //  'shortDate'];
  //public format: string = this.formats[0];
  //public dateOptions: any = {
  //  formatYear: 'YY',
  //  startingDay: 1
  //};

  pubDate;
  results;
  searchText = '';
  search = new FormControl();

  constructor(dialogService: DialogService, private formBuilder: FormBuilder, public videoService: VideoService, public youtubeService: YoutubeService) {
    super(dialogService);


  }

  ngOnInit() {
    this.results = this.search.valueChanges
      .debounceTime(150)
      .switchMap(text => this.youtubeService.search(text));

    this.videoForm = this.formBuilder.group({
      title: ['', Validators.required],
      publishedDate: [''],
      description: [''],
      coverImage: [''],
      sortOrder:  [(this.videoService.videos.length + 1)]
    });

    if (this.selectedVideo) {
      console.log(this.selectedVideo)
      for(var property in this.selectedVideo) {
        if (this.selectedVideo.hasOwnProperty(property)) {
          if (this.videoForm.controls.hasOwnProperty(property)) {
              this.videoForm.controls[property].setValue(this.selectedVideo[property]);
          }
        }
      }
      this.pubDate = this.selectedVideo.publishedDate;
      this.testImage = this.selectedVideo.coverImage;
    }

    else {
      this.videoForm.controls['sortOrder'].setValue(this.videoService.videos.length + 1);
      this.videoForm.controls['publishedDate'].setValue('4/28/2017');
      this.pubDate = '4/28/2017';
    }



  }

  selectVideo(video) {
      this.selectedVideo = new Video();
      this.selectedVideo.title = video.snippet.title;
      this.videoForm.controls['title'].setValue(this.selectedVideo['title']);

      this.testImage = video.snippet.thumbnails.default.url;
      this.videoForm.controls['coverImage'].setValue(this.testImage);

      console.log(this.selectedVideo)
  }

  submitEdits() {

    console.log(this.videoForm.value)
    this.result = this.videoForm.value;
    console.log(this.result)
    if (this.editType == 'add') {
      this.videoService.addVideo(this.result)
      .then(data => {
        console.log(data);
        this.close();
      })
    }
    else {
      this.videoService.updateVideo(this.result, this.selectedVideo.id)
      .then(data => {
        console.log(data);
        this.close();
      })
    }

  }

  showDatepicker() {
    this.editDate = true;
  }

  saveDate() {
    this.editDate = false;
    this.pubDate = this.videoForm.value.publishedDate;
  }

  updateImage() {
    this.testImage = this.videoForm.value.coverImage;
  }

}
