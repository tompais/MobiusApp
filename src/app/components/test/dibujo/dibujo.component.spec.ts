import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DibujoComponent } from './dibujo.component';

describe('DibujoComponent', () => {
  let component: DibujoComponent;
  let fixture: ComponentFixture<DibujoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DibujoComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DibujoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
