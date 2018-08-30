import { Injectable } from '@angular/core';
import {AlertController} from "ionic-angular";

/*
  Generated class for the InfoProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class InfoProvider {

  constructor(public alertCtrl: AlertController) {

  }

  help(message: string) {
    const alert = this.alertCtrl.create({
      title: 'Informationen zu dieser Seite',
      subTitle: message,
      buttons: ['Verstanden']
    });
    alert.present();
  }

}
