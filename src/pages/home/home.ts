import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {FindModalPage} from "../find-modal/find-modal";
import {ToastController} from "ionic-angular";
import {FindProvider, Item} from "../../providers/find/find";
import {LoadingController} from "ionic-angular";
import { Connectivity } from "../../providers/connectivity-service/connectivity-service";
import { InfoProvider } from "../../providers/info/info";

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  dbFinds: any[] = null;
  loading: any;
  hasEntries: any;

  constructor(public navCtrl: NavController,
              private navParams: NavParams,
              private toastCtrl: ToastController,
              private findProvider: FindProvider,
              private loadingCtrl: LoadingController,
              private connectivity: Connectivity,
              private infoProvider: InfoProvider) {

    if (this.navCtrl.getActive() && this.navCtrl.getActive().name == "RegisterPage" && this.navParams.get('eMail')) {
      this.toastCtrl.create({
        message: "Erfolgreich mit: " + this.navParams.get('eMail') + " registriert!",
        duration: 5000,
        position: 'bottom'
      }).present();
    }

    this.loading = this.loadingCtrl.create({
      content: 'Lade Meldungen vom Server...'
    });

    this.loading.present();

    if (this.connectivity.isOffline() && !this.hasEntries) {
      this.loading.dismiss();
      this.toastCtrl.create({
        message: 'Wir können deine Meldungen im Moment nicht abrufen, da Du offline bist.',
        duration: 3000,
        position: 'top'
      }).present();
    }
  }

  ionViewDidEnter() {

    this.hasEntries = false;

    this.findProvider.getItemsList().subscribe(res => {
      this.loading.dismiss();
      this.dbFinds = res;

      //sort the entries by date
      this.dbFinds = this.dbFinds.sort((a, b) => {
        if(a.date < b.date) return 1
          else if(a.date === b.date) return 0
           else return -1
      });

      if (res[0]) this.hasEntries = true;
    });
  }

  reportFind() {
    this.navCtrl.push(FindModalPage);
  }

  info() {
    this.infoProvider.help('Dies ist die Hauptseite der App. Hier siehst Du deine getätigten Fundmeldungen und kannst über einen Klick auf das "+" einen neuen Fund hinzufügen.');
  }

}
