import { Component } from '@angular/core';
import $ from 'jqlite';
import { NavController, ViewController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http';

@Component({
  selector: 'page-lecture-video-single',
  templateUrl: 'lecture-video-single.html'
})
export class LectureVideoSinglePage {

  public course: any;
  public listings: any = [];

  constructor(public navCtrl: NavController, private http: Http, public navParams: NavParams) {
    this.course = navParams.get('course');
    //
    // http.get(`https://ocw.mit.edu${this.course.href}/lecture-video-single/`)
    //   .subscribe(course => {
    //     $(course.text().replace(/(\s\s)|\n|\t/g,'').match(/\<body.*\/body\>/)[0])
    //       .find('main#course_inner_media_gallery > .medialisting')
    //       .map(listing => {
    //         let newListing: any = {};
    //         newListing.image = $(listing).find('img').attr('src');
    //         let link = $(listing).find('.medialink');
    //         newListing.href = link.attr('href');
    //         newListing.name = link[0].innerText;
    //         this.listings.push(newListing);
    //       });
    //   });
  }

}
