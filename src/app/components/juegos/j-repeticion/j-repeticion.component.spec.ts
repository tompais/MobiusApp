import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { JRepeticionComponent } from './j-repeticion.component';

describe('JRepeticionComponent', () => {
  let component: JRepeticionComponent;
  let fixture: ComponentFixture<JRepeticionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JRepeticionComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(JRepeticionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
