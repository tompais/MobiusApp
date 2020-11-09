const TYPE_AUTHORIZATION = 'Bearer ';

export class Servicio {

    hash: any;

    generarToken(email: string, password: string): any {
        this.hash = TYPE_AUTHORIZATION.concat(btoa(email + password));
        return this.hash;
    }

    obtenerToken(): any {
        return this.hash;
    }

}
