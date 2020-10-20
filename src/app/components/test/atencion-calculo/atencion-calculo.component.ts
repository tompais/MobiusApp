import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AngularDelegate } from '@ionic/angular';
import { AtencionCalculo } from '../models/AtencionCalculo';

@Component({
  selector: 'app-atencion-calculo',
  templateUrl: './atencion-calculo.component.html',
  styleUrls: ['./atencion-calculo.component.scss'],
})
export class AtencionCalculoComponent implements OnInit {

  ac: AtencionCalculo = new AtencionCalculo();
  respuestas: number[] = [];
  respuestasCorrectas: number[] = [];
  puntaje: number;
  retorno = true;
  numeroInicial: number;
  numeroResta: number;

  constructor() { }

  ngOnInit() {
    this.puntaje = 0;
    this.numeroInicial = Math.floor(Math.random() * 50) + 50;
    this.numeroResta = Math.floor(Math.random() * 4) + 6;
  }

  verificar(form: NgForm){

    if (form.invalid){
      this.retorno = false;
    }else{
      this.respuestasCorrectas[0] = this.numeroInicial - this.numeroResta;
      for (let i = 0; i < 5; i++) {
        this.respuestasCorrectas[i + 1] = this.respuestasCorrectas[i] - this.numeroResta;
      }

      for (let i = 0; i < 5; i++) {
        if (this.respuestas[i] === this.respuestasCorrectas[i]){
        this.puntaje = this.puntaje + 1; }
      }
      this.ac.puntaje = this.puntaje;
      this.ac.numeroInicial = this.numeroInicial;
      this.ac.numeroResta = this.numeroResta;
      this.ac.respuesta1 = this.respuestas[0];
      this.ac.respuesta2 = this.respuestas[1];
      this.ac.respuesta3 = this.respuestas[2];
      this.ac.respuesta4 = this.respuestas[3];
      this.ac.respuesta5 = this.respuestas[4];
// ACA DEBE IR EL SERVICIO QUE MANDA LOS DATOS AL BACK
      this.retorno = true;
    }

  }
}
