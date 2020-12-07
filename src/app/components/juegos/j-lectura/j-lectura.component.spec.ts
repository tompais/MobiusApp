import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { JLecturaComponent } from './j-lectura.component';

describe('JLecturaComponent', () => {
  let component: JLecturaComponent;
  let fixture: ComponentFixture<JLecturaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JLecturaComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(JLecturaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
