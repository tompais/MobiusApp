import { Inputs } from './Inputs';

export class Tasks {
    id: number;
    description: string;
    inputs: Inputs[];

    constructor() {
        this.inputs = new Array<Inputs>();
    }
}