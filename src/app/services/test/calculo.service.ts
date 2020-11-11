import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StorageSession } from 'src/app/components/commons/models/commons/StorageSession';
import { environmentProd } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class CalculoService {
  sessionStorage: StorageSession = new StorageSession();

  constructor(public http: HttpClient) {}

  public enviarDatos(gId: number, cate: string, tId1: number, tId2: number, respuesta1: number[], respuesta2: number[]){

    // const id = this.sessionStorage.consultar('id');

    const id = this.sessionStorage.consultar('id');
    const urlService = `${environmentProd.url}/patients/${id}/mental-test/game/answers`;

    const mensaje = {
      category: null,
      gameId: null,
      patientTaskAnswersRequestList: [{
        taskId: null,
        patientAnswersRequest: null
      }, {
        taskId: null,
        patientAnswersRequest: null
      }]
    };

    mensaje.gameId = gId;
    mensaje.patientTaskAnswersRequestList[0].patientAnswersRequest = respuesta1;
    mensaje.patientTaskAnswersRequestList[0].taskId = tId1;
    mensaje.patientTaskAnswersRequestList[1].patientAnswersRequest = respuesta2;
    mensaje.patientTaskAnswersRequestList[1].taskId = tId2;
    mensaje.category = cate;
    console.log(JSON.stringify(mensaje));

    const respuesta = this.http.post(urlService, mensaje);
    console.log(mensaje);
    return respuesta;
  }

  public traerDatos(){
    // CALCULATION
    const id = this.sessionStorage.consultar('id');
    // console.log('ID SESSION STORAGE');
    // console.log(id);
    // poner dentro de la ruta ${id}
    const urlService = `${environmentProd.url}/patients/${id}/mental-test/game?next-game-category=calculation`;
    const respuesta = this.http.get(urlService);
    return respuesta;
  }

}
