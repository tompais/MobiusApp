import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AppComponent } from 'src/app/app.component';
import { TipoSpinner } from '../enums/TipoSpinner';
import { ErrorServicio } from '../models/errors/ErrorServicio';
import { ErrorServicioGrupo } from '../models/errors/ErrorServicioGrupo';

@Component({
  selector: 'app-info-consulta-service-grupo',
  templateUrl: './info-consulta-service-grupo.component.html',
  styleUrls: ['./info-consulta-service-grupo.component.scss'],
})
export class InfoConsultaServiceGrupoComponent implements OnInit {

  @Input() erroresServicio: ErrorServicioGrupo;
  @Input() primaryApp: AppComponent;
  @Input() mostrarErrores = true;
  @Input() ancho = 60;
  @Input() alto = 60;
  @Input() tipoSpinner: TipoSpinner = TipoSpinner.dark;
  @Output() eventoError = new EventEmitter<ErrorServicio>();

  constructor() {
   }

  ngOnInit() {}

  mostrarCargando(): boolean {
    let resp = false;
    if (this.erroresServicio != null) {
      resp = this.erroresServicio.mostrarCargando();
    }
    return resp;
  }

  reintentar(error: ErrorServicio) {
    this.eventoError.emit(error);
  }

  cancelar() {
    this.erroresServicio.cancelar();
  }

  getClassSpanBool(valor: boolean) {
    let resp = '';
    if (valor === true) {
      resp = 'verde';
    } else {
      resp = 'rojo';
    }
    return resp;
  }

}
