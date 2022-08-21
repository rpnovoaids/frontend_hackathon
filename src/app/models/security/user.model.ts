import {UserInterface} from "../../interfaces/security/user.interface";
import {Person} from "../person/person.model";

export class User implements UserInterface {

    id?: string;
    person: Person;
    email: string;
    password: string;
    active: boolean;
    state: boolean;

    constructor(person: Person) {
        this.person = person;
        this.email = '';
        this.password = '';
        this.active = true;
        this.state = true;
    }
}
