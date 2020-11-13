import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/services/common/common.service';
import { OrdenesService } from 'src/app/services/test/ordenes.service';
import { environmentProd } from 'src/environments/environment.prod';
import { GameCategoryRequest } from '../../commons/models/commons/GameCategoryRequest';
import { PatientTaskAnswersRequestList } from '../../commons/models/commons/PatientTaskAnswersRequestList';

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
  url = environmentProd.url;
  audioName: string;
  cargando = false;
  errorCode = false;
  audio: string;
  ordenesRequest: GameCategoryRequest = null;

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
    this.obtenerDatos();
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
    // const audio = new Audio(this.audio);
    const audio = new Audio(this.audio);
    audio.play();

    setTimeout(() => {
      this.audioStatus = false;
      this.rowsBotonesStatus = true;
      this.resetNextStatus = true;
    }, 3.5 * 1000);

  }

  enviar(){
  if (this.contador === 3){
    this.errorStatus = false;

    const task: PatientTaskAnswersRequestList<string> = new PatientTaskAnswersRequestList<string>();
    task.taskId = this.taskId;
    task.patientAnswersRequest = this.respuesta;
    this.ordenesRequest.patientTaskAnswersRequestList.push(task);
    console.log(this.ordenesRequest);

    this.ordenesServ.enviarDatos(this.ordenesRequest).subscribe((resp: any) => {
      this.cargando = false;
      this.errorCode = false;
      if (this.errorCode === false) {
        this.router.navigate(['/test/lectura']);
      }
    }, (error: HttpErrorResponse) => {
      this.cargando = false;
      this.errorCode = true;
    });

  }
  else{
    this.errorStatus = true;
  }
  }

  obtenerDatos(){

    this.ordenesRequest = new GameCategoryRequest();
    this.ordenesRequest.patientTaskAnswersRequestList = new Array<PatientTaskAnswersRequestList<string>>();

    this.ordenesServ.traerDatos().subscribe((resp: any) => {
      this.descripcion = resp.tasks[0].description;
      this.audioName = resp.resources[0].fileName;
      console.log(this.descripcion);
      this.ordenesRequest.gameId = resp.id;
      this.ordenesRequest.category = resp.category;
      console.log(this.ordenesRequest.gameId);
      console.log(this.ordenesRequest.category);
      this.taskId = resp.tasks[0].id;
      console.log(this.taskId);
      console.log(resp);
      console.log(this.ordenesRequest);
      this.audio = `${this.url}/audios/${this.audioName}`;
      console.log(this.audio);
      });
}
}
