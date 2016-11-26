import { Component } from '@angular/core';
import $ from 'jqlite';
import { NavController, ViewController, NavParams } from 'ionic-angular';
import { DomSanitizer, SafeResourceUrl, SafeUrl} from '@angular/platform-browser';
import { Http } from '@angular/http';

@Component({
  selector: 'page-lecture-video-single',
  templateUrl: 'lecture-video-single.html'
})
export class LectureVideoSinglePage {

  public course: any;
  public lecture: any;

  constructor(private http: Http, public navParams: NavParams, private sanitizer: DomSanitizer) {
    this.course = navParams.get('course');
    this.lecture = navParams.get('listing');


    http.get(`https://ocw.mit.edu${this.lecture.href}/`)
      .subscribe(lecture => {
        let video = lecture.text()
          .replace(/(\s\s)|\n|\t/g,'')
          .replace(/src\=/g, 'mit-src=')
          .match(/https\:\/\/www.youtube.com\/(v|embed)\/(\w|\-)+/)[0];
        if (video) {
          video = video.replace('/v/', '/embed/');
          this.lecture.video = sanitizer.bypassSecurityTrustResourceUrl(video);
        } else {
          this.lecture.video = false;
        }
      });
  }

}
