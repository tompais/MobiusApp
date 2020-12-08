import { ChangeDetectorRef, Component, ElementRef, EventEmitter, Input, NgZone, OnInit, Output, Renderer2, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AppComponent } from 'src/app/app.component';
import { User } from '../../models/User';
import { ErrorServicio } from '../../models/errors/ErrorServicio';
import { ErrorServicioGrupo } from '../../models/errors/ErrorServicioGrupo';
import { HttpErrorResponse } from '@angular/common/http';
import { CommonService } from 'src/app/services/common/common.service';
import { Router } from '@angular/router';
import { LocalStorageService } from 'src/app/services/common/localstorage.service';
import { UserRequest } from '../../models/user/UserRequest';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { NativeGeocoder, NativeGeocoderResult, NativeGeocoderOptions } from '@ionic-native/native-geocoder/ngx';
import { LocationService } from 'src/app/services/location.service';
import { ToastController } from '@ionic/angular';

declare var google;

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'mobi-form',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.scss'],
})
export class FormularioComponent implements OnInit {
  @ViewChild('form') formu: ElementRef;
  // ENTRADAS
  // nombre de la pantalla que usa el formulario
  @Input() nombrePantalla = 'login';
  // objeto con todos los inputs
  @Input() Inputs: any;
  // objeto con todos los inputs
  // tslint:disable-next-line: no-input-rename
  @Input('Datos') Dato: any;
  // lista de errores en orden
  @Input() Errores = new Array<string>();
  // url a redidigir despues de enviar los datos
  @Input() UrlProxPantalla = '/test/introduccion';
  @Input() NombreBotonSubmit = '';
  @Input() SoloForm = true;

  // SALIDAS
  @Output() Cargando = new EventEmitter<boolean>();
  @Output() DevolverDatos = new EventEmitter<any[]>();

  // PROPIEDADES INTERNAS
  user: User;
  primaryApp: AppComponent = null;
  erroresServicio: ErrorServicioGrupo = null;
  retorno: boolean;
  errorCode: boolean;
  error: string;
  storage: LocalStorageService;
  userRequest: UserRequest = null;
  mostrarIcono = false;
  mostrarIconoRepeat = false;
  tipoInpuPass = '';
  tipoInpuPassRepeat = '';
  respuesta: any[];
  listaRespuestas: any[] = null;
  maps: any[] = new Array<any>();
  selectedPlace: any[];
  latitud: any;
  longitud: any;

  constructor(public commonService: CommonService, public app: AppComponent, public router: Router, public renderer: Renderer2,
              private geolocation: Geolocation, private nativeGeocoder: NativeGeocoder, public zone: NgZone, private ref: ChangeDetectorRef,
              public locationService: LocationService, public toastController: ToastController) {
    this.storage = new LocalStorageService();
    this.user = new User();
    this.userRequest = new UserRequest();
    this.selectedPlace = new Array<any>();

  }

  ngOnInit() {
    this.erroresServicio = new ErrorServicioGrupo();
    this.erroresServicio.errores.push(new ErrorServicio(this.nombrePantalla, true, '', false, this.nombrePantalla));
    this.mostrarIcono = true;
    this.mostrarIconoRepeat = true;
    this.respuesta = new Array<any>();
    this.selectedPlace = new Array<any>();
    // this.getLocation();
  }

  eventoError(error: ErrorServicio) {
    // tslint:disable-next-line: prefer-const
    let form: NgForm;
    switch (error.id) {
      case 'registro':
         this.FormSubmit(form);
         break;
      default:
        break;
    }
  }

  FormSubmit(form: NgForm){
    console.log('ENTRO A' + this.nombrePantalla);
    const errorSrv = this.erroresServicio.obtenerErrorServicio(this.nombrePantalla);
    errorSrv.nuevoRequest();

    if (form.invalid) {
      console.log('SOY INVALID');

      if (this.nombrePantalla.toUpperCase() !== 'LOGIN' && this.nombrePantalla.toUpperCase() !== 'REGISTRO'){
        this.presentToast('Verifique en ingresar todos los datos.');
      }

      this.retorno = false;
    } else {
      this.Cargando.emit(true);

      if (this.nombrePantalla.toUpperCase() === 'LOGIN' || this.nombrePantalla.toUpperCase() === 'REGISTRO'){
        this.commonService.enviarDatos(this.userRequest, this.nombrePantalla).subscribe((resp: any) => {
          // para login guardamos en storage el id, nombre y apellido del usuario
          if (this.nombrePantalla.toUpperCase() === 'LOGIN') {
            this.storage.set('id', resp.id);
            this.storage.set('nombreUsuario', resp.firstName + resp.lastName);
            this.storage.set('EsTest', resp.testStatus === 'in_progress' ? true : false);
          }

          this.Cargando.emit(false);
          this.errorCode = false;

          // guardamos url de la home de juegos para luego redireccionar
          if (this.nombrePantalla.toUpperCase() !== 'REGISTRO' && resp.testStatus !== 'in_progress') {
            this.UrlProxPantalla = '/juegos/home';
          }

          this.router.navigate([this.UrlProxPantalla]);

        }, (error: HttpErrorResponse) => {
          errorSrv.getError(error);
          this.Cargando.emit(false);
          this.errorCode = true;
          this.error = error.message;
        });
      }else{
          this.DevolverDatos.emit(this.respuesta);
      }

      this.retorno = true;
    }
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 4000
    });
    toast.present();
  }

  claseNoSoloForm(){
    if (this.nombrePantalla === 'visualizacion'){
      return 'NoSoloFormVisual';
    }else{
      return 'NoSoloForm';
    }
  }

  validaCampo(control: any, Valid: any){
    let retorno = true;
    const valorValid = Object.values(Valid)[0];

    switch (Object.keys(Valid)[0].toLowerCase()){
      case 'required': {
        if (!control || control.length === 0 || control === ''){
          retorno = false;
        }
      // tslint:disable-next-line: align
      } break;
      case 'minlength': {
        if (control.length > 0 && control.length < valorValid ){
          retorno = false;
        }
      // tslint:disable-next-line: align
      } break;
      case 'maxlength': {
        if (control.length > valorValid){
          retorno = false;
        }
      // tslint:disable-next-line: align
      } break;
    }
    return retorno;
  }

  cambiarIcono(): string {
    let resp = '';
    if (this.mostrarIcono) {
      resp = 'eye-outline';
      this.mostrarIcono = false;
      this.tipoInpuPass = 'text';
    } else {
      resp = 'eye-off';
      this.mostrarIcono = true;
      this.tipoInpuPass = 'password';
    }
    // console.log(resp);
    return resp;
  }

  cambiarIconoRepeat(): string {
    let resp = '';
    if (this.mostrarIconoRepeat) {
      resp = 'eye-outline';
      this.mostrarIconoRepeat = false;
      this.tipoInpuPassRepeat = 'text';
    } else {
      resp = 'eye-off';
      this.mostrarIconoRepeat = true;
      this.tipoInpuPassRepeat = 'password';
    }
    // console.log(resp);
    return resp;
  }

  parsearFecha(fecha: string): string {
    const resp = fecha.substring(0, 10);
   // console.log('PARSEAR FECHA');
   // console.log(resp);
    return resp;
  }

  // AUTOCOMPLETE, SIMPLEMENTE ACTUALIZAMOS LA LISTA CON CADA EVENTO DE ION CHANGE EN LA VISTA.
  placeChanged(place, taskid) {
    const tipoInput: string = this.Dato.tasks[taskid - 1].inputs[0].type;
    this.maps.push(place);
    this.selectedPlace[taskid] = place;
    this.respuesta[taskid] = this.selectedPlace[taskid].name;

    console.log(this.respuesta);

    this.ref.detectChanges();
  }

  getLocation() {
    this.locationService.getPosition().then(pos => {
        this.latitud = pos.lat;
        this.longitud = pos.lng;
        console.log('LATITUD');
        console.log(this.latitud);
        console.log('LONGITUD');
        console.log(this.longitud);
    });
  }

  obtenerRespuestas(): any[] {
    this.listaRespuestas = new Array<any>();
    this.respuesta.forEach((obj: any) => {
      this.listaRespuestas.push(obj);
    });

    console.log(this.listaRespuestas);
    return this.listaRespuestas;
  }
}
