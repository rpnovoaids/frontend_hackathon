import {Injectable} from '@angular/core';
import {catchError, map, Observable, of, tap} from 'rxjs';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor, HttpResponse
} from '@angular/common/http';
import {AuthService} from "../services/auth/auth.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(
        private _AuthService: AuthService
    ) {
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        //let loggedInUser = this._AuthService.currentUserValue;
        let token = this._AuthService.getToken();
        if (token != null) {
            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${token}`
                }
            });
        }

        return next.handle(request)
            .pipe(
                tap((httpEvent: HttpEvent<any>) => {
                    if (httpEvent instanceof HttpResponse && httpEvent.body.access_token) {
                        this._AuthService.setToken(httpEvent.body.access_token);
                    }
                }),
                catchError(err => of(this._AuthService.handleError(err)))
            );
    }
}
