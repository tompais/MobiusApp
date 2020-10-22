import { Answer } from '../../commons/Answer';
import { TaskAnswer } from '../../commons/TaskAnswer';

export class OrientacionRequest {
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

    category: string;
    gameId: number;
    taskAnswers: TaskAnswer<boolean>[];

    constructor() {
        this.taskAnswers = new Array<TaskAnswer<boolean>>();
    }
}
