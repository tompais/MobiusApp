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

  public traerDatos(){
    // VISUALIZATION
    const id = this.sessionStorage.consultar('id');
   // console.log('ID SESSION STORAGE');
   // console.log(id);
    // poner dentro de la ruta ${id} !!!!
    // ${environmentProd.url}
    const urlService = `${environmentProd.url}/patients/${id}/mental-test/game?next-game-category=drawing`;
    const respuesta = this.http.get(urlService);
    return respuesta;
  }

  public enviarDatos(gcr: GameCategoryRequest){

    const id = this.sessionStorage.consultar('id');

    const urlService = `${environmentProd.url}/patients/${id}/mental-test/game/answers`;

    console.log(JSON.stringify(gcr));
    const respuesta = this.http.post(urlService, gcr);
    return respuesta;
  }

  public enviarImagen(imagen: File){
    const urlUpload = `${environmentProd.url}/images`;
    // cambiar /image/upload por /images
    const form = new FormData();
    form.append('imageFile', imagen);

    const resp = this.http.post(urlUpload, form, this.obtenerToken());
    return resp;
  }

}
