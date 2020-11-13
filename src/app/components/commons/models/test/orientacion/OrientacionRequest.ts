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
        const state = [];
        if (mesActual >= 12 && mesActual <= 3) {
            state.push('VERA');
        }
        if (mesActual >= 3 && mesActual <= 5) {
            state.push('OTOÑ');
        }
        if (mesActual >= 6 && mesActual <= 8) {
            state.push('INVI');
        }
        if (mesActual >= 9 && mesActual <= 11) {
            state.push('PRIM');
        }
        state.forEach((est: string) => {
            if (est.indexOf(estacion.toUpperCase().substring(0, 4)) > -1) {
                resp = true;
            }
        });
        return resp;
    }

    validarDiaMes(diaMes: any) {
        let resp = false;
        const month = new Date().getUTCDate().toString();
        if (month === diaMes) {
            resp = true;
        }
        return resp;
    }

    validarDiaSemana(diaSemana: any) {
        let resp = false;
        const day = new Date().getUTCDay().toString();
        if (day === diaSemana) {
            resp = true;
        }
        return resp;
    }

    validarMesAnio(mes: any) {
        let resp = false;
        const monthYear = new Date().getMonth() + 1;
        if (monthYear.toString() === mes) {
            resp = true;
        }
        return resp;
    }

    validarPais(pais: string) {
        let resp = false;
        const paises = ['ARG'];
        paises.forEach((pa: string) => {
            if (pa.indexOf(pais.toUpperCase().substring(0, 2)) > -1) {
                resp = true;
            }
        });
        return resp;
    }

    validarProvincia(provincia: string) {
        let resp = false;
        const prov = ['BUENOS AIRES'];
        prov.forEach((pr: string) => {
            if (pr.indexOf(provincia.toUpperCase().substring(0, 3)) > -1) {
                resp = true;
            }
        });
        return resp;
    }


}
