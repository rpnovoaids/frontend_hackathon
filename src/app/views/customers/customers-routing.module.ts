import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';

import {CustomerListComponent} from "./customer-list/customer-list.component";

@NgModule({
    imports: [RouterModule.forChild([
        {path: '', component: CustomerListComponent},
        {path: '**', redirectTo: 'pages/notfound'}
    ])],
    exports: [RouterModule]
})
export class CustomersRoutingModule {
}
