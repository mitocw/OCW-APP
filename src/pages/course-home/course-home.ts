import { Component } from '@angular/core';
import $ from 'jqlite';
import { NavController, ViewController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http';

import { LectureVideosPage } from '../lecture-videos/lecture-videos';
import { CourseHtmlPage } from '../course-html-page/course-html-page';

@Component({
  selector: 'page-course-home',
  templateUrl: 'course-home.html'
})
export class CourseHomePage {

  public course: any;
  public sidebar: any = [];

  public sidebarPages: any = {
    'lecture-videos': LectureVideosPage,
    'video-lectures': LectureVideosPage,
    'recitation-videos': LectureVideosPage,
    'assignments': CourseHtmlPage,
    'lecture-notes': CourseHtmlPage,
    'software': CourseHtmlPage,
    'syllabus': CourseHtmlPage,
    'calendar': CourseHtmlPage,
    'readings': CourseHtmlPage,
    'exam': CourseHtmlPage,
  };

  constructor(public navCtrl: NavController, private http: Http, public navParams: NavParams, public viewCtrl: ViewController) {
    this.course = navParams.get('course');
  }

  back() {
    this.navCtrl.pop();
  }

  sidebarLink(nav) {
    this.navCtrl.push(this.sidebarPages[nav.view], {
      course: this.course,
      href: nav.page,
      title: nav.name
    });
  }

}
