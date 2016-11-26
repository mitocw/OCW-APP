import { Component } from '@angular/core';
import $ from 'jqlite';
import { NavController, ViewController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http';

@Component({
  selector: 'page-course-html',
  templateUrl: 'course-html-page.html'
})
export class CourseHtmlPage {

  public course: any;
  public title: string;
  public content: any = "";

  constructor(public navCtrl: NavController, private http: Http, public navParams: NavParams) {
    this.course = navParams.get('course');
    this.title = navParams.get('title');

    http.get(`https://ocw.mit.edu${this.course.href}/${navParams.get('href')}/`)
      .subscribe(course => {
        let innerContent = $(course.text()
          .replace(/(\s\s)|\n|\t/g,'')
          .replace(/src\=/g, 'mit-src=')
          .match(/\<body.*\/body\>/)[0]
          .replace(/href="\//g, 'href="https://ocw.mit.edu/'))
          .find('main#course_inner_section')[0];

        for (let invalid of innerContent.querySelectorAll('.help')) {
          invalid.parentNode.removeChild(invalid);
        }
        for (let a of innerContent.querySelectorAll('a')) {
          a.setAttribute('target', '_blank');
        }


        this.content = innerContent.innerHTML;
      });
  }

}
