import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { JFinalizacionComponent } from './j-finalizacion.component';

describe('JFinalizacionComponent', () => {
  let component: JFinalizacionComponent;
  let fixture: ComponentFixture<JFinalizacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JFinalizacionComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(JFinalizacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
