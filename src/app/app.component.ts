import {Component, ViewChild} from '@angular/core';
import {Nav, Platform, MenuController, LoadingController} from 'ionic-angular';
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import {HomePage} from '../pages/home/home';
import {ProfilPage} from "../pages/profil/profil";
import {UeberPage} from "../pages/ueber/ueber";
import {AngularFireAuth} from "angularfire2/auth";
import {Storage} from "@ionic/storage";
import {FindingModalProvider} from "../providers/finding-modal/finding-modal";
import {Connectivity} from "../providers/connectivity-service/connectivity-service";
import {InfoModalPage} from "../pages/info-modal/info-modal";


@Component({
  templateUrl: 'app.html'
})

export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: string = 'ProfilPage';

  pages: Array<{ title: string, component: any, icon: string }>;

  menu: any;

  constructor(public platform: Platform,
              public statusBar: StatusBar,
              public splashScreen: SplashScreen,
              private angularFireAuth: AngularFireAuth,
              private menuCtrl: MenuController,
              private storage: Storage,
              private findingModalProvider: FindingModalProvider,
              private connectivity: Connectivity,
              private loading: LoadingController) {

    this.initializeApp();

    //this.storage.clear(); // !!! Delete after Testing !!!

    // initially persist the species to the device so the user can use them offline
    this.storage.get('species').then(result => {
      if(!result && this.connectivity.isOnline()) {
       this.findingModalProvider.getSpecies();
      }
    });

    /*  if a user is logged in (SSO) he will be redirected to the HomePage
        else he is either directed to the login page or if its the first time he uses the app to the welcome page
     */
    this.angularFireAuth.auth.onAuthStateChanged(user => {
      let authenticateSpinner = this.loading.create({
        content: 'Authentifiziere...'
      });
      authenticateSpinner.present();
      if (user) {
        authenticateSpinner.dismiss();
        console.log("--> logged in: " + user.uid)
        this.nav.setRoot('HomePage');
        this.menuCtrl.enable(true, 'myMenu');
      } else {
        this.menuCtrl.enable(false, "myMenu");
        // if intro not already shown it will be set as rootPage
        this.storage.get('introShown').then(result => {
          authenticateSpinner.dismiss();
          if (result) {
            this.nav.setRoot('ProfilPage');
          } else {
            this.nav.setRoot('WelcomePage');
            this.storage.set('introShown', true);
          }
        });
      }
    });

    // used for an example of ngFor and navigation
    this.pages = [
      {title: 'Meine Meldungen', component: HomePage, icon: 'home'},
      {title: 'Profil', component: ProfilPage, icon: 'person'},
      {title: 'Über', component: UeberPage, icon: 'information-circle'},
      {title: 'Impressum', component: InfoModalPage, icon: 'paper'},
      {title: 'Datenschutz', component: InfoModalPage, icon: 'lock'},
      {title: 'Ausloggen', component: null, icon: 'log-out'},
    ];

  }


  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();

    });
  }

  openPage(page) {

    if(page.title === 'Impressum' || page.title === 'Datenschutz'){
      this.nav.push(page.component, {title: page.title});
    } else if(!page.component) {
      this.angularFireAuth.auth.signOut();
    } else {
      // Reset the content nav to have just this page
      // we wouldn't want the back button to show in this scenario
      this.nav.setRoot(page.component);
    }
  }

}
