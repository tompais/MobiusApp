import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from 'src/app/services/common/localstorage.service';

@Component({
  selector: 'mobi-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  storage: LocalStorageService;
  nombreApellido: string = '';
  esTest: boolean = false;
  constructor(public router: Router) {
    this.storage = new LocalStorageService();
    this.nombreApellido = this.storage.get('nombreUsuario');
    this.esTest = false;
   }

  ngOnInit() {
   
  }
  
  cerrarSesion(){
    this.storage.clear();
    this.router.navigate(['/login'])
  }
}
