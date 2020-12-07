import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/services/common/common.service';
import { LecturaService } from 'src/app/services/test/lectura.service';
import { environmentProd } from 'src/environments/environment.prod';
import { GameCategoryRequest } from '../../commons/models/commons/GameCategoryRequest';
import { PatientTaskAnswersRequestList } from '../../commons/models/commons/PatientTaskAnswersRequestList';
import { GameCategoryResponse } from 'src/app/components/commons/models/commons/GameCategoryResponse';

@Component({
  selector: 'app-lectura',
  templateUrl: './lectura.component.html',
  styleUrls: ['./lectura.component.scss'],
})
export class LecturaComponent implements OnInit {
  respuesta: string[] = [];
  respuestaFinal: any[] = [];
  retorno: boolean;
  cargando = false;
  errorCode = false;
  gameId: number;
  category: string;
  taskId: number;
  descripcion: string;
  url = environmentProd.url;
  img = 'images/';
  imgName: string;
  imagen: string;
  lecturaRequest: GameCategoryRequest = null;
  lecturaResponse: GameCategoryResponse = null;
  descripcionTest: string;
  nameTest = '';

  constructor(public commonService: CommonService, private router: Router, public lecturaServ: LecturaService) { }

  ngOnInit() {
    this.obtenerDatos();
  }

  obtenerDatos(){

    this.lecturaRequest = new GameCategoryRequest();
    this.lecturaRequest.patientTaskAnswersRequestList = new Array<PatientTaskAnswersRequestList<string>>();

    this.lecturaServ.traerDatos().subscribe((resp: any) => {
      this.lecturaResponse = resp;
      this.descripcion = resp.tasks[0].description;
      this.nameTest = resp.name;
      this.imgName = resp.resources[0].fileName;
      this.descripcionTest = resp.description;
      this.lecturaRequest.gameId = resp.id;
      this.lecturaRequest.category = resp.category;
      this.lecturaRequest.areTestGameAnswers = resp.isTestGame;
      this.taskId = resp.tasks[0].id;
      this.imagen = `${this.url}/${this.img}${this.imgName}`;
      });
}

EnviarDatos(){
    const task: PatientTaskAnswersRequestList<string> = new PatientTaskAnswersRequestList<string>();
    task.taskId = this.taskId;
    task.patientAnswersRequest = this.respuestaFinal;
    this.lecturaRequest.patientTaskAnswersRequestList.push(task);
    console.log(this.lecturaRequest);

    this.lecturaServ.enviarDatos(this.lecturaRequest).subscribe((resp: any) => {
      this.cargando = false;
      this.errorCode = false;
      if (this.errorCode === false) {
        this.router.navigate(['/test/escritura']);
      }
    }, (error: HttpErrorResponse) => {
      this.cargando = false;
      this.errorCode = true;
    });

}
 // metodo que toma los datos del evento emitido por el form
 TomarDatosForm(datos: any){
  this.respuesta = datos;
  let j = 0;

  // tslint:disable-next-line: prefer-for-of
  for (let i = 0; i < this.respuesta.length; i++){
    if ( this.respuesta[i]){
      this.respuestaFinal[j] = this.respuesta[i];
      j++;
    }
  }

  this.EnviarDatos();
}

}
