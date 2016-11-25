import { Component } from '@angular/core';
import $ from 'jqlite';
import { NavController, ViewController, NavParams } from 'ionic-angular';

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

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController) {
    this.dep = navParams.get('dep');
    let courses = $(this.dep.raw.match(/\<table.*\/table>/)[0]).find('tr.odd,tr.even');
    for (let i: number = 0; i < courses.length; i++) {
      let a:any = $(courses[i]).find('a');
      let level = a[2].innerText.trim();
      let course = {
        num: a[0].innerText.trim(),
        name: a[1].innerText.trim()
      };
      this.courses[level].push(course);
    }
  }

}
