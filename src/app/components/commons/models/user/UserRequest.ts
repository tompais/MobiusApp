import { User } from '../User';

export class UserRequest extends User {

    firstName: string;
    lastName: string;
    birthday: string;
    patientEmail: string;
    guardianEmail: string;
    genre: string;
    password: string;
    passwordRepeat: string;
    age: number;
    retorno: boolean;

    constructor() {
        super();
        this.firstName = '';
        this.lastName = '';
        this.birthday = '';
        this.patientEmail = '';
        this.guardianEmail = '';
        this.password = '';
        this.passwordRepeat = '';
        this.age = 18;
        this.retorno = true;
    }

    validarCamposVacios(): boolean {
        let resp = false;
        if (this.firstName === '' || this.lastName === '' || this.birthday === '' || this.patientEmail === '' || this.guardianEmail === '' || this.password === '' || this.passwordRepeat === '') {
            resp = true;
        }
        return resp;
    }

    /*queSeaMayorA18(): boolean {
        let resp = false;
        let year: string;
        let month: string;
        let date: string;
        year = this.birthday.substring(0, 4);
        month = this.birthday.substring(5, 7);
        date = this.birthday.substring(8, 10);
        const fecha: Date = new Date();
        // tslint:disable-next-line: radix
        fecha.setFullYear(Number.parseInt(year), Number.parseInt(month) - this.age, Number.parseInt(date));
        const fechaActual: Date = new Date();
        fechaActual.setFullYear(fechaActual.getFullYear() - this.age);
        if (fechaActual < fecha) {
            resp = true;
        }
        return resp;
    } */

    parsearFecha(fecha: string) {
        const resp = fecha.substring(0, 10);
       // const resp2 = resp.split('-');

        // resp = resp2[2] + '/' + resp2[1] + '/' + resp2[0];
        console.log(resp);
        return resp;
    }

    passwordCoinciden(): boolean {
        let resp = false;
        if (this.password === this.passwordRepeat) {
            resp = true;
        }
        return resp;
    }

    passwordNoCoinciden(): boolean {
        let resp = false;
        if (this.password !== this.passwordRepeat) {
            resp = true;
        }
        return resp;
    }

    esMenorDe18Anios(): boolean {
        let resp = false;
        if (Date.now() > this.age) {
            resp = true;
        }
        return resp;
    }

    enviarForm(): boolean {
        let resp = false;
        if (!this.validarCamposVacios() && !this.esMenorDe18Anios() && !this.passwordNoCoinciden()) {
          //  console.log('ENVIO FORM');
            resp = true;
        }
        return resp;
    }
}
