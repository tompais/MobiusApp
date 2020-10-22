import { Answer } from '../../commons/Answer';
import { TaskAnswer } from '../../commons/TaskAnswer';
import { UserRequest } from '../../user/UserRequest';
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
    respuestasCorrectas = false;

    category: string;
    gameId: number;
    taskAnswers: TaskAnswer<boolean>[];

    constructor() {
        super();
        this.taskAnswers = new Array<TaskAnswer<boolean>>();
    }

    validarForm(): boolean {
        let resp = false;
        if (this.anio !== '' && this.estacion !== '' && this.diaMes !== '' && this.diaSemana !== '' && this.mesAnio !== '' && this.pais !== '' && this.provincia !== ''
                && this.ciudad !== '' && this.estamos !== '' && this.pisoPlanta !== '') {
            resp = true;
            this.respuestasCorrectas = resp;
        }
        return resp;
    }
}
