import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {InputTextModule} from 'primeng/inputtext';
import {SidebarModule} from 'primeng/sidebar';
import {BadgeModule} from 'primeng/badge';
import {RadioButtonModule} from 'primeng/radiobutton';
import {InputSwitchModule} from 'primeng/inputswitch';
import {RippleModule} from 'primeng/ripple';
import {ToastModule} from "primeng/toast";
import {DialogModule} from "primeng/dialog";
import {ButtonModule} from "primeng/button";
import {MenuModule} from "primeng/menu";

import {SnotifyModule} from "ng-snotify";
import {NgxSpinnerModule} from "ngx-spinner";

import {AppConfigModule} from './config/config.module';

import {AppMenuComponent} from './app.menu.component';
import {AppMenuitemComponent} from './app.menuitem.component';
import {AppTopBarComponent} from './app.topbar.component';
import {AppFooterComponent} from './app.footer.component';
import {AppSidebarComponent} from "./app.sidebar.component";
import {AppLayoutComponent} from "./app.layout.component";

@NgModule({
    declarations: [
        AppMenuitemComponent,
        AppTopBarComponent,
        AppFooterComponent,
        AppMenuComponent,
        AppSidebarComponent,
        AppLayoutComponent,
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpClientModule,
        BrowserAnimationsModule,
        InputTextModule,
        SidebarModule,
        BadgeModule,
        RadioButtonModule,
        InputSwitchModule,
        RippleModule,
        RouterModule,
        AppConfigModule,
        ToastModule,
        DialogModule,
        ButtonModule,
        MenuModule,
        SnotifyModule,
        NgxSpinnerModule,
    ],
    exports: [AppLayoutComponent]
})
export class AppLayoutModule {
}
