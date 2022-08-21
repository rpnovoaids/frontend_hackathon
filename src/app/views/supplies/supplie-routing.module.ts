import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';

import {SupplieListComponent} from "./supplie-list/supplie-list.component";
import {MeterListComponent} from "./meter-list/meter-list.component";

@NgModule({
    imports: [RouterModule.forChild([
        {path: '', component: SupplieListComponent},
        {path: 'meters', component: MeterListComponent},
        {path: '**', redirectTo: 'pages/notfound'}
    ])],
    exports: [RouterModule]
})
export class SupplieRoutingModule {
}
