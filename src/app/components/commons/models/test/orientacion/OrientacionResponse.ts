export class OrientacionResponse {
    category: string;
    gameId: number;
    taskId: number;
    answers: boolean;

    constructor() {
        this.category = '';
        this.gameId = 1;
        this.taskId = 1;
        this.answers = true;
    }
}
