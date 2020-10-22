import { Component, ElementRef, OnInit, ViewChild, ɵConsole } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { NativeGeocoderOptions, NativeGeocoder, NativeGeocoderResult } from '@ionic-native/native-geocoder/ngx';
import { OrientacionService } from 'src/app/services/test/orientacion.service';
import { Answer } from '../../commons/models/commons/Answer';
import { TaskAnswer } from '../../commons/models/commons/TaskAnswer';
import { OrientacionRequest } from '../../commons/models/test/orientacion/orientacionRequest';

declare var google;

@Component({
  selector: 'app-test-orientacion',
  templateUrl: './test-orientacion.component.html',
  styleUrls: ['./test-orientacion.component.scss'],
})
export class TestOrientacionComponent implements OnInit {

  orientacionRequest: OrientacionRequest;

 /* locationWatchStarted: boolean;
  locationSubscription: any;

  locationTraces = [];

  constructor(private geolocation: Geolocation) { }

  ngOnInit() {
   this.getCoordinates();
  }

  getCoordinates() {
    this.geolocation.getCurrentPosition().then((resp) => {

      this.locationTraces.push({
        latitude: resp.coords.latitude,
        longitude: resp.coords.latitude,
        accuracy: resp.coords.accuracy,
        timestamp: resp.timestamp
      });

    }).catch((error) => {
      console.log('Error getting location', error);
    });

    this.locationSubscription = this.geolocation.watchPosition();
    this.locationSubscription.subscribe((resp) => {

      this.locationWatchStarted = true;
      this.locationTraces.push({
        latitude: resp.coords.latitude,
        longitude: resp.coords.latitude,
        accuracy: resp.coords.accuracy,
        timestamp: resp.timestamp
      });

    });
  }*/

  @ViewChild('map', { static: false }) mapElement: ElementRef;
  map: any;
  address: string;

  latitude: number;
  longitude: number;

  /*constructor(
    private geolocation: Geolocation,
    private nativeGeocoder: NativeGeocoder) {
  }*/

  constructor(public orientacionService: OrientacionService) {
  }


  ngOnInit() {
    this.orientacionRequest = new OrientacionRequest();
    this.getOrientacion();
    // this.loadMap();
  }

  getOrientacion() {
    let task: TaskAnswer<boolean> = null;
    let answer: Answer<boolean> = null;
    this.orientacionRequest.gameId = 1;
    this.orientacionRequest.category = 'orientation';
    task = new TaskAnswer<boolean>();
    answer = new Answer();
    answer.valor = true;
    task.taskId = 1;
    task.answers = new Array<boolean>();
    answer.valor = true;
    task.answers.push(true);
    this.orientacionRequest.taskAnswers.push(task);
    JSON.stringify(this.orientacionRequest);
    this.orientacionService.orientacion(this.orientacionRequest)
      .subscribe((resp: any) => {
      }, (error: Error) => {
      });
  }

  /*loadMap() {
    this.geolocation.getCurrentPosition().then((resp) => {

      this.latitude = resp.coords.latitude;
      this.longitude = resp.coords.longitude;

      const latLng = new google.maps.LatLng(resp.coords.latitude, resp.coords.longitude);
      const mapOptions = {
        center: latLng,
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      };

      this.getAddressFromCoords(resp.coords.latitude, resp.coords.longitude);

      this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);

      this.map.addListener('dragend', () => {

        this.latitude = this.map.center.lat();
        this.longitude = this.map.center.lng();

        this.getAddressFromCoords(this.map.center.lat(), this.map.center.lng());
      });

    }).catch((error) => {
      console.log('Error getting location', error);
    });
  }

  getAddressFromCoords(lattitude, longitude) {
    console.log('getAddressFromCoords ' + lattitude + ' '  + longitude);
    const options: NativeGeocoderOptions = {
      useLocale: true,
      maxResults: 5
    };

    this.nativeGeocoder.reverseGeocode(lattitude, longitude, options)
      .then((result: NativeGeocoderResult[]) => {
        this.address = '';
        const responseAddress = [];
        for (const [key, value] of Object.entries(result[0])) {
          if (value.length > 0) {
            responseAddress.push(value);
          }

        }
        responseAddress.reverse();
        for (const value of responseAddress) {
          this.address += value + ', ';
        }
        this.address = this.address.slice(0, -2);
      })
      .catch((error: any) => {
        this.address = 'Address Not Available!';
      });

  }*/


}
