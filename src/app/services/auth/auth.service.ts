import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Servicio } from 'src/app/components/commons/models/Servicio';

@Injectable({
  providedIn: 'root'
})
export class AuthService extends Servicio {

  constructor(public jwtHelper: JwtHelperService) {
    super();
  }

  public isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    return !this.jwtHelper.isTokenExpired(token);
  }
}
