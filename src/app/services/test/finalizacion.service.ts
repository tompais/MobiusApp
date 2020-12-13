import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Servicio } from 'src/app/components/commons/models/Servicio';
import { environmentDevStageBlue } from 'src/environments/environment.dev.stage.blue';
import { environmentProd } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class FinalizacionService extends Servicio {

  constructor(public http: HttpClient) {
    super();
  }

  obtenerResultado(id: string) {
    const urlService = `${environmentProd.url}/patients/${id}/mental-test/result`;
    const respuesta = this.http.get(urlService, this.obtenerToken());
    return respuesta;
  }
}
