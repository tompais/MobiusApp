import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GameCategoryRequest } from 'src/app/components/commons/models/commons/GameCategoryRequest';
import { StorageSession } from 'src/app/components/commons/models/commons/StorageSession';
import { environmentProd } from 'src/environments/environment.prod';
import { EnvironmentDevStageRed } from 'src/environments/environment.dev.stage.red';

@Injectable({
  providedIn: 'root'
})
export class JuegosService {

  sessionStorage: StorageSession = new StorageSession();

  constructor(public http: HttpClient) { }

  public traerDatos(categoria: string){

    const id = this.sessionStorage.consultar('id');

    const urlService = `${environmentProd.url}/patients/${id}/game?game-category=${categoria}&test=false`;
    const respuesta = this.http.get(urlService);
    return respuesta;
  }

  public enviarDatos(gcr: GameCategoryRequest){

    const id = this.sessionStorage.consultar('id');

    const urlService = `${environmentProd.url}/patients/${id}/game/answers`;

    console.log(JSON.stringify(gcr));
    const respuesta = this.http.post(urlService, gcr);
    return respuesta;
  }

  public traerDatosHome(){
    const id = this.sessionStorage.consultar('id');
    // ${environmentProd.url}
    // ${EnvironmentDevStageRed.url}
    const urlService = `${environmentProd.url}/patients/${id}/home`;
    const respuesta = this.http.get(urlService);
    return respuesta;
  }
}
