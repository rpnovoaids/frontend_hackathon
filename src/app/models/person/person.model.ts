import {PersonInterface} from "../../interfaces/person/person.interface";
import {IdentificationType} from "./identification-type.model";

export class Person implements PersonInterface {

    id?: number | null;
    kind_person: string;
    identificationType: IdentificationType | null;
    identification_number: string;
    name: string | null;
    first_surname: string | null;
    second_surname: string | null;
    business_name: string | null;
    birthday: Date | string | null;
    gender: string | null;
    address: string;
    first_phone: string | null;
    second_phone: string | null;
    state: boolean;

    constructor() {
        this.id = null;
        this.kind_person = 'N';
        this.identificationType = null;
        this.identification_number = '';
        this.name = null;
        this.first_surname = null;
        this.second_surname = null;
        this.business_name = null;
        this.birthday = null;
        this.gender = null;
        this.address = '';
        this.first_phone = null;
        this.second_phone = null;
        this.state = true;
    }
}
