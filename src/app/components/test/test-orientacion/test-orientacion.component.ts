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
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { NativeGeocoder, NativeGeocoderResult, NativeGeocoderOptions } from '@ionic-native/native-geocoder/ngx';
import { Diagnostic } from '@ionic-native/diagnostic/ngx';
import { AlertController } from '@ionic/angular';
import { LocationAccuracy } from '@ionic-native/location-accuracy/ngx';

declare var google;

@Component({
  selector: 'app-test-orientacion',
  templateUrl: './test-orientacion.component.html',
  styleUrls: ['./test-orientacion.component.scss'],
})
export class TestOrientacionComponent implements OnInit {

  orientacionRequest: OrientacionRequest;
  respuesta: any[];
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
  rsp: PatientAnswersRequest<any>[] = null;
  gameCategoryRequest: GameCategoryRequest;
  latitud: any;
  longitud: any;
  country: string; // pais
  state: string; // provincia
  locality: string; // localidad para verificar en ciudad ya que puede llegar a confundir
  city: string; // ciudad
  // configuracion de Geocoder
  geoencoderOptions: NativeGeocoderOptions = {
    useLocale: true,
    maxResults: 5
  };
  deshabilitarBoton = false;

  constructor(public orientacionService: OrientacionService, public router: Router, public locationService: LocationService,
              private platform: Platform, private geolocation: Geolocation,public alertController: AlertController,
              private nativeGeocoder: NativeGeocoder, private diagnostic: Diagnostic, private locationAccuracy: LocationAccuracy) {
  }

  ngOnInit() {

    this.orientacionRequest = new OrientacionRequest();
    this.gameCategoryRequest = new GameCategoryRequest();
    this.respuesta = new Array<any>();
    this.patientTaskAnswersList = new PatientTaskAnswersRequestList<boolean>();
    this.answer = new Answer<boolean>();
    this.orientacion = new Array<GameCategoryResponse>();
    this.tasks = new Array<Tasks>();
    this.task = new Tasks();
    this.erroresServicio = new ErrorServicioGrupo();
    this.erroresServicio.errores.push(new ErrorServicio('testOrientacionEnvio', true, '', false, 'Test Orientacion Envio'));
    this.erroresServicio.errores.push(new ErrorServicio('testOrientacion', true, '', false, 'Test Orientacion Consulta'));
    this.getOrientacion();
    this.getGPSYGeolocation();
  }

  eventoError(error: ErrorServicio) {
    // tslint:disable-next-line: prefer-const
    let form: NgForm;
    switch (error.id) {
      case 'testOrientacion':
        this.getOrientacion();
        break;
      default:
        break;
    }
  }

  enviarDatosOrientacion() {
    const errorSrv = this.erroresServicio.obtenerErrorServicio('testOrientacionEnvio');
    errorSrv.nuevoRequest();

    this.cargando = true;
    this.gameCategoryRequest = new GameCategoryRequest();
    this.gameCategoryRequest.gameId = 1;
    this.gameCategoryRequest.category = 'orientation';
    this.gameCategoryRequest.areTestGameAnswers = this.ori.isTestGame;
    this.gameCategoryRequest.patientTaskAnswersRequestList = new Array<any>();
    this.validarRespuestas().forEach((obj: PatientAnswersRequest<any>) => {
        const task: PatientTaskAnswersRequestList<PatientAnswersRequest<any>> = new PatientTaskAnswersRequestList<PatientAnswersRequest<any>>();
        task.taskId = obj.id;
        task.patientAnswersRequest = new Array<any>();
        const pt: PatientAnswersRequest<any> = new PatientAnswersRequest<any>();
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
  }

  getOrientacion() {
    const errorSrv = this.erroresServicio.obtenerErrorServicio('testOrientacion');
    errorSrv.nuevoRequest();
    this.orientacionService.getOrientacion().subscribe((resp: any) => {
      this.ori = resp;
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
    this.rsp = new Array<PatientAnswersRequest<any>>();
    let i = 0;
    for (const respuesta of this.obtenerRespuestas()) {
      const orientacion: OrientacionRequest = new OrientacionRequest();
      const patient: PatientAnswersRequest<any> = new PatientAnswersRequest<any>();
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
          patient.isCorrect = orientacion.validarPais(respuesta, this.country);
          patient.answer = respuesta;
          this.rsp.push(patient);
          break;
        case 7:
          patient.id = i;
          patient.isCorrect = orientacion.validarProvincia(respuesta, this.state);
          patient.answer = respuesta;
          this.rsp.push(patient);
          break;
        case 8:
          patient.id = i;
          patient.isCorrect = orientacion.validarCiudad(respuesta, this.city, this.locality);
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

  async presentAlert(header: string,mensaje: string) {
    const alert = await this.alertController.create({
      header: header,
      message: mensaje,
      buttons: ['ACEPTAR']
    });

    await alert.present();
  }
  // Obtiene la localizacion actual del dispositivo
  getGPSYGeolocation() {
   
    this.diagnostic.isGpsLocationEnabled().then((habilitado) => {
      if (!habilitado) {
        this.locationAccuracy.canRequest().then((canRequest: boolean) => {
          if(canRequest) {
            this.getGeolocation();
          }else{           
             // the accuracy option will be ignored by iOS
             this.locationAccuracy.request(this.locationAccuracy.REQUEST_PRIORITY_HIGH_ACCURACY).then(
              () => { this.getGeolocation();
            },
              error => this.deshabilitarBoton = true
            );
          }        
        });
      }else{
        this.getGeolocation();
      }
    }).catch((error) => {this.presentAlert("ERROR",error);
  
    this.deshabilitarBoton = true
  });

  }

  getGeolocation(){
    this.geolocation.getCurrentPosition().then((resp) => {
      this.latitud = resp.coords.latitude;
      this.longitud = resp.coords.longitude;
      this.getGeoencoder(resp.coords.latitude, resp.coords.longitude);

    }).catch((error) => {
      this.presentAlert("ERROR",error)
      this.deshabilitarBoton = true
    });
  }

  // geocoder method to fetch address from coordinates passed as arguments
  getGeoencoder(latitude, longitude) {
    this.nativeGeocoder.reverseGeocode(latitude, longitude, this.geoencoderOptions)
      .then((result: NativeGeocoderResult[]) => {
        this.country = result[0].countryName;
        this.state = result[0].administrativeArea;
        this.locality = result[0].subAdministrativeArea;
        this.city = result[0].locality;
      })
      .catch((error: any) => {
        this.presentAlert("ERROR",error)
        this.deshabilitarBoton = true
      });
  }

  TomarDatosForm(datos: any[]){
    this.respuesta = datos;
    this.enviarDatosOrientacion();
  }

}
