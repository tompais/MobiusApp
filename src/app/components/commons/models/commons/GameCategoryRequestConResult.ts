import { PatientTaskAnswersRequestListConResult } from './PatientTaskAnswerRequesListConResult';

export class GameCategoryRequestConResult {
    gameId: number;
    category: string;
    areTestGameAnswers: boolean;
    // tslint:disable-next-line: ban-types
    patientTaskAnswersRequestList: PatientTaskAnswersRequestListConResult<String>[];

    contructor() {
        // tslint:disable-next-line: ban-types
        this.patientTaskAnswersRequestList = new Array<PatientTaskAnswersRequestListConResult<String>>();
    }
}
