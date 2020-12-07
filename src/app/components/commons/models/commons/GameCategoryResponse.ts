import { Resources } from './Resources';
import { Tasks } from './Tasks';
import { PossibleAnswers } from './possibleAnswers';

export class GameCategoryResponse {
    id: number;
    name: string;
    description: string;
    category: string;
    gameId: number;
    tasks: Tasks[];
    resources: Resources[];
    possibleAnswers: PossibleAnswers[];
    isTestGame: boolean;

    constructor() {
        this.tasks = new Array<Tasks>();
        this.resources = new Array<Resources>();
        this.possibleAnswers = new Array<PossibleAnswers>();
    }
}
