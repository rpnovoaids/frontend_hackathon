import {AuthenticatedUserInterface} from "../../interfaces/auth/authenticated-user.interface";
import {Person} from "../person/person.model";

export class AuthenticatedUser implements AuthenticatedUserInterface {

    id: string;
    person: Person;
    username: string;
    active: boolean;

    constructor(id: string, person: Person, username: string, active: boolean) {
        this.id = id;
        this.person = person;
        this.username = username;
        this.active = active;
    }
}
