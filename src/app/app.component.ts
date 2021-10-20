import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(
    private translateService: TranslateService
  ) {
    this.initLng();
  }

  initLng() {
    this.translateService.setDefaultLang('en');

    const browserLang = this.translateService.getBrowserLang();
    const localStorageLang = localStorage.getItem('lang');

    // translateService.use(localStorageLang ?? browserLang.match(/en|mk/) ? browserLang : 'en');
    this.translateService.use('mk');
  }

  changeLanguage(language: string) {
    localStorage.setItem('lang', language);
    this.translateService.use(language);
  }

}
