import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { JAtencionComponent } from './j-atencion.component';

describe('JAtencionComponent', () => {
  let component: JAtencionComponent;
  let fixture: ComponentFixture<JAtencionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JAtencionComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(JAtencionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
