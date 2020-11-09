import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StorageSession } from 'src/app/components/commons/models/commons/StorageSession';
import { GameCategoryRequest } from 'src/app/components/commons/models/commons/GameCategoryRequest';
import { environmentProd } from 'src/environments/environment.prod';
import { Servicio } from 'src/app/components/commons/models/Servicio';

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
      const urlService = `${environmentProd.url}/patients/${id}/mental-test/game?next-game-category=fixation`;
      const mensaje = {};
      const respuesta = this.http.get(urlService, mensaje);
      return respuesta;
    }

    public setFijacion(respFijacion: GameCategoryRequest){
      const id = this.sessionStorage.consultar('id');
      const urlService = `${environmentProd.url}/patients/${id}/mental-test/game/answers`;
      const mensaje = {};
      const respuesta = this.http.post(urlService, respFijacion, this.obtenerToken());
      return respuesta;
    }
  }
