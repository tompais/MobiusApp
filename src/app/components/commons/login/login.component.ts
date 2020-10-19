import { Component, OnInit } from '@angular/core';
import { tick } from '@angular/core/testing';
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
      this.commonService.login(this.user)
      .subscribe((resp: any) => {
        // this.retorno = true;
      }, (error: Error) => {
        // this.retorno = false;
      });
      this.retorno = true;
    }
  }

}