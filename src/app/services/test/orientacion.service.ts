import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StorageSession } from 'src/app/components/commons/models/commons/StorageSession';
import { Servicio } from 'src/app/components/commons/models/Servicio';
import { OrientacionRequest } from 'src/app/components/commons/models/test/orientacion/orientacionRequest';
import { environmentProd } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class OrientacionService extends Servicio {

  sessionStorage: StorageSession = new StorageSession();

  constructor(public http: HttpClient) {
    super();
  }

  public orientacion(orientacionRequest: OrientacionRequest) {
    const id = this.sessionStorage.consultar('id');
    const urlService = `${environmentProd.url}/patients/${id}/mental-test/game/answers`;
    const mensaje = {
      category: null,
      gameId: null,
      patientTaskAnswersList: null
    };
    mensaje.category = orientacionRequest.category;
    mensaje.gameId = orientacionRequest.gameId;
    mensaje.patientTaskAnswersList = orientacionRequest.patientTaskAnswersList;
    const respuesta = this.http.post(urlService, mensaje, this.obtenerToken());
    return respuesta;
  }

  public getOrientacion() {
    const id = this.sessionStorage.consultar('id');
    const urlService = `${environmentProd.url}/patients/${id}/mental-test/game?next-game-category=orientation`;
    const mensaje = {};
    const respuesta = this.http.get(urlService, mensaje);
    return respuesta;
  }

}
