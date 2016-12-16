import { Component } from '@angular/core';
import $ from 'jqlite';
import { NavController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http';

import { LectureVideoSinglePage } from '../lecture-video-single/lecture-video-single';

@Component({
  selector: 'page-lecture-videos',
  templateUrl: 'lecture-videos.html'
})
export class LectureVideosPage {

  public course: any;
  public listings: any = [];
  public lectureVideoPage: any = LectureVideoSinglePage;
  public title: string;
  public navCtrl: NavController;

  constructor(private http: Http, public navParams: NavParams) {
    this.course = navParams.get('course');
    this.title = navParams.get('title');
    this.navCtrl = navParams.get('nav');

    http.get(`https://ocw.mit.edu${this.course.href}/${navParams.get('href')}/`)
      .subscribe(course => {
        $(course.text()
          .replace(/(\s\s)|\n|\t/g,'')
          .replace(/src\=/g, 'mit-src=')
          .match(/\<body.*\/body\>/)[0])
          .find('main#course_inner_media_gallery > .medialisting')
          .map(listing => {
            let newListing: any = {};
            newListing.image = $(listing).find('img').attr('mit-src');
            // Relatively-linked images
            if (newListing.image.charAt(0) == '/') newListing.image = `https://ocw.mit.edu${newListing.image}`;
            let link = $(listing).find('.medialink');
            newListing.href = link.attr('href');
            newListing.name = link[0].innerText;
            this.listings.push(newListing);
          });
      });
  }

  loadVideo(listing: any) {
    this.navCtrl.push(this.lectureVideoPage, {
      course: this.course,
      listing,
    });
  }

}
