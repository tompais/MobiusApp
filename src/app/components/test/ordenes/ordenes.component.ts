import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ordenes',
  templateUrl: './ordenes.component.html',
  styleUrls: ['./ordenes.component.scss'],
})
export class OrdenesComponent implements OnInit {
  cuadradoStatus: boolean;
  circuloStatus: boolean;
  trianguloStatus: boolean;
  cruzStatus: boolean;
  rowsBotonesStatus: boolean;
  audioStatus: boolean;
  respuesta: string[] = [];
  contador: number;
  resetNextStatus: boolean;

  constructor() { }

  ngOnInit() {
    this.contador = 0;
    this.cuadradoStatus = true;
    this.circuloStatus = true;
    this.trianguloStatus = true;
    this.cruzStatus = true;
    this.audioStatus = true;
    this.rowsBotonesStatus = false;
    this.resetNextStatus = false;

  }

  cuadrado(){
    this.cuadradoStatus = false;
    this.respuesta[this.contador] = 'Cuadrado';
    this.contador = this.contador + 1;
  }

  circulo(){
    this.circuloStatus = false;
    this.respuesta[this.contador] = 'Circulo';
    this.contador = this.contador + 1;
  }

  triangulo(){
    this.trianguloStatus = false;
    this.respuesta[this.contador] = 'Triangulo';
    this.contador = this.contador + 1;
  }

  cruz(){
    this.cruzStatus = false;
    this.respuesta[this.contador] = 'Cruz';
    this.contador = this.contador + 1;
  }

  reset(){
    this.contador = 0;
    this.cuadradoStatus = true;
    this.circuloStatus = true;
    this.trianguloStatus = true;
    this.cruzStatus = true;
    this.respuesta.length = 0;
  }

  audioStart(){
    const audio = new Audio('assets/audio/ordenes2.mp3');
    audio.play();
    this.audioStatus = false;
    this.rowsBotonesStatus = true;
    this.resetNextStatus = true;
  }
}
