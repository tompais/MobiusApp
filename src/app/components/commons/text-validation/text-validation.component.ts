import { Component, Input, OnInit } from '@angular/core';
import { AppComponent } from 'src/app/app.component';
import { TipoInput } from '../enums/TipoInput';

@Component({
  selector: 'app-text-validation',
  templateUrl: './text-validation.component.html',
  styleUrls: ['./text-validation.component.scss'],
})
export class TextValidationComponent implements OnInit {

  /*primaryApp: AppComponent = null;
  @Input() tipoInput = TipoInput.text;
  @Input() positionLabel: string;
  @Input() colorLabel: string;
  @Input() nombreLabel: string;
  @Input() nameInput: string;
  @Input() valueInput: string;


  constructor(public app: AppComponent) {
    this.primaryApp = app;
   }
*/
  ngOnInit() {}

 /* esInputText(): boolean {
    let resp = false;
    console.log('Position Label');
    console.log(this.positionLabel);
    if (this.tipoInput === 0) {
      resp = true;
    }
    return resp;
  }

  descInput(): string {
    let resp = '';
    switch (this.tipoInput) {
      case 0:
        resp = 'text';
        break;
    }
    return resp;
  }
*/
}
