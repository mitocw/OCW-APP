import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class FavoriteService {

  private _sAddFav: Subject<any> = new Subject<any>();
  private _sRemFav: Subject<any> = new Subject<any>();
  private _sOpenFav: Subject<any> = new Subject<any>();

  get onAddFavorite(): Observable<any> {
    return this._sAddFav.asObservable();
  }
  get onRemoveFavorite(): Observable<any> {
    return this._sRemFav.asObservable();
  }
  get onOpenFavorite(): Observable<any> {
    return this._sOpenFav.asObservable();
  }

  addFavorite(fav): void {
    this._sAddFav.next(fav);
  }
  removeFavorite(fav): void {
    this._sRemFav.next(fav);
  }
  openFavorite(course): void {
    this._sOpenFav.next(course);
  }

}
