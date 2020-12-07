import { ɵConsole } from '@angular/core';
import { PatientTaskAnswersRequestList } from '../../commons/PatientTaskAnswersRequestList';
import { UserResponse } from '../../user/UserResponse';

export class OrientacionRequest extends UserResponse {
    anio: string;
    estacion: string;
    diaMes: string;
    diaSemana: string;
    mesAnio: string;
    pais: string;
    provincia: string;
    ciudad: string;
    estamos: string;
    pisoPlanta: string;
    // respuestasCorrectas = false;

    category: string;
    gameId: number;
    patientTaskAnswersRequestList: PatientTaskAnswersRequestList<boolean>[];

    constructor() {
        super();
        this.patientTaskAnswersRequestList = new Array<PatientTaskAnswersRequestList<boolean>>();
    }

    validarAnio(anio: string) {
        let resp = false;
        const year = new Date().getFullYear().toString();
        if (year === anio) {
            resp = true;
        }
        return resp;
    }

    validarEstacionAnio(estacion: string) {
        let resp = false;
        const mesActual = new Date().getUTCMonth() + 1;
        const diaActual = new Date().getDate();
        const state: string[] = [];
        if ((mesActual === 12 && diaActual >= 21) || (mesActual === 3 && diaActual < 21) || (mesActual < 3)) {
            state.push('VERANO');
        }

        if ((mesActual === 3 && diaActual >= 21) || (mesActual === 6 && diaActual < 21 ) || (mesActual > 3 && mesActual < 6 )) {
            state.push('OTOÑO');
        }

        if ((mesActual === 6 && diaActual >= 21) || (mesActual === 9 && diaActual < 21) || (mesActual > 6 && mesActual < 9)) {
            state.push('INVIERNO');
        }

        if ((mesActual === 9 && diaActual >= 21) || (mesActual === 12 && diaActual < 21) || (mesActual > 9 && mesActual < 12)) {
            state.push('PRIMAVERA');
        }

        if (state[0] === estacion.toUpperCase()){
            resp = true;
        }

        return resp;
    }

    validarDiaMes(diaMes: string) {
        let resp = false;
        const diaDelMesActual = new Date().getDate().toString();
        if (diaDelMesActual === diaMes.toString()) {
            resp = true;
        }
        return resp;
    }

    validarDiaSemana(diaSemana: string) {
        let resp = false;
        const diasSemana: string[] = ['DOMINGO', 'LUNES', 'MARTES', 'MIERCOLES', 'JUEVES', 'VIERNES', 'SABADO'];
        const day = new Date().getDay().toString();
        if (diasSemana[day] === diaSemana.toUpperCase()) {
            resp = true;
        }
        return resp;
    }

    validarMesAnio(mes: string) {
        let resp = false;
        const meseDelAño: string[] = ['ENERO', 'FEBRERO', 'MARZO', 'ABRIL', 'MAYO', 'JUNIO', 'JULIO','AGOSTO', 'SEPTIEMBRE', 'OCTUBRE', 'NOVIEMBRE',
                                        'DICIEMBRE'];
        const mesActual = new Date().getMonth();
        console.log(mesActual);
        if (meseDelAño[mesActual] === mes.toUpperCase()) {
            resp = true;
        }
        return resp;
    }

    validarPais(paisPantalla: string, paisLocalizado: string) {
        let resp = false;

        if (paisLocalizado && paisPantalla.toUpperCase() === paisLocalizado.toUpperCase()){
            resp = true;
        }
        return resp;
    }

    validarProvincia(provinciaPantalla: string, provinciaLocalizada: string) {
        let resp = false;
        resp = provinciaLocalizada && provinciaLocalizada.toUpperCase().includes(provinciaPantalla.toUpperCase());
        return resp;
    }

    validarCiudad(ciudadPantalla: string, ciudadLocalizada: string, localidadLocalizada: string){
        let resp = false;

        if ((ciudadLocalizada && ciudadPantalla.toUpperCase() === ciudadLocalizada.toUpperCase() ) ||
           ( localidadLocalizada && ciudadPantalla.toUpperCase() === localidadLocalizada.toUpperCase())) {
            resp = true;
        }

        return resp;
    }
}
