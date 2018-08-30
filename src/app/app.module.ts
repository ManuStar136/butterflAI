import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import {IonicApp, IonicErrorHandler, IonicModule} from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ProfilPage } from '../pages/profil/profil';
import { UeberPage } from '../pages/ueber/ueber';
import { LocationSelect } from '../pages/location-select/location-select';
import {FindModalPage} from "../pages/find-modal/find-modal";

import { HttpClientModule } from "@angular/common/http";
import { HTTP } from '@ionic-native/http';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { FindingModalProvider } from '../providers/finding-modal/finding-modal';
import { Camera } from '@ionic-native/camera';

import { SelectSearchableModule } from "ionic-select-searchable";
import { Geolocation } from "@ionic-native/geolocation";
import { NativeGeocoder } from "@ionic-native/native-geocoder";
import { Network } from '@ionic-native/network';
import { Connectivity } from '../providers/connectivity-service/connectivity-service';
import { GoogleMaps } from '../providers/google-maps/google-maps';

import { IonicImageViewerModule } from "ionic-img-viewer";
import { IonicStorageModule } from "@ionic/storage";

import { AngularFireModule } from "angularfire2";
import { AngularFireAuth } from "angularfire2/auth";
import { AngularFireAuthModule } from "angularfire2/auth"
import { AngularFireDatabaseModule } from "angularfire2/database";
import { FIREBASE_CONFIG } from "./app.firebase.config";
import { FindProvider } from '../providers/find/find';
import {HomePageModule} from "../pages/home/home.module";
import {ProfilPageModule} from "../pages/profil/profil.module";
import { ProfilDataProvider } from '../providers/profil-data/profil-data';
import { InfoProvider } from '../providers/info/info';
import {InfoModalPage} from "../pages/info-modal/info-modal";


@NgModule({
  declarations: [
    MyApp,
    UeberPage,
    LocationSelect,
    FindModalPage,
    InfoModalPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp, {scrollAssist: false, autoFocusAssist: false}),
    AngularFireModule.initializeApp(FIREBASE_CONFIG),
    AngularFireAuthModule,
    AngularFireDatabaseModule,

    // addtionial imported in 'find-modal.module.ts' because of lazy-loading
    SelectSearchableModule,
    HomePageModule,
    ProfilPageModule,
    IonicImageViewerModule,
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ProfilPage,
    UeberPage,
    LocationSelect,
    FindModalPage,
    InfoModalPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    FindingModalProvider,
    Camera,
    Geolocation,
    NativeGeocoder,
    Connectivity,
    GoogleMaps,
    Network,
    AngularFireAuth,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    FindProvider,
    ProfilDataProvider,
    InfoProvider,
    HTTP,
    HttpClientModule,
  ]
})
export class AppModule {}
