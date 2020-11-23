export class FinalizacionResponse {
    score: number;
    dementiaLevel: string;

    obtenerDescDementiaLevel(dementiaLevel: string): string {
        let resp = '';
        switch (dementiaLevel) {
            case 'no_dementia':
                resp = 'No posee demencia';
                break;
            case 'possible_dementia':
                resp = 'Posible demencia';
                break;
            case 'mild_to_moderate_dementia':
                resp = 'Demencia moderada';
                break;
            case 'moderate_to_severe_dementia':
                resp = 'Demencia moderada severa';
                break;
            case 'severe_dementia':
                resp = 'Demencia severa';
                break;
        }
        return resp;
    }
}
