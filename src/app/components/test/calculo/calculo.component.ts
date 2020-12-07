import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/services/common/common.service';
import { CalculoService } from 'src/app/services/test/calculo.service';
import { GameCategoryRequest } from '../../commons/models/commons/GameCategoryRequest';
import { PatientTaskAnswersRequestList } from '../../commons/models/commons/PatientTaskAnswersRequestList';
import { Calculo } from '../models/Calculo';
import { GameCategoryResponse } from '../../commons/models/commons/GameCategoryResponse';

@Component({
  selector: 'app-calculo',
  templateUrl: './calculo.component.html',
  styleUrls: ['./calculo.component.scss'],
})
export class CalculoComponent implements OnInit {

  ac: Calculo = new Calculo();
  respuesta1: any[] = [];
  respuesta2: string[] = [];
  respuestasCorrectas: number[] = [];
  puntaje: number;
  retorno = true;
  numeroInicial: number;
  numeroResta: number;
  cargando = false;
  errorCode = false;
  gameId: number;
  category: string;
  taskId1: number;
  taskId2: number;
  descripcion1: string;
  descripcion2: string;
  calculoRequest: GameCategoryRequest = null;
  calculoResponse: GameCategoryResponse = null;
  nameTest = '';
  respuestaFinal: any[] = [];
  task1: PatientTaskAnswersRequestList<string>;

  constructor(public commonService: CommonService, private router: Router, public calculoServ: CalculoService) { }

  ngOnInit() {
    this.obtenerDatos();
    this.task1 = new PatientTaskAnswersRequestList<string>();
  }

  EnviarDatos(){
      this.task1.taskId = this.taskId1;
      this.task1.patientAnswersRequest = this.respuestaFinal;
      this.calculoRequest.patientTaskAnswersRequestList[0] = (this.task1);
      console.log(this.calculoRequest);
      this.calculoServ.enviarDatos(this.calculoRequest).subscribe((resp: any) => {
        this.cargando = false;
        this.errorCode = false;
        if (this.errorCode === false) {
          this.router.navigate(['/test/atencion']);
        }
      }, (error: Error) => {
        this.cargando = false;
        this.errorCode = true;
      });
  }

  obtenerDatos(){
    this.calculoRequest = new GameCategoryRequest();
    this.calculoRequest.patientTaskAnswersRequestList = new Array<PatientTaskAnswersRequestList<string>>();

    this.calculoServ.traerDatos().subscribe((resp: any) => {
      this.calculoResponse = resp;
      this.nameTest = resp.name;
      this.descripcion1 = resp.tasks[0].description;
      this.calculoRequest.gameId = resp.id;
      this.calculoRequest.areTestGameAnswers = resp.isTestGame;
      this.taskId1 = resp.tasks[0].id;
      this.calculoRequest.category = resp.category;
      });

  }

  TomarDatosForm(datos: any[]){
    this.respuesta1 = datos;
    console.log(this.respuesta1.length);
    let j = 0;

    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < this.respuesta1.length; i++){
      if ( this.respuesta1[i]){
        this.respuestaFinal[j] = this.respuesta1[i];
        j++;
      }
    }

    this.EnviarDatos();
  }
}
