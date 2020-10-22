import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-visualizacion',
  templateUrl: './visualizacion.component.html',
  styleUrls: ['./visualizacion.component.scss'],
})
export class VisualizacionComponent implements OnInit {
  respuesta: string;
  retorno: boolean;
  constructor() { }

  ngOnInit() {}

  verificar(form: NgForm){

    if (form.invalid){
      this.retorno = false;
    }else{
    }
  }

}
