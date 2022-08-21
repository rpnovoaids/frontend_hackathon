import {Component, OnDestroy, Renderer2, ViewChild} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';
import {filter, Subscription} from 'rxjs';
import {MenuService} from './app.menu.service';
import {LayoutService} from "./service/app.layout.service";
import {AppSidebarComponent} from "./app.sidebar.component";
import {AppTopBarComponent} from './app.topbar.component';

import {Idle, DEFAULT_INTERRUPTSOURCES} from '@ng-idle/core';
import {Keepalive} from '@ng-idle/keepalive';
import {AuthService} from "../services/auth/auth.service";


import {Title} from '@angular/platform-browser';

@Component({
    selector: 'app-layout',
    templateUrl: './app.layout.component.html'
})
export class AppLayoutComponent implements OnDestroy {

    overlayMenuOpenSubscription: Subscription;

    menuOutsideClickListener: any;

    @ViewChild(AppSidebarComponent) appSidebar!: AppSidebarComponent;

    title = 'Novo - NOVOA IDS E.I.R.L.';
    idleState = '¡No Iniciado!';
    timedOut = false;
    lastPing?: Date;
    display: boolean = false;

    constructor(
        private _MenuService: MenuService,
        public _LayoutService: LayoutService,
        public _Renderer2: Renderer2,
        public _Router: Router,
        public _TitleService: Title,
        public _Idle: Idle,
        public _Keepalive: Keepalive,
        public _AuthService: AuthService,
    ) {
        this.overlayMenuOpenSubscription = this._LayoutService.overlayOpen$.subscribe(() => {
            if (!this.menuOutsideClickListener) {
                this.menuOutsideClickListener = this._Renderer2.listen('document', 'click', event => {
                    const isOutsideClicked = !(this.appSidebar.el.nativeElement.isSameNode(event.target) || this.appSidebar.el.nativeElement.contains(event.target)
                        || event.target.classList.contains('p-trigger') || event.target.parentNode.classList.contains('p-trigger'));

                    if (isOutsideClicked) {
                        this._LayoutService.state.profileSidebarVisible = false;
                        this._LayoutService.state.overlayMenuActive = false;
                        this._LayoutService.state.staticMenuMobileActive = false;
                        this._LayoutService.state.menuHoverActive = false;
                        this._MenuService.reset();
                        this.menuOutsideClickListener();
                        this.menuOutsideClickListener = null;
                        this.unblockBodyScroll();
                    } else {
                        if (this._LayoutService.state.staticMenuMobileActive) {
                            this.blockBodyScroll();
                        }
                    }
                });
            }
        });

        this._Router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe(() => {
                this.unblockBodyScroll();
        });

        _TitleService.setTitle(this.title);

        // Establece un tiempo de espera inactivo de 5 segundos, para fines de prueba.
        _Idle.setIdle(900);
        // Establece un tiempo de espera de 5 segundos. Después de 10 segundos de inactividad, el usuario se considerará agotado.
        _Idle.setTimeout(60);
        // Establece las interrupciones predeterminadas, en este caso, cosas como clics, desplazamientos, toques del documento
        _Idle.setInterrupts(DEFAULT_INTERRUPTSOURCES);

        _Idle.onIdleEnd.subscribe(() => {
            this.idleState = 'Ya no está inactivo.';
            this.reset();
        });

        _Idle.onTimeout.subscribe(() => {
            this.idleState = '¡Caducado!';
            this.logout();
        });

        _Idle.onIdleStart.subscribe(() => {
            this.idleState = '¡Te has quedado inactivo!';
            this.display = true;
        });

        _Idle.onTimeoutWarning.subscribe((countdown) => {
            this.idleState = '¡Tiempo de espera en ' + countdown + ' segundos!';
        });

        // Establece el intervalo de ping en 15 segundos
        _Keepalive.interval(15);

        _Keepalive.onPing.subscribe(() => this.lastPing = new Date());

        if (!_AuthService.isLoggedIn('')) {
            _Idle.stop();
        } else {
            _Idle.watch();
        }
    }

    blockBodyScroll(): void {
        if (document.body.classList) {
            document.body.classList.add('blocked-scroll');
        } else {
            document.body.className += ' blocked-scroll';
        }
    }

    unblockBodyScroll(): void {
        if (document.body.classList) {
            document.body.classList.remove('blocked-scroll');
        } else {
            document.body.className = document.body.className.replace(new RegExp('(^|\\b)' +
                'blocked-scroll'.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
        }
    }

    get containerClass() {
        return {
            'layout-theme-light': this._LayoutService.config.colorScheme === 'light',
            'layout-theme-dark': this._LayoutService.config.colorScheme === 'dark',
            'layout-overlay': this._LayoutService.config.menuMode === 'overlay',
            'layout-static': this._LayoutService.config.menuMode === 'static',
            'layout-slim': this._LayoutService.config.menuMode === 'slim',
            'layout-horizontal': this._LayoutService.config.menuMode === 'horizontal',
            'layout-static-inactive': this._LayoutService.state.staticMenuDesktopInactive && this._LayoutService.config.menuMode === 'static',
            'layout-overlay-active': this._LayoutService.state.overlayMenuActive,
            'layout-mobile-active': this._LayoutService.state.staticMenuMobileActive,
            'p-input-filled': this._LayoutService.config.inputStyle === 'filled',
            'p-ripple-disabled': !this._LayoutService.config.ripple
        }
    }

    ngOnDestroy() {
        if (this.overlayMenuOpenSubscription) {
            this.overlayMenuOpenSubscription.unsubscribe();
        }

        if (this.menuOutsideClickListener) {
            this.menuOutsideClickListener();
        }
    }

    reset(): void {
        this._Idle.watch();
        this.idleState = '¡Iniciado!';
        this.timedOut = false;
    }

    stay(): void {
        this.display = false;
        this.reset();
    }

    logout(): void {
        this._Idle.stop();
        this.display = false;
        this._AuthService.logout().subscribe(
            () => {
                this._AuthService.setLogout();
            }
        );
    }
}
