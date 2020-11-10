import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AtencionComponent } from './atencion.component';

describe('AtencionComponent', () => {
  let component: AtencionComponent;
  let fixture: ComponentFixture<AtencionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AtencionComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AtencionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
