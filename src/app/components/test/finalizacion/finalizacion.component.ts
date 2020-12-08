import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FinalizacionService } from 'src/app/services/test/finalizacion.service';
import { StorageSession } from '../../commons/models/commons/StorageSession';
import { ErrorServicio } from '../../commons/models/errors/ErrorServicio';
import { ErrorServicioGrupo } from '../../commons/models/errors/ErrorServicioGrupo';
import { FinalizacionResponse } from '../../commons/models/test/FinalizacionResponse';

@Component({
  selector: 'app-finalizacion',
  templateUrl: './finalizacion.component.html',
  styleUrls: ['./finalizacion.component.scss'],
})
export class FinalizacionComponent implements OnInit {

  finalizacionResponse: FinalizacionResponse;
  storageSession: StorageSession;
  cargando = false;
  errorCode = false;
  erroresServicio: ErrorServicioGrupo = null;

  constructor(private finalizacionService: FinalizacionService) { }

  ngOnInit() {
    this.storageSession = new StorageSession();
    this.finalizacionResponse = new FinalizacionResponse();
    this.erroresServicio = new ErrorServicioGrupo();
    this.erroresServicio.errores.push(new ErrorServicio('resultadoFinal', true, '', false, 'Test Finalizacion Envio'));
    this.resultadoFinal();
  }

  resultadoFinal() {
    const errorSrv = this.erroresServicio.obtenerErrorServicio('resultadoFinal');
    const id = this.storageSession.consultar('id');
    this.finalizacionService.obtenerResultado(id).subscribe((resp: any) => {
      this.finalizacionResponse.score = resp.score;
      this.finalizacionResponse.dementiaLevel = resp.dementiaLevel;
    }, (error: HttpErrorResponse) => {
      errorSrv.getError(error);
      this.cargando = false;
      this.errorCode = true;
    });
  }

  getMensaje(): string {
    let resp = '';
    if (this.finalizacionResponse.score < 32) {
      resp = 'Se ha detectado una alteración en las funciones mentales superiores';
    } else {
      resp = 'No se ha detectado una alteración en las funciones mentales superiores';
    }
    return resp;
  }

}
