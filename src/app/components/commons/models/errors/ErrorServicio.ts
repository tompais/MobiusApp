export class ErrorServicio {
    id: string;
    requerido: boolean;
    consultado: boolean;
    respuestaRecibida: boolean;
    mensaje: string;
    estado: boolean;
    titulo = '';
    mensajeErrorUsuario: string;
    mostrarErrorTecnico: boolean;
    falloRequest: boolean;
    cantidadRequests = 0;
    cantidadRequestsFinalizadosOk = 0;
    cantidadRequestsFinalizadosErr = 0;

    /*constructor(id: string, requerido: boolean, mensaje: string, estado: boolean, titulo: string) {
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

    getError(error: Error) {
        this.estado = false;
        this.mensaje = error.message;
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
    }*/
}
