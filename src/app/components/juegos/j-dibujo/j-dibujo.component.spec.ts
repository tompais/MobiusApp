import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { JDibujoComponent } from './j-dibujo.component';

describe('JDibujoComponent', () => {
  let component: JDibujoComponent;
  let fixture: ComponentFixture<JDibujoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JDibujoComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(JDibujoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
