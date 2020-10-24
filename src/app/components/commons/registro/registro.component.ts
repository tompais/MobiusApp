import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { CommonService } from 'src/app/services/common/common.service';
import { ErrorServicio } from '../models/errors/ErrorServicio';
import { ErrorServicioGrupo } from '../models/errors/ErrorServicioGrupo';
import { UserRequest } from '../models/user/UserRequest';

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
  cargando = false;
  erroresServicio: ErrorServicioGrupo = null;
  errorService: ErrorServicio = null;
  mostrarIcono = false;
  mostrarIconoRepeat = false;
  tipoInput = '';

  constructor(public commonService: CommonService, public app: AppComponent, public router: Router) {
    this.user = new UserRequest();
    this.primaryApp = app;
    // console.log('ERRORES: ' + this.erroresServicio.errores);
    // this.erroresServicio.errores.push(new ErrorServicio('registro', true, '', false, 'Registro'));
  }

  ngOnInit() {
    this.user = new UserRequest();
    // console.log('ERRORES: ' + this.erroresServicio.errores);
    this.erroresServicio = new ErrorServicioGrupo();
    this.erroresServicio.errores.push(new ErrorServicio('registro', true, '', false, 'Registro'));
    this.mostrarIcono = true;
    this.mostrarIconoRepeat = true;
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

    public registro(form: NgForm) {
     const errorSrv = this.erroresServicio.obtenerErrorServicio('registro');
     errorSrv.nuevoRequest();
     if (form.invalid) {
      this.user.retorno = false;
    } else {
  //  console.log('REQUEST USER');
  //  console.log(this.user);
    this.parsearFecha(this.user.birthday);
    this.cargando = true;
    this.commonService.registro(this.user).subscribe((resp: any) => {
        // tslint:disable-next-line: no-shadowed-variable
        /*errorSrv.procesarRespuesta(resp, (resp: any): void => {
          console.log('PROCESO LA RESPUESTA OK');
          resp.response.forEach((userResponse: UserResponse) => {
            return true;
          });
        });*/
        this.cargando = false;
        this.errorCode = false;
        if (this.errorCode === false) {
          this.router.navigate(['/login']);
        }
      }, (error: Error) => {
        errorSrv.getError(error);
        this.cargando = false;
        this.errorCode = true;
        this.error = error.message;
      });
    this.user.retorno = true;
    }
  }

  cambiarIcono(): string {
    let resp = '';
    if (this.mostrarIcono) {
      resp = 'eye-outline';
      this.mostrarIcono = false;
      this.tipoInput = 'password';
    } else {
      resp = 'eye-off';
      this.mostrarIcono = true;
      this.tipoInput = 'text';
    }
    // console.log(resp);
    return resp;
  }

  cambiarIconoRepeat(): string {
    let resp = '';
    if (this.mostrarIconoRepeat) {
      resp = 'eye-outline';
      this.mostrarIconoRepeat = false;
      this.tipoInput = 'password';
    } else {
      resp = 'eye-off';
      this.mostrarIconoRepeat = true;
      this.tipoInput = 'text';
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

}
