import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { CommonService } from 'src/app/services/common/common.service';
import { StorageSession } from '../models/commons/StorageSession';
import { ErrorServicio } from '../models/errors/ErrorServicio';
import { ErrorServicioGrupo } from '../models/errors/ErrorServicioGrupo';
import { User } from '../models/User';
import { UserResponse } from '../models/user/UserResponse';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  user: User;
  primaryApp: AppComponent = null;
  retorno = true;
  error = '';
  errorCode = false;
  cargando = false;
  userResponse: UserResponse[] = null;
  usResponse: UserResponse = null;
  storageSession: StorageSession = null;
  erroresServicio: ErrorServicioGrupo = null;

  constructor(public commonService: CommonService, public app: AppComponent, public router: Router) {
    this.user = new User();
  }

  ngOnInit() {
    this.user = new User();
    this.usResponse = new UserResponse();
    this.erroresServicio = new ErrorServicioGrupo();
    this.erroresServicio.errores.push(new ErrorServicio('login', true, '', false, 'Login'));
    this.userResponse = new Array<UserResponse>();
    this.storageSession = new StorageSession();
  }

  eventoError(error: ErrorServicio) {
    // tslint:disable-next-line: prefer-const
    let form: NgForm;
    switch (error.id) {
      case 'registro':
         this.login(form);
         break;
      default:
        break;
    }
  }

  mostrarPantallaLogin(): boolean {
    let resp = false;
    if (this.erroresServicio != null) {
      if (this.erroresServicio.mostrarCargando() === false) {
        resp = false;
      }
    }
    return resp;
  }

  login(form: NgForm){
    const errorSrv = this.erroresServicio.obtenerErrorServicio('login');
    errorSrv.nuevoRequest();
    if (form.invalid) {
      this.retorno = false;
    } else {
      this.cargando = true;
      this.commonService.login(this.user).subscribe((resp: any) => {
        // tslint:disable-next-line: no-shadowed-variable
        errorSrv.procesarRespuesta(resp, (resp: any): void => {
          /*this.usResponse.id = resp.id;
          this.storageSession.guardar('id', resp.id);*/
            this.usResponse.firstName = resp.firstName;
            this.usResponse.lastName = resp.lastName;
            this.usResponse.id = resp.id;
            console.log('VALOR DEL ID');
            console.log(this.usResponse);
            this.userResponse.push(this.usResponse);
            console.log(this.userResponse);
          /*resp.forEach((user: UserResponse) => {
            this.usResponse.firstName = user.firstName;
            this.usResponse.lastName = user.lastName;
            this.usResponse.id = user.id;
            console.log('VALOR DEL ID');
            console.log(this.usResponse);
            this.userResponse.push(this.usResponse);
          });*/
        });
        /*const user: UserResponse = new UserResponse();
        user.firstName = resp.firstName;
        user.lastName = resp.lastName;
        user.id = resp.id;
        this.userResponse.push(user);
        console.log(this.userResponse);*/
        // tslint:disable-next-line: radix
        this.storageSession.guardar('id', resp.id);
        console.log('CONSULTAR ID');
        console.log(this.storageSession.consultar('id'));
        this.cargando = false;
        this.errorCode = false;
        if (this.errorCode === false) {
          this.router.navigate(['/test/introduccion']);
        }
      }, (error: Error) => {
        errorSrv.getError(error);
        this.cargando = false;
        this.errorCode = true;
        this.error = error.message;
      });
      this.retorno = true;
    }
  }
}
