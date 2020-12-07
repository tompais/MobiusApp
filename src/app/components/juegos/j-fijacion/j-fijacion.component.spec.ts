import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { JFijacionComponent } from './j-fijacion.component';

describe('JFijacionComponent', () => {
  let component: JFijacionComponent;
  let fixture: ComponentFixture<JFijacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JFijacionComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(JFijacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
