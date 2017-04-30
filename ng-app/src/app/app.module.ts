import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
//import { AlertModule } from 'ngx-bootstrap';
//import { ModalModule } from 'ngx-bootstrap';
import { BootstrapModalModule } from 'ng2-bootstrap-modal';
import { DatepickerModule } from 'ngx-bootstrap';



import { AppComponent } from './app.component';
import { ListVideosComponent } from './list-videos/list-videos.component';
import { EditVideoModalComponent } from './edit-video-modal/edit-video-modal.component';
import { VideoService } from './video.service';
import { YoutubeService } from './youtube.service';

@NgModule({
  declarations: [
    AppComponent,
    ListVideosComponent,
    EditVideoModalComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    BootstrapModalModule,
    DatepickerModule.forRoot()
    //AlertModule.forRoot(),
    //ModalModule.forRoot()
  ],
  providers: [
    VideoService,
    YoutubeService
  ],
  bootstrap: [
    AppComponent,
    EditVideoModalComponent
  ]
})
export class AppModule { }
