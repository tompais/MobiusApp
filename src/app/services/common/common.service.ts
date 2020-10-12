import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from 'src/app/components/commons/models/User';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  url = 'https://jsonplaceholder.typicode.com/posts';

  constructor(private http: HttpClient) { }

  getPost() {
    return new Promise(resolve => {
      this.http.get(this.url).subscribe(data => {
        resolve(data);
      }, error => {
        console.log(error);
      });
    });
  }

  addPost(data: any) {
    return new Promise((resolve, reject) => {
      this.http.post(this.url, JSON.stringify(data))
        .subscribe(response => {
          resolve(response);
        }, (error) => {
          reject(error);
        });
    });
  }

  login(user: User) {
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
