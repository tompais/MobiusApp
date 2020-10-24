import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FinalizacionComponent } from './finalizacion.component';

describe('FinalizacionComponent', () => {
  let component: FinalizacionComponent;
  let fixture: ComponentFixture<FinalizacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FinalizacionComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FinalizacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
