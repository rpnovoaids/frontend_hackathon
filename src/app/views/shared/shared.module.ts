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
import {InputMaskModule} from "primeng/inputmask";

import {PersonComponent} from "./person/person.component";
import {DialogModule} from "primeng/dialog";
import {MeterComponent} from './meter/meter.component';
import { ProductComponent } from './product/product.component';


@NgModule({
    declarations: [
        PersonComponent,
        MeterComponent,
        ProductComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        DropdownModule,
        InputTextModule,
        ButtonModule,
        RippleModule,
        InputTextareaModule,
        CalendarModule,
        ConfirmDialogModule,
        InputMaskModule,
        DialogModule
    ],
    exports: [
        PersonComponent,
        MeterComponent,
        ProductComponent
    ]
})
export class SharedModule {
}
