import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/services/common/common.service';
import { JuegosService } from 'src/app/services/juegos/juegos.service';
import { environmentProd } from 'src/environments/environment.prod';
import { GameCategoryRequest } from '../../commons/models/commons/GameCategoryRequest';
import { PatientTaskAnswersRequestList } from '../../commons/models/commons/PatientTaskAnswersRequestList';

@Component({
  selector: 'app-j-visualizacion',
  templateUrl: './j-visualizacion.component.html',
  styleUrls: ['./j-visualizacion.component.scss'],
})
export class JVisualizacionComponent implements OnInit {

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
  visualizacionRequest: GameCategoryRequest = null;
  nameGame = '';

  constructor(public commonService: CommonService, private router: Router, public juegosServ: JuegosService) { }

  ngOnInit() {
    this.obtenerDatos();
  }

  verificar(form: NgForm){

    if (form.invalid){
      this.retorno = false;
    }else{
      const task: PatientTaskAnswersRequestList<string> = new PatientTaskAnswersRequestList<string>();
      task.taskId = this.taskId;
      task.patientAnswersRequest = this.respuesta;
      this.visualizacionRequest.patientTaskAnswersRequestList.push(task);
      console.log(this.visualizacionRequest);

      this.juegosServ.enviarDatos(this.visualizacionRequest).subscribe((resp: any) => {
        this.cargando = false;
        this.errorCode = false;
        if (this.errorCode === false) {
          this.router.navigate(['/juegos/finalizacion']);
        }
      }, (error: Error) => {
        this.cargando = false;
        this.errorCode = true;
      });
    }
  }

  obtenerDatos(){

    this.visualizacionRequest = new GameCategoryRequest();
    this.visualizacionRequest.patientTaskAnswersRequestList = new Array<PatientTaskAnswersRequestList<string>>();

    this.juegosServ.traerDatos('visualization').subscribe((resp: any) => {
      this.descripcion = resp.tasks[0].description;
      this.nameGame = resp.name;
      this.imgName = resp.resources[0].fileName;
      console.log(this.descripcion);
      this.visualizacionRequest.gameId = resp.id;
      this.visualizacionRequest.category = resp.category;
      console.log(this.visualizacionRequest.gameId);
      console.log(this.visualizacionRequest.category);
      this.taskId = resp.tasks[0].id;
      console.log(this.taskId);
      console.log(resp);
      console.log(this.visualizacionRequest);
      this.imagen = `${this.url}${this.img}${this.imgName}`;
      console.log(this.imagen);
      });
  }

}
