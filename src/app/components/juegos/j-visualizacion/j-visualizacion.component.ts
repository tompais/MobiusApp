import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/services/common/common.service';
import { VisualizacionService } from 'src/app/services/test/visualizacion.service';
import { environmentProd } from 'src/environments/environment.prod';
import { GameCategoryRequest } from '../../commons/models/commons/GameCategoryRequest';
import { PatientTaskAnswersRequestList } from '../../commons/models/commons/PatientTaskAnswersRequestList';
import { GameCategoryResponse } from 'src/app/components/commons/models/commons/GameCategoryResponse';
import { JuegosService } from 'src/app/services/juegos/juegos.service';

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
  img = '/images/';
  imgName: string;
  imagen: string;
  visualizacionRequest: GameCategoryRequest = null;
  visualizacionResponse: GameCategoryResponse = null;
  nameGame = '';
  respuestaFinal: any[] = [];

  constructor(public commonService: CommonService, private router: Router, public juegosServ: JuegosService) { }

  ngOnInit() {
    this.obtenerDatos();
  }

  EnviarDatos(){
      const task: PatientTaskAnswersRequestList<string> = new PatientTaskAnswersRequestList<string>();
      task.taskId = this.taskId;
      task.patientAnswersRequest = this.respuestaFinal;
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

  obtenerDatos(){

    this.visualizacionRequest = new GameCategoryRequest();
    this.visualizacionRequest.patientTaskAnswersRequestList = new Array<PatientTaskAnswersRequestList<string>>();

    this.juegosServ.traerDatos('visualization').subscribe((resp: any) => {
      this.visualizacionResponse = resp;
      this.descripcion = resp.tasks[0].description;
      this.nameGame = resp.name;
      this.imgName = resp.resources[0].fileName;
      this.visualizacionRequest.gameId = resp.id;
      this.visualizacionRequest.category = resp.category;
      this.visualizacionRequest.areTestGameAnswers = resp.isTestGame;
      this.taskId = resp.tasks[0].id;
      this.imagen = `${this.url}${this.img}${this.imgName}`;
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

    console.log(this.respuestaFinal);
    this.EnviarDatos();
  }
}
