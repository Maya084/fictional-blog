import { Component, Input, OnInit } from '@angular/core';
import { LocalStorageService } from 'src/app/local-storage.service';

@Component({
  selector: 'app-favorite-post',
  template: `
    <button (click)="likePost(postid)" mat-icon-button class="example-icon favorite-icon"
      aria-label="Example icon-button with heart icon">
      <mat-icon class="heart-icon" [style.color]="isLiked(postid) ? '#ff4081' : 'black'" >favorite</mat-icon>
    </button>
  `,
  
})
export class FavoritePostComponent implements OnInit {
  @Input() postid:any;

  constructor(
    private localStorageService: LocalStorageService
  ) { }

  ngOnInit() {
  }

  likePost(postid: number) {
    this.isLiked(postid) ?
      this.localStorageService.unfavoritePost(postid) :
      this.localStorageService.favoritePost(postid);
  }

  isLiked(postid: number) {
    return this.localStorageService.isFavorite(postid);
  }

}
