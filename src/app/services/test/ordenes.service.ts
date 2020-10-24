import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StorageSession } from 'src/app/components/commons/models/commons/StorageSession';

@Injectable({
  providedIn: 'root'
})
export class OrdenesService {
  url = 'https://prod-mobius-mind-api.herokuapp.com';
  sessionStorage: StorageSession = new StorageSession();

  constructor(public http: HttpClient) { }

  public enviarDatos(gId: number, cate: string, tId: number, respuestas: string[]){

    const id = this.sessionStorage.consultar('id');

    // TEMPORAL
    // const id = 1;
    const urlService = `${this.url}/patients/${id}/mental-test/game/answers`;

    const mensaje = {
      gameId: null,
      patientTaskAnswersList: {
        patientAnswers: null,
        taskId: null
      },
      category: null
    };

    mensaje.gameId = gId;
    mensaje.patientTaskAnswersList.patientAnswers = respuestas;
    mensaje.patientTaskAnswersList.taskId = tId;
    mensaje.category = cate;
    console.log(mensaje);
    const respuesta = this.http.post(urlService, mensaje);
   // console.log(respuesta);
    return respuesta;
  }

  public traerDatos(){
    // CALCULATION
    const id = this.sessionStorage.consultar('id');
  //  console.log('ID SESSION STORAGE');
  //  console.log(id);
    // poner dentro de la ruta ${id}
    const urlService = `${this.url}/patients/${id}/mental-test/game?next-game-category=simonsays`;
    const respuesta = this.http.get(urlService);
    return respuesta;
}
}
