import { Component } from '@angular/core';
import $ from 'jqlite';
import { NavController, ViewController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http';

import { LectureVideosPage } from '../lecture-videos/lecture-videos';

@Component({
  selector: 'page-course-home',
  templateUrl: 'course-home.html'
})
export class CourseHomePage {

  public course: any;
  public sidebar: any = [];

  public sidebarPages: any = {
    'lecture-videos': LectureVideosPage,
    'recitation-videos': LectureVideosPage
  };

  constructor(public navCtrl: NavController, private http: Http, public navParams: NavParams, public viewCtrl: ViewController) {
    this.course = navParams.get('course');

    http.get(`https://ocw.mit.edu${this.course.href}/index.json`)
      .subscribe(course => {
        this.course = Object.assign(this.course, course.json());
      });

    http.get(`https://ocw.mit.edu${this.course.href}/`)
      .subscribe(course => {
        let courseRaw = $(course.text()
          .replace(/(\s\s)|\n|\t/g,'')
          .replace(/src\=/g, 'mit-src=') // jqlite will attempt to load images when parsing the html
          .match(/\<body.*\/body\>/)[0]);

        let inner = courseRaw
          .find('#course_inner_chp');

        this.course.image = `https://ocw.mit.edu${$(inner).find('#chpImage img').attr('mit-src')}`;

        // Fetch sidebar links
        courseRaw
          .find('nav#course_nav > ul > li')
          .map(li => {
            let first = $(li.firstChild);
            if (first[0].localName == 'a') {
              let navItem: any = {
                name: first[0].innerText.trim(),
                href: first.attr('href'),
              };
              for (let k of Object.keys(this.sidebarPages)) {
                if (navItem.href.indexOf(k) > -1) {
                  navItem.page = k;
                  this.sidebar.push(navItem);
                }
              }
            }
          });
      });
  }

  sidebarLink(page) {
    this.navCtrl.push(this.sidebarPages[page], {
      course: this.course,
      href: page,
    });
  }

}
