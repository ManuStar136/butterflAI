import {Component} from '@angular/core';
import {IonicPage, NavController, Keyboard} from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ProfilDataProvider } from "../../providers/profil-data/profil-data";

/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  private registerForm: FormGroup;
  private regexEmail: string | RegExp = ".*@.*\\..*";
  private regexPassword: string | RegExp = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[#$^+=!*()@%&\\.,]).{8,16}$";
  private regexWordCharacter: string | RegExp = "[a-zA-Z]*";

  constructor(private formBuilder: FormBuilder,
              private profilProvider: ProfilDataProvider,
              public navCtrl: NavController,
              public keyboard: Keyboard) {



    this.registerForm = this.formBuilder.group({
      email: ['',
        Validators.compose([
          Validators.pattern(this.regexEmail),
          Validators.required
        ])],
      password: ['',
        Validators.compose([
          Validators.pattern(this.regexPassword),
          Validators.required
        ])],
      firstName: ['',
        Validators.compose([
          Validators.pattern(this.regexWordCharacter),
          Validators.required
        ])],
      lastName: ['',
        Validators.compose([
          Validators.pattern(this.regexWordCharacter),
          Validators.required
        ])],
      street: [''],
      zipcode: [''],
      place: ['', Validators.pattern(this.regexWordCharacter)],
      gdpr: [false, Validators.required]
    });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

  slideChanged() {
    if(this.keyboard.isOpen()) {
      this.keyboard.close();
    }
  }

  register() {
    this.profilProvider.register(this.registerForm);
  }

  pushGDPR() {
    this.navCtrl.push('InfoModalPage', {title: 'Datenschutz'});
  }

}
