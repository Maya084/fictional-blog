import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { LOCAL_STORAGE_KEY } from 'src/assets/constants';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  private favoritesSubs = new BehaviorSubject<number[]>([]);
  favorites$ = this.favoritesSubs.asObservable();

  constructor() {
    this.getLocalStorage()
  }

  saveToLocalStorage() {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(this.getFavoriteValue()));
    } catch (error) {
      console.error(`Unable to store favorite to localStorage ex: ${error}`);
    }
  }

  getLocalStorage() {
    try {
      let ls: string | null = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (!ls) {
        return;
      }
      this.favoritesSubs.next(JSON.parse(ls));
    } catch (error) {
      console.error(`Unable to get favorites from localStorage ex: ${error}`);
    }
    
  }

  getFavoriteValue(): number[] {
    return this.favoritesSubs.value;
  }

  favoritePost(postid: number) {
    this.favoritesSubs.next([...this.getFavoriteValue(), postid]);
    this.saveToLocalStorage();
  }

  unfavoritePost(postid: number) {

    let favorites = this.favoritesSubs.getValue();
    let index = favorites.indexOf(postid);
    favorites.splice(index, 1);
    this.favoritesSubs.next(favorites);
    this.saveToLocalStorage();
  }

  isFavorite(postid: number) {
    let favorites = this.favoritesSubs.getValue();
    if (favorites.includes(postid))
      return true;
    else
      return false;
  }

  clearLocalStorage()
  {
    localStorage.clear();
    location.reload();
  }
}
