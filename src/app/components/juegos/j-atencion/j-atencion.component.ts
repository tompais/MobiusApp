import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/services/common/common.service';
import { GameCategoryRequest } from '../../commons/models/commons/GameCategoryRequest';
import { PatientTaskAnswersRequestList } from '../../commons/models/commons/PatientTaskAnswersRequestList';
import { GameCategoryResponse } from '../../commons/models/commons/GameCategoryResponse';
import { LocalStorageService } from '../../../services/common/localstorage.service';
import { JuegosService } from 'src/app/services/juegos/juegos.service';

@Component({
  selector: 'app-j-atencion',
  templateUrl: './j-atencion.component.html',
  styleUrls: ['./j-atencion.component.scss'],
})
export class JAtencionComponent implements OnInit {

  descripcion: string;
  gameId: number;
  category: string;
  taskId: number;
  respuesta: any[] = [];
  respuestaFinal: any[] = [];
  retorno = true;
  cargando = false;
  errorCode = false;
  atencionRequest: GameCategoryRequest = null;
  atencionResponse: GameCategoryResponse = null;
  nameGame = '';
  storage: LocalStorageService;
  private sigTextbox: any;
  private textbox: any;

  constructor(public commonService: CommonService, private router: Router, public juegosServ: JuegosService) { }

  ngOnInit() {
    this.obtenerDatos();
  }

  EnviarDatos(){
      const task: PatientTaskAnswersRequestList<string> = new PatientTaskAnswersRequestList<string>();
      task.taskId = this.taskId;
      task.patientAnswersRequest = this.respuestaFinal;
      this.atencionRequest.patientTaskAnswersRequestList.push(task);
      console.log(this.atencionRequest);

      this.juegosServ.enviarDatos(this.atencionRequest).subscribe((resp: any) => {
        this.cargando = false;
        this.errorCode = false;
        this.router.navigate(['/juegos/finalizacion']);
      }, (error: Error) => {
        this.cargando = false;
        this.errorCode = true;
      });
  }

  obtenerDatos(){

    this.atencionRequest = new GameCategoryRequest();
    this.atencionRequest.patientTaskAnswersRequestList = new Array<PatientTaskAnswersRequestList<string>>();

    this.juegosServ.traerDatos('attention').subscribe((resp: any) => {
      this.atencionResponse = resp;
      console.log(this.atencionResponse);
      this.nameGame = resp.name;
      this.descripcion = resp.tasks[0].description;
      this.atencionRequest.gameId = resp.id;
      this.atencionRequest.category = resp.category;
      this.atencionRequest.areTestGameAnswers = resp.isTestGame;
      this.taskId = resp.tasks[0].id;
      });
  }

  pasarTextbox(NameTextbox: string, NameSigTextbox: string){
    this.textbox = document.getElementsByName(NameTextbox);
    this.sigTextbox = document.getElementsByName(NameSigTextbox);

    if (this.textbox[1].value.length === parseInt(this.textbox[1].getAttribute('maxlength'), 10)){
        this.sigTextbox[1].focus();
    }
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
