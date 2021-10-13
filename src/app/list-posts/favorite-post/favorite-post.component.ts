import { Component, Input } from '@angular/core';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-favorite-post',
  template: `
    <button (click)="favoritePost(postid)" mat-icon-button class="example-icon favorite-icon"
      aria-label="Example icon-button with heart icon">
      <mat-icon class="heart-icon" [style.color]="isFavorited(postid) ? '#ff4081' : 'black'" >favorite</mat-icon>
    </button>
  `,
  
})
export class FavoritePostComponent {
  @Input() postid:any;

  constructor(
    private service: LocalStorageService
  ) { }

  favoritePost(postid: number): void {
    this.isFavorited(postid) ?
      this.service.unfavoritePost(postid) :
      this.service.favoritePost(postid);
  }

  isFavorited(postid: number): boolean {
    return this.service.isFavorite(postid);
  }

}
