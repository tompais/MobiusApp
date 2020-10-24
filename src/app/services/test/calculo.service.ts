import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StorageSession } from 'src/app/components/commons/models/commons/StorageSession';

@Injectable({
  providedIn: 'root'
})
export class CalculoService {
  url = 'https://prod-mobius-mind-api.herokuapp.com';
  sessionStorage: StorageSession = new StorageSession();

  constructor(public http: HttpClient) {}

  public enviarDatos(gId: number, cate: string, tId1: number, tId2: number, respuesta1: number[], respuesta2: number[]){

    // const id = this.sessionStorage.consultar('id');

    // TEMPORAL
    const id = 1;
    const urlService = `${this.url}/patients/${id}/mental-test/game/answers`;

    const mensaje = {
      gameId: null,
      patientTaskAnswersList: [{
        patientAnswers: null,
        taskId: null
      }, {
        patientAnswers: null,
        taskId: null
      }],
      category: null
    };

    mensaje.gameId = gId;
    mensaje.patientTaskAnswersList[0].patientAnswers = respuesta1;
    mensaje.patientTaskAnswersList[0].taskId = tId1;
    mensaje.patientTaskAnswersList[1].patientAnswers = respuesta2;
    mensaje.patientTaskAnswersList[1].taskId = tId2;
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
    const urlService = `${this.url}/patients/${id}/mental-test/game?next-game-category=calculation`;
    const respuesta = this.http.get(urlService);
    return respuesta;
  }

}
