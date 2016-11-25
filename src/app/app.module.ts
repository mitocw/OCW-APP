import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { AboutPage } from '../pages/about/about';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { DepartmentPage } from '../pages/department/department';
import { CourseHomePage } from '../pages/course-home/course-home';

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    HomePage,
    DepartmentPage,
    TabsPage,
    CourseHomePage,
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    HomePage,
    TabsPage,
    DepartmentPage,
    CourseHomePage,
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}]
})
export class AppModule {}
