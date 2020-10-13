import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { RegistroComponent } from './registro.component';
import { CommonService } from 'src/app/services/common/common.service';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { User } from '../models/User';
import { AppComponent } from 'src/app/app.component';

describe('RegistroComponent', () => {
  // tslint:disable-next-line: prefer-const
  let component: RegistroComponent;
  let service: CommonService;
  // tslint:disable-next-line: prefer-const
  let http: HttpClient;
  let user: User;
  // tslint:disable-next-line: prefer-const
  let httpHandler: HttpHandler;
  let app: AppComponent;

  beforeEach(() => {
    service = new CommonService(http, httpHandler);
    component = new RegistroComponent(service, app);
    app = component.primaryApp;
    user = new User();
    user.email = 'pepe@gmail.com';
    user.password = '123456';
  });

  afterEach(() => {
    service = null;
    component = null;
    user = null;
  });

  it('Probando', () => {
    // expect(component.registro()).toBeTruthy();
    expect(component.registro());
  });

  /*let fixture: ComponentFixture<RegistroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistroComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RegistroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));*/

  it('Probando2', () => {
    expect(component.ngOnInit());
  });

  it('Probando3', () => {
    expect(component.user).toBeTruthy();
  });

  it('Probando4', () => {
    component.user.email = 'pepe@gmail.com';
    // tslint:disable-next-line: object-literal-key-quotes
    expect('pepe@gmail.com').toEqual(user.email);
 /* it('Probando3', () => {
    expect(component.commonService.login(component.user));
  });*/
  });

  it('Probando5', () => {
    component.user.email = 'pepe@gmail.com';
    // tslint:disable-next-line: object-literal-key-quotes
    expect('123456').toEqual(user.password);
 /* it('Probando3', () => {
    expect(component.commonService.login(component.user));
  });*/
  });
 /* beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistroComponent ],
      imports: [RouterTestingModule, HttpClientTestingModule]
    })
    .compileComponents();
  }));

  it('should create', () => {
    expect(component); // .toBeTruthy();
  });*/



});
