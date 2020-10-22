import { ErrorServicio } from './ErrorServicio';

export class ErrorServicioGrupo {
    errores: ErrorServicio[];

    constructor() {
        this.errores = new Array<ErrorServicio>();
    }

    mostrarCargando(): boolean {
        let resp = false;
        this.errores.forEach((error: ErrorServicio) => {
            if (error.estado === false && (error.requerido === true || error.consultado === true)) {
                resp = true;
            }
        });
        return resp;
    }

    espera(): boolean {
        console.log('ESPERA');
        let resp = true;
        this.errores.forEach((error: ErrorServicio) => {
            if (error.falloRequest === true) {
                console.log('FALLO REQ');
                resp = false;
            }
            if (error.respuestaRecibida === true && error.consultado === true) {
                console.log('2do req mal');
                resp = false;
            }
        });
        return resp;
    }

    obtenerErrorServicio(id: string): ErrorServicio {
        let resp: ErrorServicio = null;
        this.errores.forEach((error: ErrorServicio) => {
            if (error.id.trim().toLowerCase() === id.trim().toLowerCase()) {
                resp = error;
            }
        });
        return resp;
    }

    cancelar() {
        this.errores.forEach((error: ErrorServicio) => {
            error.cancelar();
        });
    }

    listadoErrores(): ErrorServicio[] {
        return this.errores.filter(error => error.validarFiltroListadoErrores());
    }
 }
