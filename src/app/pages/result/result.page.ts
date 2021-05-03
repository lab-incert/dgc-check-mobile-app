import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { DGC } from '../../entity/dgc';

@Component({
  selector: 'app-result',
  templateUrl: './result.page.html',
  styleUrls: ['./result.page.scss'],
})
export class ResultPage implements OnInit {

  @Input() data: DGC;

  @Input() validSign: boolean;

  @Input() message: string;

  constructor(public modalController: ModalController) {}

  ngOnInit() {
  }

  closeModal() {
    console.log('dismiss');
    this.modalController.dismiss();
  }

}
