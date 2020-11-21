import { Component, Input, OnInit } from '@angular/core';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'mobi-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {

  @Input() titulo = '';
  @Input() color = 'primary';
  @Input() urlAVolver = '';
  iconoBack = false;
  constructor() { }

  ngOnInit() {
    if (this.urlAVolver !== ''){
      this.iconoBack = true;
    }
  }

}
