import { Component } from '@angular/core';

import { NavController, App } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { FavoriteService } from '../../services/favorites';

@Component({
  selector: 'page-favorites',
  templateUrl: 'favorites.html',
})
export class FavoritesPage {

  public favorites: any[] = [];

  constructor(public navCtrl: NavController, public storage: Storage, public favService: FavoriteService, public app: App) {
    this.storage.forEach((v, k) => {
      // If either v or k is falsey, skip
      if (!!!v || !!!k) return;

      let slugs = k.split('.');
      if (slugs.shift() != 'favorites') return;

      this.favorites.push(JSON.parse(v));
    });

    // Add a favorite
    favService.onAddFavorite.subscribe(newFav => {
      this.favorites.push(JSON.parse(newFav));
    });

    // Remove a favorite
    favService.onRemoveFavorite.subscribe(favKey => {
      this.favorites = this.favorites.filter(fav => {
        return fav.favKey != favKey;
      });
    });

  }
  viewCourse(course) {
    this.favService.openFavorite(course)
  }
}
