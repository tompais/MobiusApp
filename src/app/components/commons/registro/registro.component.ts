import { HttpErrorResponse } from '@angular/common/http';
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

}
