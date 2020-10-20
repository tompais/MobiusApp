import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AppComponent } from 'src/app/app.component';
import { CommonService } from 'src/app/services/common/common.service';
import { User } from '../models/User';
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

  constructor(public commonService: CommonService, public app: AppComponent) {
    this.user = new UserRequest();
    this.primaryApp = app;
  }

  ngOnInit() {
    this.user = new UserRequest();
  }

  public registro(form: NgForm) {
    if (form.invalid) {
      this.user.retorno = false;
    } else {
      this.commonService.registro(this.user).subscribe((resp: any) => {
      }, (error: Error) => {
        this.errorCode = true;
        this.error = error.message;
      });
      this.user.retorno = true;
    }
  }

}
