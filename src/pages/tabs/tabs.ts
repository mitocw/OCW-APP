import { Component, ViewChild } from '@angular/core';

import { HomePage } from '../home/home';
import { FavoritesPage } from '../favorites/favorites';
import { FavoriteService } from '../../services/favorites';

import { NavController } from 'ionic-angular';
import { CourseHomeNavPage } from '../course-home-nav/course-home-nav';

import { Tabs } from 'ionic-angular';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  @ViewChild("rootTabs") tabs: Tabs;

  // this tells the tabs component which Pages
  // should be each tab's root Page
  HomePage: any = HomePage;
  FavoritesPage: any = FavoritesPage;
  homeParams: any;

  constructor(private favService: FavoriteService, private navCtrl: NavController) {
    // Add a favorite
    favService.onOpenFavorite.subscribe(course => {
      this.tabs.select(0);
      this.tabs.getActiveChildNav().popToRoot().then(nav => {
        this.tabs.getActiveChildNav().push(CourseHomeNavPage, { course });
      })
    });
  }
}
