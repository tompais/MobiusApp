import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/services/common/common.service';
import { AtencionService } from 'src/app/services/test/atencion.service';
import { GameCategoryRequest } from '../../commons/models/commons/GameCategoryRequest';
import { PatientTaskAnswersRequestList } from '../../commons/models/commons/PatientTaskAnswersRequestList';
import { IntroduccionComponent } from '../introduccion/introduccion.component';

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
  respuesta: string[] = [];
  retorno = true;
  cargando = false;
  errorCode = false;
  atencionRequest: GameCategoryRequest = null;
  nameTest = '';

  constructor(public commonService: CommonService, private router: Router, public atencionServ: AtencionService) { }

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
      this.atencionRequest.patientTaskAnswersRequestList.push(task);
      console.log(this.atencionRequest);

      this.atencionServ.enviarDatos(this.atencionRequest).subscribe((resp: any) => {
        this.cargando = false;
        this.errorCode = false;
        if (this.errorCode === false) {
          this.router.navigate(['/test/memoria']);
        }
      }, (error: Error) => {
        this.cargando = false;
        this.errorCode = true;
      });
    }
  }

  obtenerDatos(){

    this.atencionRequest = new GameCategoryRequest();
    this.atencionRequest.patientTaskAnswersRequestList = new Array<PatientTaskAnswersRequestList<string>>();

    this.atencionServ.traerDatos().subscribe((resp: any) => {
      this.nameTest = resp.name;
      this.descripcion = resp.tasks[0].description;
      console.log(this.descripcion);
      this.atencionRequest.gameId = resp.id;
      this.atencionRequest.category = resp.category;
      console.log(this.atencionRequest.gameId);
      console.log(this.atencionRequest.category);
      this.taskId = resp.tasks[0].id;
      console.log(this.taskId);
      console.log(resp);
      console.log(this.atencionRequest);
      });
}



}
