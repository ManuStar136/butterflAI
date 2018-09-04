webpackJsonp([4],{

/***/ 133:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FindingModalProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ionic_native_camera__ = __webpack_require__(243);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_angularfire2_database__ = __webpack_require__(86);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_storage__ = __webpack_require__(48);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_common_http__ = __webpack_require__(253);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





/*
Generated class for the FindingModalProvider provider.

See https://angular.io/guide/dependency-injection for more info on providers
and Angular DI.
*/
var FindingModalProvider = /** @class */ (function () {
    function FindingModalProvider(camera, db, storage, http) {
        this.camera = camera;
        this.db = db;
        this.storage = storage;
        this.http = http;
        this.serverurl = 'https://2382d9ef-c3cb-49ad-9b3f-df746e1b067e-bluemix.cloudant.com/butterflai';
        this.usr = '2382d9ef-c3cb-49ad-9b3f-df746e1b067e-bluemix';
        this.pw = '9764a86d78fa6fac42479b741c6cdccc07b76a85a21651b9a07165cfa5ad5f8e';
    }
    // Provide Photo-Function for find-modal.ts
    FindingModalProvider.prototype.takePhoto = function (sourceType) {
        var _this = this;
        //defining Camera Options
        var options = {
            quality: 50,
            targetHeight: 576,
            targetWidth: 720,
            destinationType: this.camera.DestinationType.DATA_URL,
            encodingType: this.camera.EncodingType.JPEG,
            mediaType: this.camera.MediaType.PICTURE,
            correctOrientation: true,
            sourceType: sourceType,
        };
        return new Promise(function (resolve) {
            _this.camera.getPicture(options).then(function (imageData) {
                resolve('data:image/jpeg;base64,' + imageData);
            }, function (err) {
                console.error(err);
            });
        });
    };
    // persists the species on the device if the user is connected to the internet so he can report finds when offline
    FindingModalProvider.prototype.getSpecies = function () {
        var _this = this;
        this.butterflies = this.db.list("species/").valueChanges();
        this.butterflies.subscribe(function (species) {
            _this.storage.set('species', species);
        });
        return this.butterflies;
    };
    // ButterflAI:  Sends request to our model
    FindingModalProvider.prototype.sendEval = function (data) {
        var headers = new __WEBPACK_IMPORTED_MODULE_4__angular_common_http__["c" /* HttpHeaders */]({
            'Content-Type': 'application/json',
            'Authorization': "Basic MjM4MmQ5ZWYtYzNjYi00OWFkLTliM2YtZGY3NDZlMWIwNjdlLWJsdWVtaXg6OTc2NGE4NmQ3OGZhNmZhYzQyNDc5Yjc0MWM2Y2RjY2MwN2I3NmE4NWEyMTY1MWI5YTA3MTY1Y2ZhNWFkNWY4ZQ=="
        });
        console.log(headers);
        return this.http.post(this.serverurl, data, { headers: headers });
    };
    FindingModalProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__ionic_native_camera__["a" /* Camera */],
            __WEBPACK_IMPORTED_MODULE_2_angularfire2_database__["a" /* AngularFireDatabase */],
            __WEBPACK_IMPORTED_MODULE_3__ionic_storage__["b" /* Storage */],
            __WEBPACK_IMPORTED_MODULE_4__angular_common_http__["a" /* HttpClient */]])
    ], FindingModalProvider);
    return FindingModalProvider;
}());

//# sourceMappingURL=finding-modal.js.map

/***/ }),

/***/ 139:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return GoogleMaps; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ionic_native_geolocation__ = __webpack_require__(138);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__connectivity_service_connectivity_service__ = __webpack_require__(72);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var GoogleMaps = /** @class */ (function () {
    function GoogleMaps(connectivityService, geolocation) {
        this.connectivityService = connectivityService;
        this.geolocation = geolocation;
        this.mapInitialised = false;
        this.markers = [];
        this.apiKey = "AIzaSyCb7jm8ebxxv5VT2JsuYLGO4N6ga2g_2_g";
        this.location = {};
    }
    GoogleMaps.prototype.gettOfflineLocation = function () {
        var _this = this;
        return new Promise(function (resolve) {
            _this.geolocation.getCurrentPosition().then(function (position) {
                _this.location.lat = position.coords.latitude;
                _this.location.lng = position.coords.longitude;
                resolve(_this.location);
            });
        });
    };
    GoogleMaps.prototype.init = function (mapElement, pleaseConnect) {
        this.mapElement = mapElement;
        this.pleaseConnect = pleaseConnect;
        return this.loadGoogleMaps();
    };
    GoogleMaps.prototype.loadGoogleMaps = function () {
        var _this = this;
        return new Promise(function (resolve) {
            if (typeof google == "undefined" || typeof google.maps == "undefined") {
                console.log("Google maps JavaScript needs to be loaded.");
                _this.disableMap();
                if (_this.connectivityService.isOnline()) {
                    window['mapInit'] = function () {
                        _this.initMap().then(function () {
                            resolve(true);
                        });
                        _this.enableMap();
                    };
                    var script = document.createElement("script");
                    script.id = "googleMaps";
                    if (_this.apiKey) {
                        script.src = 'http://maps.google.com/maps/api/js?key=' + _this.apiKey + '&callback=mapInit&libraries=places';
                    }
                    else {
                        script.src = 'http://maps.google.com/maps/api/js?callback=mapInit';
                    }
                    document.body.appendChild(script);
                }
            }
            else {
                if (_this.connectivityService.isOnline()) {
                    _this.initMap();
                    _this.enableMap();
                }
                else {
                    _this.disableMap();
                }
                resolve(true);
            }
            _this.addConnectivityListeners();
        });
    };
    GoogleMaps.prototype.initMap = function () {
        var _this = this;
        this.mapInitialised = true;
        return new Promise(function (resolve) {
            _this.geolocation.getCurrentPosition().then(function (position) {
                var latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
                var mapOptions = {
                    center: latLng,
                    zoom: 15,
                    mapTypeId: google.maps.MapTypeId.ROADMAP
                };
                var location = {
                    lat: 0,
                    lng: 0,
                    address: ''
                };
                _this.map = new google.maps.Map(_this.mapElement, mapOptions);
                resolve(true);
                google.maps.event.addListenerOnce(_this.map, 'idle', function () {
                    _this.addMarker({ lat: latLng.lat(), lng: latLng.lng() }, null);
                    location.lat = latLng.lat();
                    location.lng = latLng.lng();
                    _this.getAddress(latLng).then(function (resolvedAddress) {
                        location.address = resolvedAddress.toString();
                        _this.location = location;
                        console.log("--> init loc: " + JSON.stringify(_this.location));
                    });
                });
                google.maps.event.addListener(_this.map, 'click', function (userTap) {
                    console.log("---> map clicked");
                    _this.getAddress(userTap.latLng).then(function (resolvedAddress) {
                        _this.addMarker({ lat: userTap.latLng.lat(), lng: userTap.latLng.lng() }, resolvedAddress);
                        _this.location.lat = userTap.latLng.lat();
                        _this.location.lng = userTap.latLng.lng();
                        _this.location.address = resolvedAddress;
                        console.log("--> location: " + JSON.stringify(_this.location));
                    });
                });
            });
        });
    };
    GoogleMaps.prototype.addMarker = function (location, selectedAddress) {
        var _this = this;
        console.log(this.markers);
        for (var c = 0; c < this.markers.length; c++) {
            this.markers[c].setMap(null);
        }
        var infoWindow = new google.maps.InfoWindow;
        var marker = new google.maps.Marker({
            map: this.map,
            title: "selected Location",
            icon: {
                url: "assets/imgs/schmetterling.svg",
                scaledSize: new google.maps.Size(32, 32),
                anchor: new google.maps.Point(0, 32)
            },
            animation: "DROP",
            position: {
                lat: location.lat,
                lng: location.lng,
            },
            draggable: true
        });
        infoWindow.setContent("Hier bist Du gerade!");
        infoWindow.open(this.map, marker);
        // If the user searches for an address this is used for the infoWindow
        if (selectedAddress != null) {
            infoWindow.setContent(selectedAddress.toString());
            infoWindow.open(this.map, marker);
        }
        // If the user drags the pin to a new position, this is used for the location as well as the resolved address for the infoWindow
        google.maps.event.addListener(marker, 'dragend', function () {
            console.log("dragged, new position: " + marker.getPosition());
            location.lat = marker.getPosition().lat();
            location.lng = marker.getPosition().lng();
            // async call to get the formatted address of the new location
            _this.getAddress(location).then(function (resolvedAddress) {
                location.address = resolvedAddress;
                infoWindow.setContent(resolvedAddress);
                infoWindow.open(_this.map, marker);
                _this.location = location;
                console.log("--> markerlocation: " + JSON.stringify(_this.location));
            });
        });
        this.markers.push(marker);
    };
    GoogleMaps.prototype.getAddress = function (location) {
        return new Promise(function (resolve) {
            var geoCoder = new google.maps.Geocoder;
            geoCoder.geocode({ location: location }, function (results, status) {
                if (status === 'OK') {
                    if (results[1]) {
                        resolve(results[1].formatted_address);
                    }
                    else {
                        window.alert("no results found");
                    }
                }
                else {
                    window.alert("Geocoder failed due to: " + status);
                }
            });
        });
    };
    GoogleMaps.prototype.disableMap = function () {
        if (this.pleaseConnect) {
            this.pleaseConnect.style.display = "block";
        }
    };
    GoogleMaps.prototype.enableMap = function () {
        if (this.pleaseConnect) {
            this.pleaseConnect.style.display = "none";
        }
    };
    GoogleMaps.prototype.addConnectivityListeners = function () {
        var _this = this;
        this.connectivityService.watchOnline().subscribe(function () {
            setTimeout(function () {
                if (typeof google == "undefined" || typeof google.maps == "undefined") {
                    _this.loadGoogleMaps();
                }
                else {
                    if (!_this.mapInitialised) {
                        _this.initMap();
                    }
                    _this.enableMap();
                }
            }, 2000);
        });
        this.connectivityService.watchOffline().subscribe(function () {
            _this.disableMap();
        });
    };
    GoogleMaps = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__connectivity_service_connectivity_service__["a" /* Connectivity */],
            __WEBPACK_IMPORTED_MODULE_1__ionic_native_geolocation__["a" /* Geolocation */]])
    ], GoogleMaps);
    return GoogleMaps;
}());

//# sourceMappingURL=google-maps.js.map

/***/ }),

/***/ 140:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FindProvider; });
/* unused harmony export Item */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_angularfire2_database__ = __webpack_require__(86);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_angularfire2_auth__ = __webpack_require__(54);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_storage__ = __webpack_require__(48);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var FindProvider = /** @class */ (function () {
    function FindProvider(db, afAuth, storage) {
        var _this = this;
        this.db = db;
        this.afAuth = afAuth;
        this.storage = storage;
        this.afAuth.authState.subscribe(function (user) {
            if (user)
                _this.userId = user.uid;
            console.log("---> find userID:" + _this.userId);
        });
    }
    // Return an observable list with optional query
    // You will usually call this from OnInit in a component
    FindProvider.prototype.getItemsList = function () {
        this.items = this.db.list("items/" + this.userId).valueChanges();
        return this.items;
    };
    /*
    then event ignored, because angularfire2 will constantly push events if for example offline
    Needed because else the form would not close if offline and user would report a find
    Find will be displayed locally and as soon as connection is reestablished uploaded
    */
    FindProvider.prototype.createItem = function (item) {
        var _this = this;
        return new Promise(function (resolve) {
            _this.db.list("/items/" + _this.userId).push(item);
            resolve(true);
        });
    };
    FindProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_angularfire2_database__["a" /* AngularFireDatabase */], __WEBPACK_IMPORTED_MODULE_2_angularfire2_auth__["a" /* AngularFireAuth */], __WEBPACK_IMPORTED_MODULE_3__ionic_storage__["b" /* Storage */]])
    ], FindProvider);
    return FindProvider;
}());

var Item = /** @class */ (function () {
    function Item() {
    }
    return Item;
}());

//# sourceMappingURL=find.js.map

/***/ }),

/***/ 143:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__find_modal_find_modal__ = __webpack_require__(92);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_find_find__ = __webpack_require__(140);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_connectivity_service_connectivity_service__ = __webpack_require__(72);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_info_info__ = __webpack_require__(87);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








var HomePage = /** @class */ (function () {
    function HomePage(navCtrl, navParams, toastCtrl, findProvider, loadingCtrl, connectivity, infoProvider) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.toastCtrl = toastCtrl;
        this.findProvider = findProvider;
        this.loadingCtrl = loadingCtrl;
        this.connectivity = connectivity;
        this.infoProvider = infoProvider;
        this.dbFinds = null;
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
    HomePage.prototype.ionViewDidEnter = function () {
        var _this = this;
        this.hasEntries = false;
        this.findProvider.getItemsList().subscribe(function (res) {
            _this.loading.dismiss();
            _this.dbFinds = res;
            //sort the entries by date
            _this.dbFinds = _this.dbFinds.sort(function (a, b) {
                if (a.date < b.date)
                    return 1;
                else if (a.date === b.date)
                    return 0;
                else
                    return -1;
            });
            if (res[0])
                _this.hasEntries = true;
        });
    };
    HomePage.prototype.reportFind = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__find_modal_find_modal__["a" /* FindModalPage */]);
    };
    HomePage.prototype.info = function () {
        this.infoProvider.help('Dies ist die Hauptseite der App. Hier siehst Du deine getätigten Fundmeldungen und kannst über einen Klick auf das "+" einen neuen Fund hinzufügen.');
    };
    HomePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-home',template:/*ion-inline-start:"/Users/manuel/Documents/GitHub/butterflAI/src/pages/home/home.html"*/'<ion-header>\n\n  <ion-navbar hideBackButton="true">\n    <button ion-button menuToggle>\n      <ion-icon name="menu" color="primary"></ion-icon>\n    </button>\n    <ion-buttons right>\n      <button ion-button (click)="info()">\n        <ion-icon name="help-circle" color="primary" style="zoom:1.5;"></ion-icon>\n      </button>\n    </ion-buttons>\n    <ion-title>Meine Meldungen</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n<ion-content>\n\n  <div *ngIf="!hasEntries; else Entries">\n\n    <h2 padding>Leider hast Du noch keine Meldungen angelegt</h2>\n\n  </div>\n\n  <ng-template #Entries>\n    <h2 padding>Hier sind deine Meldungen</h2>\n    <ion-list>\n      <ion-card class="text" *ngFor="let find of dbFinds">\n        <div *ngIf="find.speciesPicture" id="preview">\n          <img src="{{find.speciesPicture[0]}}">\n        </div>\n        <div id="facts">\n          <h2>{{ find.species }}</h2>\n          <p>{{ find.location_address }}</p>\n          <p>{{ find.date }}</p>\n        </div>\n      </ion-card>\n    </ion-list>\n  </ng-template>\n\n  <ion-fab center bottom [ngClass]="{\'fabFinds\': hasEntries, \'fabNoFinds\': !hasEntries}">\n    <button ion-fab (click)="reportFind()" color="primary">\n      <ion-icon name="add"></ion-icon>\n    </button>\n  </ion-fab>\n</ion-content>\n'/*ion-inline-end:"/Users/manuel/Documents/GitHub/butterflAI/src/pages/home/home.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavController"],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavParams"],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["ToastController"],
            __WEBPACK_IMPORTED_MODULE_3__providers_find_find__["a" /* FindProvider */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["LoadingController"],
            __WEBPACK_IMPORTED_MODULE_4__providers_connectivity_service_connectivity_service__["a" /* Connectivity */],
            __WEBPACK_IMPORTED_MODULE_5__providers_info_info__["a" /* InfoProvider */]])
    ], HomePage);
    return HomePage;
}());

//# sourceMappingURL=home.js.map

/***/ }),

/***/ 144:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ProfilPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__find_modal_find_modal__ = __webpack_require__(92);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_angularfire2_auth__ = __webpack_require__(54);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_profil_data_profil_data__ = __webpack_require__(167);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__providers_info_info__ = __webpack_require__(87);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ionic_storage__ = __webpack_require__(48);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};









var ProfilPage = /** @class */ (function () {
    function ProfilPage(formBuilder, navCtrl, angularFireAuth, toastCtrl, profilProvider, infoProvider, storage, loading) {
        this.formBuilder = formBuilder;
        this.navCtrl = navCtrl;
        this.angularFireAuth = angularFireAuth;
        this.toastCtrl = toastCtrl;
        this.profilProvider = profilProvider;
        this.infoProvider = infoProvider;
        this.storage = storage;
        this.loading = loading;
        this.regexEmail = ".*@.*\\..*";
        this.regexPassword = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[#$^+=!*()@%&\\.,]).{8,16}$";
        this.changeData = true;
        this.mandatory = true;
        this.passwordForgot = false;
        this.credentialsForm = this.formBuilder.group({
            email: ['',
                __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].compose([
                    __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].pattern(this.regexEmail),
                    __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].required
                ])],
            password: ['',
                __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].compose([
                    __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].pattern(this.regexPassword),
                    __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].required
                ])]
        });
    }
    ProfilPage.prototype.ionViewWillEnter = function () {
    };
    ProfilPage.prototype.ionViewDidEnter = function () {
        var _this = this;
        this.angularFireAuth.auth.onAuthStateChanged(function (user) {
            if (user) {
                console.log("--> profil logged in: " + user.uid);
                _this.user = user;
                //persist the profile data after registration so he can display and change them offline
                _this.storage.get('profilData').then(function (data) {
                    var dataLoad = _this.loading.create({
                        content: 'Lade Daten...'
                    });
                    dataLoad.present();
                    if (data) {
                        console.log("profile data persist: " + JSON.stringify(data));
                        _this.profilData = data;
                        _this.changeData = false;
                        dataLoad.dismiss();
                    }
                    else {
                        _this.profilProvider.getProfilData(user.uid).then(function () {
                            _this.storage.get('profilData').then(function (profilData) {
                                _this.profilData = profilData;
                                _this.changeData = false;
                                dataLoad.dismiss();
                            });
                        });
                    }
                });
            }
            else {
                console.log("--> not logged in");
            }
        });
    };
    ProfilPage.prototype.onSignIn = function () {
        var _this = this;
        if (this.credentialsForm.valid) {
            this.angularFireAuth.auth.signInWithEmailAndPassword(this.credentialsForm.controls['email'].value, this.credentialsForm.controls['password'].value).then(function (user) {
                //this.navCtrl.setRoot('HomePage', {eMail});
                _this.user = user;
                console.log(user);
            }, function (reject) {
                console.log("REJECT:" + reject.message);
                _this.toastCtrl.create({
                    message: reject.message,
                    duration: 5000,
                    position: 'top'
                }).present();
            });
        }
    };
    ProfilPage.prototype.onSignOut = function () {
        var _this = this;
        this.angularFireAuth.auth.signOut().then(function () {
            _this.user = null;
            _this.navCtrl.setRoot('ProfilPage');
        });
    };
    ProfilPage.prototype.modifyData = function () {
        this.changeData = !this.changeData;
    };
    ProfilPage.prototype.saveData = function () {
        this.changeData = !this.changeData;
        this.profilProvider.updateProfilData(this.profilData);
    };
    ProfilPage.prototype.onForgotPassword = function () {
        if (!this.credentialsForm.controls['email'].valid) {
            this.passwordForgot = true;
        }
        else {
            this.profilProvider.resetPassword(this.credentialsForm.controls['email'].value);
            this.passwordForgot = false;
        }
    };
    ProfilPage.prototype.showImpressum = function (title) {
        this.navCtrl.push('InfoModalPage', title);
    };
    ProfilPage.prototype.showGDPR = function (title) {
        this.navCtrl.push('InfoModalPage', title);
    };
    ProfilPage.prototype.register = function () {
        this.navCtrl.push('RegisterPage');
    };
    ProfilPage.prototype.reportFind = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__find_modal_find_modal__["a" /* FindModalPage */]);
    };
    ProfilPage.prototype.info = function () {
        this.infoProvider.help('Auf dieser Seite befinden sich alle Informationen über dein Profil. Diese Informationen werden automatisch in deine Fundmeldungen übertragen. Über den Button "Ändern" kannst Du deine Daten überarbeiten. Abmelden kannst Du dich über den Button "Ausloggen"');
    };
    ProfilPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-profil',template:/*ion-inline-start:"/Users/manuel/Documents/GitHub/butterflAI/src/pages/profil/profil.html"*/'<ion-header>\n\n  <ion-navbar>\n    <button ion-button menuToggle>\n      <ion-icon name="menu" color="primary"></ion-icon>\n    </button>\n    <ion-buttons right *ngIf="user">\n      <button ion-button full (click)="info()">\n        <ion-icon name="help-circle" color="primary" style="zoom:1.5;"></ion-icon>\n      </button>\n    </ion-buttons>\n    <ion-title>Profil</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n\n  <div *ngIf="user; then profilSettings else loginMask"></div>\n\n  <ng-template #loginMask>\n\n    <form [formGroup]="credentialsForm">\n\n      <ion-item>\n        <ion-label floating>Email</ion-label>\n        <ion-input ngClass="{\'passwordForgot\' : passwordForgot}" [formControl]="credentialsForm.controls[\'email\']"\n                   type="email"></ion-input>\n      </ion-item>\n\n      <div *ngIf="!credentialsForm.controls.email.valid &&\n        credentialsForm.controls.email.dirty && credentialsForm.controls.email.touched || passwordForgot"\n           class="validator-error">\n        Bitte gib eine gültige Email ein.\n      </div>\n\n      <ion-item>\n        <ion-label floating>Passwort</ion-label>\n        <ion-input [formControl]="credentialsForm.controls[\'password\']" type="password">\n        </ion-input>\n      </ion-item>\n\n      <div *ngIf="!credentialsForm.controls.password.valid &&\n        credentialsForm.controls.password.dirty && credentialsForm.controls.password.touched"\n           class="validator-error">\n        Das Passwort muss zwischen 8 und 16 Zeichen lang sein, einen Groß- und Kleinbuchstaben, eine Zahl sowie ein\n        Sonderzeichen enthalten.\n      </div>\n\n      <ion-row>\n        <ion-col text-center>\n          <button ion-button block color="primary"\n                  (click)="onSignIn()">\n            Einloggen\n          </button>\n        </ion-col>\n      </ion-row>\n\n      <ion-row>\n        <ion-col text-center>\n          <button ion-button clear small (click)="onForgotPassword()">\n            Passwort vergessen?\n          </button>\n        </ion-col>\n      </ion-row>\n\n    </form>\n\n    <div class="flexcontainer">\n      <div class="impressum">\n        <button ion-button small (click)="showImpressum({title: \'Impressum\'})" clear>Impressum</button>\n      </div>\n      <div class="gdpr">\n        <button ion-button small (click)="showGDPR({title: \'Datenschutz\'})" clear>Datenschutz</button>\n      </div>\n    </div>\n    <div class="register">\n      <button ion-button small (click)="register()" clear>Noch keinen Account? Registrieren!</button>\n    </div>\n\n    <ion-fab center bottom class="addFind">\n      <button ion-fab [hidden]="!user" (click)="reportFind()">\n        <ion-icon name="add"></ion-icon>\n      </button>\n    </ion-fab>\n\n  </ng-template>\n\n  <ng-template #profilSettings>\n\n    <div *ngIf="profilData" padding>\n      <ion-item>\n        <ion-label stacked  style="font-size: 1em;">Name:</ion-label>\n        <ion-input [disabled]="true" type="text" [(ngModel)]="profilData.firstName"></ion-input>\n      </ion-item>\n\n      <ion-item>\n        <ion-label stacked  style="font-size: 1em;">Nachname:</ion-label>\n        <ion-input [disabled]="true" type="text" [(ngModel)]="profilData.lastName"></ion-input>\n      </ion-item>\n\n      <ion-item>\n        <ion-label stacked  style="font-size: 1em;">Adresse:</ion-label>\n        <ion-input [disabled]="!changeData" type="text" [(ngModel)]="profilData.street"></ion-input>\n      </ion-item>\n\n      <ion-item>\n        <ion-label stacked  style="font-size: 1em;">Postleitzahl:</ion-label>\n        <ion-input [disabled]="!changeData" type="tel" maxlength="5" minlength="5" [(ngModel)]="profilData.zipcode"></ion-input>\n      </ion-item>\n\n      <ion-item>\n        <ion-label stacked  style="font-size: 1em;">Ort:</ion-label>\n        <ion-input [disabled]="!changeData" type="text" [(ngModel)]="profilData.place"></ion-input>\n      </ion-item>\n    </div>\n\n    <ion-buttons>\n      <div class="flexcontainer">\n        <button *ngIf="!changeData" ion-button clear block padding (click)="modifyData()">Ändern</button>\n        <button *ngIf="changeData" ion-button clear block padding (click)="saveData()">Speichern</button>\n        <button ion-button clear block padding (click)="onSignOut()">Ausloggen</button>\n      </div>\n\n    </ion-buttons>\n    <div class="flexcontainer">\n      <div class="impressum">\n        <button ion-button small (click)="showImpressum({title: \'Impressum\'})" clear>Impressum</button>\n      </div>\n      <div class="gdpr">\n        <button ion-button small (click)="showGDPR({title: \'Datenschutz\'})" clear>Datenschutz</button>\n      </div>\n    </div>\n\n  </ng-template>\n\n</ion-content>\n'/*ion-inline-end:"/Users/manuel/Documents/GitHub/butterflAI/src/pages/profil/profil.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__angular_forms__["FormBuilder"],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavController"],
            __WEBPACK_IMPORTED_MODULE_4_angularfire2_auth__["a" /* AngularFireAuth */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["ToastController"],
            __WEBPACK_IMPORTED_MODULE_5__providers_profil_data_profil_data__["a" /* ProfilDataProvider */],
            __WEBPACK_IMPORTED_MODULE_6__providers_info_info__["a" /* InfoProvider */],
            __WEBPACK_IMPORTED_MODULE_7__ionic_storage__["b" /* Storage */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["LoadingController"]])
    ], ProfilPage);
    return ProfilPage;
}());

//# sourceMappingURL=profil.js.map

/***/ }),

/***/ 166:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return InfoModalPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(11);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var InfoModalPage = /** @class */ (function () {
    function InfoModalPage(params, view) {
        this.params = params;
        this.view = view;
        this.title = this.params.get('title');
    }
    InfoModalPage.prototype.ionViewWillLoad = function () {
        console.log(this.title);
    };
    InfoModalPage.prototype.closeModal = function () {
        this.view.dismiss();
    };
    InfoModalPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-info-modal',template:/*ion-inline-start:"/Users/manuel/Documents/GitHub/butterflAI/src/pages/info-modal/info-modal.html"*/'<!--\n  Generated template for the InfoModalPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar hideBackButton="true">\n    <ion-buttons left>\n      <button ion-button (click)="closeModal()">\n        <ion-icon name="arrow-back" color="primary" style="zoom:1.5;"></ion-icon>\n      </button>\n    </ion-buttons>\n\n    <ion-title>\n      {{ title }}\n    </ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n\n  <div *ngIf="title === \'Datenschutz\'">\n    <div class="dataprotection">\n      <h1>Datenschutz</h1>\n      <p style="font-size: 1.1em;">\n        <span class="justify">Der Anbieter der Schmetterlings-App ist die Abteilung Entomologie des Staatlichen Museums für Naturkunde in Karlsruhe. Als Ansprechpartner fungiert Herr Dr. Robert Trusch. Weitere Kontaktdaten des Anbieters:<br><br></span>\n        Adresse: Erbprinzenstraße 13, 76133 Karlsruhe<br>\n        Tel.: 0721-1752111 (Zentrale)<br>\n        E-Mail: <a mailto="schmetterlinge-bw@smnk.de">schmetterlinge-bw@smnk.de</a><br><br>\n\n        <span class="justify">Mit der Schmetterlings-App werden persönliche Daten und Kontaktdaten erhoben, die der Verifizierung der Fundmeldungen dienen.\n        Eine Verifizierung der Fundmeldungen ist notwendig, um die Korrektheit der Datenbestände sicherzustellen. In Einzelfällen können Rückfragen zu Fundmeldungen getätigt werden, damit die Fehlerquote in den Datenbeständen minimiert werden kann.\n        Die Fundmeldungen werden für eine unbestimmte Zeit in einer Datenbank aufbewahrt, um die Schmetterlingsfauna in Baden-Württemberg langfristig abbilden zu können.\n        Ihre persönlichen Daten werden an keine Drittparteien weitergegeben und für keine weiteren Zwecke verwendet.</span><br>Stand: 01.06.2018\n      </p>\n    </div>\n  </div>\n\n  <div *ngIf="title === \'Impressum\'">\n    <div class="impressum">\n\n    </div>\n  </div>\n\n  <ng-template #dataprotection>\n\n  </ng-template>\n\n</ion-content>\n'/*ion-inline-end:"/Users/manuel/Documents/GitHub/butterflAI/src/pages/info-modal/info-modal.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavParams"], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["ViewController"]])
    ], InfoModalPage);
    return InfoModalPage;
}());

//# sourceMappingURL=info-modal.js.map

/***/ }),

/***/ 167:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ProfilDataProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_angularfire2_auth__ = __webpack_require__(54);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_angularfire2_database__ = __webpack_require__(86);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_storage__ = __webpack_require__(48);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var ProfilDataProvider = /** @class */ (function () {
    function ProfilDataProvider(afAuth, db, toastCtrl, storage) {
        this.afAuth = afAuth;
        this.db = db;
        this.toastCtrl = toastCtrl;
        this.storage = storage;
        console.log('Hello ProfilDataProvider Provider');
    }
    ProfilDataProvider.prototype.register = function (registerForm) {
        var _this = this;
        this.afAuth.auth.createUserWithEmailAndPassword(registerForm.controls['email'].value, registerForm.controls['password'].value).then(function () {
            _this.db.object("profile/" + _this.afAuth.auth.currentUser.uid).set({
                firstName: registerForm.controls['firstName'].value,
                lastName: registerForm.controls['lastName'].value,
                street: registerForm.controls['street'].value,
                zipcode: registerForm.controls['zipcode'].value,
                place: registerForm.controls['place'].value
            });
        }, function (reject) {
            _this.toastCtrl.create({
                message: reject.message,
                duration: 5000,
                position: 'top'
            }).present();
        });
    };
    ProfilDataProvider.prototype.getProfilData = function (uid) {
        var _this = this;
        console.log("get profile data");
        return new Promise(function (resolve) {
            _this.profilData = _this.db.object("profile/" + uid).valueChanges();
            _this.profilData.subscribe(function (data) {
                _this.storage.set('profilData', data).then(function () {
                    resolve(true);
                });
            });
        });
    };
    ProfilDataProvider.prototype.updateProfilData = function (profilData) {
        var _this = this;
        this.storage.set('profilData', this.profilData).then(function () {
            console.log("persisted Data");
            _this.db.object("profile/" + _this.afAuth.auth.currentUser.uid).set(profilData);
        });
    };
    ProfilDataProvider.prototype.resetPassword = function (email) {
        var _this = this;
        this.afAuth.auth.sendPasswordResetEmail(email).then(function (res) {
            console.log("--> passwordforgot res: " + res);
            _this.toastCtrl.create({
                message: "Wir haben dir an " + email + " ein neues Passwort geschickt.",
                duration: 5000,
                position: 'top'
            }).present();
        }).catch(function (e) {
            console.error(e);
            _this.toastCtrl.create({
                message: 'Wir konnten dein Passwort nicht zurücksetzen...',
                duration: 5000,
                position: 'top'
            }).present();
        });
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('content'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["NavController"])
    ], ProfilDataProvider.prototype, "navCtrl", void 0);
    ProfilDataProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_angularfire2_auth__["a" /* AngularFireAuth */],
            __WEBPACK_IMPORTED_MODULE_2_angularfire2_database__["a" /* AngularFireDatabase */],
            __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["ToastController"],
            __WEBPACK_IMPORTED_MODULE_4__ionic_storage__["b" /* Storage */]])
    ], ProfilDataProvider);
    return ProfilDataProvider;
}());

//# sourceMappingURL=profil-data.js.map

/***/ }),

/***/ 201:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 201;

/***/ }),

/***/ 242:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"../pages/find-modal/find-modal.module": [
		517,
		3
	],
	"../pages/home/home.module": [
		262
	],
	"../pages/info-modal/info-modal.module": [
		518,
		2
	],
	"../pages/profil/profil.module": [
		263
	],
	"../pages/register/register.module": [
		519,
		1
	],
	"../pages/welcome/welcome.module": [
		520,
		0
	]
};
function webpackAsyncContext(req) {
	var ids = map[req];
	if(!ids)
		return Promise.reject(new Error("Cannot find module '" + req + "'."));
	return Promise.all(ids.slice(1).map(__webpack_require__.e)).then(function() {
		return __webpack_require__(ids[0]);
	});
};
webpackAsyncContext.keys = function webpackAsyncContextKeys() {
	return Object.keys(map);
};
webpackAsyncContext.id = 242;
module.exports = webpackAsyncContext;

/***/ }),

/***/ 254:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LocationSelect; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_geolocation__ = __webpack_require__(138);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_google_maps_google_maps__ = __webpack_require__(139);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var LocationSelect = /** @class */ (function () {
    function LocationSelect(zone, maps, platform, geolocation, viewCtrl) {
        this.zone = zone;
        this.maps = maps;
        this.platform = platform;
        this.geolocation = geolocation;
        this.viewCtrl = viewCtrl;
        this.query = '';
        this.places = [];
        this.searchDisabled = true;
        this.saveDisabled = true;
    }
    LocationSelect.prototype.ionViewDidLoad = function () {
        var _this = this;
        var mapLoaded = this.maps.init(this.mapElement.nativeElement, this.pleaseConnect.nativeElement).then(function () {
            console.log("---> initiated map");
            _this.autocompleteService = new google.maps.places.AutocompleteService();
            _this.searchDisabled = false;
            _this.saveDisabled = false;
            console.log("search: " + _this.searchDisabled + "save: " + _this.saveDisabled);
        });
    };
    LocationSelect.prototype.selectPlace = function (place) {
        var _this = this;
        var infoWindow = new google.maps.InfoWindow;
        this.places = [];
        this.spinner = false;
        var location = {
            lat: 0,
            lng: 0,
            address: ''
        };
        this.placesService = new google.maps.places.PlacesService(this.maps.map);
        this.placesService.getDetails({ placeId: place.place_id }, function (details) {
            _this.zone.run(function () {
                location.lat = details.geometry.location.lat();
                location.lng = details.geometry.location.lng();
                location.address = details.formatted_address;
                _this.maps.map.setCenter({ lat: location.lat, lng: location.lng });
                _this.location = location;
                console.log("initial location via geoLocation: " + JSON.stringify(_this.location));
                // This address will be displayed in the location field of 'find-modal.ts'
                console.log("address formatted: " + details.formatted_address);
                console.log("address : " + details.address);
                // add a Marker to the user specified location
                _this.maps.addMarker(_this.location, details.formatted_address);
            });
        });
    };
    LocationSelect.prototype.searchPlace = function () {
        var _this = this;
        if (this.query.length > 0 && !this.searchDisabled) {
            this.spinner = true;
            var config = {
                types: ['geocode'],
                input: this.query
            };
            this.autocompleteService.getPlacePredictions(config, function (predictions, status) {
                if (status == google.maps.places.PlacesServiceStatus.OK && predictions) {
                    _this.places = [];
                    predictions.forEach(function (prediction) {
                        _this.places.push(prediction);
                    });
                }
            });
        }
        else {
            this.places = [];
        }
    };
    LocationSelect.prototype.save = function () {
        if (this.location == null) {
            this.viewCtrl.dismiss(this.maps.location);
        }
        else {
            this.viewCtrl.dismiss(this.location);
        }
    };
    LocationSelect.prototype.close = function () {
        this.viewCtrl.dismiss();
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["ViewChild"])('map'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1__angular_core__["ElementRef"])
    ], LocationSelect.prototype, "mapElement", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["ViewChild"])('pleaseConnect'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1__angular_core__["ElementRef"])
    ], LocationSelect.prototype, "pleaseConnect", void 0);
    LocationSelect = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Component"])({
            selector: 'page-location-select',template:/*ion-inline-start:"/Users/manuel/Documents/GitHub/butterflAI/src/pages/location-select/location-select.html"*/'<ion-header>\n  <ion-navbar color="primary">\n    <ion-buttons left>\n      <button ion-button (click)="close()">Cancel</button>\n    </ion-buttons>\n    <ion-buttons right>\n      <button ion-button [disabled]="saveDisabled" (click)="save()">Save</button>\n    </ion-buttons>\n  </ion-navbar>\n\n  <ion-toolbar>\n    <ion-searchbar [(ngModel)]="query" [disabled]="searchDisabled" (ionInput)="searchPlace()"></ion-searchbar>\n    <div *ngIf="spinner" class="spinner-container">\n      <ion-spinner></ion-spinner>\n    </div>\n  </ion-toolbar>\n\n  <ion-list>\n    <ion-item *ngFor="let place of places" (tap)="selectPlace(place)">{{place.description}}</ion-item>\n  </ion-list>\n\n</ion-header>\n\n<ion-content>\n\n  <div #pleaseConnect id="please-connect">\n    <p>Du bist offline. Bitte verbinde dich mit dem Internet...</p>\n  </div>\n\n  <div #map id="map">\n    <ion-spinner></ion-spinner>\n  </div>\n\n</ion-content>\n'/*ion-inline-end:"/Users/manuel/Documents/GitHub/butterflAI/src/pages/location-select/location-select.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_core__["NgZone"],
            __WEBPACK_IMPORTED_MODULE_3__providers_google_maps_google_maps__["a" /* GoogleMaps */],
            __WEBPACK_IMPORTED_MODULE_0_ionic_angular__["Platform"],
            __WEBPACK_IMPORTED_MODULE_2__ionic_native_geolocation__["a" /* Geolocation */],
            __WEBPACK_IMPORTED_MODULE_0_ionic_angular__["ViewController"]])
    ], LocationSelect);
    return LocationSelect;
}());

//# sourceMappingURL=location-select.js.map

/***/ }),

/***/ 262:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HomePageModule", function() { return HomePageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__home__ = __webpack_require__(143);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var HomePageModule = /** @class */ (function () {
    function HomePageModule() {
    }
    HomePageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__home__["a" /* HomePage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["IonicPageModule"].forChild(__WEBPACK_IMPORTED_MODULE_2__home__["a" /* HomePage */]),
            ],
        })
    ], HomePageModule);
    return HomePageModule;
}());

//# sourceMappingURL=home.module.js.map

/***/ }),

/***/ 263:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProfilPageModule", function() { return ProfilPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__profil__ = __webpack_require__(144);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var ProfilPageModule = /** @class */ (function () {
    function ProfilPageModule() {
    }
    ProfilPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__profil__["a" /* ProfilPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["IonicPageModule"].forChild(__WEBPACK_IMPORTED_MODULE_2__profil__["a" /* ProfilPage */]),
            ],
        })
    ], ProfilPageModule);
    return ProfilPageModule;
}());

//# sourceMappingURL=profil.module.js.map

/***/ }),

/***/ 305:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UeberPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__providers_info_info__ = __webpack_require__(87);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var UeberPage = /** @class */ (function () {
    function UeberPage(infoProvider) {
        this.infoProvider = infoProvider;
    }
    UeberPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad UeberPage');
    };
    UeberPage.prototype.info = function () {
        this.infoProvider.help('Auf dieser Seite befinden sich alle relevanten Informationen über das Projekt. Eine Interaktion ist an dieser Stelle nicht möglich.');
    };
    UeberPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-ueber',template:/*ion-inline-start:"/Users/manuel/Documents/GitHub/butterflAI/src/pages/ueber/ueber.html"*/'<ion-header>\n\n  <ion-navbar>\n    <button ion-button menuToggle>\n      <ion-icon name="menu" color="primary" ></ion-icon>\n    </button>\n    <ion-buttons right>\n      <button ion-button full (click)="info()">\n        <ion-icon name="help-circle" color="primary" style="zoom:1.5;"></ion-icon>\n      </button>\n    </ion-buttons>\n    <ion-title>Über</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n\n  <div class="content">\n    <p>Diese App wurde im Rahmen eines Projektes zwischen dem Naturkundemuseum Karlsruhe und der dualen Hochschule\n      Baden-Württemberg in Stuttgart entwickelt.</p>\n    <p>\n      <b>DHBW Stuttgart:</b><br>\n      Maximilian Arzdorf<br>\n      Jessy Borm<br>\n      Philipp Hauf<br>\n      Laura Mathews<br>\n      Johannes Mayer<br>\n      Manuel Stippich<br>\n      Prof. Dr. Kai Holzweißig<br>\n    </p>\n    <p>\n      <b>SMN Karlsruhe:</b><br>\n      Axel Steiner<br>\n      Dr. Rolf Mörtter<br>\n      Dr. Robert Trusch<br>\n    </p>  \n    <p>\n      Weitere Infos zu den Projekten des SMN Karlsruhe findest Du <a href="#"\n                                                                     onclick="window.open(\'http://www.schmetterlinge-bw.de/\', \'_system\', \'location=yes\');\n                                                                     return false;">hier</a>.\n    </p>\n\n  </div>\n\n\n</ion-content>\n'/*ion-inline-end:"/Users/manuel/Documents/GitHub/butterflAI/src/pages/ueber/ueber.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__providers_info_info__["a" /* InfoProvider */]])
    ], UeberPage);
    return UeberPage;
}());

//# sourceMappingURL=ueber.js.map

/***/ }),

/***/ 307:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(308);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(428);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 428:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_component__ = __webpack_require__(514);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_home_home__ = __webpack_require__(143);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_profil_profil__ = __webpack_require__(144);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_ueber_ueber__ = __webpack_require__(305);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_location_select_location_select__ = __webpack_require__(254);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__pages_find_modal_find_modal__ = __webpack_require__(92);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__angular_common_http__ = __webpack_require__(253);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__ionic_native_http__ = __webpack_require__(261);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__ionic_native_status_bar__ = __webpack_require__(303);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__ionic_native_splash_screen__ = __webpack_require__(304);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__providers_finding_modal_finding_modal__ = __webpack_require__(133);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__ionic_native_camera__ = __webpack_require__(243);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15_ionic_select_searchable__ = __webpack_require__(306);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15_ionic_select_searchable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_15_ionic_select_searchable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__ionic_native_geolocation__ = __webpack_require__(138);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__ionic_native_native_geocoder__ = __webpack_require__(515);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__ionic_native_network__ = __webpack_require__(255);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__providers_connectivity_service_connectivity_service__ = __webpack_require__(72);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__providers_google_maps_google_maps__ = __webpack_require__(139);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21_ionic_img_viewer__ = __webpack_require__(257);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__ionic_storage__ = __webpack_require__(48);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23_angularfire2__ = __webpack_require__(136);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24_angularfire2_auth__ = __webpack_require__(54);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_25_angularfire2_database__ = __webpack_require__(86);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_26__app_firebase_config__ = __webpack_require__(516);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_27__providers_find_find__ = __webpack_require__(140);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_28__pages_home_home_module__ = __webpack_require__(262);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_29__pages_profil_profil_module__ = __webpack_require__(263);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_30__providers_profil_data_profil_data__ = __webpack_require__(167);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_31__providers_info_info__ = __webpack_require__(87);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_32__pages_info_modal_info_modal__ = __webpack_require__(166);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};


































var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_6__pages_ueber_ueber__["a" /* UeberPage */],
                __WEBPACK_IMPORTED_MODULE_7__pages_location_select_location_select__["a" /* LocationSelect */],
                __WEBPACK_IMPORTED_MODULE_8__pages_find_modal_find_modal__["a" /* FindModalPage */],
                __WEBPACK_IMPORTED_MODULE_32__pages_info_modal_info_modal__["a" /* InfoModalPage */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_9__angular_common_http__["b" /* HttpClientModule */],
                __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["IonicModule"].forRoot(__WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* MyApp */], { scrollAssist: false, autoFocusAssist: false }, {
                    links: [
                        { loadChildren: '../pages/find-modal/find-modal.module#FindModalPageModule', name: 'FindModalPage', segment: 'find-modal', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/home/home.module#HomePageModule', name: 'HomePage', segment: 'home', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/info-modal/info-modal.module#InfoModalPageModule', name: 'InfoModalPage', segment: 'info-modal', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/profil/profil.module#ProfilPageModule', name: 'ProfilPage', segment: 'profil', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/register/register.module#RegisterPageModule', name: 'RegisterPage', segment: 'register', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/welcome/welcome.module#WelcomePageModule', name: 'WelcomePage', segment: 'welcome', priority: 'low', defaultHistory: [] }
                    ]
                }),
                __WEBPACK_IMPORTED_MODULE_23_angularfire2__["a" /* AngularFireModule */].initializeApp(__WEBPACK_IMPORTED_MODULE_26__app_firebase_config__["a" /* FIREBASE_CONFIG */]),
                __WEBPACK_IMPORTED_MODULE_24_angularfire2_auth__["b" /* AngularFireAuthModule */],
                __WEBPACK_IMPORTED_MODULE_25_angularfire2_database__["b" /* AngularFireDatabaseModule */],
                // addtionial imported in 'find-modal.module.ts' because of lazy-loading
                __WEBPACK_IMPORTED_MODULE_15_ionic_select_searchable__["SelectSearchableModule"],
                __WEBPACK_IMPORTED_MODULE_28__pages_home_home_module__["HomePageModule"],
                __WEBPACK_IMPORTED_MODULE_29__pages_profil_profil_module__["ProfilPageModule"],
                __WEBPACK_IMPORTED_MODULE_21_ionic_img_viewer__["b" /* IonicImageViewerModule */],
                __WEBPACK_IMPORTED_MODULE_22__ionic_storage__["a" /* IonicStorageModule */].forRoot()
            ],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["IonicApp"]],
            entryComponents: [
                __WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_4__pages_home_home__["a" /* HomePage */],
                __WEBPACK_IMPORTED_MODULE_5__pages_profil_profil__["a" /* ProfilPage */],
                __WEBPACK_IMPORTED_MODULE_6__pages_ueber_ueber__["a" /* UeberPage */],
                __WEBPACK_IMPORTED_MODULE_7__pages_location_select_location_select__["a" /* LocationSelect */],
                __WEBPACK_IMPORTED_MODULE_8__pages_find_modal_find_modal__["a" /* FindModalPage */],
                __WEBPACK_IMPORTED_MODULE_32__pages_info_modal_info_modal__["a" /* InfoModalPage */],
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_11__ionic_native_status_bar__["a" /* StatusBar */],
                __WEBPACK_IMPORTED_MODULE_12__ionic_native_splash_screen__["a" /* SplashScreen */],
                __WEBPACK_IMPORTED_MODULE_13__providers_finding_modal_finding_modal__["a" /* FindingModalProvider */],
                __WEBPACK_IMPORTED_MODULE_14__ionic_native_camera__["a" /* Camera */],
                __WEBPACK_IMPORTED_MODULE_16__ionic_native_geolocation__["a" /* Geolocation */],
                __WEBPACK_IMPORTED_MODULE_17__ionic_native_native_geocoder__["a" /* NativeGeocoder */],
                __WEBPACK_IMPORTED_MODULE_19__providers_connectivity_service_connectivity_service__["a" /* Connectivity */],
                __WEBPACK_IMPORTED_MODULE_20__providers_google_maps_google_maps__["a" /* GoogleMaps */],
                __WEBPACK_IMPORTED_MODULE_18__ionic_native_network__["a" /* Network */],
                __WEBPACK_IMPORTED_MODULE_24_angularfire2_auth__["a" /* AngularFireAuth */],
                { provide: __WEBPACK_IMPORTED_MODULE_1__angular_core__["ErrorHandler"], useClass: __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["IonicErrorHandler"] },
                __WEBPACK_IMPORTED_MODULE_27__providers_find_find__["a" /* FindProvider */],
                __WEBPACK_IMPORTED_MODULE_30__providers_profil_data_profil_data__["a" /* ProfilDataProvider */],
                __WEBPACK_IMPORTED_MODULE_31__providers_info_info__["a" /* InfoProvider */],
                __WEBPACK_IMPORTED_MODULE_10__ionic_native_http__["a" /* HTTP */],
                __WEBPACK_IMPORTED_MODULE_9__angular_common_http__["b" /* HttpClientModule */],
            ]
        })
    ], AppModule);
    return AppModule;
}());

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 514:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(303);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(304);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_home_home__ = __webpack_require__(143);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_profil_profil__ = __webpack_require__(144);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_ueber_ueber__ = __webpack_require__(305);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_angularfire2_auth__ = __webpack_require__(54);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__ionic_storage__ = __webpack_require__(48);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__providers_finding_modal_finding_modal__ = __webpack_require__(133);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__providers_connectivity_service_connectivity_service__ = __webpack_require__(72);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__pages_info_modal_info_modal__ = __webpack_require__(166);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};












var MyApp = /** @class */ (function () {
    function MyApp(platform, statusBar, splashScreen, angularFireAuth, menuCtrl, storage, findingModalProvider, connectivity, loading) {
        var _this = this;
        this.platform = platform;
        this.statusBar = statusBar;
        this.splashScreen = splashScreen;
        this.angularFireAuth = angularFireAuth;
        this.menuCtrl = menuCtrl;
        this.storage = storage;
        this.findingModalProvider = findingModalProvider;
        this.connectivity = connectivity;
        this.loading = loading;
        this.rootPage = 'ProfilPage';
        this.initializeApp();
        //this.storage.clear(); // !!! Delete after Testing !!!
        // initially persist the species to the device so the user can use them offline
        this.storage.get('species').then(function (result) {
            if (!result && _this.connectivity.isOnline()) {
                _this.findingModalProvider.getSpecies();
            }
        });
        /*  if a user is logged in (SSO) he will be redirected to the HomePage
            else he is either directed to the login page or if its the first time he uses the app to the welcome page
         */
        this.angularFireAuth.auth.onAuthStateChanged(function (user) {
            var authenticateSpinner = _this.loading.create({
                content: 'Authentifiziere...'
            });
            authenticateSpinner.present();
            if (user) {
                authenticateSpinner.dismiss();
                console.log("--> logged in: " + user.uid);
                _this.nav.setRoot('HomePage');
                _this.menuCtrl.enable(true, 'myMenu');
            }
            else {
                _this.menuCtrl.enable(false, "myMenu");
                // if intro not already shown it will be set as rootPage
                _this.storage.get('introShown').then(function (result) {
                    authenticateSpinner.dismiss();
                    if (result) {
                        _this.nav.setRoot('ProfilPage');
                    }
                    else {
                        _this.nav.setRoot('WelcomePage');
                        _this.storage.set('introShown', true);
                    }
                });
            }
        });
        // used for an example of ngFor and navigation
        this.pages = [
            { title: 'Meine Meldungen', component: __WEBPACK_IMPORTED_MODULE_4__pages_home_home__["a" /* HomePage */], icon: 'home' },
            { title: 'Profil', component: __WEBPACK_IMPORTED_MODULE_5__pages_profil_profil__["a" /* ProfilPage */], icon: 'person' },
            { title: 'Über', component: __WEBPACK_IMPORTED_MODULE_6__pages_ueber_ueber__["a" /* UeberPage */], icon: 'information-circle' },
            { title: 'Impressum', component: __WEBPACK_IMPORTED_MODULE_11__pages_info_modal_info_modal__["a" /* InfoModalPage */], icon: 'paper' },
            { title: 'Datenschutz', component: __WEBPACK_IMPORTED_MODULE_11__pages_info_modal_info_modal__["a" /* InfoModalPage */], icon: 'lock' },
            { title: 'Ausloggen', component: null, icon: 'log-out' },
        ];
    }
    MyApp.prototype.initializeApp = function () {
        var _this = this;
        this.platform.ready().then(function () {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            _this.statusBar.styleDefault();
            _this.splashScreen.hide();
        });
    };
    MyApp.prototype.openPage = function (page) {
        if (page.title === 'Impressum' || page.title === 'Datenschutz') {
            this.nav.push(page.component, { title: page.title });
        }
        else if (!page.component) {
            this.angularFireAuth.auth.signOut();
        }
        else {
            // Reset the content nav to have just this page
            // we wouldn't want the back button to show in this scenario
            this.nav.setRoot(page.component);
        }
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["Nav"]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["Nav"])
    ], MyApp.prototype, "nav", void 0);
    MyApp = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({template:/*ion-inline-start:"/Users/manuel/Documents/GitHub/butterflAI/src/app/app.html"*/'<ion-menu [content]="content" id="myMenu">\n\n  <ion-header>\n    <ion-toolbar>\n      <ion-title>Menü</ion-title>\n    </ion-toolbar>\n  </ion-header>\n\n    <ion-content>\n      <ion-list>\n        <button menuClose ion-item *ngFor="let p of pages" (click)="openPage(p)">\n          <ion-icon name="{{p.icon}}" color="primary"></ion-icon>\n          {{p.title}}\n        </button>\n      </ion-list>\n    </ion-content>\n\n</ion-menu>\n\n<!-- Disable swipe-to-go-back because it\'s poor UX to combine STGB with side menus -->\n<ion-nav [root]="rootPage" #content swipeBackEnabled="false"></ion-nav>\n'/*ion-inline-end:"/Users/manuel/Documents/GitHub/butterflAI/src/app/app.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["Platform"],
            __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */],
            __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */],
            __WEBPACK_IMPORTED_MODULE_7_angularfire2_auth__["a" /* AngularFireAuth */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["MenuController"],
            __WEBPACK_IMPORTED_MODULE_8__ionic_storage__["b" /* Storage */],
            __WEBPACK_IMPORTED_MODULE_9__providers_finding_modal_finding_modal__["a" /* FindingModalProvider */],
            __WEBPACK_IMPORTED_MODULE_10__providers_connectivity_service_connectivity_service__["a" /* Connectivity */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["LoadingController"]])
    ], MyApp);
    return MyApp;
}());

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 516:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FIREBASE_CONFIG; });
var FIREBASE_CONFIG = {
    apiKey: "AIzaSyDTjR_4owMlm2JamVK1Ml56Pw17kI70iqA",
    authDomain: "schmetterlinge-78364.firebaseapp.com",
    databaseURL: "https://schmetterlinge-78364.firebaseio.com",
    projectId: "schmetterlinge-78364",
    storageBucket: "schmetterlinge-78364.appspot.com",
    messagingSenderId: "760370952459"
};
//# sourceMappingURL=app.firebase.config.js.map

/***/ }),

/***/ 72:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Connectivity; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ionic_native_network__ = __webpack_require__(255);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(11);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var Connectivity = /** @class */ (function () {
    function Connectivity(platform, network) {
        this.platform = platform;
        this.network = network;
        this.onDevice = this.platform.is('cordova');
    }
    Connectivity.prototype.isOnline = function () {
        if (this.onDevice && this.network.type) {
            return this.network.type != 'none';
        }
        else {
            return navigator.onLine;
        }
    };
    Connectivity.prototype.isOffline = function () {
        if (this.onDevice && this.network.type) {
            return this.network.type == 'none';
        }
        else {
            return !navigator.onLine;
        }
    };
    Connectivity.prototype.watchOnline = function () {
        return this.network.onConnect();
    };
    Connectivity.prototype.watchOffline = function () {
        return this.network.onDisconnect();
    };
    Connectivity = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["Platform"], __WEBPACK_IMPORTED_MODULE_1__ionic_native_network__["a" /* Network */]])
    ], Connectivity);
    return Connectivity;
}());

//# sourceMappingURL=connectivity-service.js.map

/***/ }),

/***/ 87:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return InfoProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(11);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


/*
  Generated class for the InfoProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
var InfoProvider = /** @class */ (function () {
    function InfoProvider(alertCtrl) {
        this.alertCtrl = alertCtrl;
    }
    InfoProvider.prototype.help = function (message) {
        var alert = this.alertCtrl.create({
            title: 'Informationen zu dieser Seite',
            subTitle: message,
            buttons: ['Verstanden']
        });
        alert.present();
    };
    InfoProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["AlertController"]])
    ], InfoProvider);
    return InfoProvider;
}());

//# sourceMappingURL=info.js.map

/***/ }),

/***/ 92:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FindModalPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_finding_modal_finding_modal__ = __webpack_require__(133);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__location_select_location_select__ = __webpack_require__(254);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_find_find__ = __webpack_require__(140);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_ionic_img_viewer__ = __webpack_require__(257);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__providers_connectivity_service_connectivity_service__ = __webpack_require__(72);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__providers_google_maps_google_maps__ = __webpack_require__(139);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__ionic_storage__ = __webpack_require__(48);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__ionic_native_http__ = __webpack_require__(261);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};













var FindModalPage = /** @class */ (function () {
    function FindModalPage(formBuilder, findingModalProvider, modalCtrl, alertCtrl, platform, findProvider, toastCtrl, navCtrl, viewCtrl, imgCtrl, keyboard, connectivity, maps, storage, http) {
        var _this = this;
        this.formBuilder = formBuilder;
        this.findingModalProvider = findingModalProvider;
        this.modalCtrl = modalCtrl;
        this.alertCtrl = alertCtrl;
        this.platform = platform;
        this.findProvider = findProvider;
        this.toastCtrl = toastCtrl;
        this.navCtrl = navCtrl;
        this.viewCtrl = viewCtrl;
        this.imgCtrl = imgCtrl;
        this.keyboard = keyboard;
        this.connectivity = connectivity;
        this.maps = maps;
        this.storage = storage;
        this.http = http;
        this.token = "";
        this.urlToken = 'https://eu-gb.ml.cloud.ibm.com/v3/identity/token';
        // urlToken = 'https://eu-gb.ml.cloud.ibm.com/';
        // var urlService = 'https://ibm-watson-ml.mybluemix.net/v3/wml_instances/15ce63e2-7c61-44dc-b46a-a33220223e70/published_models/b3463e38-9539-49c6-8976-08e77ef57bfb/deployments/9a915e0c-a028-42b6-888c-6a4350b14f9a/online';
        // urlServiceNew = 'https://ibm-watson-ml.mybluemix.net/v3/wml_instances/15ce63e2-7c61-44dc-b46a-a33220223e70/published_models/b77ff1e4-8b01-4110-8470-72a63bc489ee/deployments/5418cdbb-4a6c-4b61-907b-21b900a23d10/online';
        this.urlServiceNew = 'https://eu-gb.ml.cloud.ibm.com/v3/wml_instances/d373b28e-5b23-4a49-a587-32dc98ee8216/deployments/499ada98-9775-4fb2-949c-6640b1d35f64/online';
        // usr = '0c758f90-e6c4-4df9-981b-aa2206dd2701';
        this.usr = '77c74ada-0a7a-422a-898b-7d64dc7f9e6a';
        // pw = 'bf97e385-f591-415e-8fc6-eb10c9564972';
        this.pw = '672caf0a-18df-4976-9ac5-20f57d1c2408';
        this.usrSpecies = '';
        //res = '{"fields": ["prediction"], "values": [[0.07892626523971558, 0.004959745332598686, 0.00044968651491217315, 0.05625692382454872, 0.029514044523239136, 0.8202618360519409, 0.0022929867263883352, 0.0037869028747081757, 9.162574860965833e-05, 0.0024810812901705503, 0.0009788612369447947]]}';
        this.res = '';
        this.classes = [
            "Aglais_io",
            "Aglais_urticae",
            "Aphantopus_hyperantus",
            "Autographa_gamma",
            "Melanargia_galathea",
            "Negativbeispiele",
            "Nymphalis_polychloros",
            "Papilio_machaon",
            "Pararge_aegeria",
            "Vanessa_atalanta",
            "Vanessa_cardui"
        ];
        this.readOnly = true;
        this.pictures = [];
        this.currentDate = new Date();
        this.gpsLocation = {};
        this.platform.ready().then(function () {
            /*this.findingModalProvider.getSpecies().subscribe(species => {
            this.species = species;
            console.log(species);
          });*/
            _this.getToken();
            _this.pictureLimit = false;
            _this.butterflyForm = _this.formBuilder.group({
                speciesPicture: [[null]],
                species: [null, __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].required],
                location: [null, __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].required],
                location_comment: [null],
                location_address: [null],
                quantity: [null, __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].min(1)],
                stadium: [null],
                date: [_this.currentDate.toLocaleDateString()],
                comment: [null]
            });
            _this.stadiumData = [
                { text: "Imago", value: "imago" },
                { text: "Ei", value: "ei" },
                { text: "Larve", value: "larve" },
                { text: "Puppe", value: "puppe" },
                { text: "Totfund", value: "totfund" }
            ];
        });
        this.storage.get('species').then(function (species) {
            // if the species are persisted, they will be taken
            if (species) {
                _this.species = species;
                console.log("DATA PERSIST");
                console.log(species);
            }
            else if (_this.connectivity.isOffline()) {
                console.log("DATA NOT PERSIST USER OFFLINE");
                _this.alertCtrl.create({
                    title: 'Hoppla!',
                    subTitle: 'Du scheinst offline zu sein und hast dir die Arten noch nicht heruntergeladen. Bitte stelle eine Verbindung her und versuche es erneut.',
                    buttons: ['Verstanden']
                }).present();
            }
            else if (!species && _this.connectivity.isOnline()) {
                console.log("DATA NOT PERSIST RETRIEVING");
                _this.findingModalProvider.getSpecies().subscribe(function () {
                    _this.storage.get('species').then(function (species) {
                        _this.species = species;
                    });
                });
            }
        });
    }
    FindModalPage.prototype.ionViewDidLoad = function () {
        console.log("ionViewDidLoad");
        this.viewCtrl.setBackButtonText("Abbrechen");
        //this.canvas 	    = this.canvasEl.nativeElement;
        this.canvas = document.getElementById("canvas");
        this.canvas.width = 720;
        this.canvas.height = 576;
        this.initialiseCanvas();
    };
    FindModalPage.prototype.initialiseCanvas = function () {
        if (this.canvas.getContext) {
            this.setupCanvas();
        }
    };
    FindModalPage.prototype.setupCanvas = function () {
        this.ctx = this.canvas.getContext('2d');
        this.ctx.fillStyle = "red";
        this.ctx.fillRect(0, 0, 500, 500);
    };
    FindModalPage.prototype.ionViewWillEnter = function () {
        //Watch the Network-Status of the user and display an appropriate message
        var _this = this;
        this.connectivity.watchOnline().subscribe(function () {
            console.log("---> connected");
            _this.toastCtrl.create({
                message: "Verbindung hergestellt!",
                duration: 1000,
                position: 'top'
            }).present();
        });
        this.connectivity.watchOffline().subscribe(function () {
            console.log("---> not connected");
            _this.toastCtrl.create({
                message: "Du bist jetzt offline... \nFalls Du Meldungen abschickst, schließe die App bitte nicht!",
                duration: 2000,
                position: 'top'
            }).present();
        });
    };
    FindModalPage.prototype.slideChanged = function () {
        if (this.keyboard.isOpen()) {
            this.keyboard.close();
        }
    };
    FindModalPage.prototype.photoOption = function (i) {
        var _this = this;
        var actionSheet = this.alertCtrl.create({
            title: 'Foto hinzufügen',
            buttons: [
                {
                    text: 'Kamera',
                    icon: !this.platform.is('ios') ? 'camera' : null,
                    handler: function () {
                        if (i) {
                            _this.pictures.splice(i, 1);
                            _this.pictureLimit = false;
                        }
                        _this.findingModalProvider.takePhoto(1).then(function (img) {
                            if (_this.pictures.length >= 4) {
                                _this.pictureLimit = true;
                            }
                            else {
                                _this.pictures.push(img);
                                console.log(_this.pictures);
                            }
                        });
                    }
                },
                {
                    text: 'Galerie',
                    icon: !this.platform.is('ios') ? 'images' : null,
                    handler: function () {
                        if (i) {
                            _this.pictures.splice(i, 1);
                            _this.pictureLimit = false;
                        }
                        _this.findingModalProvider.takePhoto(0).then(function (img) {
                            if (_this.pictures.length >= 4) {
                                console.log(_this.pictures.length);
                                _this.pictureLimit = true;
                            }
                            else {
                                _this.pictures.push(img);
                                console.log(_this.pictures);
                            }
                        });
                    }
                },
                {
                    text: 'Abbrechen',
                    role: 'cancel',
                    icon: !this.platform.is('ios') ? 'close' : null,
                    handler: function () {
                        console.log('Cancel clicked');
                    }
                }
            ]
        });
        actionSheet.present();
    };
    // the user is able to delete, retake or view one of the images he took
    FindModalPage.prototype.alterPic = function (i, image) {
        var _this = this;
        console.log("--> index: " + i);
        var alterPicSheet = this.alertCtrl.create({
            title: 'Foto ändern/entfernen',
            buttons: [
                // {
                //   text: 'Intelligentes Klassifizieren',
                //   icon: !this.platform.is('ios') ? 'trash' : null,
                //   handler: () => {
                //     //this.classify(this.pictures[i]);
                //     // this.compareSpecies("lol");
                //   }
                // },
                {
                    text: 'Löschen',
                    icon: !this.platform.is('ios') ? 'trash' : null,
                    handler: function () {
                        _this.pictures.splice(i, 1);
                    }
                },
                {
                    text: 'Ändern',
                    icon: !this.platform.is('ios') ? 'refresh' : null,
                    handler: function () {
                        _this.pictures.splice(i, 1);
                        _this.photoOption(i);
                    }
                },
                {
                    text: 'Ansehen',
                    icon: !this.platform.is('ios') ? 'eye' : null,
                    handler: function () {
                        _this.imgCtrl.create(image).present();
                    }
                },
                {
                    text: 'Abbrechen',
                    role: 'cancel',
                    icon: !this.platform.is('ios') ? 'close' : null,
                    handler: function () {
                        console.log('Cancel clicked');
                    }
                }
            ]
        });
        alterPicSheet.present();
    };
    FindModalPage.prototype.getLocation = function () {
        var _this = this;
        if (this.connectivity.isOffline()) {
            console.log("OFFLINE");
            this.maps.gettOfflineLocation().then(function (location) {
                if (location) {
                    _this.toastCtrl.create({
                        message: 'Du bist offline. Wir verwenden deinen aktuellen Standort.',
                        duration: 2000,
                        position: 'top'
                    }).present();
                    _this.gpsLocation = location;
                    console.log(JSON.stringify(location));
                    _this.readOnly = false;
                    _this.butterflyForm.patchValue({ location: (_this.gpsLocation.lat + ', ' + _this.gpsLocation.lng) }); // if overview map is implemented change to 'lat: location.lat...'
                    _this.butterflyForm.patchValue({ location_address: (_this.gpsLocation.lat + ', ' + _this.gpsLocation.lng) });
                    _this.readOnly = true;
                }
                else {
                    console.log("--> Offline location not recieved");
                }
            });
        }
        else {
            this.launchLocationPage();
        }
    };
    FindModalPage.prototype.launchLocationPage = function () {
        var _this = this;
        var modal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_4__location_select_location_select__["a" /* LocationSelect */]);
        modal.onDidDismiss(function (location) {
            console.log("--> dismiss location: " + JSON.stringify(location));
            if (location != null) {
                _this.readOnly = false;
                _this.butterflyForm.patchValue({ location: (location.lat + ', ' + location.lng) }); // if overview map is implemented change to 'lat: location.lat...'
                _this.butterflyForm.patchValue({ location_address: location.address });
                _this.readOnly = true;
            }
        });
        modal.present();
    };
    FindModalPage.prototype.speciesChange = function (event) {
        this.selectedSpecies = event.value.toLowerCase().replace(" ", "_");
        this.selectedSpecies = ['http://www.lepiforum.de/lepiwiki.pl?', this.selectedSpecies].join('');
        console.log('species:', this.selectedSpecies);
        console.log(event.value);
    };
    FindModalPage.prototype.submit = function () {
        var _this = this;
        console.log(this.butterflyForm.value);
        this.usrSpecies = this.butterflyForm.controls['species'].value;
        if (this.pictures[0]) {
            // Put image on canvas, start the classification process
            this.classify(this.pictures[0]);
        }
        // the taken pictures are patched into the formControl
        this.butterflyForm.patchValue({ speciesPicture: this.pictures });
        // the item for the database is created and pushed if the form is valid
        this.findProvider.createItem({
            speciesPicture: this.butterflyForm.controls['speciesPicture'].value,
            species: this.butterflyForm.controls['species'].value,
            location: this.butterflyForm.controls['location'].value,
            location_comment: this.butterflyForm.controls['location_comment'].value,
            location_address: this.butterflyForm.controls['location_address'].value,
            quantity: this.butterflyForm.controls['quantity'].value,
            stadium: this.butterflyForm.controls['stadium'].value,
            date: this.butterflyForm.controls['date'].value,
            comment: this.butterflyForm.controls['comment'].value
        }).then(function (resolve) {
            console.log("--> submit Resolve: " + resolve);
            _this.toastCtrl.create({
                message: 'Du hast deinen Schmetterling erfolgreich gemeldet!',
                duration: 3000,
                position: 'top'
            }).present();
            _this.navCtrl.setRoot('HomePage');
        });
    };
    FindModalPage.prototype.isReadonly = function () {
        return this.readOnly;
    };
    // Start the classification by first creating a canvas and reading the image's pixel value from said canvas
    FindModalPage.prototype.classify = function (image) {
        var _this = this;
        var image2 = new Image();
        image2.src = image;
        image2.onload = function () {
            _this.ctx.drawImage(image2, 0, 0, image2.width, image2.height, 0, 0, _this.canvas.width, _this.canvas.height);
            var imageData2 = _this.ctx.getImageData(0, 0, _this.canvas.width, _this.canvas.height);
            _this.to4DArrays(imageData2);
        };
    };
    // Rearrange the image's pixelData to an interpretable format for the model
    FindModalPage.prototype.to4DArrays = function (image) {
        // Get a rgb array for the image's pixel values
        console.time("getImageData and turn into an array");
        var dataTyped = image.data; // Returns a UInt8TypedArray with r,g,b,a values
        var data = Array.prototype.slice.call(dataTyped); // Transforms the typed array to a normal array
        console.timeEnd("getImageData and turn into an array");
        console.log(data);
        console.time("Making4DArray");
        // New array with length 3 (rgb), skip over a value
        var arr = [];
        for (var i = 0; i < data.length; i += 4) {
            arr.push([data[i], data[i + 1], data[i + 2]]);
        }
        console.log(arr);
        // The 2D Array is transformed into 3D Array with dimension height x width
        var arr2 = [];
        for (var i = 0; i < arr.length; i += this.canvas.width) {
            arr2.push(arr.slice(i, i + this.canvas.width));
        }
        console.log(arr2);
        var arr3 = [];
        arr3.push(arr2); //Insert in new empty array. [[Image]]
        console.log(arr3);
        console.timeEnd("Making4DArray");
        this.send(arr3);
    };
    // Posting the image to our ML model
    FindModalPage.prototype.send = function (imageInfo) {
        var _this = this;
        // Define payload
        var datas = {
            "values": imageInfo
        };
        console.log(imageInfo);
        // Define header, add authorization details
        var headers = {
            "Connection": "keep-alive",
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": "Bearer " + this.token
        };
        this.http.post(this.urlServiceNew, datas, headers)
            .then(function (data) {
            console.log(data.status);
            console.log(data.data); // Data received by server
            console.log(data.headers);
            _this.res = data.data;
            _this.evaluate(); // As soon as server sends response, start evaluation
        })
            .catch(function (error) {
            console.log(error.status);
            console.log(error.error); // Error message as string
            console.log(error.headers);
        });
    };
    // Final evaluation of the proposed species from the service with the user's chosen species
    // Then posting the result to the CloudantDB
    FindModalPage.prototype.evaluate = function () {
        if (this.pictures[0]) {
            // Edit string so there is only the results left
            this.res = this.res.substring(39, this.res.length - 3);
            var r = this.res.split(', ');
            // Filling a dictionary with the classes and their values
            // Identifying the largest value and the corresponding class
            var results = {};
            var max = 0;
            var maxIndex = 0;
            for (var i = 0; i < this.classes.length; i++) {
                results[this.classes[i]] = parseFloat(r[i]);
                if (results[this.classes[i]] > max) {
                    maxIndex = i;
                    max = results[this.classes[i]];
                }
            }
            console.log(this.res);
            console.log("max class: " + this.classes[maxIndex]);
            console.log("max value: " + max);
            console.log(results);
            this.usrSpecies = this.usrSpecies.trim().replace(" ", "_");
            console.log("species: " + this.usrSpecies);
            // Fill body (JSON) for DB-Post request
            var body = "";
            body += "\"Uebereinstimmung\" : \"" + (this.usrSpecies == this.classes[maxIndex]) + "\"";
            body += ", \"Ergebnisse\" : { ";
            for (var i = 0; i < this.classes.length; i++) {
                body += " \"" + this.classes[i] + "\" : \"" + parseFloat(r[i]) + "\"";
                if (i < this.classes.length - 1) {
                    body += ",";
                }
            }
            body += "}";
            body += ", \"Vorschlag KI\" : \"" + this.classes[maxIndex] + "\"";
            body += ", \"Bilddatei\" : \"" + this.pictures[0] + "\"";
            body = "{" + body + "}";
            console.log(body);
            // Create alert to inform user about ML service chosen species
            this.alertCtrl.create({
                title: 'Foto klassifiziert',
                subTitle: 'Dein gesendetes Foto wurde von unserer KI als ' + this.classes[maxIndex].replace("_", " ") + ' klassifiziert.',
                buttons: ['Okay']
            }).present();
            // Send Post request to CloudantDB via Provider (-> in finding-modal.ts)
            this.findingModalProvider.sendEval(body).subscribe(function (data) {
                console.log(data);
            });
        }
        else {
            console.log("No photo taken, no data to be analyzed.");
        }
    };
    // Requesting and storing authentication token for ML service
    FindModalPage.prototype.getToken = function () {
        var _this = this;
        this.http.setDataSerializer('json');
        var headers = {
            "Authorization": "Basic " + btoa(this.usr + ":" + this.pw)
        };
        console.log((this.urlToken));
        this.http.get(this.urlToken, {}, headers)
            .then(function (data) {
            console.log(data.data);
            var res = data.data;
            _this.token = res.substring(10, res.length - 2);
            console.log(data.status);
        })
            .catch(function (error) {
            console.error(error.error);
        });
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('map'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"])
    ], FindModalPage.prototype, "mapElement", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('canvas'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"])
    ], FindModalPage.prototype, "canvasEl", void 0);
    FindModalPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-find-modal',template:/*ion-inline-start:"/Users/manuel/Documents/GitHub/butterflAI/src/pages/find-modal/find-modal.html"*/'<ion-header>\n\n  <ion-navbar>\n    <ion-title>\n      Art melden\n    </ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n<ion-content>\n\n  <ion-slides pager="true" (ionSlideDrag)="slideChanged()">\n\n    <ion-slide class="picture">\n      <div padding>\n        Mach ein Foto von der gefundenen Art!\n      </div>\n      <div padding>\n        <button [disabled]="pictureLimit" ion-button (click)="photoOption(null)">\n          <ion-icon name="camera"> Foto hinzufügen</ion-icon>\n        </button>\n        <div padding class="alert" *ngIf="pictureLimit">\n          Du kannst leider nur 5 Bilder hinzufügen. Tippe auf ein Bild, um es zu ändern oder zu löschen.\n        </div>\n      </div>\n      <div *ngIf="pictures[0]">\n        <p class="picture_head">Deine Bilder:</p>\n        <div class="pictureContainer">\n          <div class="pictures" *ngFor="let picture of pictures; let i = index">\n            <img src="{{ picture }}" #image (click)="alterPic(i ,image)">\n          </div>\n        </div>\n      </div>\n      <div class ="ion-canvas" style="display:none">\n        <canvas #canvas id="canvas" width="720px" height="576px"></canvas>\n      </div>\n    </ion-slide>\n\n    <!-- We need virtualScroll so that the 3665 displayed species won\'t affect the performance of the app -->\n    <ion-slide class="species">\n      <form [formGroup]="butterflyForm">\n        <div padding>\n          Welche Art hast Du gefunden?\n        </div>\n        <ion-item>\n          <ion-label stacked style="font-size: 1em;">Name der Art:<sup class="mandatory">*</sup></ion-label>\n          <select-searchable\n            item-content\n            [formControl]="butterflyForm.controls.species"\n            [hasVirtualScroll]="true"\n            [items]="species"\n            [canSearch]="true"\n            (onChange)="speciesChange($event)">\n          </select-searchable>\n        </ion-item>\n        <div padding class="speciesHelp">\n          <p style="font-size: 1.1em;">Falls Du dir nicht sicher bist, schau mal <a href="#"\n                                                         onclick="window.open(\'http://www.lepiforum.de/lepiwiki.pl\', \'_system\', \'location=yes\'); return false;">hier</a>\n            vorbei</p>\n        </div>\n      </form>\n    </ion-slide>\n\n    <ion-slide class="location">\n\n      <form [formGroup]="butterflyForm">\n        <div padding>\n          Sag uns, wo Du die Art gefunden hast!\n        </div>\n        <ion-item>\n          <ion-label stacked style="font-size: 1em;">Fundort:<sup class="mandatory">*</sup></ion-label>\n          <!-- when the user clicks into the location field, his location will be determined -->\n          <ion-input [readonly]="isReadonly()" placeholder="Tippe um einen Fundort auszuwählen"\n                     [formControl]="butterflyForm.controls[\'location_address\']" type="text"\n                     (tap)="getLocation()"></ion-input>\n        </ion-item>\n        <div class="alert" *ngIf="!butterflyForm.controls[\'location\'].valid && ionSlideNextStart">Das musst Du uns\n          verraten...\n        </div>\n        <ion-item>\n          <ion-label rows="3" maxlength="200" stacked style="font-size: 1em;">Bemerkung zum Fundort:</ion-label>\n          <ion-textarea [formControl]="butterflyForm.controls.location_comment" type="textarea"\n                        placeholder="Sag uns was zum genauen Fundort..."></ion-textarea>\n        </ion-item>\n      </form>\n    </ion-slide>\n\n    <ion-slide class="additionalInfo">\n      <form [formGroup]="butterflyForm">\n        <div padding>\n          Hast Du noch weitere Infos? Gerne kannst Du diese hier mit uns teilen!\n        </div>\n        <ion-item >\n          <ion-label stacked style="font-size: 1em;">Anzahl</ion-label>\n          <ion-input [ngClass]="{\'invalid\': !butterflyForm.controls[\'quantity\'].valid && butterflyForm.controls[\'quantity\'].dirty}" [formControl]="butterflyForm.controls.quantity" text-right type="number" min=1></ion-input>\n        </ion-item>\n\n        <ion-item>\n          <ion-label stacked style="font-size: 1em;">Stadium</ion-label>\n          <ion-select [formControl]="butterflyForm.controls.stadium" type="text" multiple="false" cancelText="Abbrechen"\n                      interface="popover">\n            <ion-option *ngFor="let stadium of stadiumData" [value]="stadium.value">{{stadium.text}}</ion-option>\n          </ion-select>\n        </ion-item>\n\n        <ion-item>\n          <ion-label stacked style="font-size: 1em;">Datum</ion-label>\n          <ion-datetime max="{{currentDate | date: \'yyyy-MM-dd\'}}" displayFormat="YYYY.MM.DD" [formControl]="butterflyForm.controls.date"></ion-datetime>\n        </ion-item>\n\n        <ion-item>\n          <ion-label stacked rows="3" maxlength="200" stacked style="font-size: 1em;">Bemerkung:</ion-label>\n          <ion-textarea [formControl]="butterflyForm.controls.comment" type="textarea"\n                        placeholder="Willst Du uns sonst noch etwas sagen?"></ion-textarea>\n        </ion-item>\n\n\n        <ion-row>\n          <ion-col text-center>\n            <button ion-button block [disabled]="!butterflyForm.valid" color="primary" (click)="submit()">\n              Senden\n            </button>\n          </ion-col>\n        </ion-row>\n\n      </form>\n\n    </ion-slide>\n\n\n  </ion-slides>\n</ion-content>\n'/*ion-inline-end:"/Users/manuel/Documents/GitHub/butterflAI/src/pages/find-modal/find-modal.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__angular_forms__["FormBuilder"],
            __WEBPACK_IMPORTED_MODULE_3__providers_finding_modal_finding_modal__["a" /* FindingModalProvider */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["ModalController"],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["ActionSheetController"],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["Platform"],
            __WEBPACK_IMPORTED_MODULE_5__providers_find_find__["a" /* FindProvider */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["ToastController"],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavController"],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["ViewController"],
            __WEBPACK_IMPORTED_MODULE_6_ionic_img_viewer__["a" /* ImageViewerController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["Keyboard"],
            __WEBPACK_IMPORTED_MODULE_7__providers_connectivity_service_connectivity_service__["a" /* Connectivity */],
            __WEBPACK_IMPORTED_MODULE_8__providers_google_maps_google_maps__["a" /* GoogleMaps */],
            __WEBPACK_IMPORTED_MODULE_9__ionic_storage__["b" /* Storage */],
            __WEBPACK_IMPORTED_MODULE_10__ionic_native_http__["a" /* HTTP */]])
    ], FindModalPage);
    return FindModalPage;
}());

//# sourceMappingURL=find-modal.js.map

/***/ })

},[307]);
//# sourceMappingURL=main.js.map