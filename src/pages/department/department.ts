import { Component } from '@angular/core';
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

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController) {
    this.dep = navParams.get('dep');
    let courses = $(this.dep.raw.match(/\<table.*\/table>/)[0]).find('tr.odd,tr.even');
    for (let i: number = 0; i < courses.length; i++) {
      let a:any = $(courses[i]).find('a');
      let level = a[2].innerText.trim();
      let course = {
        num: a[0].innerText.trim(),
        name: a[1].innerText.trim(),
        href: $(a[0]).attr('href'),
      };
      this.courses[level].push(course);
    }

    this._courses = JSON.parse(JSON.stringify(this.courses));
  }

  viewCourse(course) {
    this.navCtrl.push(this.courseHomePage, { course });
  }

  searchCourses(e: any) {
    this.courses = JSON.parse(JSON.stringify(this._courses));

    let search = e.target.value;

    if (search && search.trim() != '') {
      this.courses.Graduate = this.courses.Graduate.filter(course => {
        return (course.num.toLowerCase().indexOf(search) > -1 || course.name.toLowerCase().indexOf(search) > -1);
      });
      this.courses.Undergraduate = this.courses.Undergraduate.filter(course => {
        return (course.num.toLowerCase().indexOf(search) > -1 || course.name.toLowerCase().indexOf(search) > -1);
      });
    }

  }

}
