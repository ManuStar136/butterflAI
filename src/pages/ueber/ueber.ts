import { Component } from '@angular/core';
import { InfoProvider } from "../../providers/info/info";


@Component({
  selector: 'page-ueber',
  templateUrl: 'ueber.html',
})
export class UeberPage {


  constructor(private infoProvider: InfoProvider) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UeberPage');
  }

  info() {
    this.infoProvider.help('Auf dieser Seite befinden sich alle relevanten Informationen über das Projekt. Eine Interaktion ist an dieser Stelle nicht möglich.')
  }
}
