import { PatientTaskAnswersList } from '../../commons/PatientTaskAnswersList';
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
    patientTaskAnswersList: PatientTaskAnswersList<boolean>[];

    constructor() {
        super();
        this.patientTaskAnswersList = new Array<PatientTaskAnswersList<boolean>>();
    }

   /* validarForm(): boolean {
        let resp = false;
        if (this.anio !== '' && this.estacion !== '' && this.diaMes !== '' && this.diaSemana !== '' && this.mesAnio !== '' && this.pais !== '' && this.provincia !== ''
                && this.ciudad !== '' && this.estamos !== '' && this.pisoPlanta !== '') {
            resp = true;
            this.respuestasCorrectas = resp;
        }
        return resp;
    }*/
}
