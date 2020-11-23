import { Component, OnInit, Input } from '@angular/core';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'mobi-boton',
  templateUrl: './boton.component.html',
  styleUrls: ['./boton.component.scss'],
})
export class BotonComponent implements OnInit {

  @Input() forma = '';
  @Input() expansion = '';
  @Input() color = 'primary';
  @Input() link = '';
  @Input() tipoBoton = 'button';
  @Input() textoAMostrar = 'SIGUIENTE';
  @Input() icono = '';
  @Input() name = '';
  @Input() deshabilitado = false;
  @Input() vertical = 'start';
  @Input() horizontal = 'start';
  @Input() posForm = false;

  constructor() { }

  ngOnInit() {
  }

}
