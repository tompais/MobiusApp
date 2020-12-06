import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/services/common/common.service';
import { JuegosService } from 'src/app/services/juegos/juegos.service';
import { environmentProd } from 'src/environments/environment.prod';
import { GameCategoryRequest } from '../../commons/models/commons/GameCategoryRequest';
import { PatientTaskAnswersRequestList } from '../../commons/models/commons/PatientTaskAnswersRequestList';

@Component({
  selector: 'app-j-escritura',
  templateUrl: './j-escritura.component.html',
  styleUrls: ['./j-escritura.component.scss'],
})
export class JEscrituraComponent implements OnInit {

  frases: string[] = [];
  frasesOrdenadas: string[] = [];
  descripcion: string;
  gameId: number;
  category: string;
  taskId: number;
  escrituraRequest: GameCategoryRequest = null;
  archivoTxt: string[] = [];
  url = environmentProd.url;
  texto = '';
  direc = '/texts/';
  respuesta: string[] = [];
  cargando = false;
  errorCode = false;
  i: number;
  prueba = 'assets/img/prueba.txt';
  nameGame = '';
  archivoTexto: File;
  fileName: string;

  constructor(public commonService: CommonService, private router: Router, public juegosServ: JuegosService, public http: HttpClient) { }

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

    this.juegosServ.enviarDatos(this.escrituraRequest).subscribe((resp: any) => {
      this.cargando = false;
      this.errorCode = false;
      if (this.errorCode === false) {
        this.router.navigate(['/test/dibujo']);
      }
    }, (error: HttpErrorResponse) => {
      this.cargando = false;
      this.errorCode = true;
    });
  }

  obtenerDatos(){

      this.escrituraRequest = new GameCategoryRequest();
      this.escrituraRequest.patientTaskAnswersRequestList = new Array<PatientTaskAnswersRequestList<string>>();

      this.juegosServ.traerDatos().subscribe((resp: any) => {
      this.nameGame = resp.name;
      this.descripcion = resp.tasks[0].description;
      this.fileName = resp.resources[0].fileName;
      this.escrituraRequest.gameId = resp.id;
      this.escrituraRequest.category = resp.category;
      console.log(this.escrituraRequest.gameId);
      console.log(this.escrituraRequest.category);
      this.taskId = resp.tasks[0].id;
      console.log(this.taskId);
      console.log(resp);
      console.log(this.escrituraRequest);
      this.texto = `${this.url}${this.direc}${this.fileName}`;
      console.log('GET');
      this.http.get(this.texto, {responseType: 'text'}).subscribe((data: any) => {
       this.frasesOrdenadas = data.split('-');
       this.frases[3] = this.frasesOrdenadas[0];
       this.frases[1] = this.frasesOrdenadas[1];
       this.frases[0] = this.frasesOrdenadas[2];
       this.frases[2] = this.frasesOrdenadas[3];
      });

      });
  }
}
