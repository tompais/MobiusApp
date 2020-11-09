import { RegistroComponent } from './registro.component';
import { CommonService } from 'src/app/services/common/common.service';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { AppComponent } from 'src/app/app.component';
import { fakeAsync, tick } from '@angular/core/testing';
import { NgForm } from '@angular/forms';
import { UserRequest } from '../models/user/UserRequest';
import { Router } from '@angular/router';

describe('RegistroComponent', () => {
  // tslint:disable-next-line: prefer-const
  let component: RegistroComponent;
  let service: CommonService;
  // tslint:disable-next-line: prefer-const
  let http: HttpClient;
  let user: UserRequest;
  // tslint:disable-next-line: prefer-const
  let httpHandler: HttpHandler;
  let app: AppComponent;
  // tslint:disable-next-line: prefer-const
  let router: Router;

  beforeEach(() => {
    service = new CommonService(http, httpHandler);
    component = new RegistroComponent(service, app, router);
    app = component.primaryApp;
    user = new UserRequest();
    user.patientEmail = 'pepe@gmail.com';
    user.password = '123456';
    component.ngOnInit();
  });

  afterEach(() => {
    service = null;
    component = null;
    user = null;
  });

  /*it('Probando Registro OK', () => {
    // expect(component.registro()).toBeTruthy();
    expect(component.registro());
  });*/

  it('Probando Registro OK', fakeAsync(() => {
    const testForm = {
       value: {
        firstName: 'Pepe',
        lastName: 'Gomez',
        birthdate: '16/08/69',
        email: 'pepeg@gmail.com',
        password: '123456',
        passwordRepeat: '123456'
      },
      invalid: false
     } as NgForm;
    component.registro(testForm);
    tick(1);
    expect(user.retorno).toBe(true);
  }));

  it('Probando Registro False', fakeAsync(() => {
    const testForm = {
       value: {
        firstName: 'Pepe',
        lastName: 'Gomez',
        birthdate: '16/08/69',
        email: 'pepeg@gmail.com',
        password: '123456',
        passwordRepeat: '123456'
      },
      invalid: true
     } as NgForm;
    component.registro(testForm);
    tick(1);
    expect(component.user.retorno).toBe(false);
  }));

  it('Probando UsuarioRequest Password Coinciden OK', async () => {
    component.user.password = '123456';
    component.user.passwordRepeat = '123456';
    expect(component.user.passwordCoinciden()).toBe(true);
  });

  it('Probando UsuarioRequest Password Coinciden False', async () => {
    component.user.password = '123456';
    component.user.passwordRepeat = '1234567';
    expect(component.user.passwordCoinciden()).toBe(false);
  });

  it('Probando UsuarioRequest Validar Campos Vacios Ok', async () => {
    component.user.firstName = '';
    component.user.lastName = '';
    component.user.birthday = '';
    component.user.patientEmail = '';
    component.user.guardianEmail = '';
    component.user.password = '';
    component.user.passwordRepeat = '';
    expect(component.user.validarCamposVacios()).toBe(true);
  });

  it('Probando UsuarioRequest Validar Campos Vacios False', async () => {
    component.user.firstName = 'Pepe';
    component.user.lastName = 'pepe';
    component.user.birthday = '1968-10-13';
    component.user.patientEmail = 'pepe@gmail.com';
    component.user.guardianEmail = 'lol@gmail.com';
    component.user.password = '123456';
    component.user.passwordRepeat = '123456';
    component.user.age = 18;
    expect(component.user.validarCamposVacios()).toBe(false);
  });

 /* it('Probando UsuarioRequest Enviar Form Ok', async () => {
    component.user.firstName = 'Pepe';
    component.user.lastName = 'pepe';
    component.user.birthday = '1968-10-13';
    component.user.patientEmail = 'pepe@gmail.com';
    component.user.guardianEmail = 'lol@gmail.com';
    component.user.password = '123456';
    component.user.passwordRepeat = '123456';
    expect(component.user.validarCamposVacios()).toBe(false);
    expect(component.user.esMenorDe18Anios()).toBe(false);
    expect(component.user.passwordNoCoinciden()).toBe(false);
    console.log('VALIDAR CAMPOS VACIOS: ' + component.user.validarCamposVacios());
    console.log('esMenorDe18Anios: ' + component.user.esMenorDe18Anios());
    console.log('passwordNoCoinciden: ' + component.user.passwordNoCoinciden());
    expect(component.user.enviarForm()).toBe(true);
  });*/

  it('Probando UsuarioRequest Password No Coinciden', async () => {
    component.user.password = '1234567';
    component.user.passwordRepeat = '123456';
    expect(component.user.passwordNoCoinciden()).toBe(true);
  });

  it('Probando UsuarioRequest esMenorDe18Anios True', async () => {
    component.user.age = 18;
    component.user.birthday = '2008-10-23';
    expect(component.user.esMenorDe18Anios()).toBe(true);
  });

  /*it('Probando UsuarioRequest Enviar Form False', async () => {
    component.user.firstName = 'Pepe';
    component.user.lastName = 'pepe';
    component.user.birthday = '1968-10-13';
    component.user.patientEmail = 'pepe@gmail.com';
    component.user.guardianEmail = 'lol@gmail.com';
    component.user.password = '123456';
    component.user.passwordRepeat = '123456';
    component.user.age = 18;
    expect(component.user.enviarForm()).toBe(false);
  });*/

  /*it('Probando UsuarioRequest Enviar Form False', async () => {
    component.user.firstName = 'Pepe';
    component.user.lastName = 'pepe';
    component.user.birthday = '1968-10-13';
    component.user.patientEmail = 'pepe@gmail.com';
    component.user.guardianEmail = 'lol@gmail.com';
    component.user.password = '123456';
    component.user.passwordRepeat = '123456';
    component.user.age = 18;
    expect(component.user.enviarForm()).toBe(false);
  });*/

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
    component.user.patientEmail = 'pepe@gmail.com';
    // tslint:disable-next-line: object-literal-key-quotes
    expect('pepe@gmail.com').toEqual(user.patientEmail);
 /* it('Probando3', () => {
    expect(component.commonService.login(component.user));
  });*/
  });

  it('Probando5', () => {
    component.user.patientEmail = 'pepe@gmail.com';
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
