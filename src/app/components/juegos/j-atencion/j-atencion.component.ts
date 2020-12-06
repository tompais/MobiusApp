import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/services/common/common.service';
import { JuegosService } from 'src/app/services/juegos/juegos.service';
import { GameCategoryRequest } from '../../commons/models/commons/GameCategoryRequest';
import { PatientTaskAnswersRequestList } from '../../commons/models/commons/PatientTaskAnswersRequestList';

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
  respuesta: string[] = [];
  retorno = true;
  cargando = false;
  errorCode = false;
  atencionRequest: GameCategoryRequest = null;
  nameGame = '';
  private sigTextbox: any;
  private textbox: any;

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
      this.atencionRequest.patientTaskAnswersRequestList.push(task);
      console.log(this.atencionRequest);

      this.juegosServ.enviarDatos(this.atencionRequest).subscribe((resp: any) => {
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

    this.atencionRequest = new GameCategoryRequest();
    this.atencionRequest.patientTaskAnswersRequestList = new Array<PatientTaskAnswersRequestList<string>>();

    this.juegosServ.traerDatos().subscribe((resp: any) => {
      this.nameGame = resp.name;
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

  pasarTextbox(NameTextbox: string, NameSigTextbox: string){
    this.textbox = document.getElementsByName(NameTextbox);
    this.sigTextbox = document.getElementsByName(NameSigTextbox);

    if (this.textbox[1].value.length === parseInt(this.textbox[1].getAttribute('maxlength'), 10)){
        this.sigTextbox[1].focus();
    }
  }
}
