import { Resources } from './Resources';
import { Tasks } from './Tasks';

export class GameCategoryResponse {
    id: number;
    name: string;
    description: string;
    category: string;
    gameId: number;
    taskId: Tasks[];
    answers: Resources[];
}