import { Injectable } from '@angular/core';
import {Http, Response, Headers, RequestOptions} from "@angular/http";
import { FormBuilder, Validators } from '@angular/forms';

import { Video } from './video.object';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class VideoService {

  private apiUrl = 'http://kevinearl.pythonanywhere.com/videos/';
  private headers = new Headers({'Content-Type': 'application/json'});

  public videos: Video[];


  public videosTemp = [
  {
   id: 1,
   title: "Drop It Like It's Hot - Snoop Dogg ft Pharrell",
   publishedDate: "2015-08-13 00:00:00",
   description: "This song has such a fire beat. And the black and white aethestic looks awesome.",
   coverImage: "https://media.giphy.com/media/ScZzMlETdv9mg/giphy.gif",
   sortOrder: 1
  },
  {
   id: 2,
   title: "Flap Ya Wings - Nelly",
   publishedDate: "2015-07-13 00:00:00",
   description: "You can't not love this song.",
   coverImage: "https://s3.amazonaws.com/images.imvdb.com/video/844671918259-nelly-flap-your-wings_music_video_ov.jpg",
   sortOrder: 2
  },
  {
   id: 3,
   title: "Area Codes - Ludacris ft Nate Dogg",
   publishedDate: "2015-07-13 00:00:00",
   description: "Possibly the catchiest hook, by the greatest hook master in hip-hop history.",
   coverImage: "https://i0.wp.com/www.hip-hopvibe.com/wp-content/uploads/2015/11/Areacodesvid1.jpg?fit=800%2C440",
   sortOrder: 3
  }
  // etc. would be good to have at least a 5-6 videos to play around with
 ];

  constructor(private http: Http) {

  }

  addVideo(video) {
    let options = new RequestOptions({headers: this.headers});
    let body = JSON.stringify(video);
    console.log(body)
    let newVideo;
    return this.http.post(this.apiUrl, body, options).toPromise()
      .then(response => newVideo = response.json() as Video)
      .catch(this.handleError)
  }

  updateVideo(video, video_id) {
    let options = new RequestOptions({headers: this.headers});
    let body = JSON.stringify(video);
    console.log(body)
    let newVideo;
    let apiUpdateUrl = this.apiUrl + video_id + '/';
    return this.http.post(apiUpdateUrl, body, options).toPromise()
      .then(response => newVideo = response.json() as Video)
      .catch(this.handleError)
  }

  getVideos(): Promise<Video[]> {
    let options = new RequestOptions({ headers: this.headers});
    return this.http.get(this.apiUrl, options).toPromise()
     .then(response => this.videos = response.json() as Video[])
     .catch(this.handleError)
  }

  deleteVideo(video) {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    let apiUrlRemovePlace = this.apiUrl + video.id + '/';
    console.log(apiUrlRemovePlace);
    return this.http.delete(apiUrlRemovePlace, options).toPromise();
  }

  moveVideoUp(video) {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    let apiUrlMoveUp = this.apiUrl + video.id + '/moveup/';
    return this.http.post(apiUrlMoveUp, options).toPromise();
  }

  moveVideoDown(video) {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    let apiUrlMoveDown = this.apiUrl + video.id + '/movedown/';
    return this.http.post(apiUrlMoveDown, options).toPromise();
  }


  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }

}
