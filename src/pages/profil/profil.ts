import {Component} from '@angular/core';
import {NavController, IonicPage, LoadingController} from 'ionic-angular';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {FindModalPage} from "../find-modal/find-modal";
import {AngularFireAuth} from "angularfire2/auth";
import {ToastController} from "ionic-angular";
import {ProfilDataProvider} from "../../providers/profil-data/profil-data";
import {InfoProvider} from "../../providers/info/info";
import {Storage} from "@ionic/storage";

@IonicPage()
@Component({
  selector: 'page-profil',
  templateUrl: 'profil.html',
})
export class ProfilPage {

  private credentialsForm: FormGroup;
  private regexEmail: string | RegExp = ".*@.*\\..*";
  private regexPassword: string | RegExp = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[#$^+=!*()@%&\\.,]).{8,16}$";
  user: any;
  profilData: {};
  changeData: boolean = true;
  mandatory: boolean = true;
  passwordForgot: boolean = false;

  constructor(private formBuilder: FormBuilder,
              public navCtrl: NavController,
              public angularFireAuth: AngularFireAuth,
              public toastCtrl: ToastController,
              private profilProvider: ProfilDataProvider,
              private infoProvider: InfoProvider,
              private storage: Storage,
              private loading: LoadingController) {


    this.credentialsForm = this.formBuilder.group({
      email: ['',
        Validators.compose([
          Validators.pattern(this.regexEmail),
          Validators.required
        ])],
      password: ['',
        Validators.compose([
          Validators.pattern(this.regexPassword),
          Validators.required
        ])]
    });
  }

  ionViewWillEnter() {

  }

  ionViewDidEnter() {
    this.angularFireAuth.auth.onAuthStateChanged((user) => {
      if (user) {
        console.log("--> profil logged in: " + user.uid);
        this.user = user;

        //persist the profile data after registration so he can display and change them offline
        this.storage.get('profilData').then(data => {
          let dataLoad = this.loading.create({
            content: 'Lade Daten...'
          });
          dataLoad.present();
          if (data) {
            console.log("profile data persist: " + JSON.stringify(data));
            this.profilData = data;
            this.changeData = false;
            dataLoad.dismiss();
          } else {
            this.profilProvider.getProfilData(user.uid).then(() => {
              this.storage.get('profilData').then(profilData => {
                this.profilData = profilData;
                this.changeData = false;
                dataLoad.dismiss();
              });
            });
          }
        });
      } else {
        console.log("--> not logged in");
      }
    });
  }

  onSignIn() {
    if (this.credentialsForm.valid) {
      this.angularFireAuth.auth.signInWithEmailAndPassword(this.credentialsForm.controls['email'].value, this.credentialsForm.controls['password'].value).then((user) => {
        //this.navCtrl.setRoot('HomePage', {eMail});
        this.user = user;
        console.log(user);
      }, reject => {
        console.log("REJECT:" + reject.message)
        this.toastCtrl.create({
          message: reject.message,
          duration: 5000,
          position: 'top'
        }).present();
      });
    }
  }

  onSignOut() {

    this.angularFireAuth.auth.signOut().then(() => {
      this.user = null
      this.navCtrl.setRoot('ProfilPage');
    });

  }

  modifyData() {
    this.changeData = !this.changeData;
  }

  saveData() {
    this.changeData = !this.changeData;
    this.profilProvider.updateProfilData(this.profilData);
  }

  onForgotPassword() {
    if (!this.credentialsForm.controls['email'].valid) {
      this.passwordForgot = true;
    } else {
      this.profilProvider.resetPassword(this.credentialsForm.controls['email'].value);
      this.passwordForgot = false;
    }
  }

  showImpressum(title: String) {
    this.navCtrl.push('InfoModalPage', title);
  }

  showGDPR(title: String) {
    this.navCtrl.push('InfoModalPage', title);
  }

  register() {
    this.navCtrl.push('RegisterPage');
  }

  reportFind() {
    this.navCtrl.push(FindModalPage);
  }

  info() {
    this.infoProvider.help('Auf dieser Seite befinden sich alle Informationen über dein Profil. Diese Informationen werden automatisch in deine Fundmeldungen übertragen. Über den Button "Ändern" kannst Du deine Daten überarbeiten. Abmelden kannst Du dich über den Button "Ausloggen"');
  }

}
