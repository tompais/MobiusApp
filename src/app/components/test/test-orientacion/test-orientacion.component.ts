import { HttpErrorResponse } from '@angular/common/http';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { GoogleMap, GoogleMaps, Marker } from '@ionic-native/google-maps';
import { Platform } from '@ionic/angular';
import { LocationService } from 'src/app/services/location.service';
import { OrientacionService } from 'src/app/services/test/orientacion.service';
import { Answer } from '../../commons/models/commons/Answer';
import { GameCategoryRequest } from '../../commons/models/commons/GameCategoryRequest';
import { GameCategoryResponse } from '../../commons/models/commons/GameCategoryResponse';
import { PatientAnswersRequest } from '../../commons/models/commons/PatientAnswersRequest';
import { PatientTaskAnswersRequestList } from '../../commons/models/commons/PatientTaskAnswersRequestList';
import { Tasks } from '../../commons/models/commons/Tasks';
import { ErrorServicio } from '../../commons/models/errors/ErrorServicio';
import { ErrorServicioGrupo } from '../../commons/models/errors/ErrorServicioGrupo';
import { OrientacionRequest } from '../../commons/models/test/orientacion/OrientacionRequest';

declare var google;

@Component({
  selector: 'app-test-orientacion',
  templateUrl: './test-orientacion.component.html',
  styleUrls: ['./test-orientacion.component.scss'],
})
export class TestOrientacionComponent implements OnInit {

  orientacionRequest: OrientacionRequest;
  respuesta: any[];
  retorno = true;
  patientTaskAnswersList: PatientTaskAnswersRequestList<boolean> = null;
  answer: Answer<boolean> = null;
  cargando = false;
  errorCode = false;
  erroresServicio: ErrorServicioGrupo = null;
  orientacion: GameCategoryResponse[] = null;
  ori: GameCategoryResponse = null;
  tasks: Tasks[] = null;
  task: Tasks = null;
  enviarDatos = false;
  listaRespuestas: any[] = null;
  rsp: PatientAnswersRequest[] = null;
  gameCategoryRequest: GameCategoryRequest;
  sinRespuestas = false;
  latitud: any;
  longitud: any;
  map: GoogleMap;

  constructor(public orientacionService: OrientacionService, public router: Router, public locationService: LocationService,
              private platform: Platform) {
  }

  ngOnInit() {
    // this.platform.ready();
    // this.getLocation();
    // this.loadMap();
    this.orientacionRequest = new OrientacionRequest();
    this.gameCategoryRequest = new GameCategoryRequest();
    this.respuesta = new Array<any>();
    this.patientTaskAnswersList = new PatientTaskAnswersRequestList<boolean>();
    this.answer = new Answer<boolean>();
    this.orientacion = new Array<GameCategoryResponse>();
    this.ori = new GameCategoryResponse();
    this.tasks = new Array<Tasks>();
    this.task = new Tasks();
    this.erroresServicio = new ErrorServicioGrupo();
    this.erroresServicio.errores.push(new ErrorServicio('testOrientacionEnvio', true, '', false, 'Test Orientacion Envio'));
    this.erroresServicio.errores.push(new ErrorServicio('testOrientacion', true, '', false, 'Test Orientacion Consulta'));
    this.getOrientacion();
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
      this.gameCategoryRequest = new GameCategoryRequest();
      this.gameCategoryRequest.gameId = 1;
      this.gameCategoryRequest.category = 'orientation';
      this.gameCategoryRequest.patientTaskAnswersRequestList = new Array<any>();
      this.validarRespuestas().forEach((obj: PatientAnswersRequest) => {
        const task: PatientTaskAnswersRequestList<PatientAnswersRequest> = new PatientTaskAnswersRequestList<PatientAnswersRequest>();
        task.taskId = obj.id;
        task.patientAnswersRequest = new Array<any>();
        const pt: PatientAnswersRequest = new PatientAnswersRequest();
        pt.answer = obj.answer;
        pt.isCorrect = obj.isCorrect;
        task.patientAnswersRequest.push(pt);
        this.gameCategoryRequest.patientTaskAnswersRequestList.push(task);
      });
      this.orientacionService.putOrientacion(this.gameCategoryRequest).subscribe((resp: any) => {
        this.cargando = false;
        this.errorCode = false;
        if (this.errorCode === false) {
          this.router.navigate(['/test/fijacion']);
        }
      }, (error: HttpErrorResponse) => {
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
      this.orientacion.push(this.ori);
    }, (error: HttpErrorResponse) => {
      errorSrv.getError(error);
      this.cargando = false;
      this.errorCode = true;
    });
  }

  obtenerRespuestas(): any[] {
    this.listaRespuestas = new Array<any>();
    this.respuesta.forEach((obj: any) => {
      this.listaRespuestas.push(obj);
    });
    return this.listaRespuestas;
  }

  validarRespuestas(): any[] {
    this.rsp = new Array<PatientAnswersRequest>();
    let i = 0;
    for (const respuesta of this.obtenerRespuestas()) {
      const orientacion: OrientacionRequest = new OrientacionRequest();
      const patient: PatientAnswersRequest = new PatientAnswersRequest();
      i++;
      switch (i) {
        case 1:
          patient.id = i;
          patient.isCorrect = orientacion.validarAnio(respuesta);
          patient.answer = respuesta;
          this.rsp.push(patient);
          break;
        case 2:
          patient.id = i;
          patient.isCorrect = orientacion.validarEstacionAnio(respuesta);
          patient.answer = respuesta;
          this.rsp.push(patient);
          break;
        case 3:
          patient.id = i;
          patient.isCorrect = orientacion.validarDiaMes(respuesta);
          patient.answer = respuesta;
          this.rsp.push(patient);
          break;
        case 4:
          patient.id = i;
          patient.isCorrect = orientacion.validarDiaSemana(respuesta);
          patient.answer = respuesta;
          this.rsp.push(patient);
          break;
        case 5:
          patient.id = i;
          patient.isCorrect = orientacion.validarMesAnio(respuesta);
          patient.answer = respuesta;
          this.rsp.push(patient);
          break;
        case 6:
          patient.id = i;
          patient.isCorrect = orientacion.validarPais(respuesta);
          patient.answer = respuesta;
          this.rsp.push(patient);
          break;
        case 7:
          patient.id = i;
          patient.isCorrect = orientacion.validarProvincia(respuesta);
          patient.answer = respuesta;
          this.rsp.push(patient);
          break;
        case 8:
          patient.id = i;
          patient.isCorrect = false;
          patient.answer = respuesta;
          this.rsp.push(patient);
          break;
        case 9:
          patient.id = i;
          patient.isCorrect = false;
          patient.answer = respuesta;
          this.rsp.push(patient);
          break;
        case 10:
          patient.id = i;
          patient.isCorrect = false;
          patient.answer = respuesta;
          this.rsp.push(patient);
          break;
      }
    }
    return this.rsp;
  }

  getLocation() {
    this.locationService.getPosition().then(pos => {
        this.latitud = pos.lat;
        this.longitud = pos.lng;
        console.log('LATITUD');
        console.log(this.latitud);
        console.log('LONGITUD');
        console.log(this.longitud);
        this.obtenerPosicion(this.latitud, this.longitud);
        // this.obtenerPais(this.latitud, this.longitud);
    });
  }

  /*obtenerPais(latitud: any, longitud: any) {
    const GEOCODING = 'https://maps.googleapis.com/maps/api/geocode/json?latlng=' + latitud + '%2C' + longitud + '&language=en';
    console.log(GEOCODING);
  }*/

  loadMap() {
    this.map = GoogleMaps.create('map_canvas');
  }

  obtenerPosicion(latitud: any, longitud: any) {
    this.map.addMarker({
      title: '@ionic-native/google-maps',
      icon: 'blue',
      animation: 'DROP',
      position: {
        lat: latitud,
        lng: longitud
      }
    }).then((marker: Marker) => {
      marker.showInfoWindow();
    });
  }

}
