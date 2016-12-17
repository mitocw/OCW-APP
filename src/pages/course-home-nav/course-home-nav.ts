import { Component, ViewChild } from '@angular/core';
import $ from 'jqlite';
import { NavController, ViewController, NavParams, MenuController } from 'ionic-angular';
import { Http } from '@angular/http';

import { LectureVideosPage } from '../lecture-videos/lecture-videos';
import { CourseHtmlPage } from '../course-html-page/course-html-page';
import { CourseHomePage } from '../course-home/course-home';

import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-course-home-nav',
  templateUrl: 'course-home-nav.html'
})
export class CourseHomeNavPage {
  @ViewChild('courseContent') course_nav : NavController;

  public course: any;
  public sidebar: any = [];
  public title: string = "Loading...";

  private _favorited: boolean = false;

  get isFavorited(): boolean {
    return this._favorited;
  }

  set isFavorited(val: boolean) {
    this._favorited = val;
  }

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

  constructor(
    public navCtrl: NavController,
    private http: Http,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public menuCtrl: MenuController,
    public storage: Storage) {
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

        this.title = `${this.course.mcn} (${ this.course.sem })`;

        this.course.image = `https://ocw.mit.edu${$(inner).find('#chpImage img').attr('mit-src')}`;

        this.course_nav.setRoot(CourseHomePage, { course: this.course });

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
                let hrefEnd = navItem.href.split('/');
                 // We're fetching the final document slug
                 // Sometimes it has a trailing slash, in which case we need to remove it.
                if (hrefEnd[hrefEnd.length-1] == '') hrefEnd.pop();
                hrefEnd = hrefEnd.pop();
                if (hrefEnd.indexOf(k) > -1) {
                  navItem.page = hrefEnd;
                  navItem.view = k;
                  this.sidebar.push(navItem);
                }
              }
            }
          });
      });
  }

  back() {
    this.navCtrl.pop();
  }

  courseHome() {
    this.course_nav.setRoot(CourseHomePage, { course: this.course });
    this.title = `${this.course.mcn} (${ this.course.sem })`;
    this.menuCtrl.close();
  }

  sidebarLink(nav) {
    this.course_nav.setRoot(this.sidebarPages[nav.view], {
      course: this.course,
      href: nav.page,
      nav: this.navCtrl,
    });
    this.title = `${this.course.mcn} / ${nav.name}`;
    this.menuCtrl.close();
  }

  toggleFavorite() {
    this.isFavorited = !this.isFavorited;
  }

}
