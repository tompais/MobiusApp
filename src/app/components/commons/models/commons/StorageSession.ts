export class StorageSession {

    guardar(key: string, value: any): void {
        return localStorage.setItem(key, JSON.stringify(value));
    }

    consultar(key: string): string {
        return JSON.parse(localStorage.getItem(key));
    }
}
