import { HttpClient, HttpHandler } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Servicio } from 'src/app/components/commons/models/Servicio';
import { User } from 'src/app/components/commons/models/User';
import { UserRequest } from 'src/app/components/commons/models/user/UserRequest';
import { environmentProd } from 'src/environments/environment.prod';
import { EnvironmentDevStageRed } from 'src/environments/environment.dev.stage.red';


@Injectable({
  providedIn: 'root'
})
export class CommonService extends Servicio {

  constructor(public http: HttpClient, public httpHandler: HttpHandler) {
    super();
    this.http = new HttpClient(httpHandler);
   }

  public login(user: User) {
    // ${environmentProd.url}
    const urlService = `${environmentProd.url}/security/signin`;
    const mensaje = {
      email: null,
      password: null
    };
    mensaje.email = user.email;
    // mensaje.password = user.password;
    mensaje.password = btoa(user.password);
    console.log('Respuesta a:');
    console.log(mensaje);
    const respuesta = this.http.post(urlService, mensaje, this.generarToken(mensaje.email, mensaje.password));
    return respuesta;
  }

  public registro(user: UserRequest) {
    const urlService = `${environmentProd.url}/security/signup`;
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
    const respuesta = this.http.post(urlService, mensaje, this.generarToken(mensaje.patientEmail, mensaje.password));
    return respuesta;
  }
}
