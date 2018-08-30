import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import {Observable} from "rxjs-compat/Observable";
import {Storage} from "@ionic/storage";


@Injectable()
export class FindProvider {

  items: Observable<any[]>;
  userId: string;

  constructor(private db: AngularFireDatabase, private afAuth: AngularFireAuth, private storage: Storage) {
    this.afAuth.authState.subscribe(user => {
      if(user) this.userId = user.uid
      console.log("---> find userID:" + this.userId);
    });
  }

  // Return an observable list with optional query
  // You will usually call this from OnInit in a component
  getItemsList(): Observable<any[]> {
    this.items = this.db.list(`items/${this.userId}`).valueChanges();
    return this.items
  }

  /*
  then event ignored, because angularfire2 will constantly push events if for example offline
  Needed because else the form would not close if offline and user would report a find
  Find will be displayed locally and as soon as connection is reestablished uploaded
  */

  createItem(item: Item)  {
    return new Promise(resolve => {
      this.db.list(`/items/${this.userId}`).push(item);
      resolve(true);
    });

  }

}

export class Item {
  speciesPicture: string;
  species: string;
  location: string;
  location_comment: string;
  location_address: string;
  quantity: number;
  stadium: string;
  date: string;
  comment: string;
}

