import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/services/common/common.service';
import { EscrituraService } from 'src/app/services/test/escritura.service';

@Component({
  selector: 'app-escritura',
  templateUrl: './escritura.component.html',
  styleUrls: ['./escritura.component.scss'],
})
export class EscrituraComponent implements OnInit {
frases = ['se habia ', 'serios problemas', 'el gato', 'metido en'];
descripcion: string;
gameId: number;
category: string;
taskId: number;

  constructor(public commonService: CommonService, private router: Router, public escrituraServ: EscrituraService) { }

  ngOnInit() {
      this.escrituraServ.traerDatos().subscribe((resp: any) => {
      this.descripcion = resp.tasks[0].description;
      this.gameId = resp.id;
      this.category = resp.category;
      this.taskId = resp.tasks[0].id;
      console.log(this.taskId);
      console.log(this.descripcion);
      console.log(resp);
      });
  }

  reorderItems(event)
  {
    console.log(`Moving item from ${event.detail.from} to ${event.detail.to}`);
    const itemMove = this.frases.splice(event.detail.from, 1)[0];
    console.log(itemMove);
    this.frases.splice(event.detail.to, 0, itemMove);
    event.detail.complete();
    console.log(this.frases);
  }

  enviarRespuesta(){
    this.router.navigate(['/test/finalizacion']);
  }


}
