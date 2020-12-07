import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { JEscrituraComponent } from './j-escritura.component';

describe('JEscrituraComponent', () => {
  let component: JEscrituraComponent;
  let fixture: ComponentFixture<JEscrituraComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JEscrituraComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(JEscrituraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
