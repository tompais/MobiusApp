import { Component, ElementRef, OnInit, ViewChild, ɵConsole } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { NativeGeocoderOptions, NativeGeocoder, NativeGeocoderResult } from '@ionic-native/native-geocoder/ngx';
import { OrientacionService } from 'src/app/services/test/orientacion.service';
import { Answer } from '../../commons/models/commons/Answer';
import { GameCategoryResponse } from '../../commons/models/commons/GameCategoryResponse';
import { Inputs } from '../../commons/models/commons/Inputs';
import { PatientTaskAnswersList } from '../../commons/models/commons/PatientTaskAnswersList';
import { Tasks } from '../../commons/models/commons/Tasks';
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
  patientTaskAnswersList: PatientTaskAnswersList<boolean> = null;
  answer: Answer<boolean> = null;
  cargando = false;
  errorCode = false;
  erroresServicio: ErrorServicioGrupo = null;
  orientacion: GameCategoryResponse[] = null;
  ori: GameCategoryResponse = null;
  tasks: Tasks[] = null;
  /*constructor(
    private geolocation: Geolocation,
    private nativeGeocoder: NativeGeocoder) {
  }*/

  constructor(public orientacionService: OrientacionService, public router: Router) {
  }


  ngOnInit() {
    this.orientacionRequest = new OrientacionRequest();
    this.patientTaskAnswersList = new PatientTaskAnswersList<boolean>();
    this.patientTaskAnswersList.patientAnswers = new Array<boolean>();
    this.answer = new Answer<boolean>();
    this.orientacion = new Array<GameCategoryResponse>();
    this.ori = new GameCategoryResponse();
    this.tasks = new Array<Tasks>();
    this.erroresServicio = new ErrorServicioGrupo();
    this.erroresServicio.errores.push(new ErrorServicio('testOrientacionEnvio', true, '', false, 'Test Orientacion Envio'));
    this.erroresServicio.errores.push(new ErrorServicio('testOrientacion', true, '', false, 'Test Orientacion Consulta'));
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
      case 'testOrientacion':
        this.getOrientacion();
        break;
      default:
        break;
    }
  }

  enviarDatosOrientacion(form: NgForm) {
    const errorSrv = this.erroresServicio.obtenerErrorServicio('testOrientacionEnvio');
    errorSrv.nuevoRequest();
    if (form.invalid) {
      this.retorno = false;
    } else {
      this.cargando = true;
      this.orientacionRequest.gameId = 1;
      this.orientacionRequest.category = 'orientation';
      for (let tas of this.ori.tasks) {
        const task: PatientTaskAnswersList<boolean> = new PatientTaskAnswersList<boolean>();
        task.patientAnswers = new Array<boolean>();
        task.taskId = tas.id;
        task.patientAnswers.push(true);
        // this.task.taskId = tas.id;
        this.orientacionRequest.patientTaskAnswersList.push(task);
      }

      /*this.ori.tasks.forEach(element => {
        this.task.taskId = element.id;
        this.orientacionRequest.taskAnswers.push(this.task);
      });*/
      /*this.ori.tasks.forEach((task: Tasks) => {
        this.task.taskId = task.id;
        this.orientacionRequest.taskAnswers.push(this.task);
      });*/
      // this.task.answers.push(true);
      // this.orientacionRequest.taskAnswers.push(this.task);
      JSON.stringify(this.orientacionRequest);
      console.log('JSON ENVIO DATOS');
      console.log(JSON.stringify(this.orientacionRequest));
      this.orientacionService.orientacion(this.orientacionRequest).subscribe((resp: any) => {
        // tslint:disable-next-line: no-shadowed-variable
            this.cargando = false;
            this.errorCode = false;
            if (this.errorCode === false) {
              this.router.navigate(['/test/introduccion']);
            }
      }, (error: Error) => {
        errorSrv.getError(error);
        this.cargando = false;
        this.errorCode = true;
      });
      this.retorno = true;
    }
  }

  getOrientacion() {
    const errorSrv = this.erroresServicio.obtenerErrorServicio('testOrientacion');
    errorSrv.nuevoRequest();
    this.orientacionService.getOrientacion().subscribe((resp: any) => {
          this.ori.id = resp.id;
          this.ori.name = resp.name;
          this.ori.description = resp.description;
          this.ori.category = resp.category;
          this.ori.tasks = resp.tasks;
          this.ori.resources = resp.resources;
          this.ori.tasks.forEach((task: Tasks) => {
            console.log('task param');
            console.log(task);
            const tsk: Tasks = new Tasks();
            tsk.id = task.id;
            tsk.description = task.description;
            tsk.inputs = task.inputs;
            tsk.inputs.forEach((input: Inputs) => {
              const inp: Inputs = new Inputs();
              inp.id = input.id;
              inp.type = input.type;
              tsk.inputs.push(inp);
            });
            if (this.ori.tasks.length > resp.tasks.length) {
              this.ori.tasks.push(tsk);
            }
          });
          console.log('TASK');
          console.log(this.ori.tasks[0].id);
          this.orientacion.push(this.ori);
          console.log(this.ori);
    }, (error: Error) => {
      errorSrv.getError(error);
      this.cargando = false;
      this.errorCode = true;
    });
  }

  validarForm() {
    let resp = false;
    this.ori.tasks.forEach((task: Tasks) => {
      switch (task.id) {
        case 1:
          resp = true;
          break;
        case 2:
          resp = true;
          break;
        case 3:
          resp = true;
          break;
        case 4:
          resp = true;
          break;
        case 5:
          resp = true;
          break;
        case 6:
          resp = true;
          break;
        case 7:
          resp = true;
          break;
        case 8:
          resp = true;
          break;
        case 9:
          resp = true;
          break;
        case 10:
          resp = true;
          break;
      }
    });
    console.log('FORM ENVIO');
    console.log(resp);
    return resp;
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
