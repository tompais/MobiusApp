import { Resources } from './Resources';
import { Tasks } from './Tasks';

export class GameCategoryResponse {
    id: number;
    name: string;
    description: string;
    category: string;
    gameId: number;
    tasks: Tasks[];
    resources: Resources[];
    isTest: boolean;

    constructor() {
        this.tasks = new Array<Tasks>();
        this.resources = new Array<Resources>();
    }
}
