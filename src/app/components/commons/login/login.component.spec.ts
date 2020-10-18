import { async, ComponentFixture, fakeAsync, flush, TestBed, tick } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { LoginComponent } from './login.component';
import { CommonService } from 'src/app/services/common/common.service';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { User } from '../models/User';
import { AppComponent } from 'src/app/app.component';
import { NgForm } from '@angular/forms';
import { Input, NO_ERRORS_SCHEMA } from '@angular/core';
import { of } from 'rxjs';
import {delay} from 'rxjs/operators';

describe('LoginComponent', () => {
  let component: LoginComponent;
  // let fixture: ComponentFixture<LoginComponent>;
  let service: CommonService;
  // tslint:disable-next-line: prefer-const
  let http: HttpClient;
  let user: User;
  // tslint:disable-next-line: prefer-const
  let httpHandler: HttpHandler;
  let app: AppComponent;

  beforeEach(() => {
    service = new CommonService(http, httpHandler);
    component = new LoginComponent(service, app);
    app = component.primaryApp;
    user = new User();
    user.email = 'pepe@gmail.com';
    user.password = '123456';
    component.ngOnInit();
  });

  afterEach(() => {
    service = null;
    component = null;
    user = null;
  });

  it('Probando Login Component OK', fakeAsync(() => {
    const testForm = {
       value: {
          email: 'Hello@mai.com',
          password: '12345678'
      },
      invalid: false
     } as NgForm;
    component.login(testForm);

    tick(1); // deja pasar el tiempo, también podrías usar flush();
    expect(component.retorno).toBe(true);
  }));

  it('Probando Login Compoenent FALSE', fakeAsync(() => {
    const testForm = {
      value: {
         email: 'Hellomai.com',
         password: '123453'
     },
     invalid: true
    } as NgForm;

    component.login(testForm);
    tick(); // deja pasar el tiempo
    expect(component.retorno).toBe(false);
 }));

  it('Probando User', () => {
    expect(component.user).toBeTruthy();
  });

  it('Probando email', () => {
    component.user.email = 'pepe@gmail.com';
    // tslint:disable-next-line: object-literal-key-quotes
    expect('pepe@gmail.com').toEqual(user.email);
 /* it('Probando3', () => {
    expect(component.commonService.login(component.user));
  });*/
  });

  it('Probando5', () => {
    component.user.password = '1234567';
    // tslint:disable-next-line: object-literal-key-quotes
    expect('123456').toEqual(user.password);
 /* it('Probando3', () => {
    expect(component.commonService.login(component.user));
  });*/
  });
});
