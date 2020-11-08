const TYPE_AUTHORIZATION = 'Bearer ';

export class Servicio {

    generarHash(email: string, password: string): any {
        const hash = TYPE_AUTHORIZATION.concat(btoa(email + password));
        return hash;
    }

}
