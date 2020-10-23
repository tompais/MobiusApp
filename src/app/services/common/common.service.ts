import { HttpClient, HttpHandler } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from 'src/app/components/commons/models/User';
import { UserRequest } from 'src/app/components/commons/models/user/UserRequest';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

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

  public registro(user: UserRequest) {
    const urlService = this.url + '/security/signup';
    let hash: any;
    const mensaje = {
      firstName: null,
      lastName: null,
      birthday: null,
      patientEmail: null,
      guardianEmail: null,
      password: null,
      passwordRepeat: null
    };
    mensaje.firstName = user.firstName;
    mensaje.lastName = user.lastName;
    mensaje.birthday = user.parsearFecha(user.birthday);
    mensaje.patientEmail = user.patientEmail;
    mensaje.guardianEmail = user.guardianEmail;
    mensaje.password = user.password;
    mensaje.passwordRepeat = user.passwordRepeat;
    hash = 'Bearer: '.concat(btoa('mensaje.patientEmail:mensaje.password'));
    console.log('REQUEST:');
    console.log(mensaje);
    const respuesta = this.http.post(urlService, mensaje, hash);
    return respuesta;
  }
}
