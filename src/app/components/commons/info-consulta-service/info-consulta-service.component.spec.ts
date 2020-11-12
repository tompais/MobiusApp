import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { ErrorServicio } from '../models/errors/ErrorServicio';

import { InfoConsultaServiceComponent } from './info-consulta-service.component';

describe('InfoConsultaServiceComponent', () => {
  let component: InfoConsultaServiceComponent;
  let fixture: ComponentFixture<InfoConsultaServiceComponent>;
  // tslint:disable-next-line: prefer-const
  let errorServicio: ErrorServicio;

  beforeEach(async(() => {
    // errorServicio = new ErrorServicio('Error', true, '', false, 'ERROR');
    component = new InfoConsultaServiceComponent();
    TestBed.configureTestingModule({
      declarations: [ InfoConsultaServiceComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(InfoConsultaServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  /*it('Info Consulta Service NgOnInit', () => {
    expect(component.ngOnInit());
  });*/

  /*it('Error Servicio cargando True', () => {
    expect(component.cargando()).toBe('Ok');
  });

  it('Error Servicio cargando False', () => {
    expect(component.cargando()).toBe(' ');
  });

  it('Error Servicio Habilitar Reitento True', () => {
    expect(component.habilitarReitento()).toBe(true);
  });

  it('Error Servicio Habilitar Reitento False', () => {
    expect(component.habilitarReitento()).toBe(false);
  });

  it('Error Servicio reintentar', () => {
    expect(component.reintentar());
  });

  it('InfoConsultaService cancelar', () => {
    expect(component.cancelar());
  });

  it('Error Servicio Nuevo Request', () => {
    expect(component.ejecucionServicio.nuevoRequest());
  });

  it('Error Servicio Cancelar', () => {
    expect(component.ejecucionServicio.cancelar());
  });*/


});
