import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StorageSession } from 'src/app/components/commons/models/commons/StorageSession';
import { environmentProd } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class VisualizacionService {

  sessionStorage: StorageSession = new StorageSession();

  constructor(public http: HttpClient) { }

  public enviarDatos(gId: number, cate: string, tId: number, respuestas: string[]){

    const id = this.sessionStorage.consultar('id');

    const urlService = `${environmentProd.url}/patients/${id}/mental-test/game/answers`;

    const mensaje = {
      gameId: null,
      patientTaskAnswersList: [{
        patientAnswers: null,
        taskId: null
      }],
      category: null
    };

    mensaje.gameId = gId;
    mensaje.patientTaskAnswersList[0].patientAnswers = respuestas;
    mensaje.patientTaskAnswersList[0].taskId = tId;
    mensaje.category = cate;
    console.log(JSON.stringify(mensaje));
    const respuesta = this.http.post(urlService, mensaje);
    return respuesta;
  }

  public traerDatos(){
    // VISUALIZATION
    const id = this.sessionStorage.consultar('id');
   // console.log('ID SESSION STORAGE');
   // console.log(id);
    // poner dentro de la ruta ${id} !!!!
    const urlService = `${environmentProd.url}/patients/${id}/mental-test/game?next-game-category=visualization`;
    const respuesta = this.http.get(urlService);
    return respuesta;
  }

}
