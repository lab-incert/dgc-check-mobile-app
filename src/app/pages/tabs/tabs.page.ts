import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { SettingsPage } from '../settings/settings.page';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {

  constructor(public modalController: ModalController) {}

  ngOnInit() {
    console.log('Tabs');
  }

  async presentSettings(error: string) {
    const modal = await this.modalController.create({
      component: SettingsPage
    });
    return await modal.present();
  }
}
