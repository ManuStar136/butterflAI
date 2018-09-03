import {Injectable} from '@angular/core';
import {Camera, CameraOptions} from "@ionic-native/camera";
import {AngularFireDatabase} from "angularfire2/database";
import {Observable} from "rxjs-compat/Observable";
import {Storage} from "@ionic/storage";
import { HttpClient, HttpHeaders } from '@angular/common/http';


/*
Generated class for the FindingModalProvider provider.

See https://angular.io/guide/dependency-injection for more info on providers
and Angular DI.
*/
@Injectable()
export class FindingModalProvider {

  butterflies: Observable<any>;
  serverurl = 'https://2382d9ef-c3cb-49ad-9b3f-df746e1b067e-bluemix.cloudant.com/butterflai';
  usr : String = '2382d9ef-c3cb-49ad-9b3f-df746e1b067e-bluemix';
  pw: String = '9764a86d78fa6fac42479b741c6cdccc07b76a85a21651b9a07165cfa5ad5f8e';

  constructor(private camera: Camera,
    private db: AngularFireDatabase,
    private storage: Storage,
    public http: HttpClient,
  ) {
  }


  // Provide Photo-Function for find-modal.ts
  takePhoto(sourceType: number) {

    //defining Camera Options
    const options: CameraOptions = {
      quality: 50,
      targetHeight: 576,
      targetWidth: 720,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true,
      sourceType: sourceType,
    }

    return new Promise(resolve => {
      this.camera.getPicture(options).then((imageData) => {
        resolve('data:image/jpeg;base64,' + imageData);
      }, (err) => {
        console.error(err);
      });
    });
  }

  // persists the species on the device if the user is connected to the internet so he can report finds when offline
  getSpecies(): Observable<any> {
    this.butterflies = this.db.list(`species/`).valueChanges();
    this.butterflies.subscribe(species => {
      this.storage.set('species', species);
    });
    return this.butterflies;
  }

  // ButterflAI:  Sends request to our model
  sendEval(data: any): Observable<any> {
    var headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': "Basic MjM4MmQ5ZWYtYzNjYi00OWFkLTliM2YtZGY3NDZlMWIwNjdlLWJsdWVtaXg6OTc2NGE4NmQ3OGZhNmZhYzQyNDc5Yjc0MWM2Y2RjY2MwN2I3NmE4NWEyMTY1MWI5YTA3MTY1Y2ZhNWFkNWY4ZQ=="
    });
    console.log(headers);
    return this.http.post(this.serverurl, data, {headers});
  }

}
