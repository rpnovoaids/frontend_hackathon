import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {InventoryRoutingModule} from './inventory-routing.module';
import {SharedModule} from "../shared/shared.module";

import {TableModule} from "primeng/table";
import {ButtonModule} from "primeng/button";
import {InputTextModule} from "primeng/inputtext";

import {ProductListComponent} from './product-list/product-list.component';


@NgModule({
    declarations: [
        ProductListComponent
    ],
    imports: [
        CommonModule,
        InventoryRoutingModule,
        SharedModule,
        TableModule,
        ButtonModule,
        InputTextModule
    ]
})
export class InventoryModule {
}
