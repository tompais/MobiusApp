import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StorageSession } from 'src/app/components/commons/models/commons/StorageSession';
import { GameCategoryRequest } from 'src/app/components/commons/models/commons/GameCategoryRequest';
import { environmentProd } from 'src/environments/environment.prod';
import { Servicio } from 'src/app/components/commons/models/Servicio';
import { LocalStorageService } from '../common/localstorage.service';
import { GameCategoryRequestConResult } from '../../components/commons/models/commons/GameCategoryRequestConResult';

@Injectable({
    providedIn: 'root'
  })

  export class MemoriaService extends Servicio {

    storage: LocalStorageService = new LocalStorageService();
    constructor(public http: HttpClient) {
      super();
    }

    public getMemoria() {
      const id = this.storage.get('id');
      const urlService = `${environmentProd.url}/patients/${id}/mental-test/game?next-game-category=memory`;
      const mensaje = {};
      const respuesta = this.http.get(urlService, mensaje);
      return respuesta;
    }

    public setMemoria(respMemoria: GameCategoryRequestConResult){
      const id = this.storage.get('id');
      const urlService = `${environmentProd.url}/patients/${id}/mental-test/game/answers`;
      const mensaje = {};
      const respuesta = this.http.post(urlService, respMemoria, this.obtenerToken());
      return respuesta;
    }
  }
