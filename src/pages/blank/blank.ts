// Convenient for copying to create a new page component

import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-blank',
  templateUrl: 'blank.html'
})
export class BlankPage {

  constructor(public navCtrl: NavController) {

  }

}
