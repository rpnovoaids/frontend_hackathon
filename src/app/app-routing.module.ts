import {RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {NotfoundComponent} from './views/notfound/notfound.component';
import {AppLayoutComponent} from "./layout/app.layout.component";
import {LoginCanActiveGuard} from "./services/can-active/login-can-active.guard";
import {CanActiveGuard} from "./services/can-active/can-active.guard";

@NgModule({
    imports: [
        RouterModule.forRoot([
            {
                path: '', component: AppLayoutComponent,
                canActivate: [CanActiveGuard],
                children: [
                    {
                        path: '',
                        loadChildren: () => import('./views/dashboard/dashboard.module').then(m => m.DashboardModule)
                    },
                    {
                        path: 'inventory',
                        loadChildren: () => import('./views/inventory/inventory.module').then(m => m.InventoryModule)
                    },
                    {
                        path: 'customers',
                        loadChildren: () => import('./views/customers/customers.module').then(m => m.CustomersModule)
                    },
                    {
                        path: 'supplies',
                        loadChildren: () => import('./views/supplies/supplie.module').then(m => m.SupplieModule)
                    },
                    {path: 'uikit', loadChildren: () => import('./views/uikit/uikit.module').then(m => m.UikitModule)},
                    {
                        path: 'utilities',
                        loadChildren: () => import('./views/utilities/utilities.module').then(m => m.UtilitiesModule)
                    },
                    {
                        path: 'blocks',
                        loadChildren: () => import('./views/primeblocks/primeblocks.module').then(m => m.PrimeBlocksModule)
                    },
                    {path: 'pages', loadChildren: () => import('./views/pages/pages.module').then(m => m.PagesModule)},
                ],
            },
            {
                path: 'auth', loadChildren: () => import('./views/auth/auth.module').then(m => m.AuthModule),
                canActivate: [LoginCanActiveGuard]
            },
            {path: 'pages/notfound', component: NotfoundComponent},
            {path: '**', redirectTo: 'pages/notfound'},
        ], {scrollPositionRestoration: 'enabled', anchorScrolling: 'enabled'})
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
