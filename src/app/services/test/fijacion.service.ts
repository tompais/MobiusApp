import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StorageSession } from 'src/app/components/commons/models/commons/StorageSession';
import { GameCategoryRequest } from 'src/app/components/commons/models/commons/GameCategoryRequest';
import { environmentProd } from 'src/environments/environment.prod';
import { Servicio } from 'src/app/components/commons/models/Servicio';
import { environmentDevStageBlue } from 'src/environments/environment.dev.stage.blue';

@Injectable({
    providedIn: 'root'
  })

  export class FijacionService extends Servicio {

    sessionStorage: StorageSession = new StorageSession();

    constructor(public http: HttpClient) {
      super();
    }

    public getFijacion() {
      const id = this.sessionStorage.consultar('id');
      const isTest = this.sessionStorage.consultar('EsTest');
      const urlService = `${environmentProd.url}/patients/${id}/game?game-category=fixation&test=${isTest}`;
      const respuesta = this.http.get(urlService, this.obtenerToken());
      return respuesta;
    }

    public setFijacion(respFijacion: GameCategoryRequest){
      const id = this.sessionStorage.consultar('id');
      const urlService = `${environmentProd.url}/patients/${id}/game/answers`;
      const respuesta = this.http.post(urlService, respFijacion, this.obtenerToken());
      return respuesta;
    }
  }
