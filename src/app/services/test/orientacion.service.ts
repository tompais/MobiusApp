import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OrientacionRequest } from 'src/app/components/commons/models/test/orientacion/orientacionRequest';

@Injectable({
  providedIn: 'root'
})
export class OrientacionService {

  url = 'https://stage-blue-mobius-mind-api.herokuapp.com';

  constructor(public http: HttpClient) { }

  public orientacion(orientacionRequest: OrientacionRequest) {
    const urlService = this.url + '/patients/1/mental-test/game/answers';
    let hash: any;
    const mensaje = {
      category: null,
      gameId: null,
      taskAnswers: null
    };
    mensaje.category = orientacionRequest.category;
    mensaje.gameId = orientacionRequest.gameId;
    mensaje.taskAnswers = orientacionRequest.taskAnswers;
    hash = 'Bearer: '.concat(btoa('mensaje.email:mensaje.password'));
    const respuesta = this.http.post(urlService, mensaje, hash);
    console.log('REQUEST:');
    console.log(mensaje);
    console.log('Respuesta orientacion');
    console.log(respuesta);
    return respuesta;
  }
}
