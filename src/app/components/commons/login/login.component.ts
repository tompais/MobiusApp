import { HttpErrorResponse } from '@angular/common/http';
import { Component, ErrorHandler, OnInit } from '@angular/core';
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

  mostrarPantallaLogin(): boolean {
    let resp = false;
    if (this.erroresServicio != null) {
      if (this.erroresServicio.mostrarCargando() === false) {
        resp = false;
      }
    }
    return resp;
  }

  mostrarCargando(carga: boolean){
    this.cargando = carga;
  }

}
