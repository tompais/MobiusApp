import { HttpHeaders } from "@angular/common/http";
import { StorageSession } from './commons/StorageSession';

export class Servicio {

    sessionStorage: StorageSession = new StorageSession();

    obtenerToken(): any {
        const token = this.sessionStorage.consultar('token');
        const httpOptions = {
            headers: new HttpHeaders({
              Authorization: token
            })
          };
        return httpOptions;
    }

}
