import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {SupplieRoutingModule} from './supplie-routing.module';
import {SharedModule} from "../shared/shared.module";

import {MeterListComponent} from './meter-list/meter-list.component';
import {SupplieListComponent} from './supplie-list/supplie-list.component';

import {TableModule} from "primeng/table";
import {ButtonModule} from "primeng/button";
import {InputTextModule} from "primeng/inputtext";


@NgModule({
    declarations: [
        MeterListComponent,
        SupplieListComponent
    ],
    imports: [
        CommonModule,
        SupplieRoutingModule,
        SharedModule,
        TableModule,
        ButtonModule,
        InputTextModule
    ]
})
export class SupplieModule {
}
