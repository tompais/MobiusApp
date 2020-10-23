import { Component, Input, OnInit } from '@angular/core';
import { AppComponent } from 'src/app/app.component';
import { TipoEntradaDato } from '../enums/TipoEntradaDatos';
import { TipoInput } from '../enums/TipoInput';

@Component({
  selector: 'app-text-validation',
  templateUrl: './text-validation.component.html',
  styleUrls: ['./text-validation.component.scss'],
})
export class TextValidationComponent implements OnInit {

  @Input() propiedad = '';
  @Input() propiedadValor = '';
  @Input() propiedadDescripcion = '';
  @Input() tipo: TipoInput = TipoInput.textBox;
  @Input() tipoDatos: TipoEntradaDato = TipoEntradaDato.alfaNumerico;
  @Input() objeto: Object;
  @Input() tipoPassword = false;

  constructor(){}

  ngOnInit(){}

  public getTypeInput() {
    switch (this.tipo) {
      case TipoInput.textBox:
        if (this.tipoPassword === true) {
          return 'password';
        } else {
          if (this.tipoDatos === TipoEntradaDato.alfaNumerico) {
            return 'text';
          } else {
            return 'number';
          }
        }
      case TipoInput.radioGroup:
        return 'radio';
      case TipoInput.checkbox:
        return 'checkbox';
      default:
        return 'text';
    }
  }

  visibilidadText(): boolean {
    let resp = false;
    if (this.tipo === 0 || this.tipo === 5 && this.objeto != null) {
      resp = true;
    }
    return resp;
  }
}
