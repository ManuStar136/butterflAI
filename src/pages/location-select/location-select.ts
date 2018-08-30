import { Platform, ViewController } from 'ionic-angular';
import { Component, ElementRef, ViewChild, NgZone } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation';
import { GoogleMaps } from '../../providers/google-maps/google-maps';

declare var google;

@Component({
  selector: 'page-location-select',
  templateUrl: 'location-select.html'
})
export class LocationSelect {

  @ViewChild('map') mapElement: ElementRef;
  @ViewChild('pleaseConnect') pleaseConnect: ElementRef;

  latitude: number;
  longitude: number;
  autocompleteService: any;
  placesService: any;
  query: string = '';
  places: any = [];
  searchDisabled: boolean;
  saveDisabled: boolean;
  location: any;
  spinner: boolean;

  constructor(public zone: NgZone,
              public maps: GoogleMaps,
              public platform: Platform,
              public geolocation: Geolocation,
              public viewCtrl: ViewController) {

    this.searchDisabled = true;
    this.saveDisabled = true;
  }

  ionViewDidLoad(): void {

    let mapLoaded = this.maps.init(this.mapElement.nativeElement, this.pleaseConnect.nativeElement).then(() => {

      console.log("---> initiated map")
      this.autocompleteService = new google.maps.places.AutocompleteService();
      this.searchDisabled = false;
      this.saveDisabled = false;
      console.log("search: " + this.searchDisabled + "save: " + this.saveDisabled);

    });

  }

  selectPlace(place){

    var infoWindow = new google.maps.InfoWindow;

    this.places = [];
    this.spinner = false;

    let location = {
      lat: 0,
      lng: 0,
      address: ''
    };

    this.placesService = new google.maps.places.PlacesService(this.maps.map);

    this.placesService.getDetails({placeId: place.place_id}, (details) => {

      this.zone.run(() => {

        location.lat = details.geometry.location.lat();
        location.lng = details.geometry.location.lng();
        location.address = details.formatted_address;

        this.maps.map.setCenter({lat: location.lat, lng: location.lng});

        this.location = location;
        console.log("initial location via geoLocation: " + JSON.stringify(this.location));

        // This address will be displayed in the location field of 'find-modal.ts'
        console.log("address formatted: " + details.formatted_address);
        console.log("address : " + details.address);

        // add a Marker to the user specified location
        this.maps.addMarker(this.location, details.formatted_address);

      });

    });

  }

  searchPlace(){

    if(this.query.length > 0 && !this.searchDisabled) {

      this.spinner = true;

      let config = {
        types: ['geocode'],
        input: this.query
      }

      this.autocompleteService.getPlacePredictions(config, (predictions, status) => {

        if(status == google.maps.places.PlacesServiceStatus.OK && predictions){

          this.places = [];

          predictions.forEach((prediction) => {
            this.places.push(prediction);
          });
        }

      });

    } else {
      this.places = [];
    }

  }

  save(){
    if(this.location == null){
      this.viewCtrl.dismiss(this.maps.location);
    } else {
      this.viewCtrl.dismiss(this.location);
    }
  }

  close(){
    this.viewCtrl.dismiss();
  }

}
