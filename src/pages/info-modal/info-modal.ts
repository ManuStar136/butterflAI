import { Component } from '@angular/core';
import { IonicPage, NavParams, ViewController } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-info-modal',
  templateUrl: 'info-modal.html',
})
export class InfoModalPage {

  title: String;

  constructor(private params: NavParams, private view: ViewController) {
    this.title = this.params.get('title');
  }

  ionViewWillLoad() {

    console.log(this.title);
  }

  closeModal() {
    this.view.dismiss();
  }

}
