import { Component } from '@angular/core';
import $ from 'jqlite';
import { NavController, ViewController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http';

@Component({
  selector: 'page-course-home',
  templateUrl: 'course-home.html'
})
export class CourseHomePage {

  public course: any;
  public sidebar: any = [];

  constructor(public navCtrl: NavController, private http: Http, public navParams: NavParams, public viewCtrl: ViewController) {
    this.course = navParams.get('course');

    http.get(`https://ocw.mit.edu${this.course.href}/`)
      .subscribe(course => {
        $(course.text().replace(/(\s\s)|\n|\t/g,'').match(/\<body.*\/body\>/)[0])
          .find('nav#course_nav > ul > li')
          .map(li => {
            let first = $(li.firstChild);
            if (first[0].localName == 'a') {
              this.sidebar.push({
                name: first[0].innerText.trim(),
                href: first.attr('href')
              });
            }
          });
      });
  }

}
