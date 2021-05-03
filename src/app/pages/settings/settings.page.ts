import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

  public languages: any = { en: 'English', fr: 'Français' };

  private lang: any;

  constructor(
    public storage: Storage,
    public translate: TranslateService
  ) { }

  async ngOnInit() {
    this.lang = await this.translate.currentLang;
  }

  changeLanguage() {
    this.translate.setDefaultLang(this.lang);
    this.translate.use(this.lang);
    this.storage.set('lang', this.lang);
  }

}
