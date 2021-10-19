import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private translateService: TranslateService) {
    translateService.setDefaultLang('en');

    const browserLang = localStorage.getItem('lang') || 'en';

    translateService.use(browserLang.match(/en|mk/) ? browserLang : 'en');
  }

  changeLanguage(language: string) {
    localStorage.setItem('lang', language);
    this.translateService.use(language);
  }

}
