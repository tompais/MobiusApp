import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/services/common/common.service';
import { AtencionService } from 'src/app/services/test/atencion.service';
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

  constructor(public commonService: CommonService, private router: Router, public atencionServ: AtencionService) { }

  ngOnInit() {
      this.atencionServ.traerDatos().subscribe((resp: any) => {
      this.descripcion = resp.tasks[0].description;
      this.gameId = resp.id;
      this.category = resp.category;
      this.taskId = resp.tasks[0].id;
      console.log(this.taskId);
      console.log(this.descripcion);
      console.log(resp);
      });
  }

  verificar(form: NgForm){

    if (form.invalid){
      this.retorno = false;
    }else{
      this.atencionServ.enviarDatos(this.gameId, this.category, this.taskId, this.respuesta).subscribe((resp: any) => {
        this.cargando = false;
        this.errorCode = false;
        if (this.errorCode === false) {
          this.router.navigate(['/test/visualizacion']);
        }
      }, (error: Error) => {
        this.cargando = false;
        this.errorCode = true;
      });
    }
  }

}
