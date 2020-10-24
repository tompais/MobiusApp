import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FijacionComponent } from './fijacion.component';

describe('FijacionComponent', () => {
  let component: FijacionComponent;
  let fixture: ComponentFixture<FijacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FijacionComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FijacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
