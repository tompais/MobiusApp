import { Component, Input, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { LocalStorageService } from 'src/app/services/common/localstorage.service';

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
  @Input() mostrarmenu = false;
  iconoBack = false;
  storage: LocalStorageService;
  constructor(private menu: MenuController) {
    this.titulo = 'titulo';
    this.storage = new LocalStorageService();
  }

  ngOnInit() {
    if (this.urlAVolver !== ''){
      this.iconoBack = true;
    }
  }
  
  abrirMenu(){
    this.menu.toggle();
  }
}
