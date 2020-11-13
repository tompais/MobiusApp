import { PatientAnswersRequest } from './PatientAnswersRequest';
export class PatientTaskAnswersRequestListConResult<T> {
    taskId: number;
    patientAnswersRequest: PatientAnswersRequest<T>[];

    contructor() {
        this.patientAnswersRequest = new Array<PatientAnswersRequest<T>>();
    }
}
