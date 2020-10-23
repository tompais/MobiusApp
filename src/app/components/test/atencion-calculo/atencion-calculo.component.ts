import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AngularDelegate } from '@ionic/angular';
import { CommonService } from 'src/app/services/common/common.service';
import { CalculoService } from 'src/app/services/test/calculo.service';
import { AtencionCalculo } from '../models/AtencionCalculo';

@Component({
  selector: 'app-atencion-calculo',
  templateUrl: './atencion-calculo.component.html',
  styleUrls: ['./atencion-calculo.component.scss'],
})
export class AtencionCalculoComponent implements OnInit {

  ac: AtencionCalculo = new AtencionCalculo();
  respuestas: number[] = [];
  respuestasCorrectas: number[] = [];
  puntaje: number;
  retorno = true;
  numeroInicial: number;
  numeroResta: number;
  cargando = false;
  errorCode = false;
  gameId: number;
  category: string;
  taskId: number;
  descripcion: string;

  constructor(public commonService: CommonService, private router: Router, public calculoServ: CalculoService) { }

  ngOnInit() {
    this.calculoServ.traerDatos().subscribe((resp: any) => {
    this.descripcion = resp.tasks[0].description;
    this.gameId = resp.id;
    this.category = resp.category;
    this.taskId = resp.tasks[0].id;
    console.log(this.descripcion);
    console.log(resp);
    });
    this.puntaje = 0;
    this.numeroInicial = Math.floor(Math.random() * 50) + 50;
    this.numeroResta = Math.floor(Math.random() * 4) + 6;
  }

  verificar(form: NgForm){

    if (form.invalid){
      this.retorno = false;
    }else{
      this.calculoServ.enviarDatos(this.gameId, this.category, this.taskId, this.respuestas).subscribe((resp: any) => {
        this.cargando = false;
        this.errorCode = false;
        if (this.errorCode === false) {
          this.router.navigate(['/test/memoria']);
        }
      }, (error: Error) => {
        this.cargando = false;
        this.errorCode = true;
      });
      /*this.respuestasCorrectas[0] = this.numeroInicial - this.numeroResta;
      for (let i = 0; i < 5; i++) {
        this.respuestasCorrectas[i + 1] = this.respuestasCorrectas[i] - this.numeroResta;
      }

      for (let i = 0; i < 5; i++) {
        if (this.respuestas[i] === this.respuestasCorrectas[i]){
        this.puntaje = this.puntaje + 1; }
      }
      this.ac.puntaje = this.puntaje;
      this.ac.numeroInicial = this.numeroInicial;
      this.ac.numeroResta = this.numeroResta;
      this.ac.respuesta1 = this.respuestas[0];
      this.ac.respuesta2 = this.respuestas[1];
      this.ac.respuesta3 = this.respuestas[2];
      this.ac.respuesta4 = this.respuestas[3];
      this.ac.respuesta5 = this.respuestas[4];
// ACA DEBE IR EL SERVICIO QUE MANDA LOS DATOS AL BACK
      this.commonService.enviarCalculo(this.ac)
      .subscribe(
        data => this.retorno = true,
        error => this.retorno = false
      );
    }
    if (this.retorno) {
     this.router.navigate(['/test/memoria']);
     }
     else{
      this.router.navigate(['/error']);
     */}
  }
}
