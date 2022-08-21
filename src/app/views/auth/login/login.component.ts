import {Component, OnInit} from '@angular/core';
import {LayoutService} from 'src/app/layout/service/app.layout.service';

import {Router} from '@angular/router';
import {HelperService} from '../../../services/helper/helper.service';
import {AuthService} from '../../../services/auth/auth.service';

import {LoginUser} from "../../../models/auth/login-user.model";

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styles: [`
        :host ::ng-deep .p-password input {
            width: 100%;
            padding: 1rem;
        }

        :host ::ng-deep .pi-eye {
            transform: scale(1.6);
            margin-right: 1rem;
            color: var(--primary-color) !important;
        }

        :host ::ng-deep .pi-eye-slash {
            transform: scale(1.6);
            margin-right: 1rem;
            color: var(--primary-color) !important;
        }
    `],
    providers: [
        AuthService,
        HelperService
    ]
})
export class LoginComponent implements OnInit {

    formUser: LoginUser = new LoginUser;

    constructor(
        public _LayoutService: LayoutService,
        private _Router: Router,
        private _HelperService: HelperService,
        private _AuthService: AuthService,
    ) {
        this.formUser.username = '28065593';
        this.formUser.password = '28065593';
    }

    ngOnInit(): void {
    }

    onSubmit(): void {
        this._HelperService.showLoading();
        const routeRedirect = this._AuthService.urlTryingAccess;
        this._AuthService.urlTryingAccess = '';
        this._AuthService.login(this.formUser).subscribe(
            res => {
                this._HelperService.messageSnotifyToast('Bienvenido, solo un poco mas...');
                this._HelperService.showLoading();
                window.location.reload();
                // this._Router.navigate([routeRedirect]);
                this._HelperService.hideLoading();
            }
        );
    }
}
