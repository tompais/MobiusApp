import { Component, Input, OnInit } from '@angular/core';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'mobi-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {

  @Input() titulo: string;
  @Input() color = 'primary';
  @Input() urlAVolver = '';
  iconoBack = false;
  constructor() {
    this.titulo = 'titulo';
  }

  ngOnInit() {
    if (this.urlAVolver !== ''){
      this.iconoBack = true;
    }
  }

}
