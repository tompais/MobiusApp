export class Servicio {

    obtenerToken(): any {
        return localStorage.getItem('token');
    }

}
