import { Component } from '@angular/core';
import $ from 'jqlite';
import { NavController, ViewController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-course-home',
  templateUrl: 'course-home.html'
})
export class CourseHomePage {

  public course: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController) {
    this.course = navParams.get('course');
  }

}
