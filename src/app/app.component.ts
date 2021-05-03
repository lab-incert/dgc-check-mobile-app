import { Component } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  public supportedLang = ['fr', 'en'];

  public defaultLang = 'en';

  constructor(
    private storage: Storage,
    private translate: TranslateService
  ) {
  }

  async ngOnInit() {
    // If using a custom driver:
    // await this.storage.defineDriver(MyCustomDriver)
    await this.storage.create();

    this.initializeLanguage();
  }

  async initializeLanguage() {
    this.translate.setDefaultLang(this.defaultLang);
    this.translate.use(this.defaultLang);
    return await this.storage.get('lang').then((lang) => {
      console.log('Storage lang:' + lang);
      if (this.supportedLang.includes(lang)) {
        this.translate.use(lang);
      } else {
        this.storage.set('lang', this.defaultLang);
        this.translate.use(this.defaultLang);
      }
    });
  }
}
