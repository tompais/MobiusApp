import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RepeticionComponent } from './repeticion.component';

describe('RepeticionComponent', () => {
  let component: RepeticionComponent;
  let fixture: ComponentFixture<RepeticionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RepeticionComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RepeticionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
