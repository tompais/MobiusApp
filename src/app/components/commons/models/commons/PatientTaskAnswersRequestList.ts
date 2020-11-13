import { PatientAnswersRequest } from './PatientAnswersRequest';

export class PatientTaskAnswersRequestList<T> {
    taskId: number;
    patientAnswersRequest: T[];
    // patientAnswersRequest: PatientAnswersRequest;

    contructor() {
         this.patientAnswersRequest = new Array<T>();
    }
}
