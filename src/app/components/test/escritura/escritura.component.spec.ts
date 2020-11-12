import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EscrituraComponent } from './escritura.component';

describe('EscrituraComponent', () => {
  let component: EscrituraComponent;
  let fixture: ComponentFixture<EscrituraComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EscrituraComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EscrituraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
