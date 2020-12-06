import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { JHomeComponent } from './j-home.component';

describe('JHomeComponent', () => {
  let component: JHomeComponent;
  let fixture: ComponentFixture<JHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JHomeComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(JHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
