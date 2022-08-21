import {IdentificationTypeInterface} from "../../interfaces/person/identification-type.interface";

export class IdentificationType implements IdentificationTypeInterface {

    id?: number | null;
    code: string;
    name: string;
    description: string;
    number_digits: string | number;
    state: boolean;

    constructor() {
        this.id = null;
        this.code = '';
        this.name = '';
        this.description = '';
        this.number_digits = 0;
        this.state = true;
    }
}
