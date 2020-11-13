export class PatientAnswersRequest<T> {
    id: number;
    isCorrect: boolean;
    answer: T;
}
