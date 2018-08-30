import {Injectable} from '@angular/core';
import {Geolocation} from '@ionic-native/geolocation';
import {Connectivity} from "../connectivity-service/connectivity-service";

declare var google;

@Injectable()
export class GoogleMaps {

  mapElement: any;
  pleaseConnect: any;
  map: any;
  mapInitialised: boolean = false;
  markers = [];
  apiKey: string = "AIzaSyCb7jm8ebxxv5VT2JsuYLGO4N6ga2g_2_g";
  location: any = {};

  constructor(public connectivityService: Connectivity,
              public geolocation: Geolocation) {

  }

  gettOfflineLocation() {
      return new Promise(resolve => {
        this.geolocation.getCurrentPosition().then(position => {
          this.location.lat = position.coords.latitude;
          this.location.lng = position.coords.longitude;
          resolve(this.location);
        });
    });
  }

  init(mapElement: any, pleaseConnect: any): Promise<any> {

    this.mapElement = mapElement;
    this.pleaseConnect = pleaseConnect;

    return this.loadGoogleMaps();

  }

  loadGoogleMaps(): Promise<any> {

    return new Promise((resolve) => {

      if (typeof google == "undefined" || typeof google.maps == "undefined") {

        console.log("Google maps JavaScript needs to be loaded.");
        this.disableMap();

        if (this.connectivityService.isOnline()) {

          window['mapInit'] = () => {

            this.initMap().then(() => {
              resolve(true);
            });

            this.enableMap();
          }

          let script = document.createElement("script");
          script.id = "googleMaps";

          if (this.apiKey) {
            script.src = 'http://maps.google.com/maps/api/js?key=' + this.apiKey + '&callback=mapInit&libraries=places';
          } else {
            script.src = 'http://maps.google.com/maps/api/js?callback=mapInit';
          }

          document.body.appendChild(script);

        }
      } else {

        if (this.connectivityService.isOnline()) {
          this.initMap();
          this.enableMap();
        }
        else {
          this.disableMap();
        }

        resolve(true);

      }

      this.addConnectivityListeners();

    });

  }

  initMap(): Promise<any> {

    this.mapInitialised = true;

    return new Promise((resolve) => {

      this.geolocation.getCurrentPosition().then((position) => {

        let latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

        let mapOptions = {
          center: latLng,
          zoom: 15,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        }

        let location = {
          lat: 0,
          lng: 0,
          address: ''
        }

        this.map = new google.maps.Map(this.mapElement, mapOptions);
        resolve(true);

        google.maps.event.addListenerOnce(this.map, 'idle', () => {
          this.addMarker({lat: latLng.lat(), lng: latLng.lng()}, null);
          location.lat = latLng.lat();
          location.lng = latLng.lng();
          this.getAddress(latLng).then(resolvedAddress => {
            location.address = resolvedAddress.toString();
            this.location = location;
            console.log("--> init loc: " + JSON.stringify(this.location))
          });
        });

        google.maps.event.addListener(this.map, 'click', (userTap) => {

          console.log("---> map clicked");
          this.getAddress(userTap.latLng).then(resolvedAddress => {
            this.addMarker({lat: userTap.latLng.lat(), lng: userTap.latLng.lng()}, resolvedAddress);
            this.location.lat = userTap.latLng.lat();
            this.location.lng = userTap.latLng.lng();
            this.location.address = resolvedAddress;
            console.log("--> location: " + JSON.stringify(this.location));
          });


        });

      });

    });

  }

  addMarker(location, selectedAddress) {

    console.log(this.markers);

    for (var c = 0; c < this.markers.length; c++) {
      this.markers[c].setMap(null);
    }


    var infoWindow = new google.maps.InfoWindow;

    let marker = new google.maps.Marker({
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
    google.maps.event.addListener(marker, 'dragend', () => {
      console.log("dragged, new position: " + marker.getPosition());
      location.lat = marker.getPosition().lat();
      location.lng = marker.getPosition().lng();


      // async call to get the formatted address of the new location
      this.getAddress(location).then((resolvedAddress) => {

        location.address = resolvedAddress;

        infoWindow.setContent(resolvedAddress);
        infoWindow.open(this.map, marker);

        this.location = location;
        console.log("--> markerlocation: " + JSON.stringify(this.location))

      });

    });
    this.markers.push(marker);

  }


  getAddress(location) {

    return new Promise(resolve => {

      var geoCoder = new google.maps.Geocoder;

      geoCoder.geocode({location: location}, (results, status) => {
        if (status === 'OK') {
          if (results[1]) {

            resolve(results[1].formatted_address);

          } else {
            window.alert("no results found");
          }
        } else {
          window.alert("Geocoder failed due to: " + status);
        }
      });

    })

  }

  disableMap(): void {

    if (this.pleaseConnect) {
      this.pleaseConnect.style.display = "block";
    }

  }

  enableMap(): void {

    if (this.pleaseConnect) {
      this.pleaseConnect.style.display = "none";
    }

  }

  addConnectivityListeners(): void {

    this.connectivityService.watchOnline().subscribe(() => {

      setTimeout(() => {

        if (typeof google == "undefined" || typeof google.maps == "undefined") {
          this.loadGoogleMaps();
        }
        else {
          if (!this.mapInitialised) {
            this.initMap();
          }

          this.enableMap();
        }

      }, 2000);

    });

    this.connectivityService.watchOffline().subscribe(() => {

      this.disableMap();

    });

  }

}
