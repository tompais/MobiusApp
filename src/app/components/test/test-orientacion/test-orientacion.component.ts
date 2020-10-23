import { Component, ElementRef, OnInit, ViewChild, ɵConsole } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { NativeGeocoderOptions, NativeGeocoder, NativeGeocoderResult } from '@ionic-native/native-geocoder/ngx';
import { OrientacionService } from 'src/app/services/test/orientacion.service';
import { Answer } from '../../commons/models/commons/Answer';
import { TaskAnswer } from '../../commons/models/commons/TaskAnswer';
import { ErrorServicio } from '../../commons/models/errors/ErrorServicio';
import { ErrorServicioGrupo } from '../../commons/models/errors/ErrorServicioGrupo';
import { OrientacionRequest } from '../../commons/models/test/orientacion/orientacionRequest';
import { OrientacionResponse } from '../../commons/models/test/orientacion/OrientacionResponse';

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
  retorno = true;
  task: TaskAnswer<boolean> = null;
  answer: Answer<boolean> = null;
  cargando = false;
  errorCode = false;
  erroresServicio: ErrorServicioGrupo = null;
  orientacion: OrientacionResponse[] = null;
  /*constructor(
    private geolocation: Geolocation,
    private nativeGeocoder: NativeGeocoder) {
  }*/

  constructor(public orientacionService: OrientacionService, public router: Router) {
  }


  ngOnInit() {
    this.orientacionRequest = new OrientacionRequest();
    this.task = new TaskAnswer<boolean>();
    this.task.answers = new Array<boolean>();
    this.answer = new Answer<boolean>();
    this.orientacion = new Array<OrientacionResponse>();
    // this.erroresServicio.errores.push(new ErrorServicio('testOrientacionEnvio', true, '', false, 'Test Orientacion'));
    this.getOrientacion();
    // this.loadMap();
  }

  eventoError(error: ErrorServicio) {
    // tslint:disable-next-line: prefer-const
    let form: NgForm;
    switch (error.id) {
      case 'testOrientacionEnvio':
         this.enviarDatosOrientacion(form);
         break;
      default:
        break;
    }
  }

  enviarDatosOrientacion(form: NgForm) {
    const errorSrv = this.erroresServicio.obtenerErrorServicio('testOrientacion');
    errorSrv.nuevoRequest();
    if (form.invalid) {
      this.retorno = false;
    } else {
      this.cargando = true;
      this.orientacionRequest.gameId = 1;
      this.orientacionRequest.category = 'orientation';
      this.task.taskId = 1;
      // this.task.answers.push(this.orientacionRequest.respuestasCorrectas);
      this.task.answers.push(true);
      this.orientacionRequest.taskAnswers.push(this.task);
      JSON.stringify(this.orientacionRequest);
      this.orientacionService.orientacion(this.orientacionRequest).subscribe((resp: any) => {
        // tslint:disable-next-line: no-shadowed-variable
        errorSrv.procesarRespuesta(resp, (resp: any): void => {
          resp.response.forEach((or: OrientacionResponse) => {
            this.cargando = false;
            this.errorCode = false;
            if (this.errorCode === false) {
              this.router.navigate(['/test/introduccion']);
            }
        });
      });
      }, (error: Error) => {
        this.cargando = false;
        this.errorCode = true;
      });
      this.retorno = true;
    }
  }

  getOrientacion() {
    /*const errorSrv = this.erroresServicio.obtenerErrorServicio('testOrientacion');
    errorSrv.nuevoRequest();*/
    this.orientacionService.getOrientacion().subscribe((resp: any) => {
      // errorSrv.procesarRespuesta(resp, (resp: any): void => {
       // resp.response.forEach((or: OrientacionResponse) => {
          const orientacion: OrientacionResponse = new OrientacionResponse();
          orientacion.id = resp.id;
          this.orientacion.push(orientacion);
      //  });
     // });
    }, (error: Error) => {
      this.cargando = false;
      this.errorCode = true;
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
