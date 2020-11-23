import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environmentProd } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class FinalizacionService {

  constructor(public http: HttpClient) { }

  obtenerResultado(id: string) {
    const urlService = `${environmentProd.url}/patients/${id}/mental-test/result`;
    const mensaje = {
    };
    const respuesta = this.http.get(urlService, mensaje);
    return respuesta;
  }
}
