import { Component } from '@angular/core';
import { Http } from '@angular/http';
import { NavController, ViewController, NavParams } from 'ionic-angular';

import { CourseHomeNavPage } from '../course-home-nav/course-home-nav';

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
  public courseHomeNavPage: any = CourseHomeNavPage;

  constructor(public navCtrl: NavController, public http: Http, public navParams: NavParams, public viewCtrl: ViewController) {

    this.dep = navParams.get('dep');
    http.get(`https://ocw.mit.edu${this.dep.href}/index.json`)
      .subscribe(data => {
        for (let d of data.json()) {
          this.courses[d.level].push(d);
        }
        this._courses = JSON.parse(JSON.stringify(this.courses));
      });

  }

  viewCourse(course) {
    this.navCtrl.push(this.courseHomeNavPage, { course });
  }

  searchCourses(e: any) {
    this.courses = JSON.parse(JSON.stringify(this._courses));

    let search = e.target.value;

    if (search && search.trim() != '') {
      search = search.toLowerCase();
      this.courses.Graduate = this.courses.Graduate.filter(course => {
        return (course.mcn.toLowerCase().indexOf(search) > -1 || course.title.toLowerCase().indexOf(search) > -1);
      });
      this.courses.Undergraduate = this.courses.Undergraduate.filter(course => {
        return (course.mcn.toLowerCase().indexOf(search) > -1 || course.title.toLowerCase().indexOf(search) > -1);
      });
    }

  }

}
