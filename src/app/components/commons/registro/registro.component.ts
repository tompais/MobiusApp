import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AppComponent } from 'src/app/app.component';
import { CommonService } from 'src/app/services/common/common.service';
import { ErrorServicio } from '../models/errors/ErrorServicio';
import { ErrorServicioGrupo } from '../models/errors/ErrorServicioGrupo';
import { User } from '../models/User';
import { UserRequest } from '../models/user/UserRequest';
import { UserResponse } from '../models/user/UserResponse';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss'],
})
export class RegistroComponent implements OnInit {

  user: UserRequest = null;
  primaryApp: AppComponent = null;
  error = '';
  errorCode = false;
  erroresServicio: ErrorServicioGrupo = null;
  errorService: ErrorServicio = null;
  estadoIcono = false;
  tipoInput = '';

  constructor(public commonService: CommonService, public app: AppComponent) {
    this.user = new UserRequest();
    this.primaryApp = app;
    // console.log('ERRORES: ' + this.erroresServicio.errores);
    // this.erroresServicio.errores.push(new ErrorServicio('registro', true, '', false, 'Registro'));
  }

  ngOnInit() {
    this.user = new UserRequest();
    // console.log('ERRORES: ' + this.erroresServicio.errores);
    // this.erroresServicio.errores.push(new ErrorServicio('registro', true, '', false, 'Registro'));
  }

  /*eventoError(error: ErrorServicio) {
    switch (error.id) {
      case 'registro':
         this.registro();
        break;
      default:
        break;
    }
  }*/

  // public registro(form: NgForm) {
    public registro(form: NgForm) {
    // const errorSrv = this.erroresServicio.obtenerErrorServicio('registro');
    // errorSrv.nuevoRequest();
   /* if (form.invalid) {
      this.user.retorno = false;
    } else {*/
    this.commonService.registro(this.user).subscribe((resp: any) => {
        // tslint:disable-next-line: no-shadowed-variable
        /*errorSrv.procesarRespuesta(resp, (resp: any): void => {
          console.log('PROCESO LA RESPUESTA OK');
          resp.response.forEach((userResponse: UserResponse) => {
            return true;
          });
        });*/
      }, (error: Error) => {
        // errorSrv.getError(error);
        this.errorCode = true;
        this.error = error.message;
      });
    this.user.retorno = true;
   // }
  }

  cambiarIcono(estado: boolean): boolean {
    let resp = false;
    this.tipoInput = 'password';
    if (estado) {
      this.tipoInput = 'text';
      resp = true;
    }
    console.log('RESP ICONO');
    console.log(resp);
    return resp;
  }

}
