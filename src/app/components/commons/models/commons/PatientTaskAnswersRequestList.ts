export class PatientTaskAnswersRequestList<T> {
    taskId: number;
    patientAnswersRequest: T[];

    contructor() {
        this.patientAnswersRequest = new Array<T>();
    }
}
