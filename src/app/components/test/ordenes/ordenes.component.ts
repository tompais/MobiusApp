import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/services/common/common.service';
import { OrdenesService } from 'src/app/services/test/ordenes.service';

@Component({
  selector: 'app-ordenes',
  templateUrl: './ordenes.component.html',
  styleUrls: ['./ordenes.component.scss'],
})
export class OrdenesComponent implements OnInit {
  cuadradoStatus: boolean;
  circuloStatus: boolean;
  errorStatus: boolean;
  trianguloStatus: boolean;
  cruzStatus: boolean;
  rowsBotonesStatus: boolean;
  audioStatus: boolean;
  respuesta: string[] = [];
  contador: number;
  resetNextStatus: boolean;
  gameId: number;
  category: string;
  taskId: number;
  descripcion: string;
  url = 'https://stage-blue-mobius-mind-api.herokuapp.com/';
  audioName: string;
  cargando = false;
  errorCode = false;
  audio: string;

  constructor(public commonService: CommonService, private router: Router, public ordenesServ: OrdenesService) { }

  ngOnInit() {
    this.contador = 0;
    this.cuadradoStatus = true;
    this.circuloStatus = true;
    this.trianguloStatus = true;
    this.cruzStatus = true;
    this.audioStatus = true;
    this.rowsBotonesStatus = false;
    this.resetNextStatus = false;

    this.ordenesServ.traerDatos().subscribe((resp: any) => {
      this.descripcion = resp.tasks[0].description;
      this.audioName = resp.resources[0].fileName;
      this.gameId = resp.id;
      this.category = resp.category;
      this.taskId = resp.tasks[0].id;
      this.audio = `${this.url}${this.audioName}`;
      console.log(this.gameId);
      console.log(this.category);
      console.log(this.taskId);
      console.log(this.descripcion);
      console.log(this.audioName);
      console.log(resp);
      });

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
    const audio = new Audio(this.audio);
    audio.play();

    setTimeout(() => {
      this.audioStatus = false;
      this.rowsBotonesStatus = true;
      this.resetNextStatus = true;
    }, 3.5 * 1000);

  }

  enviar(){
  if (this.contador === 4){
    this.errorStatus = false;

    this.ordenesServ.enviarDatos(this.gameId, this.category, this.taskId, this.respuesta).subscribe((resp: any) => {
      this.cargando = false;
      this.errorCode = false;
      if (this.errorCode === false) {
        this.router.navigate(['/test/finalizacion']);
      }
    }, (error: Error) => {
      this.cargando = false;
      this.errorCode = true;
    });

  }
  else{
    this.errorStatus = true;
  }
  }
}
