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
export class EscrituraService extends Servicio {

  sessionStorage: StorageSession = new StorageSession();

  constructor(public http: HttpClient) {
    super();
  }

  public traerDatos() {
    const id = this.sessionStorage.consultar('id');
    const isTest = this.sessionStorage.consultar('EsTest');
    const urlService = `${environmentProd.url}/patients/${id}/game?game-category=writing&test=${isTest}`;
    const respuesta = this.http.get(urlService, this.obtenerToken());
    return respuesta;
  }

  public enviarDatos(gcr: GameCategoryRequest) {
    const id = this.sessionStorage.consultar('id');
    const urlService = `${environmentProd.url}/patients/${id}/game/answers`;
    const respuesta = this.http.post(urlService, gcr, this.obtenerToken());
    return respuesta;
  }

  getFile(url: string) {
    return this.http.get(url, {responseType: 'text'});
  }

}
