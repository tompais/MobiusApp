import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/services/common/common.service';
import { AtencionService } from 'src/app/services/test/atencion.service';
import { GameCategoryRequest } from '../../commons/models/commons/GameCategoryRequest';
import { PatientTaskAnswersRequestList } from '../../commons/models/commons/PatientTaskAnswersRequestList';
import { IntroduccionComponent } from '../introduccion/introduccion.component';
import { GameCategoryResponse } from '../../commons/models/commons/GameCategoryResponse';
import { LocalStorageService } from '../../../services/common/localstorage.service';

@Component({
  selector: 'app-atencion',
  templateUrl: './atencion.component.html',
  styleUrls: ['./atencion.component.scss'],
})
export class AtencionComponent implements OnInit {

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
  nameTest = '';
  storage: LocalStorageService;
  private sigTextbox: any;
  private textbox: any;

  constructor(public commonService: CommonService, private router: Router, public atencionServ: AtencionService) { }

  ngOnInit() {
    this.obtenerDatos();
  }

  EnviarDatos(){
      const task: PatientTaskAnswersRequestList<string> = new PatientTaskAnswersRequestList<string>();
      task.taskId = this.taskId;
      task.patientAnswersRequest = this.respuestaFinal;
      this.atencionRequest.patientTaskAnswersRequestList.push(task);
      console.log(this.atencionRequest);

      this.atencionServ.enviarDatos(this.atencionRequest).subscribe((resp: any) => {
        this.cargando = false;
        this.errorCode = false;
        this.router.navigate(['/test/memoria']);
      }, (error: Error) => {
        this.cargando = false;
        this.errorCode = true;
      });
  }

  obtenerDatos(){

    this.atencionRequest = new GameCategoryRequest();
    this.atencionRequest.patientTaskAnswersRequestList = new Array<PatientTaskAnswersRequestList<string>>();

    this.atencionServ.traerDatos().subscribe((resp: any) => {
      this.atencionResponse = resp;
      console.log(this.atencionResponse);
      this.nameTest = resp.name;
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
