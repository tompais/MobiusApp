import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { OlvidoPasswordComponent } from './olvido-password.component';

describe('OlvidoPasswordComponent', () => {
  let component: OlvidoPasswordComponent;
  let fixture: ComponentFixture<OlvidoPasswordComponent>;
  let comp: OlvidoPasswordComponent;

  beforeEach(async(() => {
    comp = new OlvidoPasswordComponent();
    TestBed.configureTestingModule({
      declarations: [ OlvidoPasswordComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(OlvidoPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('Olvido Password NgOnInit', () => {
    expect(comp.ngOnInit());
  });
});
