export class PatientTaskAnswersList<T> {
    taskId: number;
    patientAnswers: T[];

    contructor() {
        this.patientAnswers = new Array<T>();
    }
}
