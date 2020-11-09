import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { IonicModule } from '@ionic/angular';
import { CommonService } from 'src/app/services/common/common.service';
import { CalculoService } from 'src/app/services/test/calculo.service';
import { AtencionCalculoComponent } from './atencion-calculo.component';

describe('AtencionCalculoComponent', () => {
  let component: AtencionCalculoComponent;
  let fixture: ComponentFixture<AtencionCalculoComponent>;
  // tslint:disable-next-line: prefer-const
  let commonService: CommonService;
  // tslint:disable-next-line: prefer-const
  let router: Router;
  // tslint:disable-next-line: prefer-const
  let calculoService: CalculoService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AtencionCalculoComponent, NgForm],
      imports: [IonicModule.forRoot(), RouterTestingModule, FormsModule]
    }).compileComponents();

    fixture = TestBed.createComponent(AtencionCalculoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    component = new AtencionCalculoComponent(commonService, router, calculoService);
    component.ngOnInit();
  }));

  /*it('Probando resta numero 1 ', () => {
    component.numeroInicial = 100;
    component.numeroResta = 1;
    component.respuestasCorrectas[0] = 99;
    component.respuestasCorrectas[1] = 98;
    component.respuestasCorrectas[2] = 97;
    component.respuestasCorrectas[3] = 96;
    component.respuestasCorrectas[4] = 95;
    const calcForm = {
      value: {
         res1: 99,
         res2: 98,
         res3: 97,
         res4: 96,
         res5: 95,
     },
     invalid: false
    } as NgForm;

    component.verificar(calcForm);
    expect(component.respuestasCorrectas[4]).toEqual(95);
  });*/

 /* it('Probando Form invalid ', () => {
    component.numeroInicial = 100;
    component.numeroResta = 1;
    component.respuestasCorrectas[0] = 99;
    component.respuestasCorrectas[1] = 98;
    component.respuestasCorrectas[2] = 97;
    component.respuestasCorrectas[3] = 96;
    component.respuestasCorrectas[4] = 95;
    const calcForm = {
      value: {
         res1: 99,
         res2: 98,
         res3: 97,
         res4: 96,
         res5: 95,
     },
     invalid: true
    } as NgForm;

    component.verificar(calcForm);
    expect(component.retorno).toBe(false);
  });*/

 /* it('Probando ruta puntaje 0 ', () => {
    component.numeroInicial = 100;
    component.numeroResta = 1;
    component.respuestasCorrectas[0] = 0;
    component.respuestasCorrectas[1] = 0;
    component.respuestasCorrectas[2] = 0;
    component.respuestasCorrectas[3] = 0;
    component.respuestasCorrectas[4] = 0;
    const calcForm = {
      value: {
         res1: 0,
         res2: 0,
         res3: 0,
         res4: 0,
         res5: 0,
     },
     invalid: false
    } as NgForm;

    component.verificar(calcForm);
    expect(component.puntaje).toEqual(0);
  });*/
});
