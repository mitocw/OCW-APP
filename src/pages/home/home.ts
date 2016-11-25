import { Component } from '@angular/core';
import { Http } from '@angular/http';
import { DomSanitizer, SafeResourceUrl, SafeUrl} from '@angular/platform-browser';

import $ from 'jqlite';

import { NavController } from 'ionic-angular';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable'

import { DepartmentPage } from '../department/department';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  departmentsHome: Observable<any>;
  departmentImage: Object = {};
  departmentRaw: Object = {};

  departmentPage: any = DepartmentPage;

  constructor(public navCtrl: NavController, private http: Http, private sanitizer: DomSanitizer) {
    this.departmentsHome = http.get('https://ocw.mit.edu/courses/find-by-department/')
      .map(data => $(data.text().replace(/src\=/g, 'mit-src='))
        .find('.deptList')
        .find('a')
        .map(a => {
          let dp = {
            name: $(a).text(),
            href: $(a).attr('href')
          };
          http.get(`https://ocw.mit.edu${dp.href}/`)
          .subscribe(data => {
            this.departmentRaw[dp.href] = data.text()
              .replace(/(\s\s)|\n|\t/g,'') // jqlite has parsing issues without this
              .replace(/src\=/g, 'mit-src='); // jqlite will attempt to load images when parsing the html
            this.departmentImage[dp.href] = sanitizer.bypassSecurityTrustStyle(`url('https://ocw.mit.edu${$(this.departmentRaw[dp.href].match(/\<main.*\/main>/)[0]).find('img').first().attr('mit-src')}')`);
          });
          return dp;
        }));

    console.log(this.departmentImage);
  }

  viewDepartment(dep) {
    dep.raw = this.departmentRaw[dep.href];
    this.navCtrl.push(this.departmentPage, {
      dep: Object.assign({}, dep)
    });
    delete dep.raw;
  }

}
