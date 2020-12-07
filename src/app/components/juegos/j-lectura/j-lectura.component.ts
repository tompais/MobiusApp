import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/services/common/common.service';
import { JuegosService } from 'src/app/services/juegos/juegos.service';
import { environmentProd } from 'src/environments/environment.prod';
import { GameCategoryRequest } from '../../commons/models/commons/GameCategoryRequest';
import { PatientTaskAnswersRequestList } from '../../commons/models/commons/PatientTaskAnswersRequestList';

@Component({
  selector: 'app-j-lectura',
  templateUrl: './j-lectura.component.html',
  styleUrls: ['./j-lectura.component.scss'],
})
export class JLecturaComponent implements OnInit {

  respuesta: string[] = [];
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
  descripcionGame: string;
  nameGame = '';

  constructor(public commonService: CommonService, private router: Router, public juegosServ: JuegosService) { }

  ngOnInit() {
    this.obtenerDatos();

  }

  obtenerDatos(){

    this.lecturaRequest = new GameCategoryRequest();
    this.lecturaRequest.patientTaskAnswersRequestList = new Array<PatientTaskAnswersRequestList<string>>();
    console.log(this.url);
    this.juegosServ.traerDatos('reading').subscribe((resp: any) => {
      this.descripcion = resp.tasks[0].description;
      this.nameGame = resp.name;
      this.imgName = resp.resources[0].fileName;
      console.log(this.descripcion);
      this.descripcionGame = resp.description;
      this.lecturaRequest.gameId = resp.id;
      this.lecturaRequest.category = resp.category;
      console.log(this.lecturaRequest.gameId);
      console.log(this.lecturaRequest.category);
      this.taskId = resp.tasks[0].id;
      console.log(this.taskId);
      console.log(resp);
      console.log(this.lecturaRequest);
      this.imagen = `${this.url}/${this.img}${this.imgName}`;
      console.log(this.imagen);
      });
}

verificar(form: NgForm){
  if (form.invalid){
    this.retorno = false;
  }else{
    const task: PatientTaskAnswersRequestList<string> = new PatientTaskAnswersRequestList<string>();
    task.taskId = this.taskId;
    task.patientAnswersRequest = this.respuesta;
    this.lecturaRequest.patientTaskAnswersRequestList.push(task);
    console.log(this.lecturaRequest);

    this.juegosServ.enviarDatos(this.lecturaRequest).subscribe((resp: any) => {
      this.cargando = false;
      this.errorCode = false;
      if (this.errorCode === false) {
        this.router.navigate(['/juegos/finalizacion']);
      }
    }, (error: HttpErrorResponse) => {
      this.cargando = false;
      this.errorCode = true;
    });
  }
  }
}
