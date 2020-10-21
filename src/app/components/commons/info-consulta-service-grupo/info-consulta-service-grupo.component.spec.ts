import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { TipoSpinner } from '../enums/TipoSpinner';
import { InfoConsultaServiceComponent } from '../info-consulta-service/info-consulta-service.component';
import { ErrorServicio } from '../models/errors/ErrorServicio';
import { ErrorServicioGrupo } from '../models/errors/ErrorServicioGrupo';

import { InfoConsultaServiceGrupoComponent } from './info-consulta-service-grupo.component';

describe('InfoConsultaServiceGrupoComponent', () => {
  let component: InfoConsultaServiceGrupoComponent;
  let fixture: ComponentFixture<InfoConsultaServiceGrupoComponent>;
  let comp: InfoConsultaServiceGrupoComponent;
  // tslint:disable-next-line: prefer-const
  let error: ErrorServicio;
  let errorServicioGrupo: ErrorServicioGrupo;
  let tipoSpinner: TipoSpinner;

  beforeEach(async(() => {
    comp = new InfoConsultaServiceGrupoComponent();
    // error = new ErrorServicio('error', true, '', false, 'ERROR');
    errorServicioGrupo = new ErrorServicioGrupo();
    // errorServicioGrupo.errores.push(error);
    tipoSpinner = TipoSpinner.light;
    TestBed.configureTestingModule({
      declarations: [ InfoConsultaServiceGrupoComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(InfoConsultaServiceGrupoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('InfoConsultaServiceGrupo NgOnInit', () => {
    expect(comp.ngOnInit());
  });

 /* it('InfoConsultaServiceGrupo mostrarCargando True', () => {
    expect(comp.mostrarCargando()).toBe(true);
  });

  it('InfoConsultaServiceGrupo mostrarCargando False', () => {
    expect(comp.mostrarCargando()).toBe(false);
  });

  it('InfoConsultaServiceGrupo reintentar Emit', () => {
    expect(comp.reintentar(error));
  });

  it('InfoConsultaServiceGrupo cancelar ', () => {
    expect(comp.cancelar());
  });

  it('InfoConsultaServiceGrupo getClassSpanBool True ', () => {
    expect(comp.getClassSpanBool(true)).toBe('verde');
  });

  it('InfoConsultaServiceGrupo getClassSpanBool False ', () => {
    expect(comp.getClassSpanBool(false)).toBe('rojo');
  });*/

});
