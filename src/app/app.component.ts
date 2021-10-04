import { Component } from '@angular/core';
import { LocalStorageService } from './local-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'blog';

  constructor(private localStorageService: LocalStorageService) {

  }
  clearLocalStorage() {
this.localStorageService.clearLocalStorage();
  }


}
