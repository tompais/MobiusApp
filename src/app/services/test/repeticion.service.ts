import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GameCategoryRequest } from 'src/app/components/commons/models/commons/GameCategoryRequest';
import { StorageSession } from 'src/app/components/commons/models/commons/StorageSession';
import { Servicio } from 'src/app/components/commons/models/Servicio';
import { environmentProd } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class RepeticionService extends Servicio{

  sessionStorage: StorageSession = new StorageSession();

    constructor(public http: HttpClient) {
      super();
    }

    public getFijacion() {
      const id = this.sessionStorage.consultar('id');
      const isTest = this.sessionStorage.consultar('EsTest');
      const urlService = `${environmentProd.url}/patients/${id}/game?game-category=repetition&test=${isTest}`;
      const mensaje = {};
      const respuesta = this.http.get(urlService, mensaje);
      return respuesta;
    }

    public setFijacion(respFijacion: GameCategoryRequest){
      const id = this.sessionStorage.consultar('id');
      const urlService = `${environmentProd.url}/patients/${id}/game/answers`;
      const mensaje = {};
      const respuesta = this.http.post(urlService, respFijacion, this.obtenerToken());
      return respuesta;
    }
}
