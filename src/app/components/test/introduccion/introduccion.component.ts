import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-introduccion',
  templateUrl: './introduccion.component.html',
  styleUrls: ['./introduccion.component.scss'],
})
export class IntroduccionComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    // Se debe verificar que la persona este logeada y no haya hecho el test aun para poder ver esta pagina
  }

}
