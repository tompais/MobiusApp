import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { SignaturePad } from 'angular2-signaturepad';
import { JuegosService } from 'src/app/services/juegos/juegos.service';
import { environmentProd } from 'src/environments/environment.prod';
import { GameCategoryRequest } from '../../commons/models/commons/GameCategoryRequest';
import { PatientTaskAnswersRequestList } from '../../commons/models/commons/PatientTaskAnswersRequestList';

@Component({
  selector: 'app-j-dibujo',
  templateUrl: './j-dibujo.component.html',
  styleUrls: ['./j-dibujo.component.scss'],
})
export class JDibujoComponent implements OnInit {

  @ViewChild(SignaturePad) signaturePad: SignaturePad;
  imgbase64: string;
  imagenStatus: boolean;
  imagenStatus2: boolean;
  base64TrimmedURL: string;
  base64DefaultURL: string;
  generatedImage: string;
  windowOPen: boolean;
  imagen: File;
  nombreArchivo: string[] = [];
  cargando = false;
  errorCode = false;
  dibujoRequest: GameCategoryRequest = null;
  gameId: number;
  category: string;
  taskId: number;
  descripcionTask: string;
  url = environmentProd.url;
  img = 'images/';
  imgName: string;
  nameGame: string;
  descripcionGame: string;
  imagenUrl: string;
  base64Solo: string[] = [];

  // tslint:disable-next-line: ban-types
  private signaturePadOptions: Object = {
    maxWidth: 5,
    minWidth: 5,
    canvasWidth: 400,
    canvasHeight: 400,
    // backgroundColor: 'rgb(255, 255, 255)',
  };

  constructor(private router: Router, private domSanitizer: DomSanitizer, private juegosServ: JuegosService) { }

  ngOnInit() {
    this.imagenStatus = true;
    this.imagenStatus2 = false;
    this.obtenerDatos();
  }

  drawStart(){
    console.log('DRAW START');
  }

  drawComplete(){
    console.log('DRAW COMPLETE');
    this.imgbase64 = this.signaturePad.toDataURL();

    this.base64Solo[0] = this.imgbase64.substring(22);

    const dataURL = this.signaturePad.toDataURL('image/png');

    const imageBase64 = this.imgbase64;

  }

  finalizar(imageUrl?: string) {
    imageUrl = this.imgbase64;
    this.enviarDatos();

  }

  reset(){
    this.signaturePad.clear();
  }

  enviarDatos(){
    console.log(this.dibujoRequest);
    const task: PatientTaskAnswersRequestList<string> = new PatientTaskAnswersRequestList<string>();
    task.patientAnswersRequest = this.base64Solo;
    task.taskId = this.taskId;
    // task.patientAnswersRequest = this.nombreArchivo;
    this.dibujoRequest.patientTaskAnswersRequestList.push(task);
    console.log(this.dibujoRequest);

    this.juegosServ.enviarDatos(this.dibujoRequest).subscribe((resp: any) => {
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

  obtenerDatos(){

    this.dibujoRequest = new GameCategoryRequest();
    this.dibujoRequest.patientTaskAnswersRequestList = new Array<PatientTaskAnswersRequestList<string>>();
    console.log(this.url);
    this.juegosServ.traerDatos().subscribe((resp: any) => {

      this.descripcionTask = resp.tasks[0].description;
      this.nameGame = resp.name;
      this.imgName = resp.resources[0].fileName;

      this.descripcionGame = resp.description;
      this.dibujoRequest.gameId = resp.id;
      this.dibujoRequest.category = resp.category;

      this.taskId = resp.tasks[0].id;

      this.imagenUrl = `${this.url}/${this.img}${this.imgName}`;
      console.log(this.imagen);
      });
  }

  ocultarImg(){
    this.imagenStatus = false;
    this.imagenStatus2 = true;

  }

  mostrarImg(){
      this.imagenStatus = true;
      this.imagenStatus2 = false;
  }

}
