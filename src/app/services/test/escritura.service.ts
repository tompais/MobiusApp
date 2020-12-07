import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GameCategoryRequest } from 'src/app/components/commons/models/commons/GameCategoryRequest';
import { StorageSession } from 'src/app/components/commons/models/commons/StorageSession';
import { environmentProd } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class EscrituraService {

  sessionStorage: StorageSession = new StorageSession();

  constructor(public http: HttpClient) { }

  public traerDatos(){
    // VISUALIZATION
    const id = this.sessionStorage.consultar('id');
   // console.log('ID SESSION STORAGE');
   // console.log(id);
    // poner dentro de la ruta ${id} !!!!
    const urlService = `${environmentProd.url}/patients/${id}/mental-test/game?next-game-category=writing`;
    const respuesta = this.http.get(urlService);
    return respuesta;
  }

  public enviarDatos(gcr: GameCategoryRequest){

    const id = this.sessionStorage.consultar('id');

    console.log('Json a Enviar: ');
    console.log(gcr);

    const urlService = `${environmentProd.url}/patients/${id}/mental-test/game/answers`;

    console.log(JSON.stringify(gcr));
    const respuesta = this.http.post(urlService, gcr);
    return respuesta;
  }

  getFile(url: string){
    console.log('ENTRO GETFILE');
    return this.http.get(url, {responseType: 'text'});
  }

}
