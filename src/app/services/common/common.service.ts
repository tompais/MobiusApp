import { HttpClient, HttpHandler } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Servicio } from 'src/app/components/commons/models/Servicio';
import { User } from 'src/app/components/commons/models/User';
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

  public enviarDatos(datos: any, nombrePantalla: string){
    switch (nombrePantalla.toUpperCase()){
      case 'LOGIN': this.repuestaE = this.login(datos); break;
      case 'REGISTRO': this.repuestaE = this.registro(datos); break;
    }

    return this.repuestaE;
  }

  private login(user: UserRequest) {
    const urlService = `${environmentProd.url}/security/signin`;
    const mensaje = {
      email: null,
      password: null
    };
    mensaje.email = user.email;
    mensaje.password = btoa(user.password);
    console.log(JSON.stringify(mensaje));
    const respuesta = this.http.post(urlService, mensaje, this.generarToken(mensaje.email, mensaje.password));
    return respuesta;
  }

  private registro(user: UserRequest) {
    const urlService = `${environmentProd.url}/security/signup`;
    const mensaje = {
      firstName: null,
      lastName: null,
      birthday: null,
      genre: null,
      patientEmail: null,
      guardianEmail: null,
      password: null,
      passwordRepeat: null
    };
    mensaje.firstName = user.firstName;
    mensaje.lastName = user.lastName;
    mensaje.birthday = user.parsearFecha(user.birthday);
    mensaje.genre = user.genre;
    mensaje.patientEmail = user.patientEmail;
    mensaje.guardianEmail = user.guardianEmail;
    mensaje.password = btoa(user.password); // user.password;
    mensaje.passwordRepeat = user.passwordRepeat;
    console.log(JSON.stringify(mensaje));
    const respuesta = this.http.post(urlService, mensaje, this.generarToken(mensaje.patientEmail, mensaje.password));
    return respuesta;
  }
}
