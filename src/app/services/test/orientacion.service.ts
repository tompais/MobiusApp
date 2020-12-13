import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GameCategoryRequest } from 'src/app/components/commons/models/commons/GameCategoryRequest';
import { StorageSession } from 'src/app/components/commons/models/commons/StorageSession';
import { Servicio } from 'src/app/components/commons/models/Servicio';
import { environmentDevStageBlue } from 'src/environments/environment.dev.stage.blue';
import { environmentProd } from 'src/environments/environment.prod';

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
    const urlService = `${environmentDevStageBlue.url}/patients/${id}/game/answers`;
    const mensaje = {
      category: null,
      gameId: null,
      areTestGameAnswers: null,
      patientTaskAnswersRequestList: null
    };
    mensaje.category = gameCategoryRequest.category;
    mensaje.gameId = gameCategoryRequest.gameId;
    mensaje.areTestGameAnswers = gameCategoryRequest.areTestGameAnswers;
    mensaje.patientTaskAnswersRequestList = gameCategoryRequest.patientTaskAnswersRequestList;
    const respuesta = this.http.post(urlService, mensaje, this.obtenerToken());
    return respuesta;
  }

  public getOrientacion() {
    const id = this.sessionStorage.consultar('id');
    const isTest = this.sessionStorage.consultar('EsTest');
    const urlService = `${environmentDevStageBlue.url}/patients/${id}/game?game-category=orientation&test=${isTest}`;
    const respuesta = this.http.get(urlService, this.obtenerToken());
    return respuesta;
  }

}
