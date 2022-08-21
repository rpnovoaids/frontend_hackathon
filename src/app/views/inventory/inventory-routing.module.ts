import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';

import {ProductListComponent} from "./product-list/product-list.component";

@NgModule({
    imports: [RouterModule.forChild([
        {path: 'products', component: ProductListComponent},
        {path: '**', redirectTo: 'pages/notfound'}
    ])],
    exports: [RouterModule]
})
export class InventoryRoutingModule {
}
