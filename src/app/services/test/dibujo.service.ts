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
export class DibujoService extends Servicio {

  sessionStorage: StorageSession = new StorageSession();

  constructor(public http: HttpClient) {
    super();
  }

  public traerDatos() {
    const id = this.sessionStorage.consultar('id');
    const isTest = this.sessionStorage.consultar('EsTest');
    const urlService = `${environmentProd.url}/patients/${id}/game?game-category=drawing&test=${isTest}`;
    const respuesta = this.http.get(urlService, this.obtenerToken());
    return respuesta;
  }

  public enviarDatos(gcr: GameCategoryRequest) {
    const id = this.sessionStorage.consultar('id');
    const urlService = `${environmentProd.url}/patients/${id}/game/answers`;
    const respuesta = this.http.post(urlService, gcr, this.obtenerToken());
    return respuesta;
  }

  public enviarImagen(imagen: File) {
    const urlUpload = `${environmentProd.url}/images`;
    const form = new FormData();
    form.append('imageFile', imagen);
    const resp = this.http.post(urlUpload, form, this.obtenerToken());
    return resp;
  }

}
