import { Component, Input, OnInit } from '@angular/core';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'mobi-descripcion',
  templateUrl: './descripcion.component.html',
  styleUrls: ['./descripcion.component.scss'],
})
export class DescripcionComponent implements OnInit {
  @Input() color = '';
  @Input() textoAmotrar = 'Texto a mostrar';
  @Input() titulo = false;
  constructor() { }

  ngOnInit() {}

}
