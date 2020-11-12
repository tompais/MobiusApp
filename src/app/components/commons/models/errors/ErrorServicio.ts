import { HttpErrorResponse } from '@angular/common/http';

export class ErrorServicio {
    id: string;
    requerido: boolean;
    consultado: boolean;
    respuestaRecibida: boolean;
    mensaje: string;
    codigoEstado: number;
    estado: boolean;
    titulo = '';
    mensajeErrorUsuario: string;
    mostrarErrorTecnico: boolean;
    falloRequest: boolean;
    cantidadRequests = 0;
    cantidadRequestsFinalizadosOk = 0;
    cantidadRequestsFinalizadosErr = 0;

    constructor(id: string, requerido: boolean, mensaje: string, estado: boolean, titulo: string) {
        this.mensaje = mensaje;
        this.estado = estado;
        this.titulo = titulo;
        this.mostrarErrorTecnico = true;
        this.mensajeErrorUsuario = 'No se ha podido consultar' + this.titulo;
        this.falloRequest = false;
        this.id = id;
        this.requerido = requerido;
        this.consultado = false;
    }

    /*getError(error: Error) {
        this.estado = false;
        this.mensaje = error.message;
        this.falloRequest = true;
    }*/

    getError(error: HttpErrorResponse) {
        this.estado = false;
        this.mensaje = error.message;
        this.codigoEstado = error.status;
        this.falloRequest = true;
    }

    nuevoRequest() {
        this.falloRequest = false;
        this.estado = false;
        this.mensaje = '';
        this.consultado = true;
        this.respuestaRecibida = false;
    }

    cancelar() {
        this.estado = false;
        if (this.requerido === true) {
            this.estado = true;
        }
        this.falloRequest = false;
        this.mensaje = '';
        this.consultado = false;
        this.respuestaRecibida = false;
    }

    procesarRespuesta(response: any, mapeo: (resp: any) => void): void {
        this.respuestaRecibida = true;
        this.falloRequest = false;
        this.estado = response.exitoso; // Hay que verlo bien con el back
        this.mensaje = response.mensaje; // Hay que verlo bien con el back
        this.cantidadRequests++;
        if (this.estado === true) {
            this.consultado = false;
            mapeo(response);
            this.cantidadRequestsFinalizadosOk++;
        } else {
            this.cantidadRequestsFinalizadosErr++;
            this.estado = false;
            if (this.mostrarErrorTecnico === true) {
                this.mensaje = response.mensaje;
            } else {
                this.mensaje = this.mensajeErrorUsuario;
            }
        }
    }

    validarFiltroListadoErrores(): boolean {
        let resp = false;
        if (this.requerido === true) {
            resp = true;
        }
        if (this.consultado === true) {
            resp = true;
        }
        return resp;
    }

    /*traduccionErrores(): string {
        const regex = /(\d+)/g;
        const msj = this.mensaje;
        console.log('MENSAJE RESP');
        console.log(msj);
        const resp = msj.match(regex);
        console.log('RESP');
        let respuesta = '';
        console.log(resp);
        switch (resp.toString()) {
            case '400':
                respuesta = 'No posee un formato válido.';
                break;
            case '401':
                respuesta = 'Acceso denegado.';
                break;
            case '403':
                respuesta = 'Acceso denegado.';
                break;
            case '404':
                respuesta = 'Usuario no autorizado.';
                break;
            case '406':
                respuesta = 'Código no interpretado.';
                break;
            case '500':
                respuesta = 'Error de servidor.';
                break;
            case '504':
                respuesta = 'Tiempo agotado.';
                break;
            case '509':
                respuesta = 'Límite de ancho de banda.';
                break;
        }
        return respuesta;
    }*/

    traduccionErrores(): string {
        let respuesta = '';
        switch (this.codigoEstado) {
            case 400:
                respuesta = 'No posee un formato válido.';
                break;
            case 401:
                respuesta = 'Acceso denegado.';
                break;
            case 403:
                respuesta = 'Acceso denegado.';
                break;
            case 404:
                respuesta = 'Usuario no autorizado.';
                break;
            case 406:
                respuesta = 'Código no interpretado.';
                break;
            case 500:
                respuesta = 'Error de servidor.';
                break;
            case 504:
                respuesta = 'Tiempo agotado.';
                break;
            case 509:
                respuesta = 'Límite de ancho de banda.';
                break;
        }
        return respuesta;
    }
}
