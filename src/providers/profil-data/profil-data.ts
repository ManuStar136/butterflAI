import {Injectable, ViewChild} from '@angular/core';
import {FormGroup} from "@angular/forms";
import {AngularFireAuth} from "angularfire2/auth";
import {AngularFireDatabase} from "angularfire2/database";
import {NavController, ToastController} from "ionic-angular";
import {Observable} from "rxjs/Rx";
import {Storage} from "@ionic/storage";
import {ProfilPage} from "../../pages/profil/profil";

@Injectable()
export class ProfilDataProvider {
  @ViewChild('content') navCtrl: NavController

  profilData: Observable<any>;

  constructor(private afAuth: AngularFireAuth,
              private db: AngularFireDatabase,
              public toastCtrl: ToastController,
              private storage: Storage) {
    console.log('Hello ProfilDataProvider Provider');
  }

  register(registerForm: FormGroup) {

    this.afAuth.auth.createUserWithEmailAndPassword(registerForm.controls['email'].value, registerForm.controls['password'].value).then(() => {

      this.db.object(`profile/${this.afAuth.auth.currentUser.uid}`).set({
        firstName: registerForm.controls['firstName'].value,
        lastName: registerForm.controls['lastName'].value,
        street: registerForm.controls['street'].value,
        zipcode: registerForm.controls['zipcode'].value,
        place: registerForm.controls['place'].value

      });
    }, reject => {
      this.toastCtrl.create({
        message: reject.message,
        duration: 5000,
        position: 'top'
      }).present();
    });

  }

  getProfilData(uid): Promise<any> {

    console.log("get profile data");

    return new Promise(resolve => {
      this.profilData = this.db.object(`profile/${uid}`).valueChanges()
      this.profilData.subscribe(data => {
        this.storage.set('profilData', data).then(() => {
          resolve(true);
        });
      });
    })
  }

  updateProfilData(profilData) {

    this.storage.set('profilData', this.profilData).then(() => {
      console.log("persisted Data")
      this.db.object(`profile/${this.afAuth.auth.currentUser.uid}`).set(profilData);
    });

  }

  resetPassword(email) {
    this.afAuth.auth.sendPasswordResetEmail(email).then((res) => {
      console.log("--> passwordforgot res: " + res);
      this.toastCtrl.create({
        message: `Wir haben dir an ${email} ein neues Passwort geschickt.`,
        duration: 5000,
        position: 'top'
      }).present();
    }).catch((e) => {
      console.error(e)
      this.toastCtrl.create({
        message: 'Wir konnten dein Passwort nicht zurücksetzen...',
        duration: 5000,
        position: 'top'
      }).present();
    });
  }

}
