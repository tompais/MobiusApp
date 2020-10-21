import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AppComponent } from 'src/app/app.component';
import { CommonService } from 'src/app/services/common/common.service';
import { User } from '../models/User';


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

  constructor(public commonService: CommonService, public app: AppComponent) {
    this.user = new User();
  }

  ngOnInit() {
    this.user = new User();
  }

  login(form: NgForm){
    if (form.invalid){
      this.retorno = false;
    }else{
      this.cargando = true;
      this.commonService.login(this.user)
      .subscribe((resp: any) => {
        this.cargando = false;
        // this.retorno = true;
      }, (error: Error) => {
        this.cargando = false;
        this.errorCode = true;
        this.error = error.message;
        // this.retorno = false;
      });
      this.retorno = true;
    }
  }
}
