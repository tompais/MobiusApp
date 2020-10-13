import { HttpClient, HttpHandler } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from 'src/app/components/commons/models/User';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

   // url = 'https://jsonplaceholder.typicode.com/posts';
   url = 'http://localhost:8080';

  constructor(public http: HttpClient, public httpHandler: HttpHandler) {
    this.http = new HttpClient(httpHandler);
   }

  public login(user: User) {
    const urlService = this.url + '/login';
    let hash: any;
    const mensaje = {
      email: null,
      password: null
    };
    mensaje.email = user.email;
    mensaje.password = user.password;
    hash = 'Bearer: '.concat(btoa('mensaje.email:mensaje.password'));
    const respuesta = this.http.post(urlService, hash);
    return respuesta;
  }

}
