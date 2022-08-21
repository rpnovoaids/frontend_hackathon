import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {HttpClient, HttpErrorResponse, HttpHeaders, HttpParamsOptions} from '@angular/common/http';
import {NgxSpinnerService} from 'ngx-spinner';
import {SnotifyService} from 'ng-snotify';
import * as CryptoJS from 'crypto-js';
import {BehaviorSubject, catchError, map, Observable, of, throwError} from "rxjs";

import {JsonResponse} from '../../interfaces/http/json.response';
import {AuthResponse} from "../../interfaces/http/auth.response";


import {User} from "../../models/security/user.model";
import {LoginUser} from "../../models/auth/login-user.model";
import {AuthenticatedUser} from "../../models/auth/authenticated-user.model";

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    expire: any;
    identity: AuthenticatedUser | null = null;
    httpOptions: HttpParamsOptions | any;

    private loggedUserSubject: BehaviorSubject<AuthenticatedUser> | any;
    public loggedInUser: Observable<any>;

    url: string = 'http://localhost/backend_hackathon/public/api';

    /*
    https://www.mccars.cl/api
    http://192.168.200.108/backend_mccars_admin/public/api
    http://localhost/backend_mccars_admin/public/api
    */

    public urlTryingAccess: string = '';

    constructor(
        private _Router: Router,
        private _HttpClient: HttpClient,
        private _NgxSpinnerService: NgxSpinnerService,
        private _SnotifyService: SnotifyService
    ) {
        let getLoggedUser = JSON.parse(<string>localStorage.getItem('loggedInUser'));
        this.loggedUserSubject = new BehaviorSubject(getLoggedUser);
        this.loggedInUser = this.loggedUserSubject.asObservable();
    }

    /**
     * setToken
     * @param token
     */
    setToken(token: string | null): void {
        if (token) {
            const encrypt = this.setEncryptText(token);
            localStorage.setItem('current', encrypt);
        } else {
            localStorage.removeItem('current');
        }
    }

    /**
     * getToken
     */
    getToken(): string | null {
        let token = localStorage.getItem('current');
        if (token) {
            token = this.getDecryptText(token);
            this.urlTryingAccess = '';
        } else {
            token = null;
        }
        return token;
    }

    /**
     * setExpire
     * @param expire
     */
    setExpire(expire: any) {
        if (expire) {
            const encrypt = this.setEncryptText(String(expire));
            localStorage.setItem('ex', encrypt);
            this.expire = encrypt;
        } else {
            localStorage.removeItem('ex');
            this.expire = null;
        }
    }

    /**
     * getExpire
     */
    getExpire() {
        if (!this.expire) {
            const expire = localStorage.getItem('ex');
            if (!expire) {
                this.expire = null;
            } else {
                this.expire = expire;
            }
        }
        return this.expire == null ? this.expire : Number(this.getDecryptText(this.expire));
    }

    /**
     * setIdentity
     * @param identity
     */
    setIdentity(identity: AuthenticatedUser | null) {
        if (identity) {
            const encrypt = this.setEncryptObject(identity);
            localStorage.setItem('sp_pi', encrypt);
            this.identity = identity;
        } else {
            localStorage.removeItem('sp_pi');
            this.identity = null;
        }
    }

    /**
     * getIdentity
     */
    getIdentity(): AuthenticatedUser | null {
        if (!this.identity) {
            const identity = localStorage.getItem('sp_pi');
            if (identity) {
                this.identity = this.getDecryptObject(identity)
            } else {
                this.identity = null
            }
        }
        return this.identity;
    }

    /**
     * getTokenExpirationDate
     */
    getTokenExpirationDate(): Date {
        const date = new Date(0);
        date.setUTCSeconds(this.expire ? this.expire : 0);
        return date;
    }

    /**
     * isTokenExpired
     * @param expire
     */
    isTokenExpired(expire: number): boolean {
        const date = this.getTokenExpirationDate();
        if (date === undefined) {
            return false;
        }
        return !(date.valueOf() > new Date().valueOf());
    }

    /**
     * sessionLogout
     */
    setLogout() {
        this.setToken(null);
        this.setExpire(0);
        this.setIdentity(null);
        return this._Router.navigate(['/auth/login']);
    }

    /**
     * headers
     */
    headers(): object {
        return this.httpOptions = {
            headers: new HttpHeaders({
                'Authorization': 'Bearer ' + (this.getToken() ? this.getToken() : null),
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            })
        };
    }

    headersFormData() {
        return this.httpOptions = {
            headers: new HttpHeaders({
                'Authorization': 'Bearer ' + (this.getToken() ? this.getToken() : null),
                'Accept': 'application/json'
            })
        };
    }

    headersFormFile() {
        return new HttpHeaders({
            'Authorization': 'Bearer ' + (this.getToken() ? this.getToken() : null),
            'Accept': 'application/json'
        });
    }

    /**
     * login
     * @param user
     */
    login(user: LoginUser) {
        return this._HttpClient.post<AuthResponse>(this.url + '/auth/login', user, {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            })
        }).pipe(map(res => {
            this.setToken(res.access_token);
            this.setExpire(res.expires_in);
            this.setIdentity(res.object);
            this.loggedUserSubject.next(res.object?.usuario);
            return res;
        }));
    }

    logoutUser() {
        localStorage.removeItem('loggedInUser');
        this.loggedUserSubject.next(null);
    }

    public get loggedInUserValue() {
        return this.loggedUserSubject.value;
    }

    /**
     * userLoggedIn
     */
    userLoggedIn() {
        return this._HttpClient.post<JsonResponse>(this.url + '/auth/me', null, this.headers());
    }

    /**
     * userLoggedIn
     */
    logout() {
        return this._HttpClient.post<JsonResponse>(this.url + '/auth/logout', null, this.headers());
    }

    /**
     * register
     * @param usuario
     */
    register(usuario: User) {
        return this._HttpClient.post<JsonResponse>(this.url + '/auth/register', usuario, {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            })
        });
    }

    /**
     * sendPasswordResetLink
     * @param email
     */
    sendPasswordResetLink(email: string) {
        return this._HttpClient.post<JsonResponse>(this.url + '/auth/sendPasswordResetLink', email, this.headers());
    }

    /**
     * resetPassword
     * @param usuario
     */
    resetPassword(usuario: User) {
        return this._HttpClient.post<JsonResponse>(this.url + '/auth/resetPassword', usuario, this.headers());
    }

    /**
     * changePassword
     * @param usuario
     */
    changePassword(usuario: User) {
        return this._HttpClient.post<JsonResponse>(this.url + '/auth/password/change', usuario, this.headers());
    }

    /**
     * getUserLoggedIn
     */
    isLoggedIn(url: string): boolean {
        if (!(localStorage.getItem('current') && localStorage.getItem('sp_pi'))) {
            this.urlTryingAccess = url;
            return false;
        }
        return true;
    }

    /**
     * errorRequest
     * @param error
     */
    handleError(error: HttpErrorResponse): any {
        this._NgxSpinnerService.hide();
        if (error.status === 401) {
            this.setLogout();
            this._SnotifyService.error('No Autorizado', '¡Atención..!');
        } else {
            this._SnotifyService.error('Ocurrío un Error', '¡Atención..!');
        }
        let msg = '';
        if (error.error instanceof ErrorEvent) {
            // client-side error
            msg = error.error.message;
        } else {
            // server-side error
            msg = `Error Code: ${error.status}\nMessage: ${error.message}`;
        }
        console.error(msg)
        return throwError(msg);
    }

    /**
     * setEncrypt
     * @param plaintText
     */
    setEncryptText(plaintText: string) {
        return CryptoJS.AES.encrypt(plaintText, 'secret key 123').toString();
    }

    /**
     * getDecrypt
     * @param encrypt
     */
    getDecryptText(encrypt: string) {
        const bytes = CryptoJS.AES.decrypt(encrypt, 'secret key 123');
        return bytes.toString(CryptoJS.enc.Utf8);
    }

    /**
     * setEncryptObject
     * @param object
     */
    setEncryptObject(object: object) {
        return CryptoJS.AES.encrypt(JSON.stringify(object), 'secret key 123').toString();
    }

    /**
     * getDecryptObject
     * @param encryptObject
     */
    getDecryptObject(encryptObject: string) {
        const bytes = CryptoJS.AES.decrypt(encryptObject, 'secret key 123');
        return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    }

    /**
     * setEncryptArray
     * @param array
     */
    setEncryptArray(array: any[]) {
        return CryptoJS.AES.encrypt(JSON.stringify(array), 'secret key 123').toString();
    }

    /**
     * getDecryptArray
     * @param encryptArray
     */
    getDecryptArray(encryptArray: string) {
        const bytes = CryptoJS.AES.decrypt(encryptArray, 'secret key 123');
        return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    }
}
