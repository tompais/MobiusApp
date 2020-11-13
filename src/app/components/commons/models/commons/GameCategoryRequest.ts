import { PatientTaskAnswersRequestList } from './PatientTaskAnswersRequestList';

export class GameCategoryRequest {
    gameId: number;
    category: string;
    // tslint:disable-next-line: ban-types
    patientTaskAnswersRequestList: PatientTaskAnswersRequestList<any>[];

    contructor() {
        // tslint:disable-next-line: ban-types
        // this.patientTaskAnswersRequestList = new Array<PatientTaskAnswersRequestList<any>>();
    }
}
