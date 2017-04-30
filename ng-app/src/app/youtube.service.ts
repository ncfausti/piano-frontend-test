//import {Http, HTTP_BINDINGS, Response} from 'angular2/http';
//import {Injectable} from 'angular2/angular2';
import { Injectable } from '@angular/core';
import {Http, Response, Headers, RequestOptions} from "@angular/http";


const BASE_URL = 'https://www.googleapis.com/youtube/v3/search';
const API_TOKEN = 'AIzaSyAJk1xUI72YYfBMgEc84gjHUX-k2AN6-B0';

@Injectable()
export class YoutubeService {
  constructor(public http:Http){
    //this.http = http;
  }

  search(query){
    return this.http.get(`${BASE_URL}?q=${query}&part=snippet&key=${API_TOKEN}`)
      .map((res:Response) => res.json())
      .map(json => json.items);
  }
}
