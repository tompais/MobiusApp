import { HttpClient, HttpHandler } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Servicio } from 'src/app/components/commons/models/Servicio';
import { UserRequest } from 'src/app/components/commons/models/user/UserRequest';
import { environmentProd } from 'src/environments/environment.prod';
import { environmentDevStageBlue } from 'src/environments/environment.dev.stage.blue';

@Injectable({
  providedIn: 'root'
})
export class CommonService extends Servicio {
  repuestaE: any;

  constructor(public http: HttpClient, public httpHandler: HttpHandler) {
    super();
    this.http = new HttpClient(httpHandler);
   }

  public enviarDatos(datos: any, nombrePantalla: string) {
    switch (nombrePantalla.toUpperCase()) {
      case 'LOGIN':
        this.repuestaE = this.login(datos); 
        break;
      case 'REGISTRO':
        this.repuestaE = this.registro(datos);
        break;
    }
    return this.repuestaE;
  }

  private login(user: UserRequest) {
    const urlService = `${environmentProd.url}/security/signin`;
    const mensaje = user;
    mensaje.email = user.email;
    mensaje.password = btoa(user.password);
    // const respuesta = this.http.post(urlService, mensaje, { observe: 'response'} );
    const respuesta = this.http.post(urlService, mensaje);
    return respuesta;
  }

  private registro(user: UserRequest) {
    const urlService = `${environmentProd.url}/security/signup`;
    const mensaje = user;
    mensaje.firstName = user.firstName;
    mensaje.lastName = user.lastName;
    mensaje.birthday = user.parsearFecha(user.birthday);
    mensaje.genre = user.genre;
    mensaje.patientEmail = user.patientEmail;
    mensaje.guardianEmail = user.guardianEmail;
    mensaje.password = btoa(user.password);
    mensaje.passwordRepeat = user.passwordRepeat;
    const respuesta = this.http.post(urlService, mensaje);
    return respuesta;
  }
}
