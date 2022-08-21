import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {DropdownModule} from 'primeng/dropdown';
import {InputTextModule} from 'primeng/inputtext';
import {ButtonModule} from 'primeng/button';
import {RippleModule} from "primeng/ripple";
import {InputTextareaModule} from 'primeng/inputtextarea';
import {CalendarModule} from "primeng/calendar";
import {ConfirmDialogModule} from "primeng/confirmdialog";
import {TableModule} from "primeng/table";

import {CustomersRoutingModule} from './customers-routing.module';
import {CustomerListComponent} from './customer-list/customer-list.component';
import {InputMaskModule} from "primeng/inputmask";
import {SharedModule} from "../shared/shared.module";
import {DialogModule} from "primeng/dialog";


@NgModule({
    declarations: [
        CustomerListComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        CustomersRoutingModule,
        DropdownModule,
        InputTextModule,
        ButtonModule,
        RippleModule,
        InputTextareaModule,
        CalendarModule,
        ConfirmDialogModule,
        InputMaskModule,
        TableModule,
        SharedModule,
        DialogModule
    ]
})
export class CustomersModule {
}
