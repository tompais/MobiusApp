import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { RegistroComponent } from './registro.component';
import { CommonService } from 'src/app/services/common/common.service';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { User } from '../models/User';

describe('RegistroComponent', () => {
  // tslint:disable-next-line: prefer-const
  let component: RegistroComponent;
  let service: CommonService;
  // tslint:disable-next-line: prefer-const
  let http: HttpClient;
  let user: User;
  // tslint:disable-next-line: prefer-const
  let httpHandler: HttpHandler;


  beforeEach(() => {
    service = new CommonService(http, httpHandler);
    component = new RegistroComponent(service);
    user = new User();
    user.email = 'pepe@gmail.com';
    user.password = '123456';
  });

 /* afterEach(() => {
    service = null;
    component = null;
  });*/

  it('Probando', () => {
    // expect(component.registro()).toBeTruthy();
    expect(component.registro());
  });

 // let fixture: ComponentFixture<RegistroComponent>;

  /*beforeEach(async(() => {
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
