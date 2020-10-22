import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ErrorServicio } from '../models/errors/ErrorServicio';

@Component({
  selector: 'app-info-consulta-service',
  templateUrl: './info-consulta-service.component.html',
  styleUrls: ['./info-consulta-service.component.scss'],
})
export class InfoConsultaServiceComponent implements OnInit {

  @Input() ejecucionServicio: ErrorServicio;
  @Input() forzarReitento = false;
  @Output() reintento = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit() {}

  cargando(): string {
    if (this.ejecucionServicio.estado === true) {
      return 'Ok';
    }
    return '';
  }

  habilitarReitento(): boolean {
    let resp = false;
    if (this.ejecucionServicio.estado === false || this.ejecucionServicio.falloRequest === true) {
      resp = true;
    }
    if (this.forzarReitento === true) {
      resp = true;
    }
    return resp;
  }

  reintentar() {
    this.ejecucionServicio.nuevoRequest();
    this.reintento.emit();
  }

  cancelar() {
    this.ejecucionServicio.cancelar();
  }

}
