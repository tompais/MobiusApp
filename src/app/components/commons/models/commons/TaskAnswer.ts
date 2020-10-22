export class TaskAnswer<T> {
    taskId: number;
    answers: T[];

    contructor() {
        this.answers = new Array<T>();
    }
}
