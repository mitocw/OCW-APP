import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { FavoritesPage } from '../pages/favorites/favorites';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { DepartmentPage } from '../pages/department/department';
import { CourseHomePage } from '../pages/course-home/course-home';
import { CourseHomeNavPage } from '../pages/course-home-nav/course-home-nav';
import { LectureVideosPage } from '../pages/lecture-videos/lecture-videos';
import { LectureVideoSinglePage } from '../pages/lecture-video-single/lecture-video-single';
import { CourseHtmlPage } from '../pages/course-html-page/course-html-page';
import { Storage } from '@ionic/storage';

@NgModule({
  declarations: [
    MyApp,
    FavoritesPage,
    HomePage,
    DepartmentPage,
    TabsPage,
    CourseHomePage,
    CourseHomeNavPage,
    LectureVideosPage,
    LectureVideoSinglePage,
    CourseHtmlPage,
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    FavoritesPage,
    HomePage,
    TabsPage,
    DepartmentPage,
    CourseHomePage,
    CourseHomeNavPage,
    LectureVideosPage,
    LectureVideoSinglePage,
    CourseHtmlPage,
  ],
  providers: [
    Storage,
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ]
})
export class AppModule {}
