import {Component, ViewChild, ElementRef} from '@angular/core';
import {IonicPage, Keyboard, ModalController, NavController, Platform, ViewController} from 'ionic-angular';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {FindingModalProvider} from "../../providers/finding-modal/finding-modal";
import {SelectSearchableComponent} from "ionic-select-searchable";
import {ActionSheetController} from "ionic-angular";
import {LocationSelect} from "../location-select/location-select";
import {FindProvider} from "../../providers/find/find";
import {ToastController} from "ionic-angular";
import {ImageViewerController} from "ionic-img-viewer";
import {Connectivity} from "../../providers/connectivity-service/connectivity-service";
import {GoogleMaps} from "../../providers/google-maps/google-maps";
import {Storage} from "@ionic/storage";
import {Observable} from "rxjs/Rx";
import {HTTP} from '@ionic-native/http';

@IonicPage()
@Component({
  selector: 'page-find-modal',
  templateUrl: 'find-modal.html',
})
export class FindModalPage {

  @ViewChild('map') mapElement: ElementRef;
  @ViewChild('canvas') canvasEl : ElementRef;

  canvas : HTMLCanvasElement;
  ctx : any;
  token = "";
  urlToken = 'https://eu-gb.ml.cloud.ibm.com/v3/identity/token';
  // urlToken = 'https://eu-gb.ml.cloud.ibm.com/';
  // var urlService = 'https://ibm-watson-ml.mybluemix.net/v3/wml_instances/15ce63e2-7c61-44dc-b46a-a33220223e70/published_models/b3463e38-9539-49c6-8976-08e77ef57bfb/deployments/9a915e0c-a028-42b6-888c-6a4350b14f9a/online';
  // urlServiceNew = 'https://ibm-watson-ml.mybluemix.net/v3/wml_instances/15ce63e2-7c61-44dc-b46a-a33220223e70/published_models/b77ff1e4-8b01-4110-8470-72a63bc489ee/deployments/5418cdbb-4a6c-4b61-907b-21b900a23d10/online';
  urlServiceNew = 'https://eu-gb.ml.cloud.ibm.com/v3/wml_instances/d373b28e-5b23-4a49-a587-32dc98ee8216/deployments/499ada98-9775-4fb2-949c-6640b1d35f64/online';
  // usr = '0c758f90-e6c4-4df9-981b-aa2206dd2701';
  usr = '77c74ada-0a7a-422a-898b-7d64dc7f9e6a';
  // pw = 'bf97e385-f591-415e-8fc6-eb10c9564972';
  pw = '672caf0a-18df-4976-9ac5-20f57d1c2408';
  usrSpecies : String = '';

  //res = '{"fields": ["prediction"], "values": [[0.07892626523971558, 0.004959745332598686, 0.00044968651491217315, 0.05625692382454872, 0.029514044523239136, 0.8202618360519409, 0.0022929867263883352, 0.0037869028747081757, 9.162574860965833e-05, 0.0024810812901705503, 0.0009788612369447947]]}';
  res = '';

  classes = [
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
    "Vanessa_cardui"];

    species: any[];
    butterflyForm: FormGroup;
    stadiumData: any;
    speciesPicture: any;
    readOnly = true;
    pictures: any[] = [];
    pictureLimit: boolean;
    currentDate: Date = new Date();
    gpsLocation: any = {};
    selectedSpecies: string;

    constructor(private formBuilder: FormBuilder,
      private findingModalProvider: FindingModalProvider,
      private modalCtrl: ModalController,
      private alertCtrl: ActionSheetController,
      public platform: Platform,
      private findProvider: FindProvider,
      public toastCtrl: ToastController,
      public navCtrl: NavController,
      public viewCtrl: ViewController,
      public imgCtrl: ImageViewerController,
      private keyboard: Keyboard,
      private connectivity: Connectivity,
      private maps: GoogleMaps,
      private storage: Storage,
      private http: HTTP) {


        this.platform.ready().then(() => {


          /*this.findingModalProvider.getSpecies().subscribe(species => {
          this.species = species;
          console.log(species);
        });*/
        this.getToken();
        this.pictureLimit = false;

        this.butterflyForm = this.formBuilder.group({
          speciesPicture: [[null]],
          species: [null, Validators.required],
          location: [null, Validators.required],
          location_comment: [null],
          location_address: [null],
          quantity: [null, Validators.min(1)],
          stadium: [null],
          date: [this.currentDate.toLocaleDateString()],
          comment: [null]
        });

        this.stadiumData = [
          {text: "Imago", value: "imago"},
          {text: "Ei", value: "ei"},
          {text: "Larve", value: "larve"},
          {text: "Puppe", value: "puppe"},
          {text: "Totfund", value: "totfund"}
        ]
      });

      this.storage.get('species').then(species => {

        // if the species are persisted, they will be taken
        if (species) {
          this.species = species;
          console.log("DATA PERSIST");
          console.log(species);
        }

        // if there are no persisted species and the user is offline this alert will be displayed
        else if (this.connectivity.isOffline()) {
          console.log("DATA NOT PERSIST USER OFFLINE");
          this.alertCtrl.create({
            title: 'Hoppla!',
            subTitle: 'Du scheinst offline zu sein und hast dir die Arten noch nicht heruntergeladen. Bitte stelle eine Verbindung her und versuche es erneut.',
            buttons: ['Verstanden']
          }).present();
        }

        // if there are no persisted species and the user is online they will be retrieved from the server, persisted and displayed
        else if (!species && this.connectivity.isOnline()) {
          console.log("DATA NOT PERSIST RETRIEVING");
          this.findingModalProvider.getSpecies().subscribe(() => {
            this.storage.get('species').then(species => {
              this.species = species;
            });
          });
        }
      });


    }

    ionViewDidLoad() {

      console.log("ionViewDidLoad")
      this.viewCtrl.setBackButtonText("Abbrechen");
      //this.canvas 	    = this.canvasEl.nativeElement;
      this.canvas =  <HTMLCanvasElement> document.getElementById("canvas");
      this.canvas.width  	= 720;
      this.canvas.height 	= 576;

      this.initialiseCanvas();
    }

    initialiseCanvas(){
      if(this.canvas.getContext)
      {
        this.setupCanvas();
      }
    }

    setupCanvas() {
      this.ctx = this.canvas.getContext('2d');
      this.ctx.fillStyle = "red";
      this.ctx.fillRect(0, 0, 500, 500)
    }

    ionViewWillEnter() {

      //Watch the Network-Status of the user and display an appropriate message

      this.connectivity.watchOnline().subscribe(() => {
        console.log("---> connected");
        this.toastCtrl.create({
          message: "Verbindung hergestellt!",
          duration: 1000,
          position: 'top'
        }).present();
      });
      this.connectivity.watchOffline().subscribe(() => {
        console.log("---> not connected");
        this.toastCtrl.create({
          message: "Du bist jetzt offline... \nFalls Du Meldungen abschickst, schließe die App bitte nicht!",
          duration: 2000,
          position: 'top'
        }).present();
      });
    }

    slideChanged() {
      if (this.keyboard.isOpen()) {
        this.keyboard.close();
      }
    }

    photoOption(i) {
      let actionSheet = this.alertCtrl.create({
        title: 'Foto hinzufügen',
        buttons: [
          {
            text: 'Kamera',
            icon: !this.platform.is('ios') ? 'camera' : null,
            handler: () => {
              if(i) {
                this.pictures.splice(i,1);
                this.pictureLimit = false;
              }
              this.findingModalProvider.takePhoto(1).then((img) => {
                if (this.pictures.length >= 4) {
                  this.pictureLimit = true;
                } else {
                  this.pictures.push(img);
                  console.log(this.pictures);
                }
              });
            }
          },
          {
            text: 'Galerie',
            icon: !this.platform.is('ios') ? 'images' : null,
            handler: () => {
              if(i) {
                this.pictures.splice(i,1);
                this.pictureLimit = false;
              }
              this.findingModalProvider.takePhoto(0).then((img) => {
                if (this.pictures.length >= 4) {
                  console.log(this.pictures.length);
                  this.pictureLimit = true;
                } else {
                  this.pictures.push(img);
                  console.log(this.pictures);
                }
              });
            }
          },
          {
            text: 'Abbrechen',
            role: 'cancel', // will always sort to be on the bottom
            icon: !this.platform.is('ios') ? 'close' : null,
            handler: () => {
              console.log('Cancel clicked');
            }
          }
        ]
      });
      actionSheet.present();
    }

    // the user is able to delete, retake or view one of the images he took
    alterPic(i, image) {
      console.log("--> index: " + i);
      let alterPicSheet = this.alertCtrl.create({
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
            handler: () => {
              this.pictures.splice(i, 1);
            }
          },
          {
            text: 'Ändern',
            icon: !this.platform.is('ios') ? 'refresh' : null,
            handler: () => {
              this.pictures.splice(i, 1);
              this.photoOption(i);
            }
          },
          {
            text: 'Ansehen',
            icon: !this.platform.is('ios') ? 'eye' : null,
            handler: () => {
              this.imgCtrl.create(image).present();
            }
          },
          {
            text: 'Abbrechen',
            role: 'cancel', // will always sort to be on the bottom
            icon: !this.platform.is('ios') ? 'close' : null,
            handler: () => {
              console.log('Cancel clicked');
            }
          }
        ]
      });
      alterPicSheet.present();
    }

    getLocation() {
      if (this.connectivity.isOffline()) {
        console.log("OFFLINE");
        this.maps.gettOfflineLocation().then(location => {
          if (location) {

            this.toastCtrl.create({
              message: 'Du bist offline. Wir verwenden deinen aktuellen Standort.',
              duration: 2000,
              position: 'top'
            }).present();

            this.gpsLocation = location;
            console.log(JSON.stringify(location));
            this.readOnly = false;
            this.butterflyForm.patchValue({location: (this.gpsLocation.lat + ', ' + this.gpsLocation.lng)}); // if overview map is implemented change to 'lat: location.lat...'
            this.butterflyForm.patchValue({location_address: (this.gpsLocation.lat + ', ' + this.gpsLocation.lng)});
            this.readOnly = true;
          } else {
            console.log("--> Offline location not recieved");
          }
        });
      } else {
        this.launchLocationPage();
      }
    }

    launchLocationPage() {

      let modal = this.modalCtrl.create(LocationSelect);

      modal.onDidDismiss((location) => {

        console.log("--> dismiss location: " + JSON.stringify(location));

        if (location != null) {

          this.readOnly = false;
          this.butterflyForm.patchValue({location: (location.lat + ', ' + location.lng)}); // if overview map is implemented change to 'lat: location.lat...'
          this.butterflyForm.patchValue({location_address: location.address});
          this.readOnly = true;

        }

      });

      modal.present();

    }

    speciesChange(event: { component: SelectSearchableComponent, value: any }) {
      this.selectedSpecies = event.value.toLowerCase().replace(" ", "_");
      this.selectedSpecies = ['http://www.lepiforum.de/lepiwiki.pl?', this.selectedSpecies].join('');
      console.log('species:', this.selectedSpecies);
      console.log(event.value);
    }


    submit() {

      console.log(this.butterflyForm.value);

      this.usrSpecies = this.butterflyForm.controls['species'].value;
      if  (this.pictures[0]) { // if exists
        // Put image on canvas, start the classification process
        this.classify(this.pictures[0]);
      }
      // the taken pictures are patched into the formControl
      this.butterflyForm.patchValue({speciesPicture: this.pictures});

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
      }).then((resolve) => {
        console.log("--> submit Resolve: " + resolve);
        this.toastCtrl.create({
          message: 'Du hast deinen Schmetterling erfolgreich gemeldet!',
          duration: 3000,
          position: 'top'
        }).present();
        this.navCtrl.setRoot('HomePage');
      });
    }

    isReadonly() {
      return this.readOnly;
    }

    // Start the classification by first creating a canvas and reading the image's pixel value from said canvas
    classify(image) {
      var image2 = new Image();
      image2.src = image;
      image2.onload = () => {
        this.ctx.drawImage(image2, 0, 0, image2.width, image2.height, 0, 0, this.canvas.width, this.canvas.height);
        var imageData2 = this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height);
        this.to4DArrays(imageData2);
      }
    }

    // Rearrange the image's pixelData to an interpretable format for the model
    to4DArrays(image) {
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
        arr.push([data[i], data[i+1], data[i+2]]);
      }
      console.log(arr);

      // The 2D Array is transformed into 3D Array with dimension height x width
      var arr2 = [];
      for (var i = 0; i < arr.length; i += this.canvas.width) {
        arr2.push(arr.slice(i, i+this.canvas.width));
      }

      console.log(arr2);

      var arr3 = [];
      arr3.push(arr2); //Insert in new empty array. [[Image]]

      console.log(arr3);
      console.timeEnd("Making4DArray");

      this.send(arr3);
    }

    // Posting the image to our ML model
    send(imageInfo) {
      // Define payload
      var datas : any = {
        "values": imageInfo
      };
      console.log(imageInfo);

      // Define header, add authorization details
      var headers : any = {
        "Connection": "keep-alive",
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Authorization": "Bearer " + this.token
      };

      this.http.post(this.urlServiceNew, datas, headers)
      .then (data => {
        console.log(data.status);
        console.log(data.data); // Data received by server
        console.log(data.headers);
        this.res = data.data;
        this.evaluate(); // As soon as server sends response, start evaluation
      })
      .catch (error => {
        console.log(error.status);
        console.log(error.error); // Error message as string
        console.log(error.headers);

      });
    }

    // Final evaluation of the proposed species from the service with the user's chosen species
    // Then posting the result to the CloudantDB
    evaluate() {
      if (this.pictures[0]) {
        // Edit string so there is only the results left
        this.res = this.res.substring(39,this.res.length-3);
        var r  = this.res.split(', ');

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
        console.log("max class: "+ this.classes[maxIndex]);
        console.log("max value: " + max);
        console.log(results);

        this.usrSpecies = this.usrSpecies.trim().replace(" ", "_");
        console.log("species: "+ this.usrSpecies);

        // Fill body (JSON) for DB-Post request
        var body = "";
        body += "\"Uebereinstimmung\" : \"" + (this.usrSpecies == this.classes[maxIndex]) + "\"";
        body += ", \"Ergebnisse\" : { "

        for (var i = 0; i < this.classes.length; i++) {
          body += " \""+ this.classes[i] + "\" : \"" + parseFloat(r[i]) + "\"";
          if (i <this.classes.length-1) {
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
          subTitle: 'Dein gesendetes Foto wurde von unserer KI als '+ this.classes[maxIndex].replace("_", " ") + ' klassifiziert.',
          buttons: ['Okay']
        }).present();

        // Send Post request to CloudantDB via Provider (-> in finding-modal.ts)
        this.findingModalProvider.sendEval(body).subscribe(
          data => {
            console.log(data);
          }
        );
      }
      else {
        console.log("No photo taken, no data to be analyzed.");
      }
    }

    // Requesting and storing authentication token for ML service
    getToken() {
      this.http.setDataSerializer('json');
      var headers : any = {
        "Authorization": "Basic " + btoa(this.usr+":"+this.pw)
      }

      console.log((this.urlToken));

      this.http.get(this.urlToken, {}, headers)
      .then(data => {
        console.log(data.data);
        var res = data.data;
        this.token = res.substring(10, res.length-2);
        console.log(data.status);
      })
      .catch(error => {
        console.error(error.error);
      });
    }



  }
