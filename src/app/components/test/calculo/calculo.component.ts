import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/services/common/common.service';
import { CalculoService } from 'src/app/services/test/calculo.service';
import { GameCategoryRequest } from '../../commons/models/commons/GameCategoryRequest';
import { PatientTaskAnswersRequestList } from '../../commons/models/commons/PatientTaskAnswersRequestList';
import { Calculo } from '../models/Calculo';

@Component({
  selector: 'app-calculo',
  templateUrl: './calculo.component.html',
  styleUrls: ['./calculo.component.scss'],
})
export class CalculoComponent implements OnInit {

  ac: Calculo = new Calculo();
  respuesta1: string[] = [];
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
  nameTest = '';

  constructor(public commonService: CommonService, private router: Router, public calculoServ: CalculoService) { }

  ngOnInit() {
    this.obtenerDatos();
  }

  verificar(form: NgForm){

    if (form.invalid){
      this.retorno = false;
    }else{
      const task1: PatientTaskAnswersRequestList<string> = new PatientTaskAnswersRequestList<string>();
      task1.taskId = this.taskId1;
      task1.patientAnswersRequest = this.respuesta1;
      this.calculoRequest.patientTaskAnswersRequestList.push(task1);
      // const task2: PatientTaskAnswersRequestList<string> = new PatientTaskAnswersRequestList<string>();
      // task2.taskId = this.taskId2;
      // task2.patientAnswersRequest = this.respuesta2;
      // this.calculoRequest.patientTaskAnswersRequestList.push(task2);
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
  }

  obtenerDatos(){

    this.calculoRequest = new GameCategoryRequest();
    this.calculoRequest.patientTaskAnswersRequestList = new Array<PatientTaskAnswersRequestList<string>>();

    this.calculoServ.traerDatos().subscribe((resp: any) => {
      this.nameTest = resp.name;
      this.descripcion1 = resp.tasks[0].description;
      // this.descripcion2 = resp.tasks[1].description;
      this.calculoRequest.gameId = resp.id;
      this.calculoRequest.category = resp.category;
      console.log(this.calculoRequest.gameId);
      console.log(this.calculoRequest.category);
      this.taskId1 = resp.tasks[0].id;
      // this.taskId2 = resp.tasks[1].id;
      console.log(this.taskId1);
     // console.log(this.taskId2);
      console.log(this.descripcion1);
      console.log(resp);
      console.log(this.calculoRequest);
      });

}
}
