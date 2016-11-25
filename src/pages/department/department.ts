import { Component } from '@angular/core';
import { Http } from '@angular/http';
import $ from 'jqlite';
import { NavController, ViewController, NavParams } from 'ionic-angular';

import { CourseHomePage } from '../course-home/course-home';

@Component({
  selector: 'page-department',
  templateUrl: 'department.html'
})
export class DepartmentPage {

  public dep: any;
  public courses: any = {
    'Graduate': [],
    'Undergraduate': []
  };
  public _courses: any;
  public courseHomePage: any = CourseHomePage;

  constructor(public navCtrl: NavController, public http: Http, public navParams: NavParams, public viewCtrl: ViewController) {

    this.dep = navParams.get('dep');
    http.get(`https://ocw.mit.edu${this.dep.href}/index.json`)
      .subscribe(data => {
        for (let d of data.json()) {
          this.courses[d.level].push(d);
        }
        this._courses = JSON.parse(JSON.stringify(this.courses));
        console.log(this.courses);
      });

  }

  viewCourse(course) {
    this.navCtrl.push(this.courseHomePage, { course });
  }

  searchCourses(e: any) {
    this.courses = JSON.parse(JSON.stringify(this._courses));

    let search = e.target.value;

    if (search && search.trim() != '') {
      search = search.toLowerCase();
      this.courses.Graduate = this.courses.Graduate.filter(course => {
        return (course.num.toLowerCase().indexOf(search) > -1 || course.name.toLowerCase().indexOf(search) > -1);
      });
      this.courses.Undergraduate = this.courses.Undergraduate.filter(course => {
        return (course.num.toLowerCase().indexOf(search) > -1 || course.name.toLowerCase().indexOf(search) > -1);
      });
    }

  }

}
