import { PatientTaskAnswersList } from './PatientTaskAnswersList';

export class GameCategoryRequest {
    gameId: number;
    category: string;
    // tslint:disable-next-line: ban-types
    patientTaskAnswersList: PatientTaskAnswersList<String>[];

    contructor() {
        // tslint:disable-next-line: ban-types
        this.patientTaskAnswersList = new Array<PatientTaskAnswersList<String>>();
    }
}
