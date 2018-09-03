webpackJsonp([1],{

/***/ 519:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RegisterPageModule", function() { return RegisterPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__register__ = __webpack_require__(521);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var RegisterPageModule = /** @class */ (function () {
    function RegisterPageModule() {
    }
    RegisterPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__register__["a" /* RegisterPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["IonicPageModule"].forChild(__WEBPACK_IMPORTED_MODULE_2__register__["a" /* RegisterPage */]),
            ],
        })
    ], RegisterPageModule);
    return RegisterPageModule;
}());

//# sourceMappingURL=register.module.js.map

/***/ }),

/***/ 521:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RegisterPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_profil_data_profil_data__ = __webpack_require__(167);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var RegisterPage = /** @class */ (function () {
    function RegisterPage(formBuilder, profilProvider, navCtrl, keyboard) {
        this.formBuilder = formBuilder;
        this.profilProvider = profilProvider;
        this.navCtrl = navCtrl;
        this.keyboard = keyboard;
        this.regexEmail = ".*@.*\\..*";
        this.regexPassword = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[#$^+=!*()@%&\\.,]).{8,16}$";
        this.regexWordCharacter = "[a-zA-Z]*";
        this.registerForm = this.formBuilder.group({
            email: ['',
                __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].compose([
                    __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].pattern(this.regexEmail),
                    __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].required
                ])],
            password: ['',
                __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].compose([
                    __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].pattern(this.regexPassword),
                    __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].required
                ])],
            firstName: ['',
                __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].compose([
                    __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].pattern(this.regexWordCharacter),
                    __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].required
                ])],
            lastName: ['',
                __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].compose([
                    __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].pattern(this.regexWordCharacter),
                    __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].required
                ])],
            street: [''],
            zipcode: [''],
            place: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].pattern(this.regexWordCharacter)],
            gdpr: [false, __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].required]
        });
    }
    RegisterPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad RegisterPage');
    };
    RegisterPage.prototype.slideChanged = function () {
        if (this.keyboard.isOpen()) {
            this.keyboard.close();
        }
    };
    RegisterPage.prototype.register = function () {
        this.profilProvider.register(this.registerForm);
    };
    RegisterPage.prototype.pushGDPR = function () {
        this.navCtrl.push('InfoModalPage', { title: 'Datenschutz' });
    };
    RegisterPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-register',template:/*ion-inline-start:"/Users/manuel/Documents/GitHub/butterflAI/src/pages/register/register.html"*/'<!--\n  Generated template for the RegisterPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar>\n    <ion-title>Erstelle Deinen Account</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n<ion-content padding>\n\n  <ion-slides pager="true" (ionSlideDrag)="slideChanged()">\n\n    <ion-slide>\n\n      <p>Als aller erstes musst Du eine gültige Email und ein Passwort vergeben.</p>\n\n      <form [formGroup]="registerForm">\n\n        <ion-item>\n          <ion-label floating>\n            Email:<sup class="mandatory">*</sup>\n          </ion-label>\n          <ion-input [formControl]="registerForm.controls[\'email\']" type="text"></ion-input>\n        </ion-item>\n\n        <div *ngIf="!registerForm.controls.email.valid && registerForm.controls.email.dirty"\n             class="validator-error">\n          Bitte gib eine gültige Email ein.\n        </div>\n\n        <ion-item>\n          <ion-label floating>\n            Passwort:<sup class="mandatory">*</sup>\n          </ion-label>\n          <ion-input [formControl]="registerForm.controls[\'password\']" type="password"></ion-input>\n        </ion-item>\n\n        <div\n          *ngIf="!registerForm.controls.password.valid && registerForm.controls.password.dirty"\n          class="validator-error">\n          Das Passwort muss zwischen 8 und 16 Zeichen lang sein, einen Groß- und Kleinbuchstaben, eine Zahl sowie ein\n          Sonderzeichen enthalten.\n        </div>\n\n        <div padding class="gdpr">\n          <div class="gdpr-checkbox">\n            <ion-checkbox padding [formControl]="registerForm.controls[\'gdpr\']"></ion-checkbox>\n          </div>\n          <div class="gdpr-text">\n            <p>Hiermit willige ich in die bestehenden <a (click)="pushGDPR()">Datenschutzbestimmungen</a> ein.<sup class="mandatory">*</sup></p>\n          </div>\n        </div>\n\n\n      </form>\n\n    </ion-slide>\n\n    <ion-slide>\n\n      <p>Zur besseren Verarbeitung deiner Meldungen müssen wir wissen, wer Du bist.</p>\n\n      <form [formGroup]="registerForm">\n\n        <ion-item>\n          <ion-label floating>\n            Vorname:<sup class="mandatory">*</sup>\n          </ion-label>\n          <ion-input [formControl]="registerForm.controls[\'firstName\']" type="text"></ion-input>\n        </ion-item>\n\n        <div\n          *ngIf="!registerForm.controls.firstName.valid && registerForm.controls.firstName.dirty"\n          class="validator-error">\n          Dein Vorname sollte nur Buchstaben enthalten.\n        </div>\n\n        <ion-item>\n          <ion-label floating>\n            Nachname:<sup class="mandatory">*</sup>\n          </ion-label>\n          <ion-input [formControl]="registerForm.controls[\'lastName\']" type="text"></ion-input>\n        </ion-item>\n\n        <div\n          *ngIf="!registerForm.controls.lastName.valid && registerForm.controls.lastName.dirty"\n          class="validator-error">\n          Dein Nachname sollte nur Buchstaben enthalten.\n        </div>\n\n      </form>\n\n    </ion-slide>\n\n    <ion-slide>\n\n      <p>Wenn Du willst, kannst Du uns auch noch deine Adresse verraten. :)</p>\n\n      <form [formGroup]="registerForm">\n\n        <ion-item>\n          <ion-label floating>\n            Straße:\n          </ion-label>\n          <ion-input [formControl]="registerForm.controls[\'street\']" type="text"></ion-input>\n        </ion-item>\n\n        <ion-item>\n          <ion-label floating>\n            Postleitzahl:\n          </ion-label>\n          <ion-input [formControl]="registerForm.controls[\'zipcode\']" type="tel" maxlength="5" minlength="5"></ion-input>\n        </ion-item>\n\n        <ion-item>\n          <ion-label floating>\n            Ort:\n          </ion-label>\n          <ion-input [formControl]="registerForm.controls[\'place\']" type="text"></ion-input>\n        </ion-item>\n\n        <div\n          *ngIf="!registerForm.controls.place.valid && registerForm.controls.place.dirty && registerForm.controls.place.touched"\n          class="validator-error">\n          Der Ort sollte nur Buchstaben enthalten.\n        </div>\n\n        <ion-row>\n          <ion-col text-center>\n            <button ion-button block [disabled]="!registerForm.valid" color="primary" (click)="register()">\n              Registrieren\n            </button>\n          </ion-col>\n        </ion-row>\n\n      </form>\n    </ion-slide>\n\n  </ion-slides>\n\n</ion-content>\n'/*ion-inline-end:"/Users/manuel/Documents/GitHub/butterflAI/src/pages/register/register.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__angular_forms__["FormBuilder"],
            __WEBPACK_IMPORTED_MODULE_3__providers_profil_data_profil_data__["a" /* ProfilDataProvider */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavController"],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["Keyboard"]])
    ], RegisterPage);
    return RegisterPage;
}());

//# sourceMappingURL=register.js.map

/***/ })

});
//# sourceMappingURL=1.js.map