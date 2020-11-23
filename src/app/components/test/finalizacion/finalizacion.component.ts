import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FinalizacionService } from 'src/app/services/test/finalizacion.service';
import { FinalizacionResponse } from '../../commons/models/test/FinalizacionResponse';

@Component({
  selector: 'app-finalizacion',
  templateUrl: './finalizacion.component.html',
  styleUrls: ['./finalizacion.component.scss'],
})
export class FinalizacionComponent implements OnInit {

  finalizacionResponse: FinalizacionResponse;

  constructor(private finalizacionService: FinalizacionService) { }

  ngOnInit() {
    this.finalizacionResponse = new FinalizacionResponse();
    this.resultadoFinal();
  }

  resultadoFinal() {
    this.finalizacionService.obtenerResultado('5').subscribe((resp: any) => {
      this.finalizacionResponse.score = resp.score;
      this.finalizacionResponse.result = resp.result;
    }, (error: HttpErrorResponse) => {
      console.log(error);
    });
  }

}
