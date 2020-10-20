import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, NgForm } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { IonicModule } from '@ionic/angular';
import { AtencionCalculoComponent } from './atencion-calculo.component';

describe('AtencionCalculoComponent', () => {
  let component: AtencionCalculoComponent;
  let fixture: ComponentFixture<AtencionCalculoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AtencionCalculoComponent, NgForm],
      imports: [IonicModule.forRoot(), RouterTestingModule, FormsModule]
    }).compileComponents();

    fixture = TestBed.createComponent(AtencionCalculoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    component = new AtencionCalculoComponent();
    component.ngOnInit();
  }));

  it('Probando resta numero 1 ', () => {
    component.numeroInicial = 100;
    component.numeroResta = 1;
    component.respuestas[0] = 99;
    component.respuestas[1] = 98;
    component.respuestas[2] = 97;
    component.respuestas[3] = 96;
    component.respuestas[4] = 95;
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
  });

  it('Probando Form invalid ', () => {
    component.numeroInicial = 100;
    component.numeroResta = 1;
    component.respuestas[0] = 99;
    component.respuestas[1] = 98;
    component.respuestas[2] = 97;
    component.respuestas[3] = 96;
    component.respuestas[4] = 95;
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
  });

  it('Probando ruta puntaje 0 ', () => {
    component.numeroInicial = 100;
    component.numeroResta = 1;
    component.respuestas[0] = 0;
    component.respuestas[1] = 0;
    component.respuestas[2] = 0;
    component.respuestas[3] = 0;
    component.respuestas[4] = 0;
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
  });
});
