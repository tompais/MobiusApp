import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GameCategoryRequest } from 'src/app/components/commons/models/commons/GameCategoryRequest';
import { StorageSession } from 'src/app/components/commons/models/commons/StorageSession';
import { environmentProd } from 'src/environments/environment.prod';
import { Servicio } from 'src/app/components/commons/models/Servicio';

@Injectable({
  providedIn: 'root'
})
export class JuegosService extends Servicio {

  sessionStorage: StorageSession = new StorageSession();

  constructor(public http: HttpClient) {
    super();
  }

  public traerDatos(categoria: string){
    const id = this.sessionStorage.consultar('id');
    const urlService = `${environmentProd.url}/patients/${id}/game?game-category=${categoria}&test=false`;
    const respuesta = this.http.get(urlService, this.obtenerToken());
    return respuesta;
  }

  public enviarDatos(gcr: GameCategoryRequest){
    const id = this.sessionStorage.consultar('id');
    const urlService = `${environmentProd.url}/patients/${id}/game/answers`;
    const respuesta = this.http.post(urlService, gcr, this.obtenerToken());
    return respuesta;
  }

  public traerDatosHome() {
    const id = this.sessionStorage.consultar('id');
    const urlService = `${environmentProd.url}/patients/${id}/home`;
    const respuesta = this.http.get(urlService, this.obtenerToken());
    return respuesta;
  }
}
