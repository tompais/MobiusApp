import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StorageSession } from 'src/app/components/commons/models/commons/StorageSession';
import { OrientacionRequest } from 'src/app/components/commons/models/test/orientacion/orientacionRequest';

@Injectable({
  providedIn: 'root'
})
export class OrientacionService {

  url = 'https://prod-mobius-mind-api.herokuapp.com';
  sessionStorage: StorageSession = new StorageSession();

  constructor(public http: HttpClient) {}

  public orientacion(orientacionRequest: OrientacionRequest) {
    const id = this.sessionStorage.consultar('id');
  //  console.log('ID SESSION STORAGE');
  //  console.log(id);
    const urlService = `${this.url}/patients/${id}/mental-test/game/answers`;
    let hash: any;
    const mensaje = {
      category: null,
      gameId: null,
      patientTaskAnswersList: null
    };
    mensaje.category = orientacionRequest.category;
    mensaje.gameId = orientacionRequest.gameId;
    mensaje.patientTaskAnswersList = orientacionRequest.patientTaskAnswersList;
    hash = 'Bearer: '.concat(btoa('mensaje.email:mensaje.password'));
    const respuesta = this.http.post(urlService, mensaje, hash);
  //  console.log('REQUEST:');
   // console.log(mensaje);
  //  console.log('Respuesta orientacion');
  //  console.log(respuesta);
    return respuesta;
  }

  public getOrientacion() {
    const id = this.sessionStorage.consultar('id');
    const urlService = `${this.url}/patients/${id}/mental-test/game?next-game-category=orientation`;
    let hash: any;
    const mensaje = {
    };
    hash = 'Bearer: '.concat(btoa('mensaje.email:mensaje.password'));
    const respuesta = this.http.get(urlService, mensaje);
    return respuesta;
  }

}
