import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { CommonService } from 'src/app/services/common/common.service';
import { StorageSession } from '../models/commons/StorageSession';
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
  storageSession: StorageSession = null;

  constructor(public commonService: CommonService, public app: AppComponent, public router: Router) {
    this.user = new User();
  }

  ngOnInit() {
    this.user = new User();
    this.userResponse = new Array<UserResponse>();
    this.storageSession = new StorageSession();
  }

  login(form: NgForm){
    if (form.invalid){
      this.retorno = false;
    }else{
      this.cargando = true;
      this.commonService.login(this.user)
      .subscribe((resp: any) => {
        const user: UserResponse = new UserResponse();
        user.firstName = resp.firstName;
        user.lastName = resp.lastName;
        user.id = resp.id;
        this.userResponse.push(user);
        console.log(this.userResponse);
        // tslint:disable-next-line: radix
        this.storageSession.guardar('id', user.id);
        console.log('CONSULTA STORAGE');
        console.log(this.storageSession.consultar('id'));
        this.cargando = false;
        this.errorCode = false;
        if (this.errorCode === false) {
          this.router.navigate(['/test/introduccion']);
        }
      }, (error: Error) => {
        this.cargando = false;
        this.errorCode = true;
        this.error = error.message;
      });
      this.retorno = true;
    }
  }
}
