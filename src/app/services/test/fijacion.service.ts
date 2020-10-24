import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StorageSession } from 'src/app/components/commons/models/commons/StorageSession';
import { GameCategoryRequest } from 'src/app/components/commons/models/commons/GameCategoryRequest';

@Injectable({
    providedIn: 'root'
  })

  export class FijacionService {

    url = 'https://prod-mobius-mind-api.herokuapp.com';
    sessionStorage: StorageSession = new StorageSession();

    constructor(public http: HttpClient) {}

    public getFijacion() {
      const id = this.sessionStorage.consultar('id');
      console.log('ID SESSION STORAGE');
      console.log(id);
      const urlService = `${this.url}/patients/${id}/mental-test/game?next-game-category=fixation`;
      const mensaje = {};
      const respuesta = this.http.get(urlService, mensaje);
      console.log('REQUEST:');
      console.log('Respuesta fijacion');
      console.log(respuesta);
      return respuesta;
    }

    public setFijacion(respFijacion: GameCategoryRequest){
      const id = this.sessionStorage.consultar('id');
      const urlService = `${this.url}/patients/${id}/mental-test/game/answers`;
      const mensaje = {};
      let hash: any;
      hash = 'Bearer: '.concat(btoa('mensaje.email:mensaje.password'));
      const respuesta = this.http.post(urlService, respFijacion, hash);
      return respuesta;
    }
  }
