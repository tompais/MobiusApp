import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/services/common/common.service';
import { VisualizacionService } from 'src/app/services/test/visualizacion.service';

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
  url = 'https://prod-mobius-mind-api.herokuapp.com/';
  img = 'images/';
  imgName: string;
  imagen: string;

  constructor(public commonService: CommonService, private router: Router, public visualizacionServ: VisualizacionService) { }

  ngOnInit() {
      this.visualizacionServ.traerDatos().subscribe((resp: any) => {
      this.descripcion = resp.tasks[0].description;
      this.imgName = resp.resources[0].fileName;
      this.gameId = resp.id;
      this.category = resp.category;
      this.taskId = resp.tasks[0].id;
      console.log(this.descripcion);
      console.log(this.imgName);
      console.log(resp);
      this.imagen = `${this.url}${this.img}${this.imgName}`;
      console.log(this.imagen);
      });
  }

  verificar(form: NgForm){

    if (form.invalid){
      this.retorno = false;
    }else{
      /*this.router.navigate(['/test/ordenes']);*/
      this.visualizacionServ.enviarDatos(this.gameId, this.category, this.taskId, this.respuesta).subscribe((resp: any) => {
        this.cargando = false;
        this.errorCode = false;
        if (this.errorCode === false) {
          this.router.navigate(['/test/ordenes']);
        }
      }, (error: Error) => {
        this.cargando = false;
        this.errorCode = true;
      });
    }
  }
}
