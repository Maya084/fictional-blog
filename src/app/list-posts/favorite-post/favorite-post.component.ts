import { Component, Input } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslateService } from '@ngx-translate/core';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { SnackbarComponent } from 'src/app/snackbar/snackbar.component';

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
  @Input() postid: any;
  durationInSeconds = 1;

  constructor(
    private service: LocalStorageService,
    private snackBar: MatSnackBar,
    private translate: TranslateService,
  ) { }

  favoritePost(postid: number): void {
    let snackBarMessage!: string;
    if (this.isFavorited(postid)) {
      this.service.unfavoritePost(postid);
      snackBarMessage = this.translate.instant('Post removed from favorites')
    }
    else {
      this.service.favoritePost(postid);
      snackBarMessage = this.translate.instant('Post added to favorites');
    }

    this.snackBar.openFromComponent(SnackbarComponent, {
      data: snackBarMessage,
      duration: this.durationInSeconds * 1000,
    });

  }

  isFavorited(postid: number): boolean {
    return this.service.isFavorite(postid);
  }

}
