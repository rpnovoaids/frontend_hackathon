import {LoginUserInterface} from "../../interfaces/auth/login-user.interface";

export class LoginUser implements LoginUserInterface {

    username: string;
    password: string;
    remember_me: boolean;

    constructor() {
        this.username = '';
        this.password = '';
        this.remember_me = false;
    }
}
