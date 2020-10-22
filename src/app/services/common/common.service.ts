import { HttpClient, HttpHandler } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from 'src/app/components/commons/models/User';
import { AtencionCalculo } from 'src/app/components/test/models/AtencionCalculo';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

   // url = 'https://jsonplaceholder.typicode.com/posts';
   url = 'https://stage-blue-mobius-mind-api.herokuapp.com';

  constructor(public http: HttpClient, public httpHandler: HttpHandler) {
    this.http = new HttpClient(httpHandler);
   }

  public login(user: User) {
    const urlService = this.url + '/security/signin';
    let hash: any;
    const mensaje = {
      email: null,
      password: null
    };
    mensaje.email = user.email;
    mensaje.password = user.password;
    hash = 'Bearer: '.concat(btoa('mensaje.email:mensaje.password'));
    const respuesta = this.http.post(urlService, mensaje, hash);
    return respuesta;
  }

  /*public enviarCalculo(ac: AtencionCalculo){
    // FALTA DETERMINAR CUAL ES LA RUTA PARA ENVIAR DATA DEL TEST DE CALCULO
    const urlEnviarCalculo = this.url + '/test/calculo';
    const respuesta = this.http.post(urlEnviarCalculo, ac);
    return respuesta;
  }*/
}
