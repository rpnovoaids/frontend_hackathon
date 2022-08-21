import {NgModule} from '@angular/core';
import {HashLocationStrategy, LocationStrategy} from '@angular/common';
import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {AppLayoutModule} from './layout/app.layout.module';
import {NotfoundComponent} from './views/notfound/notfound.component';
import {ProductService} from './services/service/product.service';
import {CountryService} from './services/service/country.service';
import {CustomerService} from './services/service/customer.service';
import {EventService} from './services/service/event.service';
import {IconService} from './services/service/icon.service';
import {NodeService} from './services/service/node.service';
import {PhotoService} from './services/service/photo.service';

import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {AuthInterceptor} from "./interceptor/auth.interceptor";

import {SnotifyModule, SnotifyService, ToastDefaults} from 'ng-snotify';
import {NgxSpinnerModule} from 'ngx-spinner';
import {NgIdleKeepaliveModule} from '@ng-idle/keepalive';

import {ConfirmationService, MessageService} from "primeng/api";
import {ToastModule} from "primeng/toast";


@NgModule({
    declarations: [
        AppComponent,
        NotfoundComponent
    ],
    imports: [
        AppRoutingModule,
        AppLayoutModule,
        SnotifyModule,
        NgxSpinnerModule,
        NgIdleKeepaliveModule.forRoot(),
        ToastModule
    ],
    providers: [
        {provide: LocationStrategy, useClass: HashLocationStrategy},
        CountryService, CustomerService, EventService, IconService, NodeService,
        PhotoService, ProductService,
        {provide: 'SnotifyToastConfig', useValue: ToastDefaults},
        SnotifyService,
        MessageService,
        ConfirmationService,
        {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
