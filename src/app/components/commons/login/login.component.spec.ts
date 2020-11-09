import { fakeAsync, tick } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { CommonService } from 'src/app/services/common/common.service';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { User } from '../models/User';
import { AppComponent } from 'src/app/app.component';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let service: CommonService;
  // tslint:disable-next-line: prefer-const
  let http: HttpClient;
  let user: User;
  // tslint:disable-next-line: prefer-const
  let httpHandler: HttpHandler;
  let app: AppComponent;
  // tslint:disable-next-line: prefer-const
  let router: Router;

  beforeEach(() => {
    service = new CommonService(http, httpHandler);
    component = new LoginComponent(service, app, router);
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

    tick(1);
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
    tick();
    expect(component.retorno).toBe(false);
 }));

  it('Probando User', () => {
    expect(component.user).toBeTruthy();
  });

  it('Probando email', () => {
    component.user.email = 'pepe@gmail.com';
    expect('pepe@gmail.com').toEqual(user.email);
  });

  it('Probando5', () => {
    component.user.password = '1234567';
    expect('123456').toEqual(user.password);
  });
});
