import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/services/common/common.service';
import { VisualizacionService } from 'src/app/services/test/visualizacion.service';
import { environmentProd } from 'src/environments/environment.prod';
import { GameCategoryRequest } from '../../commons/models/commons/GameCategoryRequest';
import { PatientTaskAnswersRequestList } from '../../commons/models/commons/PatientTaskAnswersRequestList';

@Component({
  selector: 'app-visualizacion',
  templateUrl: './visualizacion.component.html',
  styleUrls: ['./visualizacion.component.scss'],
})
export class VisualizacionComponent implements OnInit {
  respuesta: string[] = [];
  retorno: boolean;
  cargando = false;
  errorCode = false;
  gameId: number;
  category: string;
  taskId: number;
  descripcion: string;
  url = environmentProd.url;
  img = '/images/';
  imgName: string;
  imagen: string;
  visualizacionRequest: GameCategoryRequest = null;
  nameTest = '';

  constructor(public commonService: CommonService, private router: Router, public visualizacionServ: VisualizacionService) { }

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

      this.visualizacionServ.enviarDatos(this.visualizacionRequest).subscribe((resp: any) => {
        this.cargando = false;
        this.errorCode = false;
        if (this.errorCode === false) {
          this.router.navigate(['/test/repeticion']);
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

    this.visualizacionServ.traerDatos().subscribe((resp: any) => {
      this.descripcion = resp.tasks[0].description;
      this.nameTest = resp.name;
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
