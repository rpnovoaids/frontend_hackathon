import {Component, OnInit} from '@angular/core';
import {MenuItem} from 'primeng/api';
import {LayoutService} from "./service/app.layout.service";
import {AuthService} from "../services/auth/auth.service";

@Component({
    selector: 'app-topbar',
    templateUrl: './app.topbar.component.html'
})
export class AppTopBarComponent implements OnInit {

    items!: MenuItem[];

    constructor(
        public _LayoutService: LayoutService,
        public _AuthService: AuthService
    ) {
    }

    ngOnInit(): void {
        this.items = [{
            label: 'Opciones',
            items: [{
                label: 'Mi Peril',
                icon: 'pi pi-user',
                command: () => {

                }
            },
                {
                    label: 'Cerrar sesión',
                    icon: 'pi pi-lock',
                    command: () => {
                        this.logout()
                    }
                }
            ]
        }];
    }

    logout(): void {
        this._AuthService.logout().subscribe(
            () => {
                this._AuthService.setLogout();
            }
        );
    }
}
