import { Component } from '@angular/core';

import { HomePage } from '../home/home';
import { FavoritesPage } from '../favorites/favorites';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  // this tells the tabs component which Pages
  // should be each tab's root Page
  HomePage: any = HomePage;
  FavoritesPage: any = FavoritesPage;

  constructor() {

  }
}
