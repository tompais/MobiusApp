import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GameCategoryRequest } from 'src/app/components/commons/models/commons/GameCategoryRequest';
import { StorageSession } from 'src/app/components/commons/models/commons/StorageSession';
import { Servicio } from 'src/app/components/commons/models/Servicio';
import { OrientacionRequest } from 'src/app/components/commons/models/test/orientacion/OrientacionRequest';
import { environmentProd } from 'src/environments/environment.prod';
import { environmentDevStageBlue } from 'src/environments/environment.dev.stage.blue';

@Injectable({
  providedIn: 'root'
})
export class OrientacionService extends Servicio {

  sessionStorage: StorageSession = new StorageSession();

  constructor(public http: HttpClient) {
    super();
  }

  public putOrientacion(gameCategoryRequest: GameCategoryRequest) {
    const id = this.sessionStorage.consultar('id');
    const urlService = `${environmentProd.url}/patients/${id}/game/answers`;
    const mensaje = {
      category: null,
      gameId: null,
      patientTaskAnswersRequestList: null
    };
    mensaje.category = gameCategoryRequest.category;
    mensaje.gameId = gameCategoryRequest.gameId;
    mensaje.patientTaskAnswersRequestList = gameCategoryRequest.patientTaskAnswersRequestList;
    const respuesta = this.http.post(urlService, mensaje, this.obtenerToken());
    return respuesta;
  }

  public getOrientacion() {
    const id = this.sessionStorage.consultar('id');
    const isTest = this.sessionStorage.consultar('EsTest');
    const urlService = `${environmentProd.url}/patients/${id}/game?game-category=orientation&test=${isTest}`;
    console.log(urlService);
    const mensaje = {};
    const respuesta = this.http.get(urlService, mensaje);
    return respuesta;
  }

}
