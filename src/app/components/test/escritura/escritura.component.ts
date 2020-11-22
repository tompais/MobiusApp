import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/services/common/common.service';
import { EscrituraService } from 'src/app/services/test/escritura.service';
import { environmentProd } from 'src/environments/environment.prod';
import { GameCategoryRequest } from '../../commons/models/commons/GameCategoryRequest';
import { PatientTaskAnswersRequestList } from '../../commons/models/commons/PatientTaskAnswersRequestList';

@Component({
  selector: 'app-escritura',
  templateUrl: './escritura.component.html',
  styleUrls: ['./escritura.component.scss'],
})
export class EscrituraComponent implements OnInit {
frases: string[] = [];
frasesOrdenadas: string[] = [];
descripcion: string;
gameId: number;
category: string;
taskId: number;
escrituraRequest: GameCategoryRequest = null;
archivoTxt: string;
url = environmentProd.url;
texto: string;
direc = '/texts/';
respuesta: string[] = [];
cargando = false;
errorCode = false;
i: number;
prueba = 'assets/img/prueba.txt';
nameTest = '';

  constructor(public commonService: CommonService, private router: Router, public escrituraServ: EscrituraService, public http: HttpClient) { }

  ngOnInit() {
      this.obtenerDatos();

  }

  reorderItems(event)
  {
    console.log(`Moving item from ${event.detail.from} to ${event.detail.to}`);
    const itemMove = this.frases.splice(event.detail.from, 1)[0];
    console.log(itemMove);
    this.frases.splice(event.detail.to, 0, itemMove);
    event.detail.complete();
  }

  enviarRespuesta(){
    this.respuesta[0] = this.frases[0];
    for (this.i = 1; this.i < this.frases.length; this.i++) {
      this.respuesta[0] = this.respuesta[0] + this.frases[this.i];
    }
    console.log(this.respuesta[0]);

    const task: PatientTaskAnswersRequestList<string> = new PatientTaskAnswersRequestList<string>();
    task.taskId = this.taskId;
    task.patientAnswersRequest = this.respuesta;
    this.escrituraRequest.patientTaskAnswersRequestList.push(task);
    console.log(this.escrituraRequest);

    this.escrituraServ.enviarDatos(this.escrituraRequest).subscribe((resp: any) => {
      this.cargando = false;
      this.errorCode = false;
      if (this.errorCode === false) {
        this.router.navigate(['/test/finalizacion']);
      }
    }, (error: HttpErrorResponse) => {
      this.cargando = false;
      this.errorCode = true;
    });
  }

  obtenerDatos(){

      this.escrituraRequest = new GameCategoryRequest();
      this.escrituraRequest.patientTaskAnswersRequestList = new Array<PatientTaskAnswersRequestList<string>>();

      this.escrituraServ.traerDatos().subscribe((resp: any) => {
      this.nameTest = resp.name;
      this.descripcion = resp.tasks[0].description;
      this.archivoTxt = resp.resources[0].fileName;
      console.log(this.descripcion);
      this.escrituraRequest.gameId = resp.id;
      this.escrituraRequest.category = resp.category;
      console.log(this.escrituraRequest.gameId);
      console.log(this.escrituraRequest.category);
      this.taskId = resp.tasks[0].id;
      console.log(this.taskId);
      console.log(resp);
      console.log(this.escrituraRequest);
      this.texto = `${this.url}${this.direc}${this.archivoTxt}`;
      console.log(this.texto);
      });
      this.obtenerFrase();

  }

  obtenerFrase(){
    fetch(this.prueba)
    .then(response => response.text())
    .then(data => {
    this.frasesOrdenadas = data.split('-');
    // Do something with your data
    this.frases[3] = this.frasesOrdenadas[0];
    this.frases[1] = this.frasesOrdenadas[1];
    this.frases[0] = this.frasesOrdenadas[2];
    this.frases[2] = this.frasesOrdenadas[3];

    console.log(this.frases);
    console.log(this.frases.length);
    console.log(data.length);
    console.log(data);
    });
  }

}
